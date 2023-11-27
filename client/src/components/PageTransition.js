import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const PageTransition = ({ children }) => {
  <AnimatePresence>
    <motion.div
      key={window.location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>;
};

export default PageTransition;
