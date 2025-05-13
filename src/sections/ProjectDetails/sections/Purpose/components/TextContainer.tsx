interface TextProps {
  text: string;
}
export const TextContainer = ({ text }: TextProps) => {
  return (
    <div className="flex w-full justify-center">
      <p className="w-[80%] text-white text-[0.8lh]">{text}</p>
    </div>
  );
};
