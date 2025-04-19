function Footer() {
  return (
    <footer className="bg-black bg-opacity-70 text-gray-400 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built with ❤️ using React and OMDb API
        </p>
      </div>
    </footer>
  );
}

export default Footer;
