module AdminNamespace
  class SessionsController < ApplicationController
    # POST /admin_namespace/login
    def create
      admin = Admin.find_by(username: params[:username])

      if admin&.authenticate(params[:password])
        # Set session and signed cookie
        Rails.logger.debug "Authentication successful for admin: #{admin.username}"

        # Set session and signed cookie
        session[:admin_id] = admin.id
        Rails.logger.debug "Session set: #{session[:admin_id]}"

        cookies.signed[:admin_id] = { value: admin.id, httponly: true }
        Rails.logger.debug "Signed cookie set: #{cookies.signed[:admin_id]}"

        # Respond with a success message and redirect URL
        render json: { message: "Login successful", redirect_url: admin_dashboard_path }, status: :ok
      else
        render json: { error: "Invalid username or password" }, status: :unauthorized
      end
    end

    # DELETE /admin_namespace/logout
    def destroy
      if session[:admin_id]
        # Clear session and cookie
        session.delete(:admin_id)
        cookies.delete(:admin_id)

        render json: { message: "Logout successful" }, status: :ok
      else
        render json: { error: "No active admin session" }, status: :unauthorized
      end
    end

    # GET /admin_namespace/status
    def status
      Rails.logger.debug "Session[:admin_id]: #{session[:admin_id]}"
      Rails.logger.debug "Cookies.signed[:admin_id]: #{cookies.signed[:admin_id]}"
      if logged_in?
        render json: { 
          logged_in: true, 
          admin_id: current_admin.id 
        }, status: :ok
      else
        render json: { logged_in: false }, status: :ok
      end
    end

    private

    # Helper method to check if an admin is logged in
    def logged_in?
      session[:admin_id].present? || cookies.signed[:admin_id].present?
    end

    # Helper method to fetch the current admin
    def current_admin
      @current_admin ||= Admin.find_by(id: session[:admin_id] || cookies.signed[:admin_id])
    end
  end
end
