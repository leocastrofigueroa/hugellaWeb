function SearchBar({ busqueda, setBusqueda }) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-8">
  
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
  
      </div>
    );
  }
  
  export default SearchBar;