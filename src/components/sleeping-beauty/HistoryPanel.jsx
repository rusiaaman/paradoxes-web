import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function HistoryPanel({ history }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const panelVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Mobile View - Bottom Panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-black/90 backdrop-blur-md text-white py-3 px-6 flex items-center justify-between border-t border-white/10 shadow-lg"
        >
          <span className="text-base font-medium tracking-wide">Story History</span>
          <motion.span 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70"
          >
            ▲
          </motion.span>
        </motion.button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              className="bg-black/90 backdrop-blur-md border-t border-white/5"
            >
              <div className="py-6 px-6 space-y-4 overflow-y-auto max-h-[70vh]">
                <AnimatePresence>
                  {history.map((text, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 text-sm text-white/90 whitespace-pre-wrap break-words shadow-lg"
                    >
                      {text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop View - Side Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="hidden md:block fixed top-0 right-0 h-full w-96 bg-black/90 backdrop-blur-md border-l border-white/10 z-20 shadow-2xl"
      >
        <div className="p-8 space-y-6 text-white h-full flex flex-col">
          <div className="text-xl font-semibold pb-4 border-b border-white/10 tracking-wide">
            Story History
          </div>
          <motion.div 
            className="flex-grow overflow-y-auto space-y-4 pr-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.3) transparent'
            }}
          >
            <AnimatePresence>
              {history.map((text, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 text-sm text-white/90 whitespace-pre-wrap break-words shadow-lg"
                >
                  {text}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default HistoryPanel;