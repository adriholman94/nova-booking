class Room < ApplicationRecord
  has_and_belongs_to_many :facilities
  belongs_to :estate
  has_many :booking_details

  extend Enumerize

  enumerize :room_type, in: [:single, :double, :family]
  enumerize :status, in: [:available, :occupied]

end
