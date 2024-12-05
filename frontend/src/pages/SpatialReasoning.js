import React from "react";
import data from "../spatial_reasoning.json"; // Adjust path to JSON if it’s in the `src` folder

const getImagePath = (relativePath) => {
  try {
    return require(`../assets/${relativePath}`); // Path adjusted for images in `src/assets`
  } catch (error) {
    console.error("Error loading image:", error);
    return null; // Return null if the image is not found
  }
};

const SpatialReasoning = () => {
  return (
    <div className="p-4">
      {data.map((item, index) => (
        <div key={item.id} className="mb-8">
          {/* Render Question */}
          <h3 className="text-xl font-semibold mb-4">{item.question[0]}</h3>
          {item.question[1] && getImagePath(item.question[1]) ? (
            <img
              src={getImagePath(item.question[1])}
              alt={`Question ${index + 1}`}
              className="mb-4 w-full h-auto rounded-lg"
            />
          ) : (
            <p className="text-red-500">Image not found</p>
          )}

          {/* Render Options */}
          <div className="flex flex-wrap gap-4">
            {item.options.map((option) => (
              <div key={option.id} className="flex flex-col items-center">
                {option.type === "image" && getImagePath(option.content) ? (
                  <img
                    src={getImagePath(option.content)}
                    alt={`Option ${option.id}`}
                    className="w-16 h-16 rounded-lg"
                  />
                ) : (
                  <span>{option.content}</span> // Render text content if not an image
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpatialReasoning;
