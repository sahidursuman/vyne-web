class Wine < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :producer
  belongs_to :subregion
  belongs_to :maturation
  belongs_to :order_item
  belongs_to :type
  belongs_to :vinification
  belongs_to :region
  belongs_to :locale
  belongs_to :appellation
  belongs_to :composition

  # has_and_belongs_to_many :grapes
  has_and_belongs_to_many :occasions
  has_and_belongs_to_many :foods
  has_and_belongs_to_many :allergies

  attr_accessor :occasion_tokens
  attr_accessor :food_tokens
  attr_accessor :note_tokens

  def occasion_tokens=(ids)
    self.occasion_ids = ids.split(",")
  end

  def food_tokens=(ids)
    self.food_ids = ids.split(",")
  end

  def note_tokens=(ids)
    self.note_ids = ids.split(",")
  end

  has_many :inventories
  has_many :warehouses, through: :inventories
  has_many :categories, through: :inventories

  validates :name, :producer_id, :type_id, :presence => true
  validates :wine_key, :uniqueness => true

  # Solr & sunspot:
  searchable do
    text :name

    text :producer do
      producer.name
    end

    # Single relationships
    text :country_name do
      producer.country.name
    end

    text :country_alpha do
      producer.country.alpha_2
    end

    text :region do
      unless region.nil?
        region.name
      end
    end

    text :subregion do
      unless subregion.nil?
        subregion.name
      end
    end

    text :appellation do
      unless appellation.nil?
        appellation.name
      end
    end

    text :type do
      unless type.blank?
        type.name
      end
    end

    text :grapes do
      unless composition.nil?
        composition.composition_grapes.map { |comp| comp.grape.name }
      end
    end

    text :txt_vintage

    text :note

    text :sku do
      unless inventories.blank?
        inventories.map { |inv| inv.vendor_sku }
      end
    end

    integer :warehouse_ids, :multiple => true
    integer :category_ids, :multiple => true

    boolean :single_estate

    # If we ever want to search by wines with no category we can with assigning it category 0 like codebelow
    # integer :category_ids, :multiple => true do
    #   unless inventories == nil
    #     inventories.all.map { |i| i.category.blank? ? 0 : i.category.id }.uniq
    #   end
    # end


  end

  def txt_vintage
    #TODO: if nil display NV - Non Vintage if 0 display Unknown
    if vintage.nil?
      'NV'
    elsif vintage == 0
      'Non Vintage'
    else
      vintage.to_s
    end
  end

  def compositions_array
    comp = []

    unless composition.blank?
      composition.composition_grapes.each do |c|
        comp.push({:name => c.grape.name, :percentage => c.percentage})
      end
    end

    return comp
  end

  def display_name
    name + ' - ' + txt_vintage + ' - ' + producer.name
  end

  def full_info
    name = display_name

    unless type.blank? || type.name.blank?
      name = name + ', ' + type.name
    end

    name
  end

  def location
    location = []

    unless producer.blank?
      location << producer.country.name
    end

    unless region.blank?
      location << region.name
    end

    unless subregion.blank?
      location << subregion.name
    end

    unless appellation.blank?
      location << appellation.name
    end

    location.join(', ')
  end

end
