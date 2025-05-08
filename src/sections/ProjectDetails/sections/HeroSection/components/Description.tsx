interface DescriptionProps {
  description: string;
}
export const Description = ({ description }: DescriptionProps) => {
  const splitDescription = description.split("\n");

  return (
    <div className="flex items-center justify-center w-full">
      <p className="w-[80%] text-pretty flex flex-col gap-5">
        {splitDescription.map((line, i) => <p key={i}>{line}</p>) ||
          "No description available"}
      </p>
    </div>
  );
};
