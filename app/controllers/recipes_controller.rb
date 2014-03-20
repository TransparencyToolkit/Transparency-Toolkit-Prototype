class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
     #view_context.newrecipe(@recipe.id)

    if @recipe.steps.length == 0
      redirect_to new_step_path(recipe: @recipe)
    end
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

  def destroy
    @recipe.destroy
    respond_to do |format|
      format.html { redirect_to :root, notice: 'Analysis sequence was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.require(:recipe).permit(:name, :description)
    end
end
