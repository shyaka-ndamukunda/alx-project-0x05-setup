// pages/index.tsx

import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const { isLoading, responseData, generatedImages, fetchData } = useFetchData<any, { prompt: string }>();

  // A function to trigger the API call using our custom hook
  const handleGenerateImage = () => {
    // Only fetch if a prompt is provided
    if (prompt.trim()) {
      fetchData('/api/generate-image', { prompt });
    }
  };

  // Update the main image URL whenever the hook returns new data
  useEffect(() => {
    if (responseData?.message) {
      setMainImageUrl(responseData.message);
    }
  }, [responseData]);

  // A simple placeholder component for ImageCard, if it doesn't exist
  // We'll use this to ensure the code is self-contained.
  const ImageCardPlaceholder: React.FC<ImageProps & { action: (url: string) => void, width?: string, height?: string }> = ({ imageUrl, prompt, action, width = "w-full", height = "h-40" }) => (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-gray-200 ${width} ${height}`}
      onClick={() => action(imageUrl)}
    >
      <img
        src={imageUrl}
        alt={prompt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Error";
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={isLoading || !prompt.trim()}
          >
            {
              isLoading ? "Loading..." : "Generate Image"
            }
          </button>
        </div>

        {mainImageUrl && (
            <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-xl font-semibold mb-2">Current Image</h2>
                <div className="relative w-full h-80 overflow-hidden rounded-lg">
                    <img
                        src={mainImageUrl}
                        alt={prompt}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        )}
      </div>

      {
        generatedImages.length > 0 && (
          <div className="mt-8 w-full max-w-6xl">
            <h3 className="text-xl text-center mb-4">Generated Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 overflow-y-scroll h-96">
              {generatedImages.map(
                (image: ImageProps, index) => (
                  <ImageCardPlaceholder
                    action={setMainImageUrl}
                    imageUrl={image.imageUrl}
                    prompt={image.prompt}
                    key={index}
                    width="w-full"
                    height="h-40"
                  />
                )
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Home;