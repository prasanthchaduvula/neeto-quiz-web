# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :load_user, only: [:show, :update]
  before_action :ensure_authenticated_user, only: [:show, :update]

  def show
    render json: { user: @user }, status: :ok
  end

  def update
    @user.update!(user_params)
    render json: { success: true, user: @user }, status: :ok
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name)
    end

    def load_user
      @user = User.find_by!(id: params[:id])
    end

    def ensure_authenticated_user
      if current_user != @user
        render json: { notice: "You are not the authenticated user" }, status: :unprocessable_entity
      end
    end
end


