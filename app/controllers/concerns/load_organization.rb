# frozen_string_literal: true

module LoadOrganization
  extend ActiveSupport::Concern

  included do
    before_action :load_organization
  end

  def load_organization
    if request_subdomain.present?
      @organization = Organization.find_by(subdomain: request_subdomain)
    else
      # ideally redirections must be handled from web server
      redirect_to(app_subdomain_url) and return
    end
  end

  private

    def set_current_organization
      Organization.current = @organization
      session[:organization_id] = @organization.id
    end

    def www_subdomain?
      request_subdomain.present? && request_subdomain == "www"
    end

    def app_subdomain_url
      if request.subdomain.present?
        request.url.sub(/\/\/[^.]+/, "//app")
      else
        request.url.sub(/\/\//, "//app.")
      end
    end

    def request_subdomain
      if ENV["HEROKU_APP_NAME"].present?
        "spinkart"
      elsif ENV["DEFAULT_SUBDOMAIN"].present?
        ENV["DEFAULT_SUBDOMAIN"]
      else
        request.subdomain
      end
    end
end