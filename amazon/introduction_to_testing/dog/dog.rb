class Dog
  attr_accessor :bones

  def initialize
    @bones = []
  end

  def give_bone(size)
    @bones << size if @bones.size < 3
    @bones.size
  end

  def eat_bone
    if bones.size > 0
      bones.pop
    else
      "I don't have any bones. :("
    end
  end

  def bone_count
    @bones.count
  end
end
