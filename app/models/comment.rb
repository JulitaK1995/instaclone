class Comment < ApplicationRecord
  validates :text, presence: true

  belongs_to :post
  belongs_to :user
  belongs_to :parent_comment, class_name: 'Comment', optional: true
  has_many :replies, class_name: 'Comment', foreign_key: :parent_comment_id, dependent: :destroy

  def self.ordered_by_parent
    order('parent_comment_id IS NULL DESC, parent_comment_id ASC, created_at ASC')
  end
  
end
