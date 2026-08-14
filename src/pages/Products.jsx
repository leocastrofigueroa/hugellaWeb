import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import productsPromise from "../data/products.js";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ParallaxSection from "../components/ParallaxSection";

function Products() {

  const [products, setProducts] = useState([]);

  const [categoria, setCategoria] =
    useState("Todas");

  const [precioMaximo, setPrecioMaximo] =
    useState(0);

  const [marca, setMarca] =
    useState("Todas");

  const [orden, setOrden] =
    useState("predeterminado");

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchParams] =
    useSearchParams();


  /* ================================= */
  /* PARÁMETROS DE URL */
  /* ================================= */

  const busqueda =
    searchParams.get("busqueda") || "";

  const marcaURL =
    searchParams.get("marca") || "";

  const categoriaURL =
    searchParams.get("categoria") || "";

  const grupoURL =
    searchParams.get("grupo") || "";


  /* ================================= */
  /* CARGAR PRODUCTOS */
  /* ================================= */

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


  /* ================================= */
  /* APLICAR MARCA DESDE URL */
  /* ================================= */

  useEffect(() => {

    if (marcaURL) {

      setMarca(marcaURL);

    } else {

      setMarca("Todas");

    }

  }, [marcaURL]);


  /* ================================= */
  /* APLICAR CATEGORÍA DESDE URL */
  /* ================================= */

  useEffect(() => {

    if (categoriaURL) {

      setCategoria(categoriaURL);

    } else {

      setCategoria("Todas");

    }

  }, [categoriaURL]);


  /* ================================= */
  /* CARGANDO */
  /* ================================= */

  if (cargando) {

    return (
      <main className="min-h-screen bg-[#f5f6f8]">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          <div className="animate-pulse">

            <div className="h-4 w-32 bg-gray-200 rounded mb-4" />

            <div className="h-12 w-80 max-w-full bg-gray-200 rounded mb-5" />

            <div className="h-5 w-96 max-w-full bg-gray-200 rounded" />

          </div>

        </section>

      </main>
    );
  }


  /* ================================= */
  /* ERROR */
  /* ================================= */

  if (error) {

    return (
      <main className="min-h-screen bg-[#f5f6f8]">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <p className="text-red-600 font-semibold">
              {error}
            </p>

          </div>

        </section>

      </main>
    );
  }


  /* ================================= */
  /* CATEGORÍAS DISPONIBLES */
  /* ================================= */

  const categorias = [
    "Todas",

    ...new Set(
      products
        .map(
          (producto) =>
            producto.categoria
        )
        .filter(Boolean)
    ),
  ];


  /* ================================= */
  /* MARCAS DISPONIBLES */
  /* ================================= */

  const marcas = [
    ...new Set(
      products
        .map(
          (producto) =>
            producto.marca
        )
        .filter(Boolean)
        .map((marca) =>
          marca.trim()
        )
        .filter(
          (marca) =>
            marca !== ""
        )
    ),
  ].sort((a, b) =>
    a.localeCompare(b)
  );


  /* ================================= */
  /* TEXTO DE BÚSQUEDA */
  /* ================================= */

  const textoBusqueda =
    busqueda
      .toLowerCase()
      .trim();


  /* ================================= */
  /* FILTRAR PRODUCTOS */
  /* ================================= */

  let productosFiltrados =
    products.filter((producto) => {

      const categoriaProducto =
        producto.categoria
          ?.toLowerCase()
          .trim() || "";


      const marcaProducto =
        producto.marca
          ?.toLowerCase()
          .trim() || "";


      /* ============================= */
      /* CATEGORÍA */
      /* ============================= */

      let coincideCategoria = true;


      if (
        categoria !== "Todas"
      ) {

        coincideCategoria =
          categoriaProducto ===
          categoria
            .toLowerCase()
            .trim();

      }


      /* ============================= */
      /* GRUPOS ESPECIALES */
      /* ============================= */

      if (
        grupoURL ===
        "calefaccion"
      ) {

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


      if (
        grupoURL ===
        "herramientas"
      ) {

        coincideCategoria =
          categoriaProducto ===
            "herramientas" ||
          categoriaProducto ===
            "atornilladores" ||
          categoriaProducto ===
            "cortadoras";

      }


      /* ============================= */
      /* PRECIO */
      /* ============================= */

      const coincidePrecio =
        precioMaximo === 0 ||
        producto.precio <=
          precioMaximo;


      /* ============================= */
      /* MARCA */
      /* ============================= */

      const coincideMarca =
        marca === "Todas" ||
        marcaProducto ===
          marca
            .toLowerCase()
            .trim();


      /* ============================= */
      /* BÚSQUEDA */
      /* ============================= */

      const coincideBusqueda =
        textoBusqueda === "" ||

        producto.nombre
          ?.toLowerCase()
          .includes(
            textoBusqueda
          ) ||

        producto.marca
          ?.toLowerCase()
          .includes(
            textoBusqueda
          ) ||

        producto.categoria
          ?.toLowerCase()
          .includes(
            textoBusqueda
          );


      return (
        coincideCategoria &&
        coincidePrecio &&
        coincideMarca &&
        coincideBusqueda
      );

    });


  /* ================================= */
  /* ORDENAR */
  /* ================================= */

  productosFiltrados =
    [...productosFiltrados];


  switch (orden) {

    case "precio-menor":

      productosFiltrados.sort(
        (a, b) =>
          a.precio -
          b.precio
      );

      break;


    case "precio-mayor":

      productosFiltrados.sort(
        (a, b) =>
          b.precio -
          a.precio
      );

      break;


    case "nombre-az":

      productosFiltrados.sort(
        (a, b) =>
          a.nombre.localeCompare(
            b.nombre
          )
      );

      break;


    case "nombre-za":

      productosFiltrados.sort(
        (a, b) =>
          b.nombre.localeCompare(
            a.nombre
          )
      );

      break;


    default:

      break;
  }


  /* ================================= */
  /* RENDER */
  /* ================================= */

  return (
    <main className="min-h-screen bg-[#f5f6f8] overflow-hidden">


      {/* ================================= */}
      {/* CABECERA */}
      {/* ================================= */}

      <ParallaxSection
        speed={0.05}
        className="relative z-10"
      >

        <section className="relative bg-white overflow-hidden">

          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-blue-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-blue-50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />


          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

            <div className="max-w-4xl">

              <p className="text-[#315b91] text-sm sm:text-base font-extrabold uppercase tracking-[0.2em]">
                Catálogo HUGELLA
              </p>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 leading-tight text-gray-900">

                {marcaURL
                  ? `Productos ${marcaURL}`
                  : grupoURL ===
                    "calefaccion"
                  ? "Calefacción"
                  : grupoURL ===
                    "herramientas"
                  ? "Herramientas"
                  : "Nuestros productos"}

              </h1>


              <p className="text-gray-500 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed">

                {marcaURL
                  ? `Todos los productos ${marcaURL} disponibles en HUGELLA.`
                  : grupoURL ===
                    "calefaccion"
                  ? "Encontrá estufas, calefactores, caloventores y calefones."
                  : grupoURL ===
                    "herramientas"
                  ? "Encontrá herramientas para tu trabajo y tu hogar."
                  : "Encontrá el equipamiento que necesitás para tu negocio y tu hogar."}

              </p>


              {busqueda && (

                <div className="inline-flex items-center mt-7 bg-[#315b91]/10 text-[#315b91] px-5 py-3 rounded-xl font-semibold">

                  Resultados para:

                  <span className="ml-2 font-extrabold">
                    "{busqueda}"
                  </span>

                </div>

              )}

            </div>

          </div>

        </section>

      </ParallaxSection>


      {/* ================================= */}
      {/* FILTROS */}
      {/* ================================= */}

      <ParallaxSection
        speed={0.09}
        className="relative z-[100]"
      >

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6">

            <CategoryFilter

              categorias={categorias}

              categoria={categoria}

              setCategoria={setCategoria}

              precioMaximo={precioMaximo}

              setPrecioMaximo={setPrecioMaximo}

              marcas={marcas}

              marca={marca}

              setMarca={setMarca}

              orden={orden}

              setOrden={setOrden}

            />

          </div>

        </section>

      </ParallaxSection>


      {/* ================================= */}
      {/* RESULTADOS */}
      {/* ================================= */}

      <ParallaxSection
        speed={0.13}
        className="relative z-10"
      >

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-8 sm:mt-10 mb-5">

            <div>

              <p className="text-gray-500 text-sm sm:text-base">

                {productosFiltrados.length > 0
                  ? "Productos encontrados"
                  : "No encontramos productos"}

              </p>

            </div>


            <div className="inline-flex items-center self-start sm:self-auto bg-white border border-gray-200 rounded-full px-4 py-2">

              <span className="text-sm font-bold text-gray-700">

                {productosFiltrados.length}

              </span>

              <span className="text-sm text-gray-500 ml-1">

                {productosFiltrados.length === 1
                  ? "producto"
                  : "productos"}

              </span>

            </div>

          </div>

        </section>

      </ParallaxSection>


      {/* ================================= */}
      {/* PRODUCTOS */}
      {/* ================================= */}

      <ParallaxSection
        speed={0.17}
        className="relative z-0"
      >

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">

          {productosFiltrados.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

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

            <div className="bg-white rounded-3xl shadow-md p-10 sm:p-16 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

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
                onClick={() => {

                  setCategoria("Todas");

                  setPrecioMaximo(0);

                  setMarca("Todas");

                  setOrden("predeterminado");

                }}
                className="mt-6 bg-[#315b91] hover:bg-[#264a78] text-white px-6 py-3 rounded-xl font-bold transition"
              >
                Limpiar filtros
              </button>

            </div>

          )}

        </section>

      </ParallaxSection>

    </main>
  );
}

export default Products;