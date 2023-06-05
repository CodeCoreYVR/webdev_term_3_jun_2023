require 'rails_helper'

RSpec.describe "Questions", type: :request do
  
  include CommonHelpers
  include SessionHelpers

  describe "#index" do
    it 'renders list of questions' do
      get "/questions"
      expect(response).to render_template(:index)
    end
  end

  describe "#new" do
    
    it 'redirects to signin page' do
      get "/questions/new"
      expect(response).to redirect_to(sessions_new_path)
    end

    it 'renders new question page' do
      user1 = User.create(valid_user)
      login(valid_user)  
      get "/questions/new"
      expect(response).to render_template(:new)
    end
  end

  describe "#create" do
    
    it "redirects to question show page" do
      user2 = User.create(valid_user_2)
      login(valid_user_2)
      post "/questions", params: { question: valid_question(valid_user_2)}
      expect(response).to redirect_to(question_path(Question.last))
    end

  end

  describe "#edit" do

    it "redirects to homepage for unauthorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))

      user2 = User.create(valid_user_2)
      login(valid_user_2)

      get "/questions/" + question1.id.to_s + "/edit"
      expect(response).to redirect_to(root_path)
    end

    it "shows edit page for authorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      login(valid_user)
      get "/questions/" + question1.id.to_s + "/edit"
      expect(response).to render_template(:edit)
    end

    it "show message for unauthorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))

      user2 = User.create(valid_user_2)
      login(valid_user_2)

      get "/questions/" + question1.id.to_s + "/edit"
      expect(flash[:alert]).to eq "Unauthoized user!"
    end

  end

  describe "#update" do

    it "redirects to show page" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      login(valid_user)
      patch "/questions/" + question1.id.to_s, params: { question: {
        title: "edited title",
        body: "edited body",
        user_id: user1.id
      }}
      expect(response).to redirect_to(question_path(question1))
    end

    it "redirects to root path for unauthorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))

      user2 = User.create(valid_user_2)
      login(valid_user_2)
      
      patch "/questions/" + question1.id.to_s, params: { question: {
        title: "edited title",
        body: "edited body",
        user_id: user2.id
      }}

      expect(response).to redirect_to(root_path)
    end

    describe "#destroy" do

      it "redirects to question index page" do
        user1 = User.create(valid_user)
        question1 = Question.create(valid_question(user1))
        login(valid_user)
        delete "/questions/" + question1.id.to_s, params: { id: question1[:id] }
        expect(response).to redirect_to(questions_path)
      end

      it "redirect to root path for unauthorized user" do
        user1 = User.create(valid_user)
        question1 = Question.create(valid_question(user1))
        user2 = User.create(valid_user_2)
        login(valid_user_2)
        delete "/questions/" + question1.id.to_s, params: { id: question1[:id] }
        expect(response).to redirect_to(root_path)
      end

      it "redirect to sign in page for unauthenticated user" do
        user1 = User.create(valid_user)
        question1 = Question.create(valid_question(user1))
        delete "/questions/" + question1.id.to_s, params: { id: question1[:id] }
        expect(response).to redirect_to(sessions_new_path)
      end

    end

  end

end
