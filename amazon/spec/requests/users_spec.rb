require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe 'GET /users/new' do
    before { get new_user_path }

    it 'renders the new template' do
      expect(response).to render_template(:new)
    end

    it 'assigns a new User instance variable' do
      expect(assigns(:user)).to be_a_new(User)
    end
  end

  describe 'POST /users' do
    context 'with valid parameters' do
      let(:valid_params) { attributes_for(:user) }

      it 'creates a new user in the database' do
        expect {
          post users_path, params: { user: valid_params }
        }.to change(User, :count).by(1)
      end

      it 'redirects to the home page and signs the user in' do
        post users_path, params: { user: valid_params }
        expect(response).to redirect_to(home_path)
        follow_redirect!
        expect(response.body).to include("Signed in as #{User.last.full_name}")
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) { attributes_for(:user, email: '') }

      it 'does not create a new user in the database' do
        expect {
          post users_path, params: { user: invalid_params }
        }.to_not change(User, :count)
      end

      it 'renders the new template' do
        post users_path, params: { user: invalid_params }
        expect(response).to render_template(:new)
      end
    end
  end
end
