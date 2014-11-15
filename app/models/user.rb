class User < ActiveRecord::Base
  acts_as_paranoid

  has_many :orders, foreign_key: 'client_id'
  has_many :payments

  has_and_belongs_to_many :addresses
  accepts_nested_attributes_for :addresses, :reject_if => :all_blank, :allow_destroy => true
  
  after_create :assign_code

  # creatable_by?(user) can use methods like...
  include Authority::Abilities

  # can_create?(resource) can use methods like...
  include Authority::UserAbilities
  # privileges, refer to: /app/authorizers/user_authorizer.rb
  # self.authorizer_name = 'UserAuthorizer'
  # described in the model which you want to apply the role
  resourcify

  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  validates :first_name, :presence => true
  validates :email, :uniqueness => true
  validates :email, presence: true, email: true

  def name
    "#{first_name} #{last_name}"
  end

  # belongs_to :roles
  def assign_code
    self.code = rand(9999).to_s.rjust(4, "0")
    self.active = true #at this point we want users to be active by default
    self.save
    self.add_role(:client)
    # puts "assigning"
  end

  # Solr & sunspot:
  searchable do
    text :first_name, :last_name, :email
  end

end