import { useEffect, useRef, useState } from "react";

function CategoryFilter({
  categorias,
  categoria,
  setCategoria,
  precioMaximo,
  setPrecioMaximo,
  marcas,
  marca,
  setMarca,
  orden,
  setOrden,
}) {
  const [menuAbierto, setMenuAbierto] = useState(null);

  const filtrosRef = useRef(null);

  // =========================
  // CERRAR AL HACER CLICK AFUERA
  // =========================

  useEffect(() => {
    const cerrarAlHacerClickAfuera = (event) => {
      if (
        filtrosRef.current &&
        !filtrosRef.current.contains(event.target)
      ) {
        setMenuAbierto(null);
      }
    };

    document.addEventListener(
      "mousedown",
      cerrarAlHacerClickAfuera
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        cerrarAlHacerClickAfuera
      );
    };
  }, []);

  // =========================
  // ABRIR / CERRAR MENU
  // =========================

  const alternarMenu = (menu) => {
    setMenuAbierto((actual) =>
      actual === menu ? null : menu
    );
  };

  // =========================
  // CATEGORÍAS
  // =========================

  const categoriasPrincipales = [
    "Todas",
    "Heladeras",
    "Freezers",
    "Hornos",
    "Tostadores",
  ];

  const categoriasExtra = categorias.filter(
    (cat) => !categoriasPrincipales.includes(cat)
  );

  // =========================
  // PRECIOS
  // =========================

  const precios = [
    {
      valor: 0,
      texto: "Todos los precios",
    },
    {
      valor: 7500,
      texto: "Hasta $7.500",
    },
    {
      valor: 10000,
      texto: "Hasta $10.000",
    },
    {
      valor: 15000,
      texto: "Hasta $15.000",
    },
    {
      valor: 20000,
      texto: "Hasta $20.000",
    },
  ];

  // =========================
  // ORDEN
  // =========================

  const ordenes = [
    {
      valor: "predeterminado",
      texto: "Predeterminado",
    },
    {
      valor: "precio-menor",
      texto: "Precio: menor a mayor",
    },
    {
      valor: "precio-mayor",
      texto: "Precio: mayor a menor",
    },
    {
      valor: "nombre-az",
      texto: "Nombre: A → Z",
    },
    {
      valor: "nombre-za",
      texto: "Nombre: Z → A",
    },
  ];

  // =========================
  // TEXTOS
  // =========================

  const textoCategoria =
    categoria === "Todas"
      ? "Categoría"
      : categoria;

  const textoPrecio =
    precios.find(
      (precio) => precio.valor === precioMaximo
    )?.texto || "Precio";

  const textoMarca =
    marca === "Todas"
      ? "Marca"
      : marca;

  const textoOrden =
    ordenes.find(
      (item) => item.valor === orden
    )?.texto || "Ordenar por";

  // =========================
  // LIMPIAR
  // =========================

  const limpiarFiltros = () => {
    setCategoria("Todas");
    setPrecioMaximo(0);
    setMarca("Todas");
    setOrden("predeterminado");

    setMenuAbierto(null);
  };

  return (
    <div
      ref={filtrosRef}
      className="relative z-[9999] flex flex-wrap gap-3 items-center"
    >

      {/* ========================= */}
      {/* CATEGORÍA */}
      {/* ========================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() => alternarMenu("categoria")}
          className={`px-5 py-3 rounded-xl border transition font-semibold ${
            categoria !== "Todas"
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {textoCategoria} ▼
        </button>

        {menuAbierto === "categoria" && (
          <div className="absolute left-0 top-full z-[99999] mt-2 w-64 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-2xl p-2">

            {categoriasPrincipales
              .filter(
                (cat) =>
                  cat === "Todas" ||
                  categorias.includes(cat)
              )
              .map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategoria(cat);
                    setMenuAbierto(null);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                    categoria === cat
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}

            {categoriasExtra.length > 0 && (
              <>
                <div className="border-t my-2" />

                <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">
                  Más categorías
                </p>

                {categoriasExtra.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategoria(cat);
                      setMenuAbierto(null);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                      categoria === cat
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}

          </div>
        )}

      </div>


      {/* ========================= */}
      {/* PRECIO */}
      {/* ========================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() => alternarMenu("precio")}
          className={`px-5 py-3 rounded-xl border transition font-semibold ${
            precioMaximo > 0
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {textoPrecio} ▼
        </button>

        {menuAbierto === "precio" && (
          <div className="absolute left-0 top-full z-[99999] mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">

            {precios.map((precio) => (
              <button
                key={precio.valor}
                type="button"
                onClick={() => {
                  setPrecioMaximo(precio.valor);
                  setMenuAbierto(null);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                  precioMaximo === precio.valor
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {precio.texto}
              </button>
            ))}

          </div>
        )}

      </div>


      {/* ========================= */}
      {/* MARCA */}
      {/* ========================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() => alternarMenu("marca")}
          className={`px-5 py-3 rounded-xl border transition font-semibold ${
            marca !== "Todas"
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {textoMarca} ▼
        </button>

        {menuAbierto === "marca" && (
          <div className="absolute left-0 top-full z-[99999] w-64 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-2xl p-2">

            <button
              type="button"
              onClick={() => {
                setMarca("Todas");
                setMenuAbierto(null);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                marca === "Todas"
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Todas las marcas
            </button>

            {marcas.map((nombreMarca) => (
              <button
                key={nombreMarca}
                type="button"
                onClick={() => {
                  setMarca(nombreMarca);
                  setMenuAbierto(null);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                  marca === nombreMarca
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {nombreMarca}
              </button>
            ))}

          </div>
        )}

      </div>


      {/* ========================= */}
      {/* ORDENAR */}
      {/* ========================= */}

      <div className="relative">

        <button
          type="button"
          onClick={() => alternarMenu("orden")}
          className={`px-5 py-3 rounded-xl border transition font-semibold ${
            orden !== "predeterminado"
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
        >
          {textoOrden} ▼
        </button>

        {menuAbierto === "orden" && (
          <div className="absolute left-0 top-full z-[99999] mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">

            {ordenes.map((item) => (
              <button
                key={item.valor}
                type="button"
                onClick={() => {
                  setOrden(item.valor);
                  setMenuAbierto(null);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                  orden === item.valor
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.texto}
              </button>
            ))}

          </div>
        )}

      </div>


      {/* ========================= */}
      {/* LIMPIAR FILTROS */}
      {/* ========================= */}

      <button
        type="button"
        onClick={limpiarFiltros}
        className="px-5 py-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-gray-50 transition font-semibold"
      >
        Limpiar filtros
      </button>

    </div>
  );
}

export default CategoryFilter;