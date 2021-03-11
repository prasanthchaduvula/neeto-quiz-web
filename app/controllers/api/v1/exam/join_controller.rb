# frozen_string_literal: true

class Api::V1::Exam::JoinController < Api::V1::BaseController
  before_action :load_mocktest_with_invitation_code, only: :show
  before_action :load_mocktest, only: :create
  before_action :ensure_organization_member
  before_action :ensure_mocktest_is_published
  before_action :ensure_not_mocktest_student

  def show
    render template: "api/v1/exam/join/show"
  end

  def create
    join_mocktest
  end

  private

    def load_mocktest_with_invitation_code
      @mocktest = Exam::Mocktest.find_by!(invitation_code: params[:invitation_code])
    end

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:mocktest_id])
    end

    def ensure_organization_member
      if current_user.organization.subdomain != @mocktest.user.organization.subdomain
        render json: { error: "You are not the member of organization where this mocktest belongs to" }, status: :unprocessable_entity
      end
    end

    def ensure_mocktest_is_published
      unless @mocktest.is_published
        render json: { notice: "Mocktest is not yet published by the mocktest creator" }
      end
    end

    def ensure_not_mocktest_student
      if current_user.mocktest_member?(@mocktest)
        render json: { notice: "You are already a member of mocktest", mocktest: @mocktest }, status: :ok
      end
    end

    def join_mocktest
      Exam::StudentService.new(@mocktest, current_user, current_user.phone_number).add_student!
      render json: { notice: "Joined mocktest successfully", mocktest: @mocktest, students: @mocktest.students }, status: :ok
    end
end