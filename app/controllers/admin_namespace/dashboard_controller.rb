module AdminNamespace
    class DashboardController < ApplicationController
      before_action :authenticate_admin!
  
      def show
        Rails.logger.debug "Session[:admin_id]: #{session[:admin_id]}"
        Rails.logger.debug "Cookies.signed[:admin_id]: #{cookies.signed[:admin_id]}"
        admin = current_admin
        Rails.logger.debug "Current Admin Object: #{admin.inspect}"
  
        if admin
          render json: { message: "Welcome to the dashboard, #{admin.username}" }, status: :ok
        else
          render json: { error: "Unauthorized access" }, status: :unauthorized
        end
      end
    end
  end
  