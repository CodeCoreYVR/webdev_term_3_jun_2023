# minitest/autorun gives us access to the Minitest::Test class
require 'minitest/autorun'
# require_relative is like require, but relative to the current file
require_relative 'circle'

# Define a class called CircleTest that inherits from Minitest::Test
class CircleTest < Minitest::Test
  # The test method is automatically run and tests are run in alphabetical order
  
  def test_diameter
    # Create a new instance of the Circle class with a radius of 5
    circle = Circle.new(5)
    # The assert_equal method checks that the two arguments are equal
    assert_equal 10, circle.diameter
  end

  def test_area
    circle = Circle.new(5)
    # The assert_in_delta method checks that the two arguments are equal within a certain delta
    assert_in_delta 78.5398163397, circle.area, 0.0001
  end

  def test_perimeter
    circle = Circle.new(5)
    # The assert_in_delta method checks that the two arguments are equal within a certain delta
    assert_in_delta 31.4159265359, circle.perimeter, 0.0001
  end
end
