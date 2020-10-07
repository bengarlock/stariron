class SignObjectController < ApplicationController

  def index
    sign_objects = SignObject.all
    render json: sign_objects
  end

  def create
    sign_object = SignObject.create!(sign_object_params)
    render json: sign_object
  end

  def show
    sign_object = SignObject.find(params[:id])
    render json: sign_object
  end

  def update
    sign_object = SignObject.find(params[:id])
    sign_object.update!(sign_object_params)
    render json: sign_object
  end

  def destroy
    sign_object = SignObject.find(params[:id])
    puts sign_object
    sign_object.destroy!
    render json: {}
  end

  private

  def sign_object_params
    params.require(:sign_object).permit(:sign, :content)
  end

end
