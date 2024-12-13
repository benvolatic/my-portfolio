module AdminNamespace
    class ProjectsController < ApplicationController
      before_action :authenticate_admin! # Protect all actions
  
      def create
        project = Project.new(project_params)
        if project.save
          render json: project, status: :created
        else
          render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def update
        project = Project.find(params[:id])
        if project.update(project_params)
          render json: project, status: :ok
        else
          render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def destroy
        project = Project.find(params[:id])
        if project.destroy
          render json: { message: "Project deleted" }, status: :ok
        else
          render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      private
  
      # Strong parameters for project creation and updates
      def project_params
        params.require(:project).permit(:title, :description)
      end
    end
  end
  