const Footer: React.FC = () => {
  return (
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
      <p className="text-gray-500">
        Penpal by
        <a
          className="font-medium text-gray-800 underline transition-colors"
          href="https://github.com/daniel-smyth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Daniel Smyth
        </a>
      </p>
    </div>
  );
};

export default Footer;
