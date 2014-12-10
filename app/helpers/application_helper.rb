module ApplicationHelper
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def bootstrap_class_for flash_type

    puts flash_type == 'error'
    case flash_type
      when 'success'
        'alert-success'
      when 'error'
        'alert-danger'
      when 'alert'
        'alert-warning'
      when 'notice'
        'alert-info'
      else
        flash_type.to_s
    end
  end

  def user_is_admin
    if current_user.blank?
      return false
    end
    if current_user.has_role?(:admin) || current_user.has_role?(:superadmin)
      true
    else
      false
    end
  end

  def has_invitation_code
    if Rails.application.config.enable_invite_code == 'true'
      if cookies[:invite_code] == Rails.application.config.invite_code
        return true
      else
        return false
      end
    else
      true
    end
  end
end
