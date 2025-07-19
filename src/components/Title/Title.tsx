interface ITitle {
  text: string;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = ({ text, variant }: ITitle) => {
  return (
    <>
      {variant === 'h1' && (
        <h1 className="poppins-medium text-[#8D8A8A] lg:text-2xl">{text}</h1>
      )}

      {variant === 'h2' && (
        <h1 className="poppins-medium text-[#8D8A8A] lg:text-xl">{text}</h1>
      )}
    </>
  );
};

export default Title;
