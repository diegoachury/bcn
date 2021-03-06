require 'rails_helper'

describe 'Adding locations' do
  #Kenneth E. Peacock Hall, 416, Howard Street, Boone, Watauga County, North Carolina, 28608,
  # United States of America (university) 36.21640465, -81.6822303793054

  let(:user) { create(:user) }
  let!(:post) { Post.create(title: 'Locatinon Post', description: 'Great job location!') }
  let!(:location) { Location.new.create(
      lat: 36.21640465,
      lon: -81.6822303793054,
      posts: [post],
      name: 'Kenneth E. Peacock Hall',
      address: '416 Howard Street',
      city: 'Boone',
      state: 'NC',
      county: 'Watauga',
      country: 'us') }

  it 'is successful with valid content and correct log entry', :js => true do
    create_post_with_location

    click_link 'Locations'
    expect(page).to have_content('Kenneth E. Peacock Hall')
  end

  it 'is successful when adding a location to a post without a location', :js => true do
    sign_in user, password: 'beans'

    visit('/posts/new')

    fill_in 'Title', with: 'My Non-Location Post'
    page.execute_script("window.post_editor.codemirror.setValue('Great new post Non-Located.')")
    click_button 'Save Post'

    expect(page).to have_content('Post was successfully created.')

    find('#map').click
    find("#new_location").click
    sleep(1)

    click_link 'Locations'
    expect(page).to have_content('Kenneth E. Peacock Hall')
  end
end
