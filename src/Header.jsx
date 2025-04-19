function Header() {
  return (
    <header className="bg-black bg-opacity-70 text-white py-6 shadow-md mb-8">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-400">🎬 Movie Explorer</h1>
        <p className="text-sm text-gray-300">Search and discover your favorite films</p>
      </div>
    </header>
  );
}

export default Header;
