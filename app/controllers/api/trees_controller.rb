class Api::TreesController < ApplicationController
  
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
end
