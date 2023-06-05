class Student
  attr_reader :first_name, :last_name, :score

  def initialize(first_name, last_name, score)
    @first_name = first_name
    @last_name = last_name
    @score = score
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def grade
    case score
    when 90..100 then 'A'
    when 75..87  then 'B'
    when 60..74  then 'C'
    when 50..59  then 'D'
    else 'F'
    end
  end
end
