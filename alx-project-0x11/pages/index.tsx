// pages/index.tsx

import React, { useState } from "react";

// Placeholder for the ImageCard component to make the code self-contained and runnable
interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  action: (url: string) => void;
  width?: string;
  height?: string;
  isMain?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, prompt, action, width = "w-full", height = "h-40", isMain = false }) => (
  <div
    className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-gray-200 ${width} ${height} ${isMain ? '' : 'transform transition-transform duration-200 hover:scale-105'}`}
    onClick={() => action(imageUrl)}
  >
    <img
      src={imageUrl}
      alt={prompt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      // Simple error handler for broken image URLs
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "https://via.placeholder.com/600x400?text=Image+Load+Error";
      }}
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
      <p className="text-white text-xs font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
        {prompt}
      </p>
    </div>
  </div>
);

// Type definition for a generated image
interface ImageProps {
    imageUrl: string;
    prompt: string;
}

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    // Prevent multiple requests and clear old errors
    if (isLoading || !prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setImageUrl("");

    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!resp.ok) {
        throw new Error('Failed to generate image. Please try a different prompt.');
      }
  
      const data = await resp.json();
      
      const newImage = { imageUrl: data.message, prompt };
      setImageUrl(newImage.imageUrl);
      setGeneratedImages((prev) => [...prev, newImage]);

    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {error && (
            <div className="mt-4 p-4 w-full max-w-md bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
            </div>
        )}

        {/* Display the loading state or the main image */}
        {isLoading && (
            <div className="mt-8 p-4 w-full max-w-md flex items-center justify-center bg-white rounded-lg shadow-md h-80">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <span className="ml-4 text-gray-600">Generating image...</span>
            </div>
        )}
        {!isLoading && imageUrl && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Current Image</h2>
            <div className="relative w-full h-80 overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={prompt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Display the grid of generated image thumbnails */}
      {generatedImages.length > 0 && (
        <div className="mt-8 w-full max-w-6xl">
          <h3 className="text-xl text-center font-semibold mb-4 text-gray-800">Generated Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
            {generatedImages.map((image: ImageProps, index: number) => (
              <ImageCard
                action={setImageUrl}
                imageUrl={image.imageUrl}
                prompt={image.prompt}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;