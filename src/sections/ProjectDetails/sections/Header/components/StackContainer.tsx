interface StackProps {
  stack: string[];
}

export const StackContainer = ({ stack }: StackProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {stack.map((tech, i) => (
        <span
          key={i}
          className="px-3 py-1 text-md text-white rounded-lg bg-white/10"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};
