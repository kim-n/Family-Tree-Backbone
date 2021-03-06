module Api::SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end
  
  def log_in(user)
    session[:session_token] = user.session_token
  end

  def logout_current_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
end
