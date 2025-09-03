import React from 'react';
import { motion } from 'framer-motion';

const ToolCard = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-4 text-left hover:bg-opacity-40 transition"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="text-lg font-medium text-green-800">{label}</p>
    </motion.button>
  );
};

export default ToolCard;