# frozen_string_literal: true

class Api::V1::Server::OrganizationsController  < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:create]
  before_action :load_organization, only: [:update]
  before_action :ensure_admin, only: [:update]

  def create
    @organization = Organization.new(organization_params)
    if @organization.save
      setup_organization_admin
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @organization.update!(organization_params)
    render json: { notice: "Organization updated succesfully", organization: @organization }, status: :ok
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :subdomain)
    end

    def user_params
      params.require(:user).permit(:phone_number, :first_name, :last_name)
    end

    def setup_organization_admin
      @user = User.new(user_params)
      @user.role = "admin"
      @user.organization =  @organization
      if @user.save
        render json: { notice: "Created organization successfully", organization: @organization, user: @user }, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def load_organization
      @organization = Organization.find_by!(subdomain: params[:subdomain])
    end

    def ensure_admin
      unless current_user.admin?
        render json: { notice: "You don't have access to update the organization" }, status: :unprocessable_entity
      end
    end
end

