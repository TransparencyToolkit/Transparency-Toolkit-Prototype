require 'test_helper'

class PluginCallsControllerTest < ActionController::TestCase
  setup do
    @plugin_call = plugin_calls(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:plugin_calls)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create plugin_call" do
    assert_difference('PluginCall.count') do
      post :create, plugin_call: { call: @plugin_call.call, details: @plugin_call.details, plugin_id: @plugin_call.plugin_id, what: @plugin_call.what }
    end

    assert_redirected_to plugin_call_path(assigns(:plugin_call))
  end

  test "should show plugin_call" do
    get :show, id: @plugin_call
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @plugin_call
    assert_response :success
  end

  test "should update plugin_call" do
    patch :update, id: @plugin_call, plugin_call: { call: @plugin_call.call, details: @plugin_call.details, plugin_id: @plugin_call.plugin_id, what: @plugin_call.what }
    assert_redirected_to plugin_call_path(assigns(:plugin_call))
  end

  test "should destroy plugin_call" do
    assert_difference('PluginCall.count', -1) do
      delete :destroy, id: @plugin_call
    end

    assert_redirected_to plugin_calls_path
  end
end
