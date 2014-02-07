class StepsController < ApplicationController
  def file
  end
  skip_before_action :set_step, only: [:file]
  before_action :set_step, only: [:show, :edit, :update, :destroy]

  # GET /steps
  # GET /steps.json
  def index
    @steps = Step.all
  end

  # GET /steps/1
  # GET /steps/1.json
  def show
  end

  # GET /steps/new
  def new
    @step = Step.new(plugin_call_id: params[:plugin_call_id])
  end

  # GET /steps/1/edit
  def edit
  end

  # POST /steps
  # POST /steps.json
  def create
    @recipe = Recipe.find(params[:inrecipe])
    @step = @recipe.steps.new(step_params)

    if @step.save
      session[:step_id] = @step.id
      redirect_to(controller: 'form_handlers', stepid: @step.to_param, recipeid: @recipe.to_param)
    else
    end
  end

  # PATCH/PUT /steps/1
  # PATCH/PUT /steps/1.json
  def update
    respond_to do |format|
      if @step.update(step_params)
        format.html { redirect_to :back, notice: 'Step was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /steps/1
  # DELETE /steps/1.json
  def destroy
    @step.destroy
    respond_to do |format|
      format.html { redirect_to :back }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_step
      @step = Step.find(params[:id])
    end

    def step_params
      params.require(:step).permit(:name, :description, :number, :usedplugin, :usedcall, :plugin_call_id, :inrecipe, :recipe_id).tap do |whitelisted|
        whitelisted[:properties] = params[:step][:properties]
      end
    end
end
