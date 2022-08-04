import React from "react";

interface IRequestConfig {
  method?: "GET" | "POST";
  headers?: HeadersInit;
  body?: BodyInit;
}

const useHTTP = <T>(
  url: string,
  applyData: (data: T) => void,
  requestConfig?: IRequestConfig
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: requestConfig?.method || "GET",
        headers: requestConfig?.headers || {},
        body: requestConfig?.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data: T = await response.json();
      applyData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHTTP;
