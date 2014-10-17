class Api::SessionsController < ApplicationController
  def show
    @user = User.find_by_session_token(params[:id])
    log_in(@user)
    render "show"
  end
  
  def destroy
    @user = User.find(params[:id])
    if @user == current_user
      logout_current_user!
      render :json => ["SUCCESS: Signed out", @user]
    else
      render :json => "No user logged in", :status => :unprocessable_entity
    end
  end
end
