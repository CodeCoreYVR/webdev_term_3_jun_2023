Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:5500', '127.0.0.1:5500' # replace with the domain of your SPA

    resource( 
      "/api/*", 
      headers: :any, 
      methods: [:get, :post, :put, :patch, :delete, :option],
      credentials: true,
      expose: ['Access-Control-Allow-Origin'] 
    )
  end
end

