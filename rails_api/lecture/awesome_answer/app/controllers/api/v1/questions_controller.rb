class Api::V1::QuestionsController < Api::ApplicationController
    before_action :set_params, only: [:show, :destroy, :update]
    before_action :authenticate_user!, except: [:index, :show]

    def index
        questions = Question.order("created_at desc")
        render json: questions, each_serializer: QuestionCollectionSerializer
    end

    def show
        render json: @question
    end

    def create
        question = Question.new question_params
        question.user = current_user

        if question.save
            if params[:tags] && params[:tags][:id] && params[:tags][:id].length
                tag_ids = params[:tags][:id]
                tag_ids.each do |tag_id|
                    tag = Tagging.create(tag_id: tag_id, question_id: question.id)
                end
            end
            render json: question
        else
            render json: question.errors, status: :unprocessable_entity
        end
    end

    def update
        if can?(:edit, @question) == false
            render json: {status: 401}, status: 401
        elsif @question.update (question_params)
            render json: @question
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
