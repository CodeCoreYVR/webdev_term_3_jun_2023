module CommonHelpers
    def valid_user
        { 
            first_name: 'John',
            last_name: 'Smith',
            email: 'john@smith.com',
            password: 'supersecret'
        }
    end

    def valid_user_2
        { 
            first_name: 'Peter',
            last_name: 'Parker',
            email: 'peter@parker.com',
            password: 'supersecret'
        }
    end

    def invalid_user
        { 
            first_name: nil,
            last_name: 'Smith',
            email: nil,
            password: 'supersecret'
        }
    end

    def valid_question(user)
        {
            title: "Compiler and Interpreter",
            body: "What is the difference between compiler and interpreter?",
            user_id: user[:id]
        }
    end

    def valid_answer(user_id, question_id)
        {
            body: "A valid answer",
            user_id: user_id,
            question_id: question_id
          }
    end
end