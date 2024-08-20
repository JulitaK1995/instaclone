class LikesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @like = @post.likes.build(user: current_user)
    if @like.save
      respond_to do |format|
        format.html { redirect_to @post, notice: "Post liked!" }
        format.turbo_stream
      end
    else
      respond_to do |format|
        format.html { redirect_to @post, alert: "Unable to like post." }
        format.turbo_stream
      end
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @post = @like.post
    if @like.destroy
      respond_to do |format|
        format.html { redirect_to @post, notice: "Post unliked!" }
        format.turbo_stream
      end
    else
      respond_to do |format|
        format.html { redirect_to @post, alert: "Unable to unlike post." }
        format.turbo_stream
      end
    end
  end
end
