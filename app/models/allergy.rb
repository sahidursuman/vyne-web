class Allergy < ActiveRecord::Base
  has_and_belongs_to_many :wines
end
