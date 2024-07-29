class Post < ApplicationRecord
  validates :title, presence: true, length: { minimum: 5, maximum: 100 }
  validates :description, presence: true, length: { minimum: 5, maximum: 1000 }
  validates :keywords, presence: true, length: { minimum: 5, maximum: 1000 }

  belongs_to :user
  has_many_attached :files
  
end
