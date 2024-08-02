class LikesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @like = @post.likes.build(user: current_user)
    if @like.save
      redirect_to @post, notice: "Post liked!"
    else
      redirect_to @post, notice: "Unable to like post."
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @post = @like.post
    if @like.destroy
      redirect_to @post, notice: "Post unliked!"
    else
      redirect_to @post, notice: "Unable to unlike post."
    end
  end
end
