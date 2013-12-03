class PluginCallFieldsController < ApplicationController
  before_action :set_plugin_call_field, only: [:show, :edit, :update, :destroy]

  # GET /plugin_call_fields
  # GET /plugin_call_fields.json
  def index
    @plugin_call_fields = PluginCallField.all
  end

  # GET /plugin_call_fields/1
  # GET /plugin_call_fields/1.json
  def show
  end

  # GET /plugin_call_fields/new
  def new
    @plugin_call_field = PluginCallField.new
  end

  # GET /plugin_call_fields/1/edit
  def edit
  end

  # POST /plugin_call_fields
  # POST /plugin_call_fields.json
  def create
    @plugin_call_field = PluginCallField.new(plugin_call_field_params)

    respond_to do |format|
      if @plugin_call_field.save
        format.html { redirect_to @plugin_call_field, notice: 'Plugin call field was successfully created.' }
        format.json { render action: 'show', status: :created, location: @plugin_call_field }
      else
        format.html { render action: 'new' }
        format.json { render json: @plugin_call_field.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plugin_call_fields/1
  # PATCH/PUT /plugin_call_fields/1.json
  def update
    respond_to do |format|
      if @plugin_call_field.update(plugin_call_field_params)
        format.html { redirect_to @plugin_call_field, notice: 'Plugin call field was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @plugin_call_field.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plugin_call_fields/1
  # DELETE /plugin_call_fields/1.json
  def destroy
    @plugin_call_field.destroy
    respond_to do |format|
      format.html { redirect_to plugin_call_fields_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plugin_call_field
      @plugin_call_field = PluginCallField.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def plugin_call_field_params
      params[:plugin_call_field]
    end
end
