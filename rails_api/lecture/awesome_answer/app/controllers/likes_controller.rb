class LikesController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy]

    def create
        @question = Question.find(params[:question_id])
        @like = Like.new(question: @question, user:current_user)

        if can?(:like, @question)
            if @like.save
                redirect_to question_path(@question), notice: "Question Liked"
            else
                redirect_to question_path(@question), alert: @like.error.full_messages.join(", ")
            end  
        else
            redirect_to question_path(@question), alert: "You can not like this question"
        end
    end

    def destroy
        @like = current_user.likes.find(params[:id])
        if can?(:destroy, @like)
            @like.destroy
            redirect_to question_path(@like.question), notice: "Question Unliked"
        else 
            redirect_to question_path(@like.question), warning: "Couldn't like the question"
        end
    end
end
