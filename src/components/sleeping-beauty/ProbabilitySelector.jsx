import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ProbabilitySelector({ onSelect, options }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-6 bg-black/20 backdrop-blur-sm px-4 py-6 md:px-8 md:py-8 rounded-xl border border-white/10 shadow-2xl"
    >
      <div className="space-y-4 w-full max-w-md">
        {options.map((option) => (
          <motion.label 
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex items-center p-4 md:p-5 rounded-xl transition-all duration-300 cursor-pointer
              border border-white/10 backdrop-blur-sm shadow-lg
              ${selected === option.value 
                ? 'bg-blue-600/40 border-blue-400/50 shadow-blue-500/20' 
                : 'bg-black/20 hover:bg-white/10 hover:border-white/20'}
            `}
          >
            <div className="relative">
              <input
                type="radio"
                name="probability"
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
                className="w-5 h-5 opacity-0 absolute"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 ${
                selected === option.value 
                  ? 'border-blue-400 bg-blue-400' 
                  : 'border-white/40'
              }`}>
                {selected === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
            </div>
            <span className="text-white text-lg font-medium">{option.label}</span>
          </motion.label>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => selected && onSelect(selected)}
        disabled={!selected}
        className={`
          w-full md:w-auto px-8 py-4 rounded-xl font-medium text-lg
          transition-all duration-300 transform
          ${selected
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
            : 'bg-gray-500/50 cursor-not-allowed text-gray-300'}
        `}
      >
        Confirm
      </motion.button>
    </motion.div>
  );
}

export default ProbabilitySelector;