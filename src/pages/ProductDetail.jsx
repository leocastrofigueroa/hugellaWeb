import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productsPromise from "../data/products.js";

const posiblesImagenes = [
  "principal.png",
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
];

function ProductDetail() {
  const { id } = useParams();

  const [producto, setProducto] =
    useState(null);

  const [cargando, setCargando] =
    useState(true);

  const [imagenes, setImagenes] =
    useState([]);

  const [imagenPrincipal, setImagenPrincipal] =
    useState("");

  // ==========================================
  // CARGAR PRODUCTO
  // ==========================================

  useEffect(() => {

    productsPromise
      .then((productos) => {

        const idBuscado = String(id)
          .trim()
          .toUpperCase();

        const encontrado =
          productos.find(
            (p) =>
              String(p.id)
                .trim()
                .toUpperCase() ===
              idBuscado
          );

        setProducto(
          encontrado || null
        );

        setCargando(false);
      })
      .catch((error) => {

        console.error(
          "Error cargando producto:",
          error
        );

        setCargando(false);
      });

  }, [id]);

  // ==========================================
  // BUSCAR IMÁGENES EXISTENTES
  // ==========================================

  useEffect(() => {

    if (!producto) return;

    let cancelado = false;

    const comprobarImagen = (
      ruta
    ) => {

      return new Promise(
        (resolve) => {

          const img =
            new Image();

          img.onload = () =>
            resolve(true);

          img.onerror = () =>
            resolve(false);

          img.src = ruta;
        }
      );
    };

    const comprobarImagenes =
      async () => {

        const imagenesValidas =
          [];

        for (
          const nombre of posiblesImagenes
        ) {

          const ruta =
            `/imgHugella/productos/${encodeURIComponent(
              producto.carpeta
            )}/${nombre}`;

          const existe =
            await comprobarImagen(
              ruta
            );

          if (existe) {
            imagenesValidas.push(
              ruta
            );
          }
        }

        if (!cancelado) {

          setImagenes(
            imagenesValidas
          );

          if (
            imagenesValidas.length >
            0
          ) {

            setImagenPrincipal(
              imagenesValidas[0]
            );

          } else {

            setImagenPrincipal("");
          }
        }
      };

    comprobarImagenes();

    return () => {
      cancelado = true;
    };

  }, [producto]);

  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {

    return (
      <section className="max-w-7xl mx-auto px-6 py-20">

        <p className="text-gray-500 text-lg">
          Cargando producto...
        </p>

      </section>
    );
  }

  // ==========================================
  // PRODUCTO NO ENCONTRADO
  // ==========================================

  if (!producto) {

    return (
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-3xl font-bold">
          Producto no encontrado
        </h1>

        <Link
          to="/productos"
          className="
            inline-block
            mt-6
            text-blue-700
            font-semibold
            hover:underline
          "
        >
          ← Volver a productos
        </Link>

      </section>
    );
  }

  // ==========================================
  // PRODUCTO
  // ==========================================

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* VOLVER */}

      <Link
        to="/productos"
        className="
          text-blue-700
          font-semibold
          hover:underline
        "
      >
        ← Volver a productos
      </Link>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-16
          mt-10
        "
      >

        {/* ================================= */}
        {/* IMÁGENES */}
        {/* ================================= */}

        <div
          className="
            bg-gray-100
            rounded-3xl
            p-10
          "
        >

          {/* IMAGEN PRINCIPAL */}

          <div
            className="
              flex
              items-center
              justify-center
              min-h-[500px]
            "
          >

            {imagenPrincipal ? (

              <img
                src={imagenPrincipal}
                alt={producto.nombre}
                className="
                  w-full
                  max-h-[500px]
                  object-contain
                "
              />

            ) : (

              <div className="text-gray-400 text-center">
                No hay imágenes disponibles
              </div>

            )}

          </div>

          {/* MINIATURAS */}

          {imagenes.length > 1 && (

            <div
              className="
                flex
                gap-4
                mt-6
                justify-center
                flex-wrap
              "
            >

              {imagenes.map(
                (imagen, index) => (

                  <button
                    key={imagen}
                    type="button"
                    onClick={() =>
                      setImagenPrincipal(
                        imagen
                      )
                    }
                    className={`
                      w-20
                      h-20
                      bg-white
                      rounded-xl
                      overflow-hidden
                      border-2
                      transition
                      ${
                        imagenPrincipal ===
                        imagen
                          ? "border-blue-600"
                          : "border-gray-200 hover:border-blue-400"
                      }
                    `}
                  >

                    <img
                      src={imagen}
                      alt={`${producto.nombre} ${
                        index + 1
                      }`}
                      className="
                        w-full
                        h-full
                        object-contain
                      "
                    />

                  </button>

                )
              )}

            </div>
          )}

        </div>

        {/* ================================= */}
        {/* INFORMACIÓN */}
        {/* ================================= */}

        <div>

          {/* CATEGORÍA */}

          <p
            className="
              uppercase
              text-gray-500
              font-semibold
            "
          >
            {producto.categoria}
          </p>

          {/* MARCA */}

          {producto.marca && (

            <p
              className="
                text-blue-600
                font-semibold
                mt-2
              "
            >
              {producto.marca}
            </p>

          )}

          {/* NOMBRE */}

          <h1
            className="
              text-5xl
              font-bold
              mt-3
            "
          >
            {producto.nombre}
          </h1>

          {/* PRECIO */}

          {producto.precio > 0 && (

            <p
              className="
                text-5xl
                font-extrabold
                text-blue-700
                mt-8
              "
            >
              $
              {producto.precio.toLocaleString(
                "es-AR"
              )}
            </p>

          )}

          {/* WHATSAPP */}

          <a
            href={`https://wa.me/5492614685967?text=${encodeURIComponent(
              `Hola! Me interesa el producto: ${producto.nombre}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              mt-10
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-xl
              font-bold
              transition
            "
          >
            Consultar por WhatsApp
          </a>

          {/* DESCRIPCIÓN */}

          {producto.descripcion && (

            <div className="mt-12">

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                Descripción
              </h2>

              <p
                className="
                  text-gray-600
                  leading-8
                  whitespace-pre-line
                "
              >
                {producto.descripcion}
              </p>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default ProductDetail;