module ApplicationHelper
  def render_comments(comments)
    comments.map do |comment|
      render(partial: 'comments/comment', locals: { comment: comment })
    end.join.html_safe
  end
end
