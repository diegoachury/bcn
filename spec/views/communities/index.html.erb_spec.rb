require 'rails_helper'

RSpec.describe "communities/index", type: :view do
  before(:each) do
    assign(:communities, [
      Community.create!(
        :name => "Name",
        :description => "Description",
        :home_page => "Home Page",
        :color => "Color"
      ),
      Community.create!(
        :name => "Name",
        :description => "Description",
        :home_page => "Home Page",
        :color => "Color"
      )
    ])
  end

  it "renders a list of communities" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Description".to_s, :count => 2
    assert_select "tr>td", :text => "Home Page".to_s, :count => 2
    assert_select "tr>td", :text => "Color".to_s, :count => 2
  end
end
