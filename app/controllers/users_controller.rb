class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def search
    @query = params[:query]
    if @query.present?
      @users = User.where("username LIKE ?", "%#{@query}%")
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
  
end
