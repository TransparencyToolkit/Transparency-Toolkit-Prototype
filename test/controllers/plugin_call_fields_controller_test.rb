require 'test_helper'

class PluginCallFieldsControllerTest < ActionController::TestCase
  setup do
    @plugin_call_field = plugin_call_fields(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:plugin_call_fields)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create plugin_call_field" do
    assert_difference('PluginCallField.count') do
      post :create, plugin_call_field: {  }
    end

    assert_redirected_to plugin_call_field_path(assigns(:plugin_call_field))
  end

  test "should show plugin_call_field" do
    get :show, id: @plugin_call_field
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @plugin_call_field
    assert_response :success
  end

  test "should update plugin_call_field" do
    patch :update, id: @plugin_call_field, plugin_call_field: {  }
    assert_redirected_to plugin_call_field_path(assigns(:plugin_call_field))
  end

  test "should destroy plugin_call_field" do
    assert_difference('PluginCallField.count', -1) do
      delete :destroy, id: @plugin_call_field
    end

    assert_redirected_to plugin_call_fields_path
  end
end
