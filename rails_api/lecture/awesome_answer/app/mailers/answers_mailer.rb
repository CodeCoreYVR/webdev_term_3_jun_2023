class AnswersMailer < ApplicationMailer

    def notify_questioner(answer)
      @answer   = answer
      @question = answer.question
      @owner    = @question.user
      mail(to: @owner.email, subject: "You got a new answer!")
    end
  
end