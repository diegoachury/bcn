class User < ActiveRecord::Base
  has_secure_password

  validates :username, uniqueness: true
  validates :email, uniqueness: true,
   format: { with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9\.-]+\.[A-Za-z]+\Z/ }

  has_many :posts

  before_validation :set_username
  before_save :downcase_email

  def downcase_email
    self.email = email.downcase
  end

  def set_username
    self.username = email if username.blank?
  end
end