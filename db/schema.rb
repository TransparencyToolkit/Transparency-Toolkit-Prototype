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

ActiveRecord::Schema.define(version: 20140502161354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "plugin_call_fields", force: true do |t|
    t.string   "name"
    t.string   "field_type"
    t.boolean  "required"
    t.integer  "plugin_call_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "test"
  end

  add_index "plugin_call_fields", ["plugin_call_id"], name: "index_plugin_call_fields_on_plugin_call_id", using: :btree

  create_table "plugin_calls", force: true do |t|
    t.string   "call"
    t.string   "details"
    t.string   "what"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "category"
  end

  create_table "recipes", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "steps", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "properties"
    t.integer  "recipe_id"
    t.string   "file"
    t.string   "Step"
    t.string   "docfile"
    t.integer  "plugin_call_id"
  end

  add_index "steps", ["plugin_call_id"], name: "index_steps_on_plugin_call_id", using: :btree
  add_index "steps", ["recipe_id"], name: "index_steps_on_recipe_id", using: :btree

end
