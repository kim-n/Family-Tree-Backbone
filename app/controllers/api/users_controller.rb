class Api::UsersController < ApplicationController
  before_filter -> { require_current_user params[:id] }, only: [:update]
  before_filter :require_no_current_user, only: [:create]

  def create
    @user = User.new(self.user_params)
    if @user.save
      log_in(@user)
      render "show"
    else
      render :json => @user.errors, :status => :unprocessable_entity
    end
  end
  
  def update
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
  
  def require_current_user(person_id)
    person = Person.find(person_id)
    unless current_user && (person == current_user)
      render :json => "Error: Can't edit someone else", :status => :unprocessable_entity
    end
  end

  def require_no_current_user
    if current_user
      render :json => "Error: User already logged in", :status => :unprocessable_entity
    end
  end
  
end
