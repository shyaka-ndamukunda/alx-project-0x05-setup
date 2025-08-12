// hooks/useFetchData.ts

import { ImageProps } from "../interfaces";
import { useState } from "react";

// Generic types for the expected response data (T) and request body (R)
const useFetchData = <T, R extends { prompt: string }>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);

  const fetchData = async (endpoint: string, body: R) => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!resp.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await resp.json();
      setResponseData(result);
      
      // Update generatedImages with the new image and prompt
      setGeneratedImages((prev) => [...prev, { imageUrl: result?.message, prompt: body.prompt }]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    responseData,
    error,
    fetchData,
    generatedImages
  };
};

export default useFetchData;