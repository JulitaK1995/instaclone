class Post < ApplicationRecord
  validates :title, presence: true, length: { minimum: 5, maximum: 100 }
  validates :description, presence: true, length: { minimum: 5, maximum: 1000 }

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many_attached :files
  has_many :likes, dependent: :destroy

  before_create :randomize_id

  private

   def randomize_id
     begin
       self.id = SecureRandom.random_number(1_000_000_000)
     end while User.where(id: self.id).exists?
   end
end
