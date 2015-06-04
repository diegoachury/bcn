# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
#$(document).ready ->


window.ready_home = ->
  initialize_map = ->
    # Initialize the Open Street Map map.
    map = new L.Map('map');

    # Create the tile layer with correct attribution.
    osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    osm = new L.TileLayer(osmUrl, {minZoom: 6, maxZoom: 19, attribution: osmAttrib});

    # Start the map over Boone, Appalachina Street to be exact.
    map.setView(new L.LatLng(36.2168253, -81.6824657), 15);
    map.addLayer(osm);
    return map

  try
    map = initialize_map()
  catch
    return

  # Add all event pop-ups if on the home page else just add the specific post.
  if location.pathname == '/home'
    post_path = 'home'
    url = "/api/communities"
  else
    post_path = 'post'
    url = "/api#{location.pathname}"

  $.ajax
    url: url
    dataType: "JSON"
    success: (data, status, jqXHR) ->
#      console.log(data)
#      console.log(Object.prototype.toString.call(data))

      # If Main page array of objects is returned else add the edit functionality.
      if Object.prototype.toString.call(data) == '[object Array]'
        window.layers = []
        for community in data
          #L.marker([post.location.lat, post.location.lon], {draggable:false}).addTo(map)
          #  .bindPopup("<h3>#{post.title}</h3><p>#{post.description}</p>");
          markers = []
          for post in community.posts
            # Create markers for each post.
            #console.log(post, community.name)
            for loc in post.locations
              marker = new L.Marker([loc.lat, loc.lon], {
                draggable: false,
                title: data.title,
                riseOnHover: true,
              })
              marker.bindPopup("<h3>#{post.title}</h3><p>#{post.description}</p>")
              markers.push(marker)

          # Create a layerGroup for each Community.
          layer = L.layerGroup(markers)
          layer.community_id = "community_" + community.id
          layer.onMap = true
          layer.addTo(map);

          window.layers.push(layer)

          #comLayer = L.layerGroup(markers)
          #overlayMaps[community] = comLayer

        #L.control.layers(overlayMaps).addTo(map);
      else
        try
          # Update existing Location/s.
          for loc in data.locations
            marker = new L.Marker([loc.lat, loc.lon], {
              draggable: true,
              title: loc.name,
              riseOnHover: true,
            })
            marker.addTo(map).bindPopup("<h5>#{loc.name}</h5><h4>#{data.title}<p>#{data.description}</p>")
            marker['loc_id'] = loc.id
            #console.log(marker)

            marker.on "dragend", (e) ->
              markerDrop(e, this, loc, data.id)


        catch error
          # If no location set for post allow marker to be set.
          map.on "click", (e) ->
              set_coord = e.latlng;

              marker = new L.Marker([set_coord.lat, set_coord.lng], {
                draggable: true,
              });
              map.addLayer(marker);

              # Update Post location.
              $.ajax
                url: '/api' + location.pathname + '/locations'
                dataType: "JSON"
                type: "post"
                data: "location[lat]=#{set_coord.lat}&location[lon]=#{set_coord.lng}&location[post_id]=#{data.id}"
                success: (data, status, jqXHR) ->
                  console.log(data)

                  marker.bindPopup("Location Set to:<br/> #{data.location.name}").openPopup();

                  # Update the location name, address, etc.
                  updated_location = """#{data.location.name} <br/> #{data.location.address}
                  #{data.location.city} #{data.location.state} #{data.location.postcode}"""
                  $("#location_" + data.location.id).html(updated_location)


  # Bind clicks to new marker on the main map, if marker is already there update it.
  marker = undefined
  map.on "click", (e) ->
    coord = e.latlng;
    window.coord = coord

    if post_path == 'home'
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
        marker = new L.Marker(e.latlng);
        map.addLayer(marker);
    else
        marker.setLatLng(e.latlng)

    marker.bindPopup(markerHtml).openPopup()

  map.on 'popupopen', (e) ->
    $('#new_location').on 'click', (e) ->
      e.preventDefault()
      console.log('new_location clicked...')
#      console.log(window.coord)
      $.ajax
        url: "/api#{location.pathname}/locations"
        dataType: "JSON"
        type: "post"
        data: "location[lat]=#{coord.lat}&location[lon]=#{coord.lng}"
        success: (data, status, jqXHR) ->
          console.log(data)

          # Update the popup.
          data.locations.sort()
          new_loc = data.locations[data.locations.length-1]
          marker.bindPopup("Location Set to:<br/> #{new_loc.name}").openPopup();

          # Update the Locations <ul>.
          new_loc_html = """<li>
                            <span id="location_#{new_loc.id}">
                            <strong>#{new_loc.name}</strong>
                            <br/>
                            #{new_loc.address}
                            #{new_loc.city} #{new_loc.state} #{new_loc.postcode}
                            </span>
                            <a class="button alert tiny remove_location icon"
                                title="Remove Location"
                                data-sweet-alert-confirm="Are you sure?"
                                rel="nofollow" data-method="delete"
                                href="/posts/#{data.post.id}/locations/#{new_loc.id}">
                              <img class="icon" src="/assets/trash-icon.svg" alt="Trash icon">
                            </a>
                            </li>
                         """
          if ($('#post_' + data.post.id).length)
            $('#post_' + data.post.id).append(new_loc_html)
          else
            $('#no-locations').replaceWith(new_loc_html)
            Turbolinks.visit(window.location)


  # Remove all markers not in button's community.
  $('.community').on "click", (e) ->

    toggleLayers = $.grep window.layers, (layer) ->
      return layer.community_id != e.target.id;

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
  $('.all_communities').on "click", (e) ->
    for layer in window.layers
      layer.onMap = true
      map.addLayer(layer)


  markerDrop = (e, marker, loc, post_id) ->
    drop_coord = e.target._latlng

    # Send an $.ajax request to update the location.
    $.ajax
      url: '/api' + location.pathname + '/locations/' + marker.loc_id
      dataType: "JSON"
      type: "patch"
      data: "location[lat]=#{drop_coord.lat}&location[lon]=#{drop_coord.lng}&location[post_id]=#{post_id}"
      success: (updated_data, status, jqXHR) ->
        console.log(updated_data)

        # Flash a message either on the marker.
        marker.bindPopup("Location updated to:<br/> #{updated_data.location.name}").openPopup();

        # Update the location name, address, etc.
        updated_location = """#{updated_data.location.name} <br/> #{updated_data.location.address}
                    #{updated_data.location.city} #{updated_data.location.state} #{updated_data.location.postcodee}"""
        $("#location_" + marker.loc_id).html(updated_location)



# Fire the ready function on load and refresh.
$(document).ready(window.ready_home)
$(document).on('page:load', window.ready_home)
