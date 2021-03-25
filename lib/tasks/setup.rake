# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  create_organization!
  create_admin_user!

  create_spinkart!
end

def create_organization!
  Organization.create!(name: "App", subdomain: Rails.application.secrets.app_subdomain)
end

def create_admin_user!
  User.create!(first_name: "Oliver", last_name: "Smith", phone_number: "+917680918423", role: "admin")
end

def create_spinkart!
  org = Organization.create!(name: "Spinkart", subdomain: "spinkart")
  User.create!(
    first_name: "Oliver",
    last_name: "Smith",
    phone_number: "+919999999999",
    organization: org,
    role: "admin"
  )
end


