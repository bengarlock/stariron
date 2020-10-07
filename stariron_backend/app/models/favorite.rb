class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :sign_object
end
