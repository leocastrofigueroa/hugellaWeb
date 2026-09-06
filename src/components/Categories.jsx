import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const sectionRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const categories = [
    {
      nombre: "Heladeras",
      imagen: "/imgHugella/categorias/heladeras.png",
      ruta: "/productos?categoria=Heladeras",
    },
    {
      nombre: "Freezers",
      imagen: "/imgHugella/categorias/freezers.png",
      ruta: "/productos?categoria=Freezers",
    },
    {
      nombre: "Cocinas",
      imagen: "/imgHugella/categorias/cocinas.png",
      ruta: "/productos?categoria=Cocinas",
    },
    {
      nombre: "Calefacción",
      imagen: "/imgHugella/categorias/calefaccion.png",
      ruta: "/productos?grupo=calefaccion",
    },
    {
      nombre: "Herramientas",
      imagen: "/imgHugella/categorias/herramientas.png",
      ruta: "/productos?grupo=herramientas",
    },
    {
      nombre: "Celulares",
      imagen: "/imgHugella/categorias/celulares.png",
      ruta: "/productos?categoria=Celulares",
    },
    {
      nombre: "Electrodomésticos",
      imagen: "/imgHugella/categorias/electrodomesticos.png",
      ruta: "/productos?categoria=Electrodomésticos",
    },
    {
      nombre: "Movilidad",
      imagen: "/imgHugella/categorias/movilidad.png",
      ruta: "/productos?grupo=movilidad",
    },
  ];

  useEffect(() => {
    const actualizarParallax = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progreso =
        (windowHeight - rect.top) /
        (windowHeight + rect.height);

      setScrollProgress(
        Math.max(0, Math.min(1, progreso))
      );
    };

    actualizarParallax();

    window.addEventListener(
      "scroll",
      actualizarParallax,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      actualizarParallax
    );

    return () => {
      window.removeEventListener(
        "scroll",
        actualizarParallax
      );

      window.removeEventListener(
        "resize",
        actualizarParallax
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ========================= */}
      {/* FONDO PARALLAX */}
      {/* ========================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${(0.5 - scrollProgress) * 100
            }px)`,
          transition: "transform 0.08s linear",
        }}
      >
        <div
          className="
            absolute
            -top-40
            -right-40
            w-96
            h-96
            rounded-full
            bg-blue-50
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/2
            -left-40
            w-80
            h-80
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            right-[30%]
            w-96
            h-96
            rounded-full
            bg-gray-100
            blur-3xl
          "
        />
      </div>

      {/* ========================= */}
      {/* CONTENIDO */}
      {/* ========================= */}

      <div className="relative max-w-7xl mx-auto py-24 px-8">

        {/* ========================= */}
        {/* TÍTULO */}
        {/* ========================= */}

        <div
          className="mb-12"
          style={{
            transform: `translateY(${(0.5 - scrollProgress) * 35
              }px)`,

            opacity: Math.min(
              1,
              scrollProgress * 2
            ),

            transition:
              "transform 0.12s linear, opacity 0.15s linear",
          }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Categorías
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Encontrá rápidamente lo que necesitás.
          </p>
        </div>

        {/* ========================= */}
        {/* CATEGORÍAS */}
        {/* ========================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((categoria, index) => {
            const velocidades = [
              80,
              55,
              70,
              45,
              65,
              85,
              50,
              75,
            ];

            const desplazamiento =
              (0.5 - scrollProgress) *
              velocidades[index];

            const escala =
              0.82 +
              Math.min(
                0.18,
                scrollProgress * 0.35
              );

            const opacidad = Math.min(
              1,
              scrollProgress * 2.5
            );

            return (
              <Link
                key={categoria.nombre}
                to={categoria.ruta}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  bg-white
                  shadow-md
                  hover:shadow-2xl
                  transition-shadow
                  duration-300
                  cursor-pointer
                  aspect-[4/3]
                  sm:aspect-[4/3]
                "
                style={{
                  transform: `
                    translateY(${desplazamiento}px)
                    scale(${escala})
                  `,

                  opacity: opacidad,

                  transition:
                    "transform 0.12s linear, opacity 0.15s linear, box-shadow 0.3s ease",
                }}
              >

                {/* ========================= */}
                {/* IMAGEN */}
                {/* ========================= */}

                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* ========================= */}
                {/* DEGRADADO */}
                {/* ========================= */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-black/15
                    to-transparent
                  "
                />

                {/* ========================= */}
                {/* NOMBRE */}
                {/* ========================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-4
                    sm:p-6
                  "
                >
                  <h3
                    className="
                      text-white
                      font-bold
                      text-lg
                      sm:text-2xl
                      text-center
                      leading-tight
                      drop-shadow-md
                    "
                  >
                    {categoria.nombre}
                  </h3>
                </div>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Categories;