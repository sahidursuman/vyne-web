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

ActiveRecord::Schema.define(version: 20141112110934) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: true do |t|
    t.string   "street"
    t.string   "detail"
    t.string   "postcode"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "addresses", ["deleted_at"], name: "index_addresses_on_deleted_at", using: :btree
  add_index "addresses", ["detail"], name: "index_addresses_on_detail", using: :btree
  add_index "addresses", ["postcode"], name: "index_addresses_on_postcode", using: :btree

  create_table "addresses_users", id: false, force: true do |t|
    t.integer  "address_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "addresses_users", ["address_id"], name: "index_addresses_users_on_address_id", using: :btree
  add_index "addresses_users", ["deleted_at"], name: "index_addresses_users_on_deleted_at", using: :btree
  add_index "addresses_users", ["user_id"], name: "index_addresses_users_on_user_id", using: :btree

  create_table "agendas", force: true do |t|
    t.integer  "warehouse_id"
    t.integer  "day"
    t.integer  "opening"
    t.integer  "closing"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "agendas", ["closing"], name: "index_agendas_on_closing", using: :btree
  add_index "agendas", ["day"], name: "index_agendas_on_day", using: :btree
  add_index "agendas", ["opening"], name: "index_agendas_on_opening", using: :btree
  add_index "agendas", ["warehouse_id"], name: "index_agendas_on_warehouse_id", using: :btree

  create_table "allergies", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "allergies_wines", id: false, force: true do |t|
    t.integer  "allergy_id", null: false
    t.integer  "wine_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "allergies_wines", ["allergy_id"], name: "index_allergies_wines_on_allergy_id", using: :btree
  add_index "allergies_wines", ["wine_id"], name: "index_allergies_wines_on_wine_id", using: :btree

  create_table "appellations", force: true do |t|
    t.string   "name"
    t.string   "classification"
    t.integer  "region_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "appellations", ["deleted_at"], name: "index_appellations_on_deleted_at", using: :btree

  create_table "bottlings", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "bottlings", ["deleted_at"], name: "index_bottlings_on_deleted_at", using: :btree

  create_table "categories", force: true do |t|
    t.string   "name"
    t.integer  "price"
    t.string   "restaurant_price"
    t.text     "description"
    t.text     "summary"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "categories", ["deleted_at"], name: "index_categories_on_deleted_at", using: :btree

  create_table "composition_grapes", force: true do |t|
    t.integer  "composition_id"
    t.integer  "grape_id"
    t.integer  "percentage"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "composition_grapes", ["composition_id"], name: "index_composition_grapes_on_composition_id", using: :btree
  add_index "composition_grapes", ["deleted_at"], name: "index_composition_grapes_on_deleted_at", using: :btree
  add_index "composition_grapes", ["grape_id"], name: "index_composition_grapes_on_grape_id", using: :btree

  create_table "compositions", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "compositions", ["deleted_at"], name: "index_compositions_on_deleted_at", using: :btree

  create_table "countries", force: true do |t|
    t.string   "name"
    t.string   "alpha_2"
    t.string   "alpha_3"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "countries", ["deleted_at"], name: "index_countries_on_deleted_at", using: :btree

  create_table "food_items", force: true do |t|
    t.integer  "order_item_id"
    t.integer  "food_id"
    t.integer  "preparation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "food_items", ["deleted_at"], name: "index_food_items_on_deleted_at", using: :btree
  add_index "food_items", ["food_id"], name: "index_food_items_on_food_id", using: :btree
  add_index "food_items", ["order_item_id"], name: "index_food_items_on_order_item_id", using: :btree
  add_index "food_items", ["preparation_id"], name: "index_food_items_on_preparation_id", using: :btree

  create_table "foods", force: true do |t|
    t.string   "name"
    t.integer  "parent"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "foods", ["deleted_at"], name: "index_foods_on_deleted_at", using: :btree

  create_table "foods_wines", id: false, force: true do |t|
    t.integer  "food_id",    null: false
    t.integer  "wine_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "foods_wines", ["food_id"], name: "index_foods_wines_on_food_id", using: :btree
  add_index "foods_wines", ["wine_id"], name: "index_foods_wines_on_wine_id", using: :btree

  create_table "grapes", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "grapes", ["deleted_at"], name: "index_grapes_on_deleted_at", using: :btree

  create_table "inventories", force: true do |t|
    t.integer  "warehouse_id"
    t.integer  "wine_id"
    t.integer  "category_id"
    t.decimal  "cost"
    t.integer  "quantity"
    t.string   "vendor_sku"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "inventories", ["category_id"], name: "index_inventories_on_category_id", using: :btree
  add_index "inventories", ["deleted_at"], name: "index_inventories_on_deleted_at", using: :btree
  add_index "inventories", ["warehouse_id"], name: "index_inventories_on_warehouse_id", using: :btree
  add_index "inventories", ["wine_id"], name: "index_inventories_on_wine_id", using: :btree

  create_table "locales", force: true do |t|
    t.string   "name"
    t.integer  "subregion_id"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "locales", ["deleted_at"], name: "index_locales_on_deleted_at", using: :btree
  add_index "locales", ["subregion_id"], name: "index_locales_on_subregion_id", using: :btree

  create_table "mailing_lists", force: true do |t|
    t.string   "name"
    t.string   "key"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "mailing_lists", ["deleted_at"], name: "index_mailing_lists_on_deleted_at", using: :btree

  create_table "maturations", force: true do |t|
    t.integer  "bottling_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "maturations", ["bottling_id"], name: "index_maturations_on_bottling_id", using: :btree
  add_index "maturations", ["deleted_at"], name: "index_maturations_on_deleted_at", using: :btree

  create_table "occasions", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "occasions", ["deleted_at"], name: "index_occasions_on_deleted_at", using: :btree

  create_table "occasions_wines", id: false, force: true do |t|
    t.integer  "occasion_id", null: false
    t.integer  "wine_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "occasions_wines", ["occasion_id"], name: "index_occasions_wines_on_occasion_id", using: :btree
  add_index "occasions_wines", ["wine_id"], name: "index_occasions_wines_on_wine_id", using: :btree

  create_table "order_items", force: true do |t|
    t.integer  "order_id"
    t.integer  "wine_id"
    t.integer  "occasion_id"
    t.integer  "type_id"
    t.integer  "category_id"
    t.string   "specific_wine"
    t.integer  "quantity"
    t.decimal  "cost"
    t.decimal  "price"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "order_items", ["deleted_at"], name: "index_order_items_on_deleted_at", using: :btree
  add_index "order_items", ["occasion_id"], name: "index_order_items_on_occasion_id", using: :btree
  add_index "order_items", ["order_id"], name: "index_order_items_on_order_id", using: :btree
  add_index "order_items", ["type_id"], name: "index_order_items_on_type_id", using: :btree
  add_index "order_items", ["wine_id"], name: "index_order_items_on_wine_id", using: :btree

  create_table "orders", force: true do |t|
    t.integer  "warehouse_id"
    t.integer  "client_id"
    t.integer  "advisor_id"
    t.integer  "address_id"
    t.integer  "payment_id"
    t.integer  "status_id"
    t.string   "delivery_token"
    t.json     "information"
    t.json     "delivery_status"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.json     "delivery_quote"
    t.datetime "deleted_at"
    t.string   "charge_id"
    t.string   "refund_id"
  end

  add_index "orders", ["address_id"], name: "index_orders_on_address_id", using: :btree
  add_index "orders", ["advisor_id"], name: "index_orders_on_advisor_id", using: :btree
  add_index "orders", ["client_id"], name: "index_orders_on_client_id", using: :btree
  add_index "orders", ["deleted_at"], name: "index_orders_on_deleted_at", using: :btree
  add_index "orders", ["payment_id"], name: "index_orders_on_payment_id", using: :btree
  add_index "orders", ["status_id"], name: "index_orders_on_status_id", using: :btree
  add_index "orders", ["warehouse_id"], name: "index_orders_on_warehouse_id", using: :btree

  create_table "payments", force: true do |t|
    t.integer  "user_id"
    t.integer  "brand"
    t.string   "number"
    t.string   "stripe_card_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "payments", ["deleted_at"], name: "index_payments_on_deleted_at", using: :btree
  add_index "payments", ["number"], name: "index_payments_on_number", using: :btree
  add_index "payments", ["user_id"], name: "index_payments_on_user_id", using: :btree

  create_table "preparations", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "preparations", ["deleted_at"], name: "index_preparations_on_deleted_at", using: :btree

  create_table "producers", force: true do |t|
    t.string   "name"
    t.integer  "country_id"
    t.text     "note"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "producers", ["country_id"], name: "index_producers_on_country_id", using: :btree
  add_index "producers", ["deleted_at"], name: "index_producers_on_deleted_at", using: :btree

  create_table "regions", force: true do |t|
    t.string   "name"
    t.integer  "country_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "regions", ["country_id"], name: "index_regions_on_country_id", using: :btree
  add_index "regions", ["deleted_at"], name: "index_regions_on_deleted_at", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "roles", ["deleted_at"], name: "index_roles_on_deleted_at", using: :btree
  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "statuses", force: true do |t|
    t.string   "label"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "statuses", ["deleted_at"], name: "index_statuses_on_deleted_at", using: :btree

  create_table "subregions", force: true do |t|
    t.string   "name"
    t.integer  "region_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "subregions", ["deleted_at"], name: "index_subregions_on_deleted_at", using: :btree
  add_index "subregions", ["region_id"], name: "index_subregions_on_region_id", using: :btree

  create_table "subscribers", force: true do |t|
    t.integer  "mailing_list_id"
    t.string   "email"
    t.json     "info"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "subscribers", ["deleted_at"], name: "index_subscribers_on_deleted_at", using: :btree
  add_index "subscribers", ["mailing_list_id"], name: "index_subscribers_on_mailing_list_id", using: :btree

  create_table "types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "types", ["deleted_at"], name: "index_types_on_deleted_at", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "mobile"
    t.integer  "address_id"
    t.boolean  "active"
    t.string   "code"
    t.datetime "deleted_at"
    t.string   "stripe_id"
  end

  add_index "users", ["address_id"], name: "index_users_on_address_id", using: :btree
  add_index "users", ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "vinifications", force: true do |t|
    t.text     "method"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "vinifications", ["deleted_at"], name: "index_vinifications_on_deleted_at", using: :btree

  create_table "warehouses", force: true do |t|
    t.string   "title"
    t.string   "email",      default: "", null: false
    t.string   "phone"
    t.boolean  "shutl"
    t.integer  "address_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
    t.boolean  "active"
  end

  add_index "warehouses", ["address_id"], name: "index_warehouses_on_address_id", using: :btree
  add_index "warehouses", ["deleted_at"], name: "index_warehouses_on_deleted_at", using: :btree

  create_table "wines", force: true do |t|
    t.string   "name"
    t.string   "wine_key"
    t.integer  "vintage"
    t.boolean  "single_estate"
    t.decimal  "alcohol"
    t.integer  "producer_id"
    t.integer  "region_id"
    t.integer  "subregion_id"
    t.integer  "locale_id"
    t.integer  "appellation_id"
    t.integer  "maturation_id"
    t.integer  "type_id"
    t.integer  "vinification_id"
    t.integer  "composition_id"
    t.text     "note"
    t.decimal  "bottle_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
  end

  add_index "wines", ["appellation_id"], name: "index_wines_on_appellation_id", using: :btree
  add_index "wines", ["composition_id"], name: "index_wines_on_composition_id", using: :btree
  add_index "wines", ["deleted_at"], name: "index_wines_on_deleted_at", using: :btree
  add_index "wines", ["locale_id"], name: "index_wines_on_locale_id", using: :btree
  add_index "wines", ["maturation_id"], name: "index_wines_on_maturation_id", using: :btree
  add_index "wines", ["name"], name: "index_wines_on_name", using: :btree
  add_index "wines", ["producer_id"], name: "index_wines_on_producer_id", using: :btree
  add_index "wines", ["region_id"], name: "index_wines_on_region_id", using: :btree
  add_index "wines", ["subregion_id"], name: "index_wines_on_subregion_id", using: :btree
  add_index "wines", ["type_id"], name: "index_wines_on_type_id", using: :btree
  add_index "wines", ["vinification_id"], name: "index_wines_on_vinification_id", using: :btree
  add_index "wines", ["vintage"], name: "index_wines_on_vintage", using: :btree
  add_index "wines", ["wine_key"], name: "index_wines_on_wine_key", unique: true, using: :btree

end
