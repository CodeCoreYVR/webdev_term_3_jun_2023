class Api::V1::AnswersController < Api::ApplicationController
    before_action :authenticate_user!
  
    def create
      question = Question.find(params[:question_id])
      answer_params = params.require(:answer).permit(:body)
      answer = Answer.new(answer_params)
      answer.question = question
      answer.user = current_user
  
      if answer.save
        render json: { id: answer.id, body: answer.body }
      else
        render json: { error: answer.errors }, status: :unprocessable_entity
      end
    end
  
    def destroy
      question = Question.find(params[:question_id])
      answer = Answer.find(params[:id])
  
      if !can?(:delete, answer)
        render json: { error: "You can't delete this answer" }, status: :unauthorized
      else
        answer.destroy
        head :ok
      end
    end
  end