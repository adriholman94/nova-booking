class Facility < ApplicationRecord
  has_and_belongs_to_many :rooms
  has_and_belongs_to_many :estates
end
