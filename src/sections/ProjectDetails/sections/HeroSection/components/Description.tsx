interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  const splitDescription = description.split("\n");

  return (
    <div className="flex items-center justify-center mt-2 md:w-full w-[95vw]">
      <div className="md:w-[90%] w-full text-[0.6lh] flex flex-col gap-2 leading-relaxed">
        {splitDescription.length > 0 ? (
          splitDescription.map((line, i) => (
            <p key={i} className="text-white text-balance">
              {line}
            </p>
          ))
        ) : (
          <p>No description available</p>
        )}
      </div>
    </div>
  );
};
