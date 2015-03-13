class PromoController < ApplicationController

  def index
    if user_signed_in?
      promo_code = nil
      redeemed_promotions = []
      redeemable_promotions = []
      pending_promotions = []

      unless current_user.referrals.blank?
        active_referrals = current_user.referrals.select { |referral| referral.promotion.active }.sort_by &:created_at

        latest_referral = active_referrals.first

        active_codes = latest_referral.referral_codes.select { |code| code.active }.sort_by(&:created_at).reverse!

        unless active_codes.blank?
          promo_code = active_codes.map { |code| code.code }.first
        end
      end

      unless current_user.user_promotions.blank?
        redeemed_promotions = current_user.user_promotions.select { |promo| promo.redeemed }
        redeemable_promotions = current_user.user_promotions.select { |promo|
          promo.redeemed == false && promo.can_be_redeemed
        }
        pending_promotions = current_user.user_promotions.select { |promo|
          promo.redeemed == false && promo.can_be_redeemed == false
        }
      end

      @promotion = {
          :promo_code => promo_code,
          :redeemed_promotions => redeemed_promotions,
          :redeemable_promotions => redeemable_promotions,
          :pending_promotions => pending_promotions
      }
    else
      unless params[:promo].blank?
        @code = params[:promo].upcase
      end
    end
  end

  def create

    if user_signed_in?
      flash[:error] = 'This promotion is for new customers only.
                       Please share your promo code below to receive referral rewards.'
      redirect_to account_index_path
      return
    end

    @code = ''

    unless params[:promo_code].blank?
      @code = params[:promo_code].strip.upcase
    end

    if @code.blank? || params[:postcode].blank?
      flash.now[:error] = 'Please enter Promo Code and Postcode.'
      render :index
      return
    end

    referral_code = ReferralCode.find_by(code: @code)

    if referral_code.blank?
      flash.now[:error] = "We can't locate promo code provided. Please make sure it's correct and enter it again."
      render :index
      return
    else
      cookies[:referral_code] = {:value => @code, :expires => 1.month.from_now}
      redirect_to availability_index_path({:postcode => params[:postcode]})
      return
    end
  end
end