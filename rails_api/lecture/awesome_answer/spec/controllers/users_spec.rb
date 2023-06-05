require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe '#new' do
    it 'renders the sign up form' do
      get "http://127.0.0.1:3000/users/new"
      expect(response).to render_template(:new)
    end
  end
end
