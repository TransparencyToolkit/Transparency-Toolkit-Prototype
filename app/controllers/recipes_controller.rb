class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]



  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
    @steps = @recipe.steps

    if @recipe.steps.length == 0
      redirect_to new_step_path(recipe: @recipe)
    end

  end

  def new
    @recipe = Recipe.new
    @recipe.steps.build
  end

  def edit

  end



  def create

   @recipe = Recipe.new(:name => "Analysis Sequence", :description => "")

    respond_to do |format|

      if @recipe.save
        view_context.newrecipe(@recipe.id)
        format.html { redirect_to @recipe}
        format.json { render action: 'show', status: :created, location: @recipe }
      else
       format.html { render action: 'new' }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end

  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: 'Recipe was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @recipe.destroy
    respond_to do |format|
      format.html { redirect_to :root, notice: 'Analysis Sequence was successfully deleted.' }
      format.json { head :no_content }
      format.js   {}
    end
    redirect_to recipes_path
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:id])

    end

    def recipe_params
      params.require(:recipe).permit(:name, :description, steps_attributes: [:id, :name, :description, :number, :plugin_call_id, :recipe_id, :docfile, :_destroy])
    end
end
