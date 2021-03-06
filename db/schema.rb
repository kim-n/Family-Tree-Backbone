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

ActiveRecord::Schema.define(version: 20141023025038) do

  create_table "people", force: true do |t|
    t.string   "name",                default: "Unknown", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tree_id",                                 null: false
    t.integer  "parents_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "people", ["tree_id"], name: "index_people_on_tree_id"

  create_table "spouseships", force: true do |t|
    t.integer  "spouse_one_id", null: false
    t.integer  "spouse_two_id", null: false
    t.integer  "tree_id",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "spouseships", ["tree_id"], name: "index_spouseships_on_tree_id"

  create_table "trees", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    null: false
    t.integer  "head_id"
  end

  add_index "trees", ["name", "user_id"], name: "index_trees_on_name_and_user_id"
  add_index "trees", ["user_id"], name: "index_trees_on_user_id"

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
