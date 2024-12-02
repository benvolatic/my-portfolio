class ProjectsController < ApplicationController
    def index
      projects = Project.all
      render json: projects.map { |project| project_as_json(project) }
    end
  
    def create
      project = Project.new(project_params)
  
      if project.save
        render json: project_as_json(project), status: :created
      else
        render json: { errors: project.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def project_params
      params.require(:project).permit(:title, :description)
    end
  
    def project_as_json(project)
      {
        id: project.id,
        title: project.title,
        description: project.description,
        short_description: project.short_description
      }
    end
  end
  