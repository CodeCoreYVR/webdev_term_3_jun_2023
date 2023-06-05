class AnswersController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    def create
        @question = Question.find(params[:question_id])
        answer_params = params.require(:answer).permit(:body)
        @answer = Answer.new answer_params
        @answer.question = @question
        @answer.user = current_user

        if @answer.save
            AnswersMailer.notify_questioner(@answer).deliver_later 
            redirect_to question_path(@question)
        else
            render '/question/show'
        end
    end

    def destroy
        
        @question = Question.find(params[:question_id])
        @answer = Answer.find(params[:id])

        if can?(:delete, @answer) == false
            redirect_to root_path, alert: "Unauthoized user!"
        else
            @answer.destroy
            redirect_to question_path(@question)
        end
    end
end
