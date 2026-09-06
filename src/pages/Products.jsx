import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import productsPromise from "../data/products.js";
import ProductCard from "../components/ProductCard";
import ParallaxSection from "../components/ParallaxSection";

function Products() {
  const [products, setProducts] = useState([]);

  const [categoria, setCategoria] = useState("Todas");
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [marca, setMarca] = useState("Todas");
  const [orden, setOrden] = useState("nombre-az");
  const [soloOfertas, setSoloOfertas] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  /* ==========================================
     PARÁMETROS DE URL
  ========================================== */

  const busquedaURL = searchParams.get("busqueda") || "";
  const marcaURL = searchParams.get("marca") || "";
  const categoriaURL = searchParams.get("categoria") || "";
  const grupoURL = searchParams.get("grupo") || "";

  const [busqueda, setBusqueda] = useState(busquedaURL);

  /* ==========================================
     CARGAR PRODUCTOS
  ========================================== */

  useEffect(() => {
    productsPromise
      .then((datos) => {
        setProducts(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);

        setError(
          "No se pudieron cargar los productos."
        );

        setCargando(false);
      });
  }, []);

  /* ==========================================
     SINCRONIZAR URL
  ========================================== */

  useEffect(() => {
    setBusqueda(busquedaURL);
  }, [busquedaURL]);

  useEffect(() => {
    if (marcaURL) {
      setMarca(marcaURL);
    } else {
      setMarca("Todas");
    }
  }, [marcaURL]);

  useEffect(() => {
    if (categoriaURL) {
      setCategoria(categoriaURL);
    } else {
      setCategoria("Todas");
    }
  }, [categoriaURL]);

  /* ==========================================
     CATEGORÍAS
  ========================================== */

  const categorias = useMemo(() => {
    return [
      "Todas",
      ...new Set(
        products
          .map((producto) => producto.categoria)
          .filter(Boolean)
          .map((categoria) => categoria.trim())
      ),
    ];
  }, [products]);

  /* ==========================================
     MARCAS
  ========================================== */

  const marcas = useMemo(() => {
    return [
      ...new Set(
        products
          .map((producto) => producto.marca)
          .filter(Boolean)
          .map((marca) => marca.trim())
          .filter((marca) => marca !== "")
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [products]);

  /* ==========================================
     PRECIOS
  ========================================== */

  const precios = useMemo(() => {
    const valores = products
      .map((producto) => Number(producto.precio))
      .filter((precio) => precio > 0);

    if (!valores.length) {
      return [];
    }

    const maximo = Math.max(...valores);

    const opciones = [
      1000,
      2500,
      5000,
      10000,
      20000,
      50000,
      100000,
      250000,
      500000,
      1000000,
    ];

    return opciones.filter(
      (precio) => precio < maximo
    );
  }, [products]);

  /* ==========================================
     TEXTO DE BÚSQUEDA
  ========================================== */

  const textoBusqueda =
    busqueda.toLowerCase().trim();

  /* ==========================================
     FILTRAR PRODUCTOS
  ========================================== */

  let productosFiltrados = products.filter(
    (producto) => {
      const categoriaProducto =
        producto.categoria
          ?.toLowerCase()
          .trim() || "";

      const marcaProducto =
        producto.marca
          ?.toLowerCase()
          .trim() || "";

      /* ==============================
         CATEGORÍA
      ============================== */

      let coincideCategoria = true;

      if (categoria !== "Todas") {
        coincideCategoria =
          categoriaProducto ===
          categoria.toLowerCase().trim();
      }

      /* ==============================
         GRUPOS
      ============================== */

      if (grupoURL === "calefaccion") {
        const categoriasCalefaccion = [
          "estufas",
          "calefactores",
          "caloventores",
          "calefones",
        ];

        coincideCategoria =
          categoriasCalefaccion.includes(
            categoriaProducto
          );
      }

      if (grupoURL === "herramientas") {
        coincideCategoria =
          categoriaProducto === "herramientas" ||
          categoriaProducto === "atornilladores" ||
          categoriaProducto === "cortadoras";
      }

      /* ==============================
         PRECIO
      ============================== */

      const coincidePrecio =
        precioMaximo === 0 ||
        Number(producto.precio) <= precioMaximo;

      /* ==============================
         MARCA
      ============================== */

      const coincideMarca =
        marca === "Todas" ||
        marcaProducto ===
          marca.toLowerCase().trim();

      /* ==============================
         BÚSQUEDA
      ============================== */

      const coincideBusqueda =
        textoBusqueda === "" ||
        producto.nombre
          ?.toLowerCase()
          .includes(textoBusqueda) ||
        producto.marca
          ?.toLowerCase()
          .includes(textoBusqueda) ||
        producto.categoria
          ?.toLowerCase()
          .includes(textoBusqueda);

      /* ==============================
         OFERTAS
      ============================== */

      const coincideOferta =
        !soloOfertas || producto.oferta === true;

      return (
        coincideCategoria &&
        coincidePrecio &&
        coincideMarca &&
        coincideBusqueda &&
        coincideOferta
      );
    }
  );

  /* ==========================================
     ORDENAR
  ========================================== */

  productosFiltrados = [...productosFiltrados];

  switch (orden) {
    case "precio-menor":
      productosFiltrados.sort(
        (a, b) =>
          Number(a.precio) - Number(b.precio)
      );
      break;

    case "precio-mayor":
      productosFiltrados.sort(
        (a, b) =>
          Number(b.precio) - Number(a.precio)
      );
      break;

    case "nombre-az":
      productosFiltrados.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      break;

    case "nombre-za":
      productosFiltrados.sort((a, b) =>
        b.nombre.localeCompare(a.nombre)
      );
      break;

    default:
      break;
  }

  /* ==========================================
     FUNCIONES DE FILTROS
  ========================================== */

  const cambiarCategoria = (valor) => {
    setCategoria(valor);

    const nuevosParams = new URLSearchParams(
      searchParams
    );

    if (valor === "Todas") {
      nuevosParams.delete("categoria");
    } else {
      nuevosParams.set("categoria", valor);
    }

    setSearchParams(nuevosParams);
  };

  const cambiarMarca = (valor) => {
    setMarca(valor);

    const nuevosParams = new URLSearchParams(
      searchParams
    );

    if (valor === "Todas") {
      nuevosParams.delete("marca");
    } else {
      nuevosParams.set("marca", valor);
    }

    setSearchParams(nuevosParams);
  };

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor);

    const nuevosParams = new URLSearchParams(
      searchParams
    );

    if (valor.trim() === "") {
      nuevosParams.delete("busqueda");
    } else {
      nuevosParams.set(
        "busqueda",
        valor
      );
    }

    setSearchParams(nuevosParams);
  };

  const limpiarFiltros = () => {
    setCategoria("Todas");
    setMarca("Todas");
    setPrecioMaximo(0);
    setOrden("nombre-az");
    setSoloOfertas(false);
    setBusqueda("");

    setSearchParams({});
  };

  /* ==========================================
     CARGANDO
  ========================================== */

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#f5f6f8]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-5">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-12 w-96 max-w-full bg-gray-200 rounded" />
            <div className="h-6 w-[500px] max-w-full bg-gray-200 rounded" />
          </div>
        </section>
      </main>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {
    return (
      <main className="min-h-screen bg-[#f5f6f8]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-red-600 font-semibold">
              {error}
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <main className="min-h-screen bg-[#f5f6f8]">

      {/* ======================================
          CABECERA
      ====================================== */}

      <ParallaxSection
        speed={0.05}
        className="relative z-10"
      >
        <section className="relative bg-white overflow-hidden">

          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-blue-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-blue-50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

            <p className="text-[#315b91] text-sm sm:text-base font-extrabold uppercase tracking-[0.2em]">
              Catálogo HUGELLA
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-tight text-gray-900">
              {marcaURL
                ? `Productos ${marcaURL}`
                : grupoURL === "calefaccion"
                ? "Calefacción"
                : grupoURL === "herramientas"
                ? "Herramientas"
                : "Nuestros productos"}
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed">
              {marcaURL
                ? `Todos los productos ${marcaURL} disponibles en HUGELLA.`
                : grupoURL === "calefaccion"
                ? "Encontrá estufas, calefactores, caloventores y calefones."
                : grupoURL === "herramientas"
                ? "Encontrá herramientas para tu trabajo y tu hogar."
                : "Encontrá el equipamiento que necesitás para tu negocio y tu hogar."}
            </p>

          </div>

        </section>
      </ParallaxSection>

      {/* ======================================
          CONTENIDO
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

          {/* ==================================
              SIDEBAR FILTROS
          ================================== */}

          <aside className="lg:sticky lg:top-24 h-fit">

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Filtros
                </h2>
              </div>

              {/* OFERTAS */}

              <div className="px-6 py-5 border-b border-gray-200">

                <div className="flex items-center justify-between gap-4">

                  <span className="font-bold text-gray-800">
                    Solo ofertas
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSoloOfertas(!soloOfertas)
                    }
                    className={`relative w-14 h-8 rounded-full transition ${
                      soloOfertas
                        ? "bg-[#315b91]"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition ${
                        soloOfertas
                          ? "left-7"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

              </div>

              {/* CATEGORÍA */}

              <div className="px-6 py-5 border-b border-gray-200">

                <label className="block font-bold text-gray-800 mb-3">
                  Categoría
                </label>

                <select
                  value={categoria}
                  onChange={(e) =>
                    cambiarCategoria(e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium outline-none focus:border-[#315b91]"
                >
                  {categorias.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>

              </div>

              {/* MARCA */}

              <div className="px-6 py-5 border-b border-gray-200">

                <label className="block font-bold text-gray-800 mb-3">
                  Marca
                </label>

                <select
                  value={marca}
                  onChange={(e) =>
                    cambiarMarca(e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium outline-none focus:border-[#315b91]"
                >

                  <option value="Todas">
                    Todas
                  </option>

                  {marcas.map((marcaItem) => (
                    <option
                      key={marcaItem}
                      value={marcaItem}
                    >
                      {marcaItem}
                    </option>
                  ))}

                </select>

              </div>

              {/* PRECIO */}

              <div className="px-6 py-5">

                <label className="block font-bold text-gray-800 mb-3">
                  Rango de precio
                </label>

                <select
                  value={precioMaximo}
                  onChange={(e) =>
                    setPrecioMaximo(
                      Number(e.target.value)
                    )
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium outline-none focus:border-[#315b91]"
                >

                  <option value={0}>
                    Cualquier precio
                  </option>

                  {precios.map((precio) => (
                    <option
                      key={precio}
                      value={precio}
                    >
                      Hasta $
                      {precio.toLocaleString(
                        "es-AR"
                      )}
                    </option>
                  ))}

                </select>

              </div>

              {/* LIMPIAR */}

              {(categoria !== "Todas" ||
                marca !== "Todas" ||
                precioMaximo !== 0 ||
                soloOfertas ||
                busqueda) && (

                <div className="px-6 pb-6">

                  <button
                    type="button"
                    onClick={limpiarFiltros}
                    className="w-full border border-[#315b91] text-[#315b91] hover:bg-[#315b91] hover:text-white px-4 py-3 rounded-xl font-bold transition"
                  >
                    Limpiar filtros
                  </button>

                </div>

              )}

            </div>

          </aside>

          {/* ==================================
              PRODUCTOS
          ================================== */}

          <div className="min-w-0">

            {/* CABECERA RESULTADOS */}

            <div className="flex flex-col gap-5 mb-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {productosFiltrados.length}{" "}
                    {productosFiltrados.length === 1
                      ? "producto"
                      : "productos"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Encontrá lo que necesitás
                  </p>

                </div>

                {/* ORDEN */}

                <div className="flex items-center gap-3">

                  <span className="text-sm font-semibold text-gray-500">
                    Ordenar por
                  </span>

                  <select
                    value={orden}
                    onChange={(e) =>
                      setOrden(e.target.value)
                    }
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-700 outline-none focus:border-[#315b91]"
                  >

                    <option value="nombre-az">
                      Nombre A-Z
                    </option>

                    <option value="nombre-za">
                      Nombre Z-A
                    </option>

                    <option value="precio-menor">
                      Precio menor
                    </option>

                    <option value="precio-mayor">
                      Precio mayor
                    </option>

                  </select>

                </div>

              </div>

              {/* BUSCADOR */}

              <div className="relative">

                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>

                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) =>
                    cambiarBusqueda(
                      e.target.value
                    )
                  }
                  placeholder="Buscar producto, marca o categoría..."
                  className="w-full h-16 bg-white border border-gray-200 rounded-2xl pl-14 pr-5 text-gray-800 placeholder-gray-400 outline-none focus:border-[#315b91] focus:ring-2 focus:ring-[#315b91]/10 transition"
                />

              </div>

            </div>

            {/* =================================
                GRILLA
            ================================= */}

            {productosFiltrados.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

                {productosFiltrados.map(
                  (producto) => (

                    <ProductCard
                      key={producto.id}
                      producto={producto}
                    />

                  )
                )}

              </div>

            ) : (

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 sm:p-16 text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-[#315b91]/10 flex items-center justify-center">

                  <span className="text-2xl font-bold text-[#315b91]">
                    ?
                  </span>

                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mt-6">
                  No encontramos productos
                </h2>

                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Probá con otro nombre, marca o categoría.
                </p>

                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="mt-6 bg-[#315b91] hover:bg-[#264a78] text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Limpiar filtros
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Products;