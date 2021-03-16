# frozen_string_literal: true

class Api::V1::StudentsController  < Api::V1::BaseController
  before_action :load_organization
  before_action :ensure_organization
  before_action :ensure_admin
  before_action :load_student, only: [:create]
  before_action :ensure_not_organization_student, only: [:create]
  before_action :ensure_student, only: [:update, :show]

  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    if @student.nil?
      create_student
    else
      render json: { notice: "This user is already a member of this organization", organization: @organization, student: @student }, status: :ok
    end
  end

  def update
    @student.update!(student_params)
    render json: { notice: "Updated student successfully", organization: @organization, student: @student }, status: :ok
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  private

    def student_params
      params.require(:student).permit(:first_name, :last_name, :phone_number)
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

    def ensure_not_organization_student
      if current_user == @student
        render json: { notice: "You are the admin of this organization", organization: @organization }, status: :ok
      end
    end

    def load_student
      @student = User.find_by(phone_number: params[:student][:phone_number], organization_id: @organization.id)
    end

    def ensure_student
      @student = User.find_by!(id: params[:id])
    end

    def create_student
      @student = User.new(student_params)
      @student.role = "student"
      @student.organization =  @organization
      if @student.save
        render json: { notice: "Added student successfully", organization: @organization, student: @student }, status: :ok
      else
        render json: { errors: @student.errors.full_messages }, status: :unprocessable_entity
      end
    end
end