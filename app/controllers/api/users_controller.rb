class Api::UsersController < ApplicationController
  
  # before_filter :require_current_user!, only: [:update]
  # before_filter :require_no_current_user!, only: [:create]
  #
  #
  
  def show
    @user = User.find_by_credentials(params[:user])
    render "show"
  end
  
  def create
    @user = User.new(self.user_params)
    if @user.save
      log_in(@user)
      render "show"
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  def edit
    @person = Person.find(params[:id])
    
    all_params = self.person_params
    
    all_params.delete("email") if all_params["email"].blank?
    all_params.delete("password") if all_params["password"].blank?
    
    if @person.update_attributes(all_params)
      render :json => @person
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  protected
  def user_params
    self.params[:user].permit(:email, :password)
  end
  
  def require_current_user!
    redirect_to new_session_url if current_user.nil?
  end

  def require_no_current_user!
    redirect_to user_url(current_user) unless current_user.nil?
  end
  
end
