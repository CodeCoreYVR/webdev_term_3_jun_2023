require 'minitest/autorun'
require_relative 'student'

class StudentTest < Minitest::Test
  def test_initialize
    student = Student.new('James', 'Bond', 85)
    assert_equal 'James', student.first_name
    assert_equal 'Bond', student.last_name
    assert_equal 85, student.score
  end

  def test_full_name
    student = Student.new('James', 'Bond', 85)
    assert_equal 'James Bond', student.full_name
  end

  def test_grade
    student1 = Student.new('James', 'Bond', 30)
    student2 = Student.new('James', 'Bond', 95)
    assert_equal 'F', student1.grade
    assert_equal 'A', student2.grade
  end
end
