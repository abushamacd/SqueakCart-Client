const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${userFromLocalStorage?.data?.token}`,
    Accept: "application/json",
  },
};
