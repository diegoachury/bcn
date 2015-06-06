class Comment < ActiveRecord::Base
  extend ActsAsTree::TreeWalker
  attr_accessor :comments

  acts_as_paranoid
  dragonfly_accessor :photo
  acts_as_tree order: 'created_at'

  validates :content, presence: true
  validates_property :ext, of: :photo, in: ['jpeg', 'jpg', 'png', 'gif', 'svg', 'svgz']
  validates_property :mime_type, of: :photo, in: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/svg']
  validates_property :format, of: :photo, in: ['jpeg', 'png', 'gif', 'svg', 'svgz']

  belongs_to :post
  belongs_to :user

  before_destroy :raise_children


  def raise_children
    children.each do |child|
      if child.parent.parent
        child.parent_id = child.parent.parent.id
      else
        child.post = child.root.post
        child.parent_id = nil
      end
      child.save
    end
  end
end
