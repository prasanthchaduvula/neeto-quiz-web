const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN": {
      localStorage.setItem("authToken", payload.token);
      localStorage.setItem("authPhone", payload.phoneNumber);
      localStorage.setItem("authUserId", payload.userId);
      localStorage.setItem("authOrgId", payload.orgId);
      localStorage.setItem("authSubdomain", payload.subdomain);
      localStorage.setItem("authRole", payload.role);
      return {
        isLoggedIn: true,
        authToken: payload.token,
        authPhone: payload.phoneNumber,
        authUserId: payload.userId,
        authOrgId: payload.orgId,
        authSubdomain: payload.subdomain,
        authRole: payload.role,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        isLoggedIn: false,
        authToken: null,
        authPhone: null,
        authUserId: null,
        authOrgId: null,
        authSubdomain: null,
        authRole: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default authReducer;
