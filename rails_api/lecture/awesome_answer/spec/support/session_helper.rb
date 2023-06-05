module SessionHelpers
    def login(user)
      post "/sessions", params: {
        email: user[:email],
        password: user[:password]
      }
    end
end