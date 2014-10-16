class User < ActiveRecord::Base
  validates :email, :presence => true
  validates :password_digest, :presence => { :message => "Password can't be blank" }
  
  has_many :trees, class_name: "Tree", foreign_key: :user_id, inverse_of: :user
  
  after_initialize :ensure_session_token
  
  
  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password) unless password.blank?
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end