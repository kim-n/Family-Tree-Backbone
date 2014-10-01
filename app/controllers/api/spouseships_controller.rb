class Api::SpouseshipsController < ApplicationController
  
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
  
  
end
