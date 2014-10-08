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
      if params[:spouse_one_id]
        @spouseship = Spouseship.new(spouse_one_id: params[:spouse_one_id],
                                      spouse_two_id: @person.id,
                                      tree_id: @person.tree_id)
        @spouseship.save
      end
      render "show"
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  def update
    @person = Person.find(params[:id])
    
    all_params = self.person_params
    
    all_params.delete("name") if all_params["name"].blank?
    all_params.delete("avatar") if all_params["avatar"] == "undefined"
    
    if @person.update_attributes(all_params)
      render :json => @person
    else
      render :json => @person.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @person = Person.find(params[:id])

    if params[:delete_children]
      @person.children.each do |child|
        child.destroy
      end
    end
    
    @person.destroy
    render :json => @person
  end
  
  protected
  def person_params
    self.params[:person].permit(:name, :tree_id, :parents_id, :avatar)
  end
 
end
