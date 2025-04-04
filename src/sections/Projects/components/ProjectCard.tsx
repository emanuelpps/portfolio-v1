import { motion } from "framer-motion";
import { FC } from "react";

type ProjectCardProps = {
  title: string;
  image: string;
  link: string;
};

const ProjectCard: FC<ProjectCardProps> = ({ title, image, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-80 h-96 bg-black rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-t z-10" />
      <img src={image} alt={title} className="cover absolute inset-0 z-0" />
      <div className="absolute bottom-6 left-6 z-20">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 bg-gray-900 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition"
      >
        ➜
      </a>
    </motion.div>
  );
};

export default ProjectCard;
