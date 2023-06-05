require 'rails_helper'

RSpec.describe "Answers", type: :request do

  include CommonHelpers
  include SessionHelpers

  describe "#create" do

    it "redirects to question show page after creating a new answer" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      login(valid_user)
      
      post "/questions/" + question1.id.to_s + "/answers", params: { answer: valid_answer(user1.id, question1.id)}
      expect(response).to redirect_to(question_path(question1))
    end

    it "redirects to sign in page for unauthenticated user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      
      post "/questions/" + question1.id.to_s + "/answers", params: { answer: {
        body: "A valid answer",
        user_id: user1.id,
        question_id: question1.id
      }}
      expect(response).to redirect_to(sessions_new_path)
    end
  end
  
  describe "#destroy" do

    it "redirects to question show page" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      answer1 = Answer.create(valid_answer(user1.id, question1.id))
      login(valid_user)
      delete "/questions/" + question1.id.to_s + "/answers/" + answer1.id.to_s, params: { id: answer1.id }
      expect(response).to redirect_to(question_path(question1))
    end

    it "redirects to rootpath for unauthorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      answer1 = Answer.create(valid_answer(user1.id, question1.id))

      user2 = User.create(valid_user_2)
      login(valid_user_2)
      
      delete "/questions/" + question1.id.to_s + "/answers/" + answer1.id.to_s, params: { id: answer1.id }
      expect(response).to redirect_to(root_path)
    end

    it "shows alert message for unauthorized user" do
      user1 = User.create(valid_user)
      question1 = Question.create(valid_question(user1))
      answer1 = Answer.create(valid_answer(user1.id, question1.id))

      user2 = User.create(valid_user_2)
      login(valid_user_2)
      
      delete "/questions/" + question1.id.to_s + "/answers/" + answer1.id.to_s, params: { id: answer1.id }
      expect(flash[:alert]).to eq("Unauthoized user!")
    end

  end
end
