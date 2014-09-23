class Api::TreesController < ApplicationController
  
  def index
    @trees = Tree.all
    render "index"
  end
  
  def create
    @tree = Tree.new(tree_params)
    
    if @tree.save
      render "show"
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  
  def show
    @tree = Tree.find(params[:id])
    @people = @tree.people
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
