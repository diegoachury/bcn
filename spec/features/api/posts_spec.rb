require 'rails_helper'

describe 'Posts API', :type => :api do
  let!(:new_post) { Post.create(title: 'Location Post', description: 'Great job location!') }
  let!(:user) { User.create(email: 'adam@thehoick.com', password: 'beans', first_name: 'Adam', last_name: 'Sommer')}


  it 'sends a list of posts' do

    get '/api/posts'

    expect(last_response.status).to eq(200)

    expect(json.length).to eq(1)
    expect(json[0]['title']).to eq('Location Post')
  end

  it 'shows post details' do

    get "/api/posts/#{new_post.id}"

    expect(last_response.status).to eq(200)

    expect(json['title']).to eq('Location Post')
  end

  it 'creates a post and has valid response' do
    post '/api/posts', format: :json, :post => {:title => 'JSON Post', :description => 'Great job JSON!'}

    expect(last_response.status).to eq(200)

    expect(json.length).to eq(3)
    expect(json['message']).to eq('Post created.')
    expect(json['post']['title']).to eq('JSON Post')
  end

  it 'creates a post with a user and has valid response' do
    basic_authorize(user.email, 'beans')

    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!'}

    expect(last_response.status).to eq(200)

    expect(json.length).to eq(3)
    expect(json['message']).to eq('Post created.')
    expect(json['post']['title']).to eq('JSON Post')
    expect(json['post']['user']['email']).to eq(user.email)
  end

  it 'updates a post and has valid response' do
    basic_authorize(user.email, 'beans')
    post2 = Post.create(title: 'Location Post', description: 'Great job location!', user: user)

    patch '/api/posts/' + post2.id.to_s, format: :json, :post => {:title => 'JSON Updated Post',
                                                                     :description => 'Great job JSON!'}

    expect(last_response.status).to eq(200)

    expect(json.length).to eq(4)
    expect(json['message']).to eq('Post updated.')
    expect(json['post']['title']).to eq('JSON Updated Post')
  end

  it 'deletes a post and has valid response' do
    basic_authorize(user.email, 'beans')
    post2 = Post.create(title: 'Location Post', description: 'Great job location!', user: user)

    delete '/api/posts/' + post2.id.to_s, format: :json

    expect(last_response.status).to eq(200)

    expect(json.length).to eq(1)
    expect(json['message']).to eq('Post deleted.')
  end

  it 'will not update post if not logged in as non-post user' do
    post '/api/posts', format: :json, :post => {:title => 'Location Post', :description => 'Great job location!'}
    post2 = Post.last

    user2 = User.create(email: 'cheese@thehoick.com', password: 'beans')
    basic_authorize(user2.email, 'beans')

    patch '/api/posts/' + post2.id.to_s, format: :json, :post => {:title => 'JSON Updated Post',
                                                                  :description => 'Great job JSON!'}

    expect(last_response.status).to eq(404)
  end

  it 'creates a post with one location' do
    basic_authorize(user.email, 'beans')
    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!',
                                                :user_id => user.id,
                                                :lat => 36.2168215386211,
                                                :lon => -81.682448387146}
    expect(last_response.status).to eq(200)

    expect(json.length).to eq(3)
    expect(json['message']).to eq('Post created.')
    expect(json['post']['title']).to eq('JSON Post')
    expect(json['post']['locations'][0]['name']).to eq('Kenneth E. Peacock Hall')
  end

  it 'creates a post with multiple locations' do
    basic_authorize(user.email, 'beans')
    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!',
                                                :user_id => user.id,
                                                :lat => 36.2168215386211,
                                                :lon => -81.682448387146}
    expect(last_response.status).to eq(200)
    post = Post.last

    expect(json.length).to eq(3)
    expect(json['message']).to eq('Post created.')
    expect(json['post']['title']).to eq('JSON Post')
    expect(json['post']['locations'][0]['name']).to eq('Kenneth E. Peacock Hall')

    post "/api/posts/#{post.id}/locations", format: :json, :location => {lat: 36.2116343280817, lon: -81.685516834259}
    expect(last_response.status).to eq(200)
    loc_json ||= JSON.parse(last_response.body)

    expect(loc_json['post']['locations'][0]['name']).to eq('Kidd Brewer Stadium')
    expect(loc_json['post']['locations'][1]['name']).to eq('Kenneth E. Peacock Hall')
  end

  it 'creates a post with an event' do

    basic_authorize(user.email, 'beans')
    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!',
                                                :user_id => user.id,
                                                :lat => 36.2168215386211,
                                                :lon => -81.682448387146,
                                                :start_date => '2015-05-25',
                                                :start_time =>  '05:05',
                                                :end_date => '2015-05-25',
                                                :end_time =>  '06:05',
                                               }
    expect(last_response.status).to eq(200)

    expect(json.length).to eq(3)
    expect(json['message']).to eq('Post created.')
    expect(json['post']['locations'][0]['name']).to eq('Kenneth E. Peacock Hall')
    post = Post.last

    expect(post.start_date).to eq(Date.parse('2015-05-25'))
    expect(post.end_date).to eq(Date.parse('2015-05-25'))
    expect((post.start_time).to_s(:time)).to eq('05:05')
    expect((post.end_time).to_s(:time)).to eq('06:05')
  end

  it 'creates a post with a pic' do
    extend ActionDispatch::TestProcess
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    basic_authorize(user.email, 'beans')

    post '/api/posts', :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!',
                                                :user_id => user.id,
                                                :image =>  fixture_file_upload('files/test_avatar.jpg')
                     }

    expect(last_response.status).to eq(200)

    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length
    post = Post.last

    expect(post.image).to_not eq(nil)
    expect(post.image.name).to eq('test_avatar.jpg')
    expect(file_count).to be < new_file_count
  end

  it 'creates a post with an audio file' do
    extend ActionDispatch::TestProcess
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    basic_authorize(user.email, 'beans')

    post '/api/posts', :post => {:title => 'JSON Post',
                                 :description => 'Great job JSON!',
                                 :user_id => user.id,
                                 :image => fixture_file_upload('files/test_avatar.jpg'),
                                 :audio => fixture_file_upload('files/resisters_15_s.ogg')
                     }

    expect(last_response.status).to eq(200)

    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length
    post = Post.last

    expect(post.image).to_not eq(nil)
    expect(post.image.name).to eq('test_avatar.jpg')

    expect(post.audio).to_not eq(nil)
    expect(post.audio.name).to eq('resisters_15_s.ogg')
    expect(file_count).to be < new_file_count
  end

  it 'updates a post with an audio file' do
    extend ActionDispatch::TestProcess
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    basic_authorize(user.email, 'beans')

    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!'}

    expect(last_response.status).to eq(200)
    post = Post.last

    patch '/api/posts/' + post.id.to_s, :post => { :audio => fixture_file_upload('files/dickson.m4a') }

    expect(last_response.status).to eq(200)

    post.reload
    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    expect(post.audio).to_not eq(nil)
    expect(post.audio.name).to eq('dickson.m4a')
    expect(file_count).to be < new_file_count
  end

  it 'updates a post with an image file' do
    extend ActionDispatch::TestProcess
    FileUtils.rm_rf(Rails.root.join('public', 'system', 'test'))
    file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    basic_authorize(user.email, 'beans')

    post '/api/posts', format: :json, :post => {:title => 'JSON Post',
                                                :description => 'Great job JSON!'}

    expect(last_response.status).to eq(200)
    post = Post.last

    patch '/api/posts/' + post.id.to_s, :post => { :image => fixture_file_upload('files/bcn_logo.png') }

    expect(last_response.status).to eq(200)

    post.reload
    new_file_count = Dir[Rails.root.join('public', 'system', '**', '*')].length

    expect(post.image).to_not eq(nil)
    expect(post.image.name).to eq('bcn_logo.png')
    expect(file_count).to be < new_file_count
  end
end
