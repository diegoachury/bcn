# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150520194313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "communities", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "home_page"
    t.string   "color"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "posts"
    t.datetime "deleted_at"
    t.integer  "users"
    t.integer  "created_by"
    t.string   "events_url"
    t.string   "events_sync_type"
  end

  add_index "communities", ["deleted_at"], name: "index_communities_on_deleted_at", using: :btree
  add_index "communities", ["events_sync_type"], name: "index_communities_on_events_sync_type", using: :btree
  add_index "communities", ["name"], name: "index_communities_on_name", unique: true, using: :btree

  create_table "communities_posts", id: false, force: :cascade do |t|
    t.integer "post_id"
    t.integer "community_id"
  end

  add_index "communities_posts", ["community_id"], name: "index_communities_posts_on_community_id", using: :btree
  add_index "communities_posts", ["post_id"], name: "index_communities_posts_on_post_id", using: :btree

  create_table "communities_users", force: :cascade do |t|
    t.integer "community_id"
    t.integer "user_id"
  end

  add_index "communities_users", ["community_id"], name: "index_communities_users_on_community_id", using: :btree
  add_index "communities_users", ["user_id"], name: "index_communities_users_on_user_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.integer  "post_id"
    t.float    "lat"
    t.float    "lon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "postcode"
    t.string   "county"
    t.string   "country"
    t.datetime "deleted_at"
  end

  add_index "locations", ["deleted_at"], name: "index_locations_on_deleted_at", using: :btree
  add_index "locations", ["name"], name: "index_locations_on_name", using: :btree
  add_index "locations", ["post_id"], name: "index_locations_on_post_id", using: :btree

  create_table "logs", force: :cascade do |t|
    t.integer  "post_id"
    t.integer  "location_id"
    t.integer  "community_id"
    t.string   "action"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
  end

  add_index "logs", ["community_id"], name: "index_logs_on_community_id", using: :btree
  add_index "logs", ["location_id"], name: "index_logs_on_location_id", using: :btree
  add_index "logs", ["post_id"], name: "index_logs_on_post_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "communities"
    t.datetime "deleted_at"
    t.integer  "user_id"
    t.date     "start_date"
    t.date     "end_date"
    t.time     "start_time"
    t.time     "end_time"
  end

  add_index "posts", ["deleted_at"], name: "index_posts_on_deleted_at", using: :btree
  add_index "posts", ["title"], name: "index_posts_on_title", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "username"
    t.string   "password_reset_token"
    t.integer  "communities"
    t.datetime "deleted_at"
    t.string   "facebook_id"
    t.string   "photo"
    t.time     "event_sync_time"
    t.string   "merge_token"
    t.string   "twitter_id"
    t.string   "twitter_token"
    t.string   "twitter_secret"
    t.string   "twitter_link"
    t.string   "facebook_link"
    t.string   "google_link"
    t.string   "google_id"
    t.string   "google_token"
  end

  add_index "users", ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["facebook_id"], name: "index_users_on_facebook_id", using: :btree
  add_index "users", ["google_id"], name: "index_users_on_google_id", using: :btree
  add_index "users", ["merge_token"], name: "index_users_on_merge_token", using: :btree
  add_index "users", ["password_reset_token"], name: "index_users_on_password_reset_token", using: :btree
  add_index "users", ["twitter_id"], name: "index_users_on_twitter_id", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  add_foreign_key "communities", "users", column: "created_by"
  add_foreign_key "locations", "posts"
  add_foreign_key "logs", "communities"
  add_foreign_key "logs", "locations"
  add_foreign_key "logs", "posts"
end
