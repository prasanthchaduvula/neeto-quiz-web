# frozen_string_literal: true

class Api::V1::InstructorsController < Api::V1::BaseController
  before_action :load_organization
  before_action :ensure_organization
  before_action :ensure_admin
  before_action :load_instructor, only: [:create]
  before_action :ensure_not_organization_instrcutor, only: [:create]
  before_action :ensure_instructor, only: [:update, :show]

  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    if @instructor.nil?
      create_instructor
    else
      render json: { notice: "This user is already a member of this organization", organization: @organization, instructor: @instructor }, status: :ok
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def update
    @instructor.update!(instructor_params)
    render json: { notice: "Updated instructor successfully", organization: @organization, instructor: @instructor }, status: :ok
  end

  private

    def instructor_params
      params.require(:instructor).permit(:first_name, :last_name, :phone_number)
    end

    def load_organization
      @organization = Organization.find_by(subdomain: params[:organization_subdomain])
    end

    def ensure_organization
      unless @organization
        render json: { error: "No organization exist with this subdomain" }, status: :unprocessable_entity
      end
    end

    def ensure_admin
      if current_user.organization_id != @organization.id || !current_user.admin?
        render json: { error: "You are not the admin of this organization" }, status: :unprocessable_entity
      end
    end

    def ensure_not_organization_instrcutor
      if current_user == @instructor
        render json: { notice: "You are the admin of this organization", organization: @organization }, status: :ok
      end
    end

    def load_instructor
      @instructor = User.find_by(phone_number: params[:instructor][:phone_number], organization_id: @organization.id)
    end

    def ensure_instructor
      @instructor = User.find_by!(id: params[:id])
    end

    def create_instructor
      @instructor = User.new(instructor_params)
      @instructor.role = "instructor"
      @instructor.organization =  @organization
      if @instructor.save
        render json: { notice: "Added instructor successfully", organization: @organization, instructor: @instructor }, status: :ok
      else
        render json: { errors: @instructor.errors.full_messages }, status: :unprocessable_entity
      end
    end
end