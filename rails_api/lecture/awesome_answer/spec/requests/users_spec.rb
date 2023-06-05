require 'rails_helper'

RSpec.describe "Users", type: :request do
  
  include CommonHelpers

  describe '#new' do
    it 'renders the sign up form' do
      get "/users/new"
      expect(response).to render_template(:new)
      # expect(response).to render_template(:edit)
    end
  end

  describe "#create" do

    it 'shows success message for sign up' do
      post("/users", params: { user: valid_user })
      expect(flash[:notice]).to eq("Signup is successful!")

      # expect(flash[:notice]).to eq("Signup is successful!!")
      # Failure/Error: expect(flash[:notice]).to eq("Signup is successful!!")
      # expected: "Signup is successful!!"
      # got: "Signup is successful!"
    end

    it 'redirects to home page after signin' do
      post("/users", params: { user: valid_user })
      expect(response).to redirect_to(root_path)
    end

    it 'shows new page for invalid informaton' do
      post("/users", params: { user: invalid_user })
      expect(response).to render_template(:new)
    end
  end
end
