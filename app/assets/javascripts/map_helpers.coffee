@map_helpers =
  marker_filter: (map, model, models) ->
    # Remove all markers not in button's community.
    $('.' + model).on "click", (e) ->
      $button = this
      console.log("$button.id:", $button.id)
      console.log('window.layers:', window.layers)

      toggleLayers = $.grep window.layers, (layer) ->
        return layer[model + '_id'] != $button.id

      console.log(toggleLayers)

      for layer in window.layers
        layer.onMap = true
        map.addLayer(layer)

      for layer in toggleLayers
        if (layer.onMap)
          layer.onMap = false
          map.removeLayer(layer)
        else
          layer.onMap = true
          map.addLayer(layer)

    # Change the button color when selected.

    # Add all markers to the map.
    $('.all_' + models).on "click", (e) ->
      for layer in window.layers
        layer.onMap = true
        map.addLayer(layer)


  marker_drop: (e, marker, loc, model_id) ->
    drop_coord = e.target._latlng
    #console.log("latlng:", e.target._latlng)

    # Send an $.ajax request to update the location.
    $.ajax
      url: '/api' + location.pathname + '/locations/' + marker.loc_id
      dataType: "JSON"
      type: "patch"
      data: "location[lat]=#{drop_coord.lat}&location[lon]=#{drop_coord.lng}&location[#{model_id}]=#{model_id}"
      success: (updated_data, status, jqXHR) ->
        # Flash a message either on the marker.
        marker.bindPopup("Location updated to:<br/> #{updated_data.location.name}").openPopup();

        # Update the location name, address, etc.
        updated_location = """#{updated_data.location.name} <br/> #{updated_data.location.address}
                    #{updated_data.location.city} #{updated_data.location.state} #{updated_data.location.postcode}"""

        $("#location_" + marker.loc_id).html(updated_location)

      error: (data, status, jqXHR) ->
        response = JSON.parse(data.responseText)
        marker.bindPopup("<span class='alert'>#{response.message}</span>").openPopup();


  new_form_marker_drop: (e, marker, loc_input) ->
    drop_coord = e.target._latlng

    # Send an $.ajax request to update the location.
    $.ajax
      url: '/api/locations/show?lat=' + drop_coord.lat + '&lon=' + drop_coord.lng
      dataType: "JSON"
      success: (updated_data, status, jqXHR) ->

        # Flash a message either on the marker.
        marker.bindPopup("Location updated to:<br/> #{updated_data.location.name}").openPopup();

        # Update the location name, address, etc.
        updated_location = """#{updated_data.location.name} <br/> #{updated_data.location.address}
                    #{updated_data.location.city} #{updated_data.location.state} #{updated_data.location.postcode}"""
        loc_input.val(updated_data.location.name)

        $('#post_lat').remove()
        $('#post_lon').remove()
        $('#new_post').append("<input value='#{drop_coord.lat}' type='hidden' name='post[lat]' id='post_lat'>
           <input value='#{drop_coord.lng}' type='hidden' name='post[lon]' id='post_lon'>")

      error: (data, status, jqXHR) ->
        #console.log(data)
        response = JSON.parse(data.responseText)
        marker.bindPopup("<span class='alert'>#{response.message}</span>").openPopup();


  new_location_popup: (map, path) ->
    #
    # Main map click bindings, if marker is already there update it.
    #
    marker = undefined
    map.on "click", (e) ->
      coord = e.latlng;
      window.coord = coord

      if path == 'home'
        markerHtml = """<br/>
                          <a id='new_post' href='/posts/new?lat=#{coord.lat}&lon=#{coord.lng}'>New Post</a>
                          <br/><br/>
                          <a id='posts_here' href='/locations?lat=#{coord.lat}&lon=#{coord.lng}'>
                            What's Happening Here
                          </a>
                          <br/>
                       """
      else
        markerHtml = "<br/><a id='new_location' href='#'>Add Location</a>"

      if (typeof(marker) == 'undefined')
        marker = new L.Marker(e.latlng, { icon: divDefaultIcon });
        map.addLayer(marker);
        map_helpers.new_location_for_model(map, marker)
      else
        marker.setLatLng(e.latlng)

      marker.bindPopup(markerHtml).openPopup()


  new_location_for_model: (map, marker) ->
    map.on 'popupopen', (e) ->
      $('#new_location').on 'click', (e) ->
        e.preventDefault()

        $.ajax
          url: "/api#{location.pathname}/locations"
          dataType: "JSON"
          type: "post"
          data: "location[lat]=#{coord.lat}&location[lon]=#{coord.lng}"
          success: (data, status, jqXHR) ->

            # Update the popup.
            data.locations.sort()
            new_loc = data.locations[data.locations.length-1]

            if data.hasOwnProperty('community')
              model = 'community'
            else if data.hasOwnProperty('post')
              model = 'post'
            else if data.hasOwnProperty('organization')
              model = 'organization'

            marker.bindPopup("Location Set to:<br/> #{new_loc.name}").openPopup();

            # Update the Locations <ul>.
            new_loc_html = """<li>
                              <span id="location_#{new_loc.id}">
                              <strong>#{new_loc.name}</strong>
                              <br/>
                              #{new_loc.address}
                              #{new_loc.city} #{new_loc.state} #{new_loc.postcode}
                              </span>
                              </li>
                           """
            if model == 'post'
              trash = """<a class="button alert tiny remove_location icon"
                          title="Remove Location"
                          data-sweet-alert-confirm="Are you sure?"
                          rel="nofollow" data-method="delete"
                          href="/posts/#{data[model].id}/locations/#{new_loc.id}">
                          <img class="icon" src="/assets/trash-icon.svg" alt="Trash icon">
                          </a>
                      """
              $('#' + new_loc.id).parent().append(trash)

            if ($("##{model}_#{data[model].id}").length)
              $("##{model}_#{data[model].id}").append(new_loc_html)
            else
              $('#no-locations').replaceWith(new_loc_html)
              Turbolinks.visit(window.location)
          error: (data, status, jqXHR) ->
            #console.log(data)
            response = JSON.parse(data.responseText)
            marker.bindPopup("<span class='alert'>#{response.message}</span>").openPopup();


  set_community_layers: (map) ->
    #
    # Builds a layer for each community which markers are then added to.
    #
    path = 'home'
    url = "/api/communities"

    #map_helpers.marker_filter(map, 'community', 'communities')
    #map_helpers.new_location_popup(map, path)

    $.ajax
      url: url
      dataType: "JSON"
      success: (data, status, jqXHR) ->

        window.layers = []

        # Create a default community_0 layerGroup.
        layer_0 = L.layerGroup([])
        layer_0.community_id = 'community_0'
        layer_0.onMap = true
        window.layers.push(layer_0)

        for community in data
          markers = []
#          for post in community.posts
#            # Create markers for each post.
#            #console.log(post, community.name)
#            for loc in post.locations
#
#              divCommunityIcon = L.divIcon({
#                className: 'marker-div-icon',
#                html: get_svg(community.color, 50, 50),
#                popupAnchor: [8, -3],
#              });
#
#              marker = new L.Marker([loc.lat, loc.lon], {
#                draggable: false,
#                title: data.title,
#                riseOnHover: true,
#                icon: divCommunityIcon
#              })
#              marker.bindPopup("""
#                    <h3><a href='/posts/#{post.id}'>#{post.title}</a></h3>
#                    <p>#{marked(post.description)}</p>
#                    <a href='/posts/#{post.id}/edit' class='button tiny icon'>
#                      <img src='#{window.image_path('edit-icon.svg')}' class='ty-icon'/>
#                    </a>
#                    """)
#              markers.push(marker)

          # Create a layerGroup for each Community.
          layer = L.layerGroup(markers)
          layer.community_id = "community_" + community.id
          layer.onMap = true
          layer.addTo(map);

          window.layers.push(layer)

  set_home_post_markers: (map, page=1) ->
    path = 'home'
    url = "/api/posts?page=" + page

    map_helpers.marker_filter(map, 'community', 'communities')
    map_helpers.new_location_popup(map, path)

    console.log('window.layers:', window.layers)

    $.ajax
      url: url
      dataType: "JSON"
      success: (data, status, jqXHR) ->
        #console.log(data)

        #window.layers = []
        markers = []
        for post in data
          # Create markers for each post.
          #console.log(post, community.name)
          for loc in post.locations

#            if post.communities[0]?
#              color = post.communities[0].color
#            else
#              color = '#632816'

            if post.communities.length > 0
               # Add marker to each Community layerGroup.
              for community in post.communities
                divCommunityIcon = L.divIcon({
                  className: 'marker-div-icon',
                  html: get_svg(community.color, 50, 50),
                  popupAnchor: [8, -3],
                });

                marker = new L.Marker([loc.lat, loc.lon], {
                  draggable: false,
                  title: post.title,
                  riseOnHover: true,
                  icon: divCommunityIcon
                })
                marker.bindPopup("""
                      <h3><a href='/posts/#{post.id}'>#{post.title}</a></h3>
                      <p>#{marked(post.description)}</p>
                      <a href='/posts/#{post.id}/edit' class='button tiny icon'>
                        <img src='#{window.image_path('edit-icon.svg')}' class='ty-icon'/>
                      </a>
                      """)
            #markers.push(marker)


                #console.log('post.id:', post.id, 'community:', community)
                #layer = L.layerGroup(markers)
                #layer.community_id = "community_" + community.id
                #layer.onMap = true
                for layer in window.layers
                  if layer.community_id == 'community_' + community.id
                    layer.addLayer(marker)
                    layer.addTo(map)
            else
              # Add marker for each Post Location.
              divCommunityIcon = L.divIcon({
                className: 'marker-div-icon',
                html: get_svg('#632816', 50, 50),
                popupAnchor: [8, -3],
              });

              marker = new L.Marker([loc.lat, loc.lon], {
                draggable: false,
                title: post.title,
                riseOnHover: true,
                icon: divCommunityIcon
              })
              marker.bindPopup("""
                        <h3><a href='/posts/#{post.id}'>#{post.title}</a></h3>
                        <p>#{marked(post.description)}</p>
                        <a href='/posts/#{post.id}/edit' class='button tiny icon'>
                          <img src='#{window.image_path('edit-icon.svg')}' class='ty-icon'/>
                        </a>
                        """)

              layer_0 = window.layers[0]
              layer_0.addLayer(marker)
              layer_0.addTo(map)

            #window.layers.push(layer)
#
#          window.layers = (value for _,value of window.layers.reduce ((arr,value) -> arr[value.community_id] = value; arr),{})


  set_post_markers: (map, map_class) ->
    path = 'post'
    map_helpers.marker_filter(map, 'post', 'posts')
    map_helpers.new_location_popup(map, path)

    url = "/api#{location.pathname}"

    $.ajax
      url: url
      dataType: "JSON"
      success: (data, status, jqXHR) ->

        if data.locations.length > 0
          # Now that we have the Post Locations center map on the first location and zoom.
          $('#map').remove()
          $('.map-container').append("<div id='map' class='#{map_class}'></div>")
          map = initialize_map(data.locations[0].lat, data.locations[0].lon, 17)
          map_helpers.new_location_popup(map, path)

        # Update existing Location/s.
        for loc in data.locations
          marker = new L.Marker([loc.lat, loc.lon], {
            draggable: true,
            title: loc.name,
            riseOnHover: true,
            icon: divDefaultIcon
          })
          marker.addTo(map).bindPopup("<h5>#{loc.name}</h5>")
          marker['loc_id'] = loc.id

          marker.on "dragend", (e) ->
            map_helpers.marker_drop(e, this, loc, data.id)

  set_default_markers: (map, model, models) ->
    map_helpers.marker_filter(map, model, models)
    map_helpers.new_location_popup(map, model)

    url = "/api#{location.pathname}"

    $.ajax
      url: url
      dataType: "JSON"
      success: (data, status, jqXHR) ->
        # Now that we have the Post Locations center map on the first location and zoom.
        if data.hasOwnProperty('location')
          $('#map').remove()
          $('.map-container').append("<div id='map' class='#{model}-map'></div>")
          map = initialize_map(data.location.lat, data.location.lon, 17)

          loc = data.location
          marker = new L.Marker([loc.lat, loc.lon], {
            draggable: true,
            title: loc.name,
            riseOnHover: true,
            icon: divDefaultIcon
          })
          marker.addTo(map).bindPopup("<h5>#{loc.name}</h5><h4>#{data.title}<p>#{marked(data.description)}</p>")
          marker['loc_id'] = loc.id

          marker.on "dragend", (e) ->
            map_helpers.marker_drop(e, this, loc, data.id)


  form_map: (type, form_tag) ->
    # Lookup Location by name and set hidden fields.
    action_name = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)

    if action_name == 'new'
      $('.location-button').on 'click', (e) ->
        e.preventDefault();

        $loc_input = $('.new-location')

        if $loc_input.val() != ''
          $.get('/api/locations/show?name=' + $loc_input.val()).success (data) ->
            #console.log(data)

            # Append the latitude and longitude fields to the form.
            if $('.form-lat').length && $('.form-lon').length
              $('.form-lat').val(data.location.lat)
              $('.form-lon').val(data.location.lon)
            else
              $(form_tag).append("""
                 <input value='#{data.location.lat}' type='hidden' name='#{type}[lat]' id='#{type}_lat' class='form-lat' />
                 <input value='#{data.location.lon}' type='hidden' name='#{type}[lon]' id='#{type}_lon' class='form-lon' />
                 """)

            # Show and initialize the map, then add a marker.
            if $('#map').is(':hidden')
              $('.map-row').toggle()
            else
              $('#map').remove()
              $('.map-container').append('<div id="map" class="new-post-map"></div>')


            # Update the input value if name is set.
            if data.location.name != ''
              $loc_input.val(data.location.name)
              map = initialize_map(data.location.lat, data.location.lon, 17)
            else
              map = initialize_map(data.location.lat, data.location.lon, 12)

            marker = new L.Marker([data.location.lat, data.location.lon], {
              draggable: true,
              title: data.location.name,
              riseOnHover: true,
              icon: divDefaultIcon
            })
            marker.bindPopup("<h4>#{data.location.name}</h4>").openPopup()
            map.addLayer(marker);

            marker.on "dragend", (e) ->
              map_helpers.new_form_marker_drop(e, marker, $loc_input)


@initialize_map = (lat = 36.2168253, lon = -81.6824657, zoom = 13) ->
  # Initialize the Open Street Map map.
  window.map = new L.Map('map');

  # Create the tile layer with correct attribution.
  #
  # Need to figure out how to use our own service for the tile PNG files.
  # If at any way possible.
  #
  osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  osm = new L.TileLayer(osmUrl, {minZoom: 6, maxZoom: 19, attribution: osmAttrib});

  # Start the map over Boone, Appalachina Street to be exact.
  window.map.setView(new L.LatLng(lat, lon), zoom);
  window.map.addLayer(osm);

  # Set the marker icon to custom SVG.
  @divDefaultIcon = L.divIcon({
    className: 'marker-div-icon',
    html: get_svg('#632816', 30, 55),
    popupAnchor: [-9, -53],
    iconAnchor: [20, 55],
  });

  return window.map
