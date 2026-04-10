import { motion } from "framer-motion";

export const ShowcaseSection: React.FC<{ title: string; text: string; images?: string[] }> = ({ title, text, images }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
      {/* Columna de Texto: STICKY */}
      <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF4D7D]" 
            />
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-gray-500">
              Chapter _0{title === "Design Approach" ? "1" : "2"}
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            {title}
          </h2>
        </div>

        <p className="text-lg md:text-xl font-light leading-relaxed text-gray-400 text-pretty border-l border-white/10 pl-6">
          {text}
        </p>
      </div>

      {/* Columna de Imágenes: SCROLL */}
      <div className="lg:col-span-8 space-y-20">
        {images?.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* Marco técnico decorativo */}
            <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <img 
              src={img} 
              alt={`${title} visual ${i}`}
              className="w-full rounded-[2.5rem] border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]" 
            />
            
            {/* Label de imagen en la esquina */}
            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                View_Full_Frame // 0{i + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};