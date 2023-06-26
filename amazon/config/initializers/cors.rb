Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:5500', '127.0.0.1:5500' # replace with the domain of your SPA

    resource( 
      '/api/*', 
      headers: :any, 
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
    )
  end
end

