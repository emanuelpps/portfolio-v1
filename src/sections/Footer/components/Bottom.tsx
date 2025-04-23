const Bottom = () => {
  return (
    <footer className="flex flex-col items-center justify-between w-full px-4 text-sm text-gray-300 md:flex-row">
      <div>© 2025 Emanuel Pagés.</div>
      <div>
        Built with <span className="font-semibold text-white">Vite</span>,{" "}
        <span className="font-semibold text-white">TypeScript</span>,{" "}
        <span className="font-semibold text-white">React</span> &{" "}
        <span className="font-semibold text-white">React Router DOM</span>
      </div>
    </footer>
  );
};

export default Bottom;
