class PhotosController < ApplicationController
    def index
      photos = Photo.all
      render json: photos.map { |photo| photo_as_json(photo) }
    end
  
    def create
      photo = Photo.new(photo_params)
  
      if photo.save
        render json: photo_as_json(photo), status: :created
      else
        render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def photo_params
      params.require(:photo).permit(:title, :image)
    end
  
    def photo_as_json(photo)
      {
        id: photo.id,
        title: photo.title,
        image_url: photo.image_url
      }
    end
  end
  