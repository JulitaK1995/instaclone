class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         validates :username, presence: true, uniqueness: { case_sensitive: false }
         
         has_many :active_relationships, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
         has_many :passive_relationships, class_name: "Follow", foreign_key: "followed_id", dependent: :destroy
       
         has_many :following, through: :active_relationships, source: :followed
         has_many :followers, through: :passive_relationships, source: :follower
       
         def follow(other_user)
           active_relationships.create(followed_id: other_user.id)
         end
       
         def unfollow(other_user)
           active_relationships.find_by(followed_id: other_user.id).destroy
         end
       
         def following?(other_user)
           following.include?(other_user)
         end

         has_many :posts
         has_many :comments
         has_one_attached :avatar
         has_many :likes

         before_create :randomize_id

         private

          def randomize_id
            begin
              self.id = SecureRandom.random_number(1_000_000_000)
            end while User.where(id: self.id).exists?
          end
end
