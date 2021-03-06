
class UserPromotion < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :user
  belongs_to :promotion_code
  belongs_to :referral

  validates :user, presence: true
  validates :promotion_code, presence: true

  # TODO: Review
  def eligible_for_promotions
    true
    # if self.sign_up_reward?
    #   if user == referral_code.referral.user
    #     errors[:base] << "You can't use our own promo code"
    #   end
    #
    #   existing_promotion = UserPromotion.find_by(:user => user, :category => category)
    #
    #   unless existing_promotion.blank?
    #     errors[:base] << 'The same promotion is already associated with your account'
    #   end
    # end
  end

  def to_s
    promotion_code.promotion.title
  end
end