import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsPromise from "../data/products.js";

const destacados = [
  {
    id: 53,
    imagen: "/imgHugella/destacados/heladeraPhilco161L.png",
  },
  {
    id: 2,
    imagen: "/imgHugella/destacados/aireAcondicionado.png",
  },
  {
    id: 30,
    imagen: "/imgHugella/destacados/celularSamsungA17.png",
  },
  {
    id: 42,
    imagen: "/imgHugella/destacados/exhibidoraDelhi.png",
  },
  {
    id: 106,
    imagen: "/imgHugella/destacados/vitrinaFiambrera.png",
  },
  {
    id: 69,
    imagen: "/imgHugella/destacados/lavarropasHisense.png",
  },
];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    productsPromise
      .then((datos) => {
        setProducts(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error(
          "Error cargando productos destacados:",
          error
        );
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500">
          Cargando productos destacados...
        </p>
      </section>
    );
  }

  const productosDestacados = destacados
    .map((destacado) => {
      let producto;

      if (destacado.id !== undefined) {
        producto = products.find(
          (p) => Number(p.id) === Number(destacado.id)
        );
      }

      if (destacado.carpeta) {
        const carpetaBuscada = destacado.carpeta
          .trim()
          .toLowerCase();
      
        producto = products.find((p) =>
          String(p.carpeta || "")
            .trim()
            .toLowerCase()
            .includes(carpetaBuscada)
        );
      }

      if (!producto) {
        console.error(
          "DESTACADO NO ENCONTRADO:",
          destacado
        );
        return null;
      }

      return {
        ...producto,
        imagenDestacada: destacado.imagen,
      };
    })
    .filter(Boolean);

  return (
    <section className="relative w-full">
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-16
          sm:py-24
        "
      >

        {/* TÍTULO */}

        <div className="mb-10 sm:mb-12">
          <p
            className="
              text-[#315b91]
              text-2xl
              sm:text-3xl
              font-extrabold
              uppercase
              tracking-wide
            "
          >
            HUGELLA
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              font-extrabold
              text-gray-800
              mt-2
            "
          >
            Productos destacados
          </h2>

          <p className="text-gray-500 mt-3">
            Algunos de nuestros productos destacados.
          </p>
        </div>

        {/* TARJETAS */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            sm:gap-8
          "
        >
          {productosDestacados.map((producto) => (
            <Link
              key={producto.id}
              to={`/productos/${producto.id}`}
              className="group block"
            >
              <article
                className="
                  h-full
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  transition-shadow
                  duration-300
                "
              >

                {/* IMAGEN */}

                <div
                  className="
                    aspect-square
                    bg-white
                    flex
                    items-center
                    justify-center
                    p-5
                    sm:p-6
                    overflow-hidden
                  "
                >
                  <img
                    src={producto.imagenDestacada}
                    alt={producto.nombre}
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* INFORMACIÓN */}

                <div
                  className="
                    min-h-[190px]
                    px-5
                    py-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {producto.marca}
                  </p>

                  <h3
                    className="
                      font-bold
                      text-lg
                      leading-tight
                      line-clamp-2
                      text-gray-800
                    "
                  >
                    {producto.nombre}
                  </h3>

                  <p
                    className="
                      text-2xl
                      font-extrabold
                      text-[#315b91]
                      mt-4
                    "
                  >
                    $
                    {Number(producto.precio).toLocaleString(
                      "es-AR"
                    )}
                  </p>

                  <p
                    className="
                      text-sm
                      text-[#315b91]
                      font-semibold
                      mt-3
                    "
                  >
                    Ver producto →
                  </p>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;