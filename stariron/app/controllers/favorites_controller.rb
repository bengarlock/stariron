class FavoritesController < ApplicationController

  def index
    favorites = Favorite.all
    render json: favorites
  end

  def create
    favorite = Favorite.create(favorite_params)
    render json: favorite
  end

  def update
    favorite = Favorite.find(params[:id])
    favorite.update!(favorite_params)
    render json: favorite
  end

  def destroy
    favorite = Favorite.find(params[:id])
    favorite.destroy!
    render json: {}
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :sign_object_id)
  end


end
