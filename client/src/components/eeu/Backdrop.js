import { motion } from "framer-motion";

function Backdrop({ children, onClick }) {
  return (
    <div>
      <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
    </div>
  )
}

export default Backdrop
