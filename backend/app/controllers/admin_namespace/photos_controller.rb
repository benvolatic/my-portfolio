module AdminNamespace
  class PhotosController < ApplicationController
    include Rails.application.routes.url_helpers # Needed for `url_for`
    before_action :authenticate_admin! # Protects all actions

    def index
      photos = Photo.all
      render json: photos.map { |photo| photo_as_json(photo) }, status: :ok
    end

    def create
      Rails.logger.debug "Received Parameters: #{params.inspect}"
      Rails.logger.debug "Session[:admin_id]: #{session[:admin_id]}"
      Rails.logger.debug "Cookies.signed[:admin_id]: #{cookies.signed[:admin_id]}"
      Rails.logger.debug "Current Admin: #{current_admin.inspect}"

      # Handle multiple photo uploads
      if params[:images].present?
        created_photos = []
        params[:images].each do |image|
          photo = Photo.new(image: image) # No title required
          if photo.save
            created_photos << photo_as_json(photo)
          else
            render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
            return
          end
        end
        render json: { photos: created_photos }, status: :created
      else
        render json: { error: "No images provided" }, status: :unprocessable_entity
      end
    end

    def update
      photo = Photo.find(params[:id])
      if photo.update(photo_params)
        render json: photo, status: :ok
      else
        render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      photo = Photo.find(params[:id])
      if photo.image.attached?
        photo.image.purge # Removes the file from storage
      end

      if photo.destroy
        render json: { message: "Photo deleted successfully" }, status: :ok
      else
        render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    # Accept flat parameters without nesting under 'photo'
    def photo_params
      params.permit(:title, :image)
    end

    def photo_as_json(photo)
      {
        id: photo.id,
        image_url: photo.image.attached? ? url_for(photo.image) : nil
      }
    end
  end
end
