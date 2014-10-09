class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u|
    	u.permit(:email, :password, :password_confirmation, :first_name, :last_name, :mobile)
    }
  end

  # Devise overrides for signing in
  def after_sign_in_path_for(resource_or_scope)
    if current_user.active?
      welcome_path
    else
      entercode_path
    end
  end

  # Devise overrides for signing up
  def after_sign_up_path_for(resource)
    entercode_path
  end

end
