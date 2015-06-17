require 'rails_helper'

describe 'Subscribing to Community' do
  let(:user) { create(:user) }
  let(:user2) { create(:user) }

  let!(:post) { Post.create(title: "Great Post", description: "Great job!") }

  it 'subscribes user to community', :js => true do
    sign_in user, password: 'beans'
    create_community
    community = Community.last

    click_link 'Log Out'
    sign_in user2, password: 'beans'

    visit "/communities/#{community.slug}"
    #sleep(5)

    expect(page).to have_content('Boone Community Network')

    find('.community-subscribe').click
    sleep(0.3)

    expect(community.subscribers[0].user).to eq(user2)
  end

  it 'unsubscribes user from community', :js => true do
    sign_in user, password: 'beans'
    create_community
    community = Community.last

    click_link 'Log Out'
    sign_in user2, password: 'beans'

    visit "/communities/#{community.slug}"
    #sleep(5)

    expect(page).to have_content('Boone Community Network')

    find('.community-subscribe').click
    sleep(0.3)
    expect(community.subscribers[0].user).to eq(user2)

    find('.community-subscribe').click
    sleep(0.3)
    expect(community.subscribers.count).to eq(0)
  end

  it 'send email to subscribers when new post is created', :js => true do
    sign_in user, password: 'beans'
    create_community
    community = Community.last

    click_link 'Log Out'
    sign_in user2, password: 'beans'

    visit "/communities/#{community.slug}"
    #sleep(5)

    expect(page).to have_content('Boone Community Network')

    find('.community-subscribe').click
    sleep(0.3)
    expect(community.subscribers[0].user).to eq(user2)

    click_link 'Log Out'
    sign_in user, password: 'beans'

    visit "/posts"
    click_link "New Post"
    expect(page).to have_content("New Post")

    fill_in "Title", with: "My Location Post"
    fill_in "What's on your mind?", with: "Great new post."

    fill_in 'Communities (in a comma separated list)', with: 'Boone Community Network'
    click_button "Save Post"
    sleep(1)

    expect(page).to have_content("Great new post.")
    open_email(user2.email)
    expect(current_email.body).to have_content('Great new post')
  end
end