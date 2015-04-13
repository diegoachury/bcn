class Post < ActiveRecord::Base
  acts_as_paranoid
  validates :title, presence: true
  validates :description, presence: true

  has_one :location
  has_and_belongs_to_many :communities

  after_create do
    Log.create({post: self, action: "created"})
  end

  after_update do
    Log.create({post: self, action: "updated"})
  end


  def as_json(options={})
    super(:only => [
        :id,
        :title,
        :description,
      ],
      :include => {
        :location => {
          :only => [
            :id,
            :lat,
            :lon,
            :name,
            :address,
            :city,
            :state,
            :postcode,
            :county,
            :country
          ]
        },
        :communities => {
          :only => [
            :id,
            :name,
            :description,
            :home_page,
            :color
          ]
        },
      }
    )
  end

  def create_location(params)
    loc = Location.new.get_location_name(Location.new, params)
    self.location = loc
  end
end
