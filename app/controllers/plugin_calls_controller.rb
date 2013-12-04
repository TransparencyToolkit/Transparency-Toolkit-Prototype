class PluginCallsController < ApplicationController
  before_action :set_plugin_call, only: [:show, :edit, :update, :destroy]

  # GET /plugin_calls
  # GET /plugin_calls.json
  def index
    @plugin_calls = PluginCall.all
  end

  # GET /plugin_calls/1
  # GET /plugin_calls/1.json
  def show
  end

  # GET /plugin_calls/new
  def new
    @plugin_call = PluginCall.new
    @plugin_call.fields.build
  end

  # GET /plugin_calls/1/edit
  def edit
  end

  # POST /plugin_calls
  # POST /plugin_calls.json
  def create
    binding.pry
    @plugin = Plugin.find(params[:plugin_id])
    @plugin_call = @plugin.plugin_calls.new(plugin_call_params)

    respond_to do |format|
      if @plugin_call.save
        format.html { redirect_to @plugin_call, notice: 'Plugin call was successfully created.' }
        format.json { render action: 'show', status: :created, location: @plugin_call }
      else
        format.html { render action: 'new' }
        format.json { render json: @plugin_call.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plugin_calls/1
  # PATCH/PUT /plugin_calls/1.json
  def update
    respond_to do |format|
      if @plugin_call.update(plugin_call_params)
        format.html { redirect_to @plugin_call, notice: 'Plugin call was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @plugin_call.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plugin_calls/1
  # DELETE /plugin_calls/1.json
  def destroy
    @plugin_call.destroy
    respond_to do |format|
      format.html { redirect_to plugin_calls_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plugin_call
      @plugin_call = PluginCall.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def plugin_call_params
      params.require(:plugin_call).permit(:call, :details, :what, :plugin_id)
    end
end
