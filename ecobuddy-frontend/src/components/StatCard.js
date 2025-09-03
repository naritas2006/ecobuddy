import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-6 text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h4 className="text-xl font-semibold mb-2">{value}</h4>
      <p className="text-sm text-green-800">{label}</p>
    </motion.div>
  );
};

export default StatCard;