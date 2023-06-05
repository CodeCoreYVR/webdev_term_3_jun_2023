require 'rails_helper'

RANDOM_100_CHARS = "hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world 
hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world"

RSpec.describe JobPost, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  # above is just the boilerplate as an example

  describe "validates" do
    #the keyword "describe" describes the context within which the test willl happen
    #The `describe` is used to group related tests together. 
    #i.e. we are describing the context of testing validations
    #then we are describing the context of tests for "title", "description", etc.
    # It's primarily an organizational tool.
    # All of the grouped tests should be written within the block of the method
    describe "title" do
      # `it` is another RSpec keyword which is used to define an "Example"(test case)
      # The string argument often uses the word `should`
      # and it meant to describe what specific behaviour should happen inside this block
      it "requires a title to be present" do
        #GIVEN
        # job_post = JobPost.new()
        job_post = FactoryBot.build(:job_post, title:nil)

        #WHEN
        job_post.valid?

        #THEN
        #expect is passed a value we're asserting that we can chain with .to()
        #.to() accepts an assertion/expectation clause
        #Ther following will pass the test if the errors.messages hash has a key named :title
        #This occurs when "title" validation fails
        expect(job_post.errors.messages).to(have_key(:title))
      end

      it "requires a unique title" do
        #GIVEN 
        # persisted_job_post = JobPost.create(
        #   title: "Full Stack Developer",
        #   describe: RANDOM_100_CHARS,
        #   min_salary: 35_000,
        #   location: 'Vancouver'
        # )

        # job_post = JobPost.new(
        #   title: persisted_job_post.title,
        #   describe: RANDOM_100_CHARS,
        #   min_salary: 35_000,
        #   location: 'Vancouver'
        # )
        persisted_job_post = FactoryBot.create(:job_post)
        job_post = FactoryBot.build(:job_post, title:persisted_job_post.title)

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:title))
      end

    end
    
    describe "describe" do 
      it "requires a describe to be present" do
        #GIVEN
        # job_post = JobPost.new(title: "Title is present")
        job_post = FactoryBot.build(:job_post, describe:nil)

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:describe))
      end

      it "requires a describe to be at lease 100 words" do
        #GIVEN
        # job_post = JobPost.new(title: "Describe Test", describe: "abc")
        job_post = FactoryBot.build(:job_post, describe:"I am less than 100 words")

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:describe))

      end
    
    end

    describe "min_salary" do
      it "requires min_salary to be numerical" do
        #GIVEN
        # job_post = JobPost.new(title: "For Minimum Salary", describe:RANDOM_100_CHARS, min_salary: "My min salary")
        job_post = FactoryBot.build(:job_post, min_salary:"Not numerical")
      
        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:min_salary))
      end
      
      it "requires min_salary to be at least 30_000" do
        #GIVEN
        # job_post = JobPost.new(title: "For Minimum Salary 25000", describe:RANDOM_100_CHARS, min_salary: 25_000)
        job_post = FactoryBot.build(:job_post, min_salary:25_000)

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:min_salary))
      end 

    end

    describe "location" do
      it "requires a location to be present" do
        #GIVEN
        # job_post = JobPost.new(title: "My Home Jobe", describe:RANDOM_100_CHARS, min_salary: 35_000)
        job_post = FactoryBot.build(:job_post, location:nil)

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:location))
      end 
    end
  end

end

