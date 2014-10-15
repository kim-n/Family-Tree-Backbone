class Api::SessionsController < ApplicationController
  def show
    @user = User.find_by_session_token(params[:id])
    log_in(@user)
    render "show"
  end
end
