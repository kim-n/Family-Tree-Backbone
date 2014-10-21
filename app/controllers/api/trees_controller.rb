class Api::TreesController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]
  
  def index
    @trees = Tree.where(user_id: params[:user_id])
    render "index"
  end
  
  def create
    user = User.find_by_session_token(params["user"]["session_token"])
    if user == current_user
      @tree = Tree.new(self.tree_params)
      @tree.user_id = current_user.id
      if @tree.save
        render "show"
      else
        render :json => @tree.errors, :status => :unprocessable_entity
      end
    else
      render :json => ["User not logged in"], :status => :unprocessable_entity      
    end
  end
  
  
  def show
    @tree = Tree.find(params[:id])
    @people = @tree.people.order(:name)
    @spouseships = @tree.spouseships
    render "show"
  end

  
  def update
    @tree = Tree.find(params[:id])
    if @tree.update_attributes(self.tree_params)
      render "show"
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @tree = Tree.find(params[:id])
    if @tree.destroy
      render "show"
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  protected
  def tree_params
    self.params[:tree].permit(:name)
  end
  
  private
  def require_login
    unless current_user
      render :json => ["Error: No user logged in"], :status => :unprocessable_entity
    end
  end
  
  def require_owner
    tree = Tree.find(params[:id])
    unless current_user == tree.owner
      render :json => ["Error: User does not own this tree"], :status => :unprocessable_entity
    end
  end
end
