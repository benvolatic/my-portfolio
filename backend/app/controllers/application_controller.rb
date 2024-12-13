class ApplicationController < ActionController::API
  include ActionController::Cookies

  def fallback_index_html
    render file: 'public/index.html'
  end

  private

  # Helper method to get the current admin
  def current_admin
    admin_id = session[:admin_id] || cookies.signed[:admin_id]

    # Debug session and cookie state
    Rails.logger.debug "Session[:admin_id]: #{session[:admin_id]}"
    Rails.logger.debug "Cookies.signed[:admin_id]: #{cookies.signed[:admin_id]}"
    Rails.logger.debug "Selected Admin ID: #{admin_id}"

    @current_admin ||= Admin.find_by(id: admin_id)
    Rails.logger.debug "Current Admin Object: #{@current_admin.inspect}"

    @current_admin
  end

  # Helper method to authenticate admin
  def authenticate_admin!
    unless current_admin
      Rails.logger.debug "Admin not authenticated"
      render json: { error: "Unauthorized access" }, status: :unauthorized
    end
  end
end
