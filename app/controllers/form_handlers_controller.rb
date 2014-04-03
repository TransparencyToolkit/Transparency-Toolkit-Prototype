class FormHandlersController < ApplicationController
  include Wicked::Wizard
  steps :toolinput
  @@recipe

  def show
    if params[:id] == "wicked_finish"
      finish_wizard_path
      return
    elsif params[:id] != "wicked_finish"
      @@recipe = Recipe.find(params[:recipeid])
      render_wizard
      return
    end
  end

  def update
    @step = Step.find(params[:step][:stepid])
    @step.update(params[:step])
    view_context.switchTool(@step.plugin_call_id.to_i, step.properties, step.number.to_i, @@recipe.id.to_i)
    render_wizard @step
  end

  def finish_wizard_path
    redirect_to @@recipe, notice: "Tool was successfully used."
  end
end
