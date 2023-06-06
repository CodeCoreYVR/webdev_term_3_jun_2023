class Circle
  # attr_reader creates a getter method for the instance variable radius
  attr_reader :radius

  # The initialize method is called when an object is created with Circle.new
  def initialize(radius)
    @radius = radius
  end

  # The methods below are called instance methods because they are called on
  def diameter
    radius * 2
  end

  # The area of a circle is pi times the radius squared
  def area
    Math::PI * (radius ** 2)
  end

  # The perimeter of a circle is 2 times pi times the radius
  def perimeter
    2 * Math::PI * radius
  end
end
