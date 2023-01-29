"use client";
const STORAGE_KEY = "AU_LENS_APP";

// Simple function to say if the token is expired or not
export function isTokenExpired(exp) {
  if (!exp) return true;

  if (Date.now() >= exp * 1000) {
    return true;
  }

  return false;
}

// 1. Reading the access token from the storage
export const readAccessToken = () => {
  // Make sure we are on client side environment
  if (typeof window === "undefined") return null;

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Local storage is not available");
  }

  const data = ls.getItem(STORAGE_KEY);
  if (!data) return null;

  const { accessToken, refreshToken, exp } = JSON.parse(data);

  return { accessToken, refreshToken, exp };
};

// 2. Setting the access toke in the storage
export const setAccessToken = (accessToken, refreshToken) => {
  // 1. Parse the JWT to get the expiration date
  const { exp } = parseJWT(accessToken);

  // 2. Set all three variables inside the local storage
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Local storage is not available");
  }

  ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
};

// 3. Parse the JWT token and extract the expiration date
export const parseJWT = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
