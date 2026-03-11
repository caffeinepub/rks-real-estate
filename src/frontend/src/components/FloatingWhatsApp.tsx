import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/919910396406";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
    >
      <MessageCircle className="h-7 w-7 text-white fill-white" />

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />
    </motion.a>
  );
}
