require 'rails_helper'

describe 'Adding organizations' do
  let(:user) { create(:user) }

  it 'is successful with valid content', :js => true do
    sign_in user, password: 'beans'
    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#222222'
    click_button 'Save Organization'

    expect(page).to have_content('BCN Rulez!')
  end

  it 'requires login to create' do
    visit('/organizations/new')

    expect(page).to have_content('You must be logged in to view that page.')
  end

  it 'adds leader role to created_by user', :js => true do
    sign_in user, password: 'beans'
    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#222222'
    click_button 'Save Organization'

    leader = User.find(Organization.last.created_by)

    expect(leader.role).to eq('leader')
  end

  it 'is able to add and display pic', :js => true do
    sign_in user, password: 'beans'

    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#222222'

    attach_file('organization[image]', Rails.root.join('app/assets/images/test_avatar.jpg'))

    click_button 'Save Organization'

    organization = Organization.last
    expect(find('.organization-image')[:src]).to eq(organization.image.url)
  end

  it 'shows social icons when social links are set', :js => true do
    sign_in user, password: 'beans'

    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')
    fill_in 'http://facebook_page', with: 'https://www.facebook.com/pages/Boone-Community-Network/334012336716987?fref=ts'
    fill_in 'http://twitter_page', with: 'https://twitter.com/asommer'
    fill_in 'http://google_plus_page', with: 'https://plus.google.com/108906335613240420220/about'
    fill_in 'Color', with: '#222222'


    click_button 'Save Organization'

    organization = Community.last
    within 'div.social' do
      expect(find(:xpath, "//a/img[@alt='Facebook icon']/..")).to be_truthy
      expect(find(:xpath, "//a/img[@alt='Twitter icon']/..")).to be_truthy
      expect(find(:xpath, "//a/img[@alt='Google icon']/..")).to be_truthy
    end
  end

  it 'sets the color using the color picker', :js => true do
    sign_in user, password: 'beans'

    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')

    find('#organization_color').click
    sleep(0.3)
    find('.colpick_color_overlay2').click
    find('.colpick_submit').click

    click_button 'Save Organization'

    organization = Organization.last
    expect(organization.color).to eq('#406580')
  end

  it 'sets a default location for a community', :js => true do
    sign_in user, password: 'beans'

    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')


    fill_in 'Default Location', with: 'Watauga Library'
    click_link 'Search'
    sleep(2)
    click_button 'Save Organization'

    organization = Organization.last
    expect(organization.location.name).to eq('Watauga County Public Library')
  end

  it 'uses the markdown editor to add a description', :js => true do
    sign_in user, password: 'beans'

    visit('/organizations/new')

    fill_in 'Name', with: 'BCN'
    page.execute_script("window.desc_editor.codemirror.setValue('BCN Rulez!')")
    find('#organization_web_url').set('http://boonecommunitynetwork.com')
    fill_in 'Color', with: '#222222'
    click_button 'Save Organization'

    expect(page).to have_content('BCN Rulez!')
  end
end