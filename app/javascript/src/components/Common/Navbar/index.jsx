import React, { Component } from "react";
import NavItem from "./NavItem";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="bg-gray-100 nh-sidebar" key="sidebar">
        <div className="flex flex-col items-center justify-between w-full h-full">
          <div className="flex flex-col items-center justify-start w-full pt-4">
            <NavItem
              title="Explore Courses"
              link="/"
              icon="ri-flashlight-fill"
            />
            <NavItem
              title="My Courses"
              link="/courses"
              icon="ri-book-open-line"
            />
            <NavItem title="Profile" link="/profile" icon="ri-user-line" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
