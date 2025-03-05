import Link from "next/link";
import { motion } from "framer-motion";

const SubmitEventCTA = () => {
  return (
    <motion.section
      className="py-14 text-center bg-gradient-to-r from-teal-600 to-teal-800 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
        Want to Host an Event?
      </h2>
      <p className="mt-2 text-lg opacity-90">
        Submit your event now and invite your community!
      </p>
      <Link href="/submit-event">
        <motion.button
          className="mt-6 px-8 py-3 bg-white text-teal-700 font-semibold rounded-full shadow-lg 
                     hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Event
        </motion.button>
      </Link>
    </motion.section>
  );
};

export default SubmitEventCTA;
