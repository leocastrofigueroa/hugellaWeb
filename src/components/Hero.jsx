import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsPromise from "../data/products.js";
import "@google/model-viewer";

const productosCarrusel = [
  {
    id: 8,
    imagen: "/imgHugella/carrousel/balanzaSystel.png",
    modelo3D: "/modelos3d/balanza-systel.glb",
  },
  {
    id: 14,
    imagen: "/imgHugella/destacados/bicicletamtbovertechR29rosa.png",
    modelo3D: "/modelos3d/bicicleta.glb",
  },
  {
    id: 38,
    imagen: "/imgHugella/carrousel/cortadoraFiambreSantini.png",
    modelo3D: "/modelos3d/cortadora-santini.glb",
  },
  {
    id: 47,
    imagen: "/imgHugella/carrousel/freezerInelro350.png",
    modelo3D: "/modelos3d/freezer-inelro.glb",
  },
  {
    id: 60,
    imagen: "/imgHugella/carrousel/hornoPizzero12Moldes.png",
    modelo3D: "/modelos3d/horno-pizzero.glb",
  },
  {
    id: 86,
    imagen: "/imgHugella/destacados/parlanteKenBrownMonsterBox.png",
    modelo3D: "/modelos3d/parlante-ken-brown.glb",
  },
];

function Hero() {
  const [productos, setProductos] = useState([]);
  const [actual, setActual] = useState(0);

  const navigate = useNavigate();

  // =========================
  // CARGAR PRODUCTOS
  // =========================

  useEffect(() => {
    productsPromise
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        console.error("Error cargando productos:", error);
      });
  }, []);

  // =========================
  // CONSTRUIR BANNERS
  // =========================

  const banners = productosCarrusel
    .map((item) => {
      const producto = productos.find(
        (p) => Number(p.id) === item.id
      );

      if (!producto) {
        console.error(
          `Producto del carrusel no encontrado. ID: ${item.id}`
        );

        return null;
      }

      return {
        ...producto,
        imagen: item.imagen,
        modelo3D: item.modelo3D,
      };
    })
    .filter(Boolean);

  // =========================
  // CAMBIO AUTOMÁTICO
  // =========================

  useEffect(() => {
    if (banners.length !== 6) return;

    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % 6);
    }, 7000);

    return () => clearInterval(intervalo);
  }, [banners.length]);

  // =========================
  // SI TODAVÍA NO CARGÓ
  // =========================

  if (banners.length === 0) {
    return null;
  }

  const producto = banners[actual];

  // =========================
  // CONTROLES CARRUSEL
  // =========================

  const siguiente = () => {
    setActual((prev) => (prev + 1) % banners.length);
  };

  const anterior = () => {
    setActual(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  };

  return (
    <section
      className="
        relative
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-6
        sm:py-8
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          shadow-2xl
          min-h-[560px]
          bg-white
        "
      >

        {/* ================================================= */}
        {/* PRODUCTO 3D */}
        {/* ================================================= */}

        <div
          className="
            absolute
            right-0
            top-0
            w-[58%]
            sm:w-[62%]
            h-full
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          <model-viewer
            key={`${producto.id}-${producto.modelo3D}`}
            src={producto.modelo3D}
            camera-controls
            auto-rotate
            rotation-per-second="25deg"
            shadow-intensity="1"
            exposure="1"
            environment-image="neutral"
            camera-orbit="0deg 75deg auto"
            field-of-view="35deg"
            interaction-prompt="none"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          />

        </div>


        {/* ================================================= */}
        {/* DEGRADADO */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/75
            via-black/35
            to-transparent
            pointer-events-none
          "
        />


        {/* ================================================= */}
        {/* INFORMACIÓN */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-y-0
            left-[16%]
            w-[44%]
            sm:left-[11%]
            sm:w-[42%]
            flex
            items-center
            text-white
            z-10
          "
        >

          <div className="w-full">

            <p
              className="
                text-sm
                sm:text-lg
                uppercase
                tracking-widest
                text-blue-200
              "
            >
              {producto.marca}
            </p>


            <h1
              className="
                text-white
                text-2xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                mt-3
                leading-tight
              "
            >
              {producto.nombre}
            </h1>


            {producto.precio > 0 && (

              <p
                className="
                  text-white
                  text-2xl
                  sm:text-3xl
                  font-bold
                  mt-5
                "
              >
                ${producto.precio.toLocaleString("es-AR")}
              </p>

            )}


            <button
              type="button"
              onClick={() =>
                navigate(`/productos/${producto.id}`)
              }
              className="
                mt-6
                sm:mt-8
                bg-[#315b91]
                hover:bg-[#264a78]
                text-white
                px-6
                sm:px-8
                py-3
                sm:py-4
                rounded-xl
                font-bold
                transition-all
                duration-300
                hover:-translate-y-1
                shadow-lg
              "
            >
              Ver producto
            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* ANTERIOR */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={anterior}
          aria-label="Producto anterior"
          className="
            absolute
            left-3
            sm:left-5
            top-1/2
            -translate-y-1/2
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            bg-white/90
            hover:bg-white
            text-3xl
            text-gray-800
            shadow
            transition
            z-30
          "
        >
          ‹
        </button>


        {/* ================================================= */}
        {/* SIGUIENTE */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={siguiente}
          aria-label="Producto siguiente"
          className="
            absolute
            right-3
            sm:right-5
            top-1/2
            -translate-y-1/2
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            bg-white/90
            hover:bg-white
            text-3xl
            text-gray-800
            shadow
            transition
            z-30
          "
        >
          ›
        </button>


        {/* ================================================= */}
        {/* INDICADORES */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            flex
            gap-3
            z-20
          "
        >

          {banners.map((banner, index) => (

            <button
              key={banner.id}
              type="button"
              aria-label={`Ir al producto ${index + 1}`}
              onClick={() => setActual(index)}
              className={`
                w-3
                h-3
                rounded-full
                transition-all
                duration-300
                ${
                  actual === index
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/70"
                }
              `}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default Hero;