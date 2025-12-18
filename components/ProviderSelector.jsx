import React from "react";
import { motion } from "framer-motion";
import { PROVIDERS } from "../constants";
import { Check } from "lucide-react";

const ProviderSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mb-8">
      {Object.values(PROVIDERS).map((provider) => {
        const isSelected = selected === provider.name;

        return (
          <motion.button
            key={provider.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(provider.name)}
            className={`
              relative h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${
                isSelected
                  ? `ring-4 ring-offset-2 ring-${
                      provider.textColor.split("-")[1]
                    }-400`
                  : "hover:shadow-xl"
              }
              bg-white border-2 border-transparent
              ${isSelected ? "border-transparent" : "border-gray-100"}
            `}
          >
            {/* Background Gradient Layer */}
            <div
              className={`
                absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br ${provider.gradient}
                ${isSelected ? "opacity-20" : ""}
              `}
            />

            {/* Icon / Logo Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg
                bg-gradient-to-br ${provider.gradient}
              `}
            >
              {provider.logoInitial}
            </div>

            <span className={`font-bold text-lg ${provider.textColor}`}>
              {provider.displayName}
            </span>

            {isSelected && (
              <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                <Check size={12} />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProviderSelector;
