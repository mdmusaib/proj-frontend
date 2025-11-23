import React from 'react';
    import { motion } from 'framer-motion';

    const PageLoader = () => {
      return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-[100]">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <img 
              src="https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/dc38bdbe47ba6ea9477082e7fd18d59b.png"
              alt="Hayatra Medglobe Favicon"
              className="w-20 h-20"
            />
          </motion.div>
        </div>
      );
    };

    export default PageLoader;