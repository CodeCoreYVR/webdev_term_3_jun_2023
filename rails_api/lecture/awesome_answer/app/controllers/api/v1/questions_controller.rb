class Api::V1::QuestionsController < Api::ApplicationController
    before_action :set_params, only: [:show, :destroy]

    def index
        questions = Question.order("created_at desc")
        render json: questions, each_serializer: QuestionCollectionSerializer
    end

    def show
        # question = Question.find(params[:id])
        render json: @question
    end

    def create
        question = Question.new question_params

        if question.save
            render json: question
        else
            render json: @question.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if @question.destroy
            head :ok
        else
            head :bad_request
        end
    end

    private
    def question_params
        params.require(:question).permit(:title, :body)
    end

    def set_params
        @question = Question.find params[:id]
    end
end
