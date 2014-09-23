class Api::TreesController < ApplicationController
  
  def index
    @trees = Tree.all
    render :json => @trees
  end
  
  def create
    @tree = Tree.new(tree_params)
    
    if @tree.save
      render :json => @tree
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  
  def show
    @tree = Tree.find(params[:id])
    render :json => @tree
  end

  
  def update
    @tree = Tree.find(params[:id])
    if @tree.update_attributes(self.tree_params)
      render :json => @tree
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @tree = Tree.find(params[:id])
    if @tree.destroy
      render :json => @tree
    else
      render :json => @tree.errors, :status => :unprocessable_entity
    end
  end
  
  protected
  def tree_params
    self.params[:tree].permit(:name)
  end
end
