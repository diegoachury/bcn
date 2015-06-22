class HomeController < ApplicationController
  def index
  end

  def home
    @posts = Post.order('created_at DESC').all.limit(7)
    @communities = Community.all.popularity.limit(15)

    unless session[:facebbok_auth].nil? and current_user.nil?
      unless current_user.event_sync_time.nil?
        # Compare just the Time from the event_sync_time because the date is stored as 2000-01-01 in the database.
        if Time.parse(current_user.event_sync_time.to_s(:time)) + 1.hour < Time.now.utc
          FacebookSyncJob.perform_now(session[:facebook_auth], current_user)
        end
      end
    end
  end

  def who_we_are
  end

  def calendar
  end
end