class Api::PeopleController < ApplicationController
  
  def index
    @people = Person.all
    render :json => @people
  end
  
  def show
    @person = Person.find(params[:id])
    render :json => @person
  end

  def create
    @person = Person.new(self.person_params)
    if @person.save
      render :json => @person
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
  
  protected
  def person_params
    self.params[:person].permit(:name)
  end
end
