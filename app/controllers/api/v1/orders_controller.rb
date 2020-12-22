# frozen_string_literal: true

class Api::V1::OrdersController < Api::V1::BaseController
  before_action :load_course!, only: :create
  before_action :load_order!, only: [:show, :update]
  before_action :load_orders, only: :index

  def index
    render json: { orders: @orders }, status: :ok
  end

  def create
    orders_service = CreateOrderService.new(@course, current_user)
    orders_service.process

    if orders_service.errors.present?
      render status: orders_service.status,
      json: { errors: orders_service.errors }
    else
      render status: orders_service.status,
      json: orders_service.response
    end
  end

  def show
    if @order
      render json: { order: @order }, status: :ok
    else
      render json: { errors: ["Order with id #{order_params[:id]} not found"] }, status: :not_found
    end
  end

  def update
    @order.update!(order_params)
    render json: { notice: "Order updated successfully" }, status: :ok
  end

  private

    def order_params
      params.require(:order).permit(:status)
    end

    def load_orders
      @orders = current_user.orders
    end

    def load_order!
      @order = Order.find_by!(id: params[:id])
    end

    def load_course!
      @course = Course.find_by!(id: params[:course_id])
    end
end
