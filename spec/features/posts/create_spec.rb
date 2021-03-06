require 'rails_helper'

describe "Creating posts" do
  let(:user) { create(:user) }
  let(:bcn) { Community.create(name: 'Boone Community Network', description: 'We are all part of the Boone community!')}

  it "redirects to the post list index page on success", :js => true do
    create_post
    expect(page).to have_content("My Post")
  end

  it "succeeds when creating a post by clicking on the map then the New Post popup link", :js => true do
    visit "/home"
    find("#map").click

    expect(page).to have_content("New Post")
    find("#new_post").click

    fill_in "Title", with: "My Location Post"
    page.execute_script("window.post_editor.codemirror.setValue('Great new post.')")

    click_button "Save Post"
    expect(page).to have_content("My Location Post")
  end

  it "success when creating a post with a community", :js => true do
    admin = User.create({ :email => 'bill@thehoick.com', :password => 'beans' })
    Role.create(name: 'admin', user: admin)
    sign_in admin, password: 'beans'
    create_community
    expect(page).to have_content('Community was successfully created.')

    visit "/posts"
    click_link "New Post"
    expect(page).to have_content("New Post")

    fill_in "Title", with: "My Location Post"
    #fill_in "What's happening?", with: "Great new post."
    page.execute_script("window.post_editor.codemirror.setValue('Great new post.')")

    communites_field = find('input.default')
    communites_field.set('Boone Community Network')
    communites_field.native.send_key(:Enter)
    click_button "Save Post"
    post = Post.last

    expect(page).to have_content("Great new post.")
    expect(post.communities.count).to eq(1)
  end

  it 'creates a post for the current user', :js => true do
    user = create(:user)
    sign_in(user, {password: 'beans'})
    create_post

    expect(Post.last.user).to eq(user)
  end

  # Run with: bin/rspec ./spec/features/posts/create_spec.rb -t visual -t firefox
  it 'creates a post with many locations', :js => true, :visual => true, :firefox => true do
    user = create(:user)
    sign_in(user, {password: 'beans'})

    visit "/home"
    find("#map").click

    expect(page).to have_content("New Post")
    find("#new_post").click

    fill_in "Title", with: "My Location Post"
    page.execute_script("window.post_editor.codemirror.setValue('Great new post.')")

    click_button "Save Post"
    expect(page).to have_content("My Location Post")
    post = Post.last

    sleep(0.3)
    find("#map").click
    #puts page.body
    sleep(0.3)

    expect(page).to have_content("Add Location")
    find("#new_location").click
    sleep(1)
    expect(post.locations.count).to eq(2)
  end

  it 'creates a post with as an event', :js => true do
    user = create(:user)
    sign_in(user, {password: 'beans'})

    visit '/posts'
    click_link 'New Post'
    expect(page).to have_content('New Post')

    fill_in 'Title', with: 'Event Post'
    page.execute_script("window.post_editor.codemirror.setValue('This is a great event!')")
    find('#post_start_date').set('2015-05-25')
    find('#post_start_time').set('05:05')
    find('#post_end_date').set('2015-05-25')
    find('#post_end_time').set('06:05')

    click_button 'Save Post'
    post = Post.last

    expect(post.start_date).to eq(Date.parse('2015-05-25'))
    expect(post.end_date).to eq(Date.parse('2015-05-25'))
    expect((post.start_time).to_s(:time)).to eq('05:05')
    expect((post.end_time).to_s(:time)).to eq('06:05')
  end

  it 'creates a post with a event date selected using the javascript helpers', :js => true do
    user = create(:user)
    sign_in(user, {password: 'beans'})

    visit '/home'
    find('#map').click

    expect(page).to have_content('New Post')
    find('#new_post').click

    fill_in 'Title', with: 'My Location Post'
    page.execute_script("window.post_editor.codemirror.setValue('Great new post.')")


    #find(:css, '#event').set(true)
    find(:css, '#post_start_date').click
    first('.day').click

    find(:css, '#post_start_time').click
    first('.clockpicker-tick').click
    first('.clockpicker-minutes .clockpicker-tick').click

    find(:css, '#post_end_date').click
    first('.day').click

    find(:css, '#post_end_time').click
    first('.clockpicker-tick').click
    first('.clockpicker-minutes .clockpicker-tick').click

    click_button 'Save Post'
    expect(page).to have_content("My Location Post")
  end

  it 'gets Open Graph data after leaving the web link field', :js => true do
    sign_in user, password: 'beans'

    find('.new-post').click
    expect(page).to have_content('New Post')

    fill_in 'Link http://...', with: 'http://google.com'
    find('.main').click

    sleep(0.3)
    expect(page).to have_content("Search the world's information, including webpages, images, videos and more.
                                  Google has many special features to help you find exactly what you're looking for.")

    click_button "Save Post"
    expect(find('.og-url')[:href]).to eq('http://google.com')
  end

  it 'uploads photo file and displays attached pic' do
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    visit '/'
    find('.new-post').click
    expect(page).to have_content('New Post')

    attach_file('post[image]', Rails.root.join('app/assets/images/test_avatar.jpg'))
    click_button 'Save Post'

    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length
    post = Post.last

    expect(find('.post-image')[:src]).to eq(post.image.url)
    expect(file_count).to be < new_file_count
  end

  it 'uploads audio file and displays HTML5 player' do
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    visit '/'
    find('.new-post').click
    expect(page).to have_content('New Post')

    attach_file('post[audio]', Rails.root.join('spec/fixtures/files/resisters_15_s.ogg'))
    click_button 'Save Post'

    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length
    post = Post.last

    expect(find('audio')[:src]).to eq(post.audio.url)
    expect(file_count).to be < new_file_count
  end

  it 'posts as organization', :js => true do
    sign_in user, password: 'beans'
    create_organization

    visit '/posts'
    click_link 'New Post'
    expect(page).to have_content('New Post')

    fill_in 'Title', with: 'Organization Post'
    page.execute_script("window.post_editor.codemirror.setValue('Good things from the organization.')")

    find('#post_organization_id').find(:xpath, 'option[2]').select_option

    click_button 'Save Post'

    post = Post.last
    expect(post.organization.name).to eq('BCN')
    expect(page).to have_content('BCN')
  end
end
