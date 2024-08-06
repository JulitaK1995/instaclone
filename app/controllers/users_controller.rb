class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @posts = @user.posts
    if @user == current_user
      @following_users = current_user.following
      @followers = current_user.followers
    else
      @following_users = @user.following
      @followers = @user.followers
    end
  end
  
end
