require 'minitest/autorun'
require_relative 'dog'

class DogTest < Minitest::Test
  attr_accessor :dog

  def test_give_bone
    dog = Dog.new
    assert_equal 1, dog.give_bone('small')
    assert_equal 2, dog.give_bone('medium')
    assert_equal 3, dog.give_bone('large')
    assert_equal 3, dog.give_bone('extra_large')
  end

  def test_eat_bone
    dog = Dog.new
    dog.give_bone('small')
    dog.give_bone('medium')
    dog.give_bone('large')
    assert_equal 'large', dog.eat_bone
    assert_equal 2, dog.bone_count
  end

  def test_bone_count
    dog = Dog.new
    assert_equal 0, dog.bone_count
    dog.give_bone('small')
    assert_equal 1, dog.bone_count
    dog.give_bone('medium')
    assert_equal 2, dog.bone_count
    dog.give_bone('large')
    assert_equal 3, dog.bone_count
  end
end
