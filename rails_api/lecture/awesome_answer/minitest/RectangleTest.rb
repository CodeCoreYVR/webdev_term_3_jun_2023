require "minitest/autorun"
require "./Rectangle.rb"

class RectangleTest < Minitest::Test 
    def test_area
        #GIVEN
        rectangle = Rectangle.new(2, 10)

        #WHEN
        area = rectangle.area

        #THEN
        assert_equal(20, area)
    end

    def test_perimeter
        #GIVEN
        rectangle = Rectangle.new(2, 10)
        
        #WHEN
        perimeter = rectangle.perimeter

        #THEN
        assert_equal(24, perimeter)
    end

    def test_is_square
        #GIVEN
        rectangle = Rectangle.new(2, 2)

        #WHEN
        square = rectangle.is_square?

        #THEN
        assert_equal(true, square)
    end
end