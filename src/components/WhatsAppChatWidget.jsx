import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleWidget = () => setIsOpen(!isOpen);

  const openWhatsApp = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toggleWidget();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={toggleWidget}
            className="rounded-full w-16 h-16 bg-gradient-to-br from-primary-green to-primary-blue shadow-lg"
          >
            <MessageSquare className="w-8 h-8 text-white" />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200"
          >
            <div className="p-4 bg-gradient-to-br from-primary-green to-primary-blue text-white rounded-t-xl flex justify-between items-center">
              <h3 className="font-bold text-lg">Contact Us</h3>
              <button onClick={toggleWidget} className="p-1 rounded-full hover:bg-white/20">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-center space-y-4">
              <p className="text-slate-600">Please select your preferred language:</p>
              <Button 
                onClick={() => openWhatsApp('https://wa.me/917092455157')} 
                className="w-full btn-primary text-base"
              >
                Chat in English
              </Button>
              <Button 
                onClick={() => openWhatsApp('https://wa.me/919716511527')} 
                className="w-full btn-secondary text-base"
              >
                Chat in Arabic
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppChatWidget;