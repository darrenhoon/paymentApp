export const authServiceUrl = "http://localhost:3000/api";
export const stripeServiceUrl = "http://localhost:3001/api";
export const productsServiceUrl = "http://localhost:3002/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
