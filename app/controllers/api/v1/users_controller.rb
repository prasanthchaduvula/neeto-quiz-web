# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :load_user, only: [:show, :update]

  def show
    if @user
      render json: @user
    else
      respond_with_error "User with id #{params[:id]} not found.", :not_found
    end
  end

  def update
    if @user.blank?
      render json: { error: "User with id #{params[:id]} not found." }, status: :not_found
    elsif @user.update(user_params)
      render json: { success: true, user: @user }
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name)
    end

    def load_user
      @user = User.find_by(id: params[:id])
    end
end


