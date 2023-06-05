require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    let(:user) { build(:user) }

    it 'requires a first_name' do
      user.first_name = nil
      expect(user).to_not be_valid
    end

    it 'requires a last_name' do
      user.last_name = nil
      expect(user).to_not be_valid
    end

    it 'requires a unique email' do
      existing_user = create(:user)
      user.email = existing_user.email
      expect(user).to_not be_valid
    end

      it 'returns the full name' do
        user.first_name = 'John'
        user.last_name = 'Doe'
        expect(user.full_name).to eq('John Doe')
      end
    end
  end

  describe '#admin?' do
    let(:admin_user) { build(:user, admin: true) }
    let(:non_admin_user) { build(:user, admin: false) }

    it 'returns true for admin user' do
      expect(admin_user.admin?).to be_truthy
    end

    it 'returns false for non-admin user' do
      expect(non_admin_user.admin?).to be_falsey
    end
  end
end
