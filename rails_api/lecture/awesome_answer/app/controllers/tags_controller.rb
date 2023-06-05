class TagsController < ApplicationController
    before_action :authenticate_user!, only: [:create]

    def index
        @tags = Tag.order("created_at desc")
    end

    def new
        @tag = Tag.new
    end

    def create
        tag_params = params.require(:tag).permit(:name)
        @tag = Tag.new tag_params

        if @tag.save
            redirect_to tags_path
        else
            render :new
        end
    end

    def show
        @tag = Tag.find(params[:id])
    end

    # def destroy

    # end

end