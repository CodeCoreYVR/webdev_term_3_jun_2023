# This file is a Rails test file for the NewsArticlesController
require 'rails_helper'

# RSpec is the testing framework being used here
RSpec.describe "NewsArticles", type: :request do
  # Create a user factory
  let(:user) { create(:user) }
  # Create another user factory for testing authorization
  let(:other_user) { create(:user) }

  # The first group of tests is for the 'new' action in the controller
  describe 'GET #new' do
    # This context block tests the behavior of the 'new' action when the user is not signed in
    context 'when user is not signed in' do
      it 'redirects the user to the sign up page' do
        get new_news_article_path
        expect(response).to redirect_to(new_session_path)
      end
    end

    # This context block tests the behavior of the 'new' action when the user is signed in
    context 'when user is signed in' do
      # This before block stubs the current_user method to return the user factory
      before do
        # allow(controller).to receive(:current_user).and_return(user)
        post sessions_path, params: { email: user.email, password: user.password }
      end

      # This test checks if the 'new' action renders the correct template
      it 'renders the new template' do
        get new_news_article_path
        expect(response).to render_template(:new)
      end

      # This test checks if the 'new' action assigns a new instance of NewsArticle to @news_article
      it 'assigns a new instance of NewsArticle to @news_article' do
        get new_news_article_path
        expect(assigns(:news_article)).to be_a_new(NewsArticle)
      end
    end
  end

  # The second group of tests is for the 'create' action in the controller
  describe 'POST #create' do
    # This context block tests the behavior of the 'create' action when the user is not signed in
    context 'when user is not signed in' do
      it 'redirects the user to the sign up page' do
        post news_articles_path, params: { news_article: attributes_for(:news_article) }
        expect(response).to redirect_to(new_session_path)
      end
    end
  
    # This context block tests the behavior of the 'create' action when the user is signed in
    context 'when user is signed in' do
      # This before block stubs the current_user method to return the user factory
      before do
        # allow(controller).to receive(:current_user).and_return(user)
        post sessions_path, params: { email: user.email, password: user.password }
      end

      # This context block tests the behavior of the 'create' action with valid attributes
      context 'with valid attributes' do
        let (:valid_attributes) { attributes_for(:news_article) }

        # This test checks if the 'create' action creates a new NewsArticle with valid attributes
        it 'creates a new NewsArticle' do
          expect {
            post news_articles_path, params: { news_article: valid_attributes }
          }. to change(NewsArticle, :count).by(1)
        end

        # This test checks if the 'create' action associates the news article with the signed in user
        it 'associates the news article with the signed in user' do
          post news_articles_path, params: { news_article: valid_attributes }
          expect(assigns(:news_article).user).to eq(user)
        end

        # This test checks if the 'create' action redirects to the news article show page after creation
        it 'redirects to the news article show page' do
          post news_articles_path, params: { news_article: valid_attributes }
          expect(response).to redirect_to(news_article_path(assigns(:news_article)))
        end
      end

      # This context block tests the behavior of the 'create' action with invalid attributes
      context 'with invalid attributes' do
        let (:invalid_attributes) { attributes_for(:news_article, title: nil) }

        # This test checks if the 'create' action does not create a new NewsArticle with invalid attributes
        it 'does not create a new NewsArticle' do
          expect {
            post news_articles_path, params: { news_article: invalid_attributes  }
          }.to_not change(NewsArticle, :count)
        end

        # This test checks if the 'create' action renders the 'new' template when given invalid attributes
        it 'renders the new template' do
          post news_articles_path, params: { news_article: invalid_attributes}
          expect(response).to render_template(:new)
        end
      end
    end
  end

  # The third group of tests is for the 'show' action in the controller
  describe 'GET #show' do
    let(:news_article) { create(:news_article) }
  
    # This test checks if the 'show' action renders the correct template
    it 'renders the show template' do
      get news_article_path(news_article.id)
      expect(response).to render_template(:show)
    end
  
    # This test checks if the 'show' action assigns the requested news_article to @news_article
    it 'assigns the requested news_article to @news_article' do
      get news_articles_path(news_article.id)
      expect(response.body).to include(news_article.title)
    end
  end
  
  # The fourth group of tests is for the 'index' action in the controller
  describe 'GET #index' do
    # This test checks if the 'index' action renders the correct template
    it 'renders the index template' do
      get news_articles_path
      expect(response).to render_template(:index)
    end
  
    # This test checks if the 'index' action assigns all news_articles to @news_articles
    it 'assigns all news_articles to @news_articles' do
      news_article1 = create(:news_article)
      news_article2 = create(:news_article)
      get news_articles_path
      expect(assigns(:news_articles)).to match_array([news_article1, news_article2])
    end
  end
  
  # The fifth group of tests is for the 'destroy' action in the controller
  describe 'DELETE #destroy' do
    let!(:news_article) { create(:news_article) }
  
    # This test checks if the 'destroy' action deletes the news_article
    it 'deletes the news_article' do
      expect {
        delete news_article_path(news_article.id)
      }.to change(NewsArticle, :count).by(-1)
    end

    # This test checks if the 'destroy' action redirects to the news_articles index after deletion
    it 'redirects to the news_articles index' do
      delete news_article_path(news_article.id)
      expect(response).to redirect_to(news_articles_path)
    end
  end  

  # The sixth group of tests is for the 'edit' action in the controller
  describe 'GET #edit' do
    # Create a news_article factory
    let(:news_article) { create(:news_article) }
    
    # This context block tests the behavior of the 'edit' action when the user is not signed in
    context 'when user is not signed in' do
      it 'redirects the user to the sign up or sign in page' do
        get edit_news_article_path(news_article.id)
        expect(response).to redirect_to(new_session_path)
      end
    end

    # This context block tests the behavior of the 'edit' action when the user is signed in
    context 'when user is signed in but not the owner of the news article' do
      # This before block stubs the current_user method to return the other_user factory
      before do
        # allow(controller).to receive(:current_user).and_return(other_user)
        post sessions_path, params: { email: other_user.email, password: other_user.password }
      end

      # This test checks if the 'edit' action redirects to the root page
      it 'redirects the user to the root_page' do
        get edit_news_article_path(news_article.id)
        expect(response).to redirect_to(root_path)
      end

      # This test checks if the 'edit' action alerts the user with a flash
      it 'alerts the user with a flash' do
        get edit_news_article_path(news_article.id)
        expect(flash[:alert]).to be_present
      end
    end

    # This context block tests the behavior of the 'edit' action when the user is signed in
    context 'when user is signed in and is the owner of the news article' do
      # This before block stubs the current_user method to return the user factory
      before do
        news_article.update(user: user)
        # allow(controller).to receive(:current_user).and_return(user)
        post sessions_path, params: { email: user.email, password: user.password }
      end

      # This test checks if the 'edit' action renders the correct template
      it 'renders the edit template' do
        get edit_news_article_path(news_article.id)
        expect(response).to render_template(:edit)
      end

      # This test checks if the 'edit' action assigns an instance variable to the campaign being edited
      it 'assigns an instance variable to the campaign being edited' do
        get edit_news_article_path(news_article.id)
        expect(assigns(:news_article)).to eq(news_article)
      end
    end
  end

  # The seventh group of tests is for the 'update' action in the controller
  describe 'PUT #update' do
    let(:news_article) { create(:news_article) }
    let(:valid_attributes) { attributes_for(:news_article, title: 'Updated Title') }
    let(:invalid_attributes) { attributes_for(:news_article, title: nil) }
      
    # This context block tests the behavior of the 'update' action when the user is not signed in
    context 'when user is not signed in' do
      it 'redirects the user to the sign up page' do
        put news_article_path(news_article.id), params: { news_article: valid_attributes }
        expect(response).to redirect_to(new_session_path)
      end
    end
  
    # This context block tests the behavior of the 'update' action when the user is signed in
    context 'when user is signed in but not the owner of the news article' do
      # This before block stubs the current_user method to return the other_user factory
      before do
        # allow(controller).to receive(:current_user).and_return(other_user)
        post sessions_path, params: { email: other_user.email, password: other_user.password }
      end
  
      # This test checks if the 'update' action redirects to the root page
      it 'redirects the user to the root_page' do
        put news_article_path(news_article.id), params: { news_article: valid_attributes }
        expect(response).to redirect_to(root_path)
      end
  
      # This test checks if the 'update' action alerts the user with a flash
      it 'alerts the user with a flash' do
        put news_article_path(news_article.id), params: { news_article: valid_attributes }
        expect(flash[:alert]).to be_present
      end
    end

    # This context block tests the behavior of the 'update' action when the user is signed in
    context 'when user is signed in and is the owner of the news article with valid attributes' do
      # This before block stubs the current_user method to return the user factory
      before do
        news_article.update(user: user)
        # allow(controller).to receive(:current_user).and_return(user)
        post sessions_path, params: { email: user.email, password: user.password }
      end

      # This test checks if the 'update' action updates the news_article
      it 'updates the news_article' do
        put news_article_path(news_article.id), params: { news_article: { title: 'Updated Title' } }
        news_article.reload
        expect(news_article.title).to eq('Updated Title')
      end
  
      # This test checks if the 'update' action redirects to the news_article show page
      it 'redirects to the news_article show page' do
        put news_article_path(news_article.id), params: { news_article: valid_attributes }
        expect(response).to redirect_to(news_article_path(news_article))
      end
    end
  
    context 'when user is signed in and is the owner of the news article with invalid attributes' do
      before do
        news_article.update(user: user)
        # allow(controller).to receive(:current_user).and_return(user)
        post sessions_path, params: { email: user.email, password: user.password }
      end
      
      # This test checks if the 'update' action does not update the news_article
      it 'does not update the news_article' do
        put news_article_path(news_article.id), params: { news_article: invalid_attributes }
        news_article.reload
        expect(news_article.title).not_to eq(nil)
      end
  
      # This test checks if the 'update' action renders the edit template
      it 'renders the edit template' do
        put news_article_path(news_article.id), params: { news_article: invalid_attributes }
        expect(response).to render_template(:edit)
      end
    end
  end
end