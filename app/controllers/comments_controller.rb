class CommentsController < ApplicationController
  before_action :set_post
  before_action :authenticate_user!
  before_action :set_comment, only: [:destroy]
  before_action :authorize_user!, only: [:destroy]


  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @post, notice: "Comment was successfully created."
    else
      render 'posts/show', status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    redirect_to @post, notice: "Comment was successfully destroyed."
  end


  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def authorize_user!
    redirect_to @post, alert: 'You are not authorized to delete this comment.' unless @comment.user == current_user
  end

  def comment_params
    params.require(:comment).permit(:text)
  end
end