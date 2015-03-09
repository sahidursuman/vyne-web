class PromoController < ApplicationController

  def index

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
      flash.now[:error] = "We can't locate promo code provided. Please enter it again."
      render :index
      return
    else
      cookies[:referral_code] = {:value => @code, :expires => 1.month.from_now}
      redirect_to availability_index_path({ :postcode =>  params[:postcode]})
      return
    end



      if user_signed_in?
        flash.now[:notice] = 'Promo code was successfully applied to your account.'
        render :index
      else


        account_reward = UserPromotion.new_account_reward(referral_code, current_user)

        if account_reward.save

          sharing_reward = UserPromotion.new_sharing_reward(referral_code, current_user)

          if sharing_reward.save
            flash.now[:notice] = 'Promo code was successfully applied to your account.'
            render :index
          else
            flash.now[:error] = sharing_reward.errors.full_messages.join('. ') + '.'
            render :index
          end

        else
          flash.now[:error] = account_reward.errors.full_messages.join('. ') + '.'
          render :index
        end

        # TODO: Save Cookie
      end

  end
end