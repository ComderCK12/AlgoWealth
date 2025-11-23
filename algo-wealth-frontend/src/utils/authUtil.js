import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const getRoles = () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    const decoded = jwtDecode(token);
    return decoded.roles || [];
};

export const hasRole = (required) => {
  const roles = getRoles();
  if (!roles.length) return false;

  // if "required" is a string → "ADMIN"
  if (typeof required === "string") {
    return roles.includes(required);
  }

  // if array → ["ADMIN","USER"]
  if (Array.isArray(required)) {
    return required.some((r) => roles.includes(r));
  }

  return false;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};


// export const isLoggedIn = () => !!localStorage.getItem("token")

// export const getRoles = () => JSON.parse(localStorage.getItem("token") || "[]")

// export const hasRole = (role) => getRoles().include(role)

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("roles");
//   window.location.href = "/login";
// };
