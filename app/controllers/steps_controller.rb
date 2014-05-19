class StepsController < ApplicationController
  before_filter :set_recipe, :only => [:index, :show, :new, :edit, :create, :update, :destroy]
  skip_before_action :set_step, only: [:file]
  before_action :set_step, only: [:show, :edit, :update, :destroy]



  def index

    @recipe = Recipe.find(params[:recipe_id])
    @step = @recipe.steps

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @steps }
    end
  end

  def new
    @recipe = Recipe.find(params[:recipe])
    @step = @recipe.steps.build(plugin_call_id: params[:plugin_call_id])
    @plugincalls = PluginCall.all
  end

  def edit
    @recipe = Recipe.find(params[:recipe_id])
    @step = @recipe.steps.find(params[:id])
  end

  def create
    @recipe = Recipe.find(params[:recipe_id])
    @step = @recipe.steps.create(params[:step_params])

    respond_to do |format|
      if @step.save
        session[:step_id] = @step.id
        redirect_to(controller: 'form_handlers', stepid: @step.to_param, recipeid: @recipe.to_param)
     else
        format.html { render action: "new" }
        format.json { render json: @step.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @recipe = Recipe.find(params[:recipe_id])
    @step = @recipe.steps.find(params[:id])



  end

  def update
    @recipe = Recipe.find(params[:recipe_id])
    @step = @recipe.steps.find(params[:id])
    respond_to do |format|
      if @step.update_attributes(params[:step])
        format.html { redirect_to([@step.recipe, @step], :notice => 'Step was successfully updated.') }
        format.xml  { head :ok }

      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @step.errors, :status => :unprocessable_entity }

      end

    end
  end

  def destroy
    @step = @recipe.steps.find(params[:id])
    @step.destroy

    respond_to do |format|
      format.html { redirect_to(recipe_steps_url) }
      format.xml  { head :ok }
    end
  end




  private

  def set_recipe
    @recipe = Recipe.find(params[:recipe])
  end


  def set_step
      @step = Step.find(params[:id])
  end

  def current_step
    @_current_step ||= session[:step_id] &&
        Step.find_by(id: session[:step_id])
  end

    def step_params
      params.require(:step).permit(:name, :description, :number, :plugin_call_id, :recipe_id, :docfile).tap do |whitelisted|
        whitelisted[:properties] = params[:step][:properties]
      end
    end
end
