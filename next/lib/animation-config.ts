export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const mediaInputVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.0, duration: 0.1 } },
  exit: { opacity: 0, y: 0, transition: { duration: 0.2 } },
};
