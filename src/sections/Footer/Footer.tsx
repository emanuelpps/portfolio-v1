import FooterContainer from "./components/FooterContainer";

const Footer = () => {
  return (
    <footer className="relative flex items-center justify-center w-full pt-32 pb-10 overflow-hidden">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <FooterContainer />
    </footer>
  );
};

export default Footer;
