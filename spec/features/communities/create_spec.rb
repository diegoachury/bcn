require 'rails_helper'

describe 'Adding communities' do
  let(:user) { create(:user) }

  it 'is successful with valid content' do
    sign_in user, password: 'beans'
    create_community
    community = Community.last

    expect(page).to have_content("Boone Community Network")
    expect(page).to have_content('Community was successfully created.')
    expect(community.created_by).to eq(user.id)
  end

  it 'is able to add and display pic' do
    sign_in user, password: 'beans'

    visit('/communities/new')

    fill_in 'Name', with: 'Boone Community Network'
    fill_in 'Description', with: "We're all part of the Boone community!"
    find('#community_home_page').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#000000'

    attach_file('community[image]', Rails.root.join('app/assets/images/test_avatar.jpg'))

    click_button 'Save Community'

    community = Community.last
    expect(find('.community-image')[:src]).to eq(community.image.url)
  end

  it 'shows social icons when social links are set' do
    sign_in user, password: 'beans'

    visit('/communities/new')

    fill_in 'Name', with: 'Boone Community Network'
    fill_in 'Description', with: "We're all part of the Boone community!"
    find('#community_home_page').set('http://boonecommunitynetwork.com')
    fill_in 'http://facebook_page', with: 'https://www.facebook.com/pages/Boone-Community-Network/334012336716987?fref=ts'
    fill_in 'http://twitter_page', with: 'https://twitter.com/asommer'
    fill_in 'http://google_plus_page', with: 'https://plus.google.com/108906335613240420220/about'
    fill_in 'Color', with: '#000000'

    attach_file('community[image]', Rails.root.join('app/assets/images/test_avatar.jpg'))

    click_button 'Save Community'

    community = Community.last
    expect(find('.community-image')[:src]).to eq(community.image.url)

    within 'div.social' do
      expect(find(:xpath, "//a/img[@alt='Facebook icon']/..")).to be_truthy
      expect(find(:xpath, "//a/img[@alt='Twitter icon']/..")).to be_truthy
      expect(find(:xpath, "//a/img[@alt='Google icon']/..")).to be_truthy
    end
  end

  it 'sets the color using the color picker', :js => true do
    sign_in user, password: 'beans'

    visit('/communities/new')

    fill_in 'Name', with: 'Boone Community Network'
    find('.CodeMirror-code').set("We're all part of the Boone community!")

    find('#community_color').click
    sleep(0.3)
    find('.colpick_color_overlay2').click
    find('.colpick_submit').click

    click_button 'Save Community'

    community = Community.last
    expect(community.color).to eq('#406580')
  end

  it 'sets a default location for a community', :js => true do
    sign_in user, password: 'beans'

    visit('/communities/new')

    fill_in 'Name', with: 'Boone Community Network'
    find('.CodeMirror-code').set("We're all part of the Boone community!")

    fill_in 'Default Location', with: 'Watauga Library'
    click_link 'Search'
    sleep(2)
    click_button 'Save Community'

    community = Community.last
    expect(community.location.name).to eq('Watauga County Public Library')
  end

  it 'uses the markdown editor to add a description' do
    pending 'Need to fidn a way to add text to the Lepture Editor using Capybara.'

    visit('/communities/new')

    fill_in 'Name', with: 'Boone Community Network'
    fill_in 'Description', with: "We're all part of the Boone community!"
    find('#community_home_page').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#000000'
    click_button 'Save Community'

    # Until there's a better way to set text with Selenium on the Lepture Editor...
    # community = Community.last
    # community.description = "We're all part of the Boone community!"
    # community.save
    # page.driver.browser.navigate.refresh
  end
end