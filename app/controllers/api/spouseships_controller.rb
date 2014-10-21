class Api::SpouseshipsController < ApplicationController
  before_filter -> { require_login_and_tree_owner params[:tree_id] }, only: [:create]
  
  def index
    @spouseship = Spouseship.where(tree_id: params[:tree_id])
    render "index"
  end
  
  def show
    @spouseship = Spouseship.find(params[:id])
    render "show"
  end

  def create
    @spouseship = Spouseship.new(self.spouseship_params)
    if @spouseship.save
      render "show"
    else
      render :json => @spouseship.errors, :status => :unprocessable_entity
    end
  end
  
  protected
  def spouseship_params
    self.params[:spouseship].permit(:spouse_one_id, :spouse_two_id, :tree_id)
  end
  
  private  
  def require_login_and_tree_owner(tree_id)
    tree = Tree.find(tree_id)
    unless current_user && ( current_user == tree.owner )
      render :json => "Error: You don't own this tree", :status => :unprocessable_entity
    end
  end
  
end
