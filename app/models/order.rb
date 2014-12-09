class Order < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :status
  belongs_to :address
  belongs_to :warehouse
  belongs_to :payment
  belongs_to :client, class_name: "User"
  belongs_to :advisor, class_name: "User"
  has_many :order_items

  accepts_nested_attributes_for :address, :reject_if => :all_blank, :allow_destroy => true

  scope :user_id, ->(id) { where("client_id = ?", id) }

  def total_price
    if (order_items.map { |item| item.price }).include?(nil)
      nil
    else
      (order_items.map { |item| item.price }).inject(:+)
    end
  end

  def total_wine_cost
    if (order_items.map { |item| item.cost }).include?(nil)
      nil
    else
      (order_items.map { |item| item.cost }).inject(:+)
    end
  end

  def total_cost
    cost = total_wine_cost
    if cost.blank? || delivery_cost.blank?
      nil
    else
      cost += delivery_cost
    end
  end

  def delivery_status_json
    d = delivery_status.to_s
    require 'pp'
    PP.pp(d, '', 80)
  end

  def advisory_complete
    if order_items.blank?
      return false
    else
      if order_items.select { |item| item.wine.blank? }.count > 0
        return false
      else
        return true
      end
    end

  end

end
