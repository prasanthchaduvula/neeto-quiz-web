import React from "react";
import NavItem from "./NavItem";
import { withRouter } from "react-router-dom";
import { useAuthState } from "contexts/auth";

function NavBar() {
  const authState = useAuthState();

  return (
    <div className="bg-gray-100 nh-sidebar" key="sidebar">
      <div className="flex flex-col items-center justify-between w-full h-full py-4">
        <div className="flex flex-col items-center justify-start w-full ">
          <NavItem
            title="Explore Marketplace"
            link="/explore"
            icon="ri-flashlight-fill"
            className="mb-6"
          />
          <NavItem
            title="My Courses"
            link="/courses"
            icon="ri-book-open-line"
            className="mb-6"
          />
          <NavItem
            title="Mocktests"
            link="/mocktests"
            icon="ri-file-list-3-line"
          />
          {authState.authRole == "admin" && (
            <>
              <NavItem
                title="Instructors"
                link="/instructors"
                icon="ri-contacts-line"
              />
              <NavItem title="Students" link="/students" icon="ri-group-line" />
              <NavItem
                title="Settings"
                link="/settings"
                icon="ri-settings-2-line"
              />
            </>
          )}
        </div>
        <NavItem title="Account" link="/account" icon="ri-user-line" />
      </div>
    </div>
  );
}

export default withRouter(NavBar);
