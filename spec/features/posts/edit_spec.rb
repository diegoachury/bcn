require 'rails_helper'

describe "Editing posts" do

  context 'authenticated' do
    let!(:user) { create(:user) }
    before do
      sign_in(user, {password: 'beans'})
    end
    let!(:post) { Post.create(title: "Great Post", description: "Great job!", user_id: user.id) }

    it "upates a post successfully with correct information" do
      update_post(title: "Great New Title", description: "Great New Job! and stuff...", post: post)

      post.reload

      expect(page).to have_content("Post was successfully updated")
      expect(post.title).to eq("Great New Title")
      expect(post.description).to eq("Great New Job! and stuff...")
    end

    it 'updates the event fields' do
      update_post(start_date: '2015-05-25', start_time: '05:05', end_date: '2015-05-25', end_time: '07:05', post: post)

      post.reload

      expect(post.start_date).to eq(Date.parse('2015-05-25'))
      expect(post.end_date).to eq(Date.parse('2015-05-25'))
      expect((post.start_time).to_s(:time)).to eq('05:05')
      expect((post.end_time).to_s(:time)).to eq('07:05')
    end
  end

  context 'authenticated non-post user' do
    let!(:post) { Post.create(title: "Great Post", description: "Great job!") }

    it 'edit button will not be displayed for non-post user' do
      user = User.create({email: 'bob@thehoick.com', password: 'beans'})
      sign_in(user, {password: 'beans'})

      visit '/posts'
      click_link 'Great Post'

      expect(page).to_not have_css('.post-edit')
    end
  end

  context 'unauthenticated' do
    it 'does not allow non-post user to edit post' do
      create_post
      visit "/posts/#{Post.last.id}/edit"

      expect(page).to have_content('You must be logged in to view that page.')
      expect(find_button('Log In').value).to eq('Log In')
    end
  end
end
