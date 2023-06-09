class Api::V1::QuestionsController < Api::ApplicationController
    before_action :set_params, only: [:show, :destroy, :update]
    before_action :authenticate_user!, except: [:index, :show]

    def index
        @questions = Question.order("created_at desc")
        render json: @questions, each_serializer: QuestionCollectionSerializer
    end

    def show
        render json: @question
    end

    def create
        @question = Question.new question_params
        @question.user = current_user

        # ActiveRecord.save! will return the expection 'ActiveRecord::RecordInvalid', if validation fails. If it's successful, it returns true
        # ActiveRecord.save will return false, if validation fails. If it's successful, it returns true.
        # rescue_from ActiveRecord::RecordInvalid is used
        # @question.save!

        if @question.save
            if params[:tags] && params[:tags][:id] && params[:tags][:id].length
                tag_ids = params[:tags][:id]
                tag_ids.each do |tag_id|
                    tag = Tagging.create(tag_id: tag_id, question_id: @question.id)
                end
            end
            render json: @question
        else
            render json: @question.errors, status: :unprocessable_entity
        end
    end

    def update
        if can?(:edit, @question) == false
            render json: {message: "Unauthoized user!"}, status: 401
        elsif @question.update (question_params)
            render json: @question
        else
            render json: @question.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if @question.destroy
            render json: @question
        else
            render json: @question.errors, status: :unprocessable_entity
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
