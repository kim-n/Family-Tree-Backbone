class Api::PeopleController < ApplicationController
  
  def index
    @people = Person.where(tree_id: params[:tree_id])
    render "index"
  end
  
  def show
    @person = Person.find(params[:id])
    render "show"
  end

  def create
    @person = Person.new(self.person_params)
    if @person.save
      render "show"
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  def update
    @person = Person.find(params[:id])
    if @person.update_attributes(self.person_params)
      render :json => @person
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @person = Person.find(params[:id])
    if @person.destroy
      render :json => @person
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  protected
  def person_params
    self.params[:person].permit(:name, :tree_id, :parents_id)
  end
end
