# frozen_string_literal: true

require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = organizations(:app)
  end

  test "organization should be valid" do
    assert @organization.valid?
  end

  test "organization name should be present" do
    @organization.name = ""
    assert_not @organization.valid?
  end

  test "subdomain should be present" do
    @organization.subdomain = ""
    assert_not @organization.valid?
  end

  test "subdomain should be of valid length" do
    @organization.subdomain = "a" * 1
    assert_not @organization.valid?

    @organization.subdomain = "a" * 33
    assert_not @organization.valid?
  end

  test "subdomain should be unique" do
    new_organization = Organization.new(name: "sample", subdomain: @organization.subdomain)
    new_organization.save
    assert_not new_organization.valid?
  end

  test "subdomain should be lowercase alphanumeric and hyphen(-)" do
    @organization.subdomain = "AppQuer"
    assert_not @organization.valid?
  end

  test "subdomain should not have reserved domains" do
    @organization.subdomain = "www"
    assert_not @organization.valid?
  end
end
