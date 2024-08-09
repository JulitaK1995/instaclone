class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def search
    @query = params[:query]
    if @query.present?
      @users = User.where("username LIKE ?", "%#{@query}%").where.not(id: current_user.id)
    else
      @users = User.none
    end
    render :index
  end
  
  def show
    @user = User.find(params[:id])
    @posts = @user.posts.order(created_at: :desc)
    if @user == current_user
      @following_users = current_user.following
      @followers = current_user.followers
    else
      @following_users = @user.following
      @followers = @user.followers
    end
  end

  def avatar_data
    user = User.find(params[:id])
    render json: {
      image_url: url_for(user.avatar),
      caption: user.username
    }
  end
  
end
