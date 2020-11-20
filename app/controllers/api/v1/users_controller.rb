# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :load_user, only: [:show, :update]

  def show
    render json: { user: @user }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: { success: true, user: @user }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name)
    end

    def load_user
      @user = User.find_by!(id: params[:id])
    end
end


