require 'test_helper'

class API::V1::CartControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  def setup

  end

  def teardown

  end

  test 'Can create cart for anonymous user' do
    postcode = 'N1 7RJ'
    post :create, :postcode => postcode

    body = JSON.parse @response.body

    cart = Cart.find(body['data']['cart']['id'])
    assert(cart, 'Cart should be persisted to db')
    assert_equal('success', body['status'])
    assert_equal(postcode, body['data']['cart']['postcode'])
    assert_equal('anonymous', body['data']['cart']['client'])
  end

  test 'Can create cart for existing user' do
    user = users(:client)
    sign_in(:user, user)

    postcode = 'N1 7RJ'
    post :create, :postcode => postcode

    body = JSON.parse @response.body
    cart = Cart.find(body['data']['cart']['id'])
    assert(cart, 'Cart should be persisted to db')
    assert_equal(user.id.to_s, body['data']['cart']['client'].to_s)
  end

  test 'Will set user cookie' do
    postcode = 'N1 7RJ'
    post :create, :postcode => postcode

    body = JSON.parse @response.body
    cart = Cart.find(body['data']['cart']['id'])

    assert_equal(cart.id.to_s, @response.cookies['cart_id'])
  end

  test 'Will create cart item' do
    cart = carts(:anonymous)
    post :create_item, :cart_id => cart.id, :category_id => 2

    cart_items = CartItem.where(cart_id: cart.id)

    assert_equal(1, cart_items.length)
    assert_equal(2, cart_items[0].category_id)
  end
end
