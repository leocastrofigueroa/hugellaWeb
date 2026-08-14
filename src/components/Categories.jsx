import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Refrigerator,
  Snowflake,
  CookingPot,
  Flame,
  Wrench,
  Smartphone,
  Home,
  Armchair,
} from "lucide-react";

function Categories() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const categories = [
    {
      nombre: "Heladeras",
      icono: Refrigerator,
      ruta: "/productos?categoria=Heladeras",
    },
    {
      nombre: "Freezers",
      icono: Snowflake,
      ruta: "/productos?categoria=Freezers",
    },
    {
      nombre: "Cocinas",
      icono: CookingPot,
      ruta: "/productos?categoria=Cocinas",
    },
    {
      nombre: "Calefacción",
      icono: Flame,
      ruta: "/productos?grupo=calefaccion",
    },
    {
      nombre: "Herramientas",
      icono: Wrench,
      ruta: "/productos?grupo=herramientas",
    },
    {
      nombre: "Celulares",
      icono: Smartphone,
      ruta: "/productos?categoria=Celulares",
    },
    {
      nombre: "Electrodomésticos",
      icono: Home,
      ruta: "/productos?categoria=Electrodomésticos",
    },
    {
      nombre: "Muebles",
      icono: Armchair,
      ruta: "/productos?categoria=Muebles",
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
          transform: `translateY(${
            (0.5 - scrollProgress) * 100
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
            transform: `translateY(${
              (0.5 - scrollProgress) * 35
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
            const Icono = categoria.icono;

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
                  bg-white
                  rounded-2xl
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition-shadow
                  duration-300
                  cursor-pointer
                  p-4
                  sm:p-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-h-[190px]
                  block
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

                {/* ICONO */}

                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    mb-5
                    transition-all
                    duration-500
                  "
                >

                  <Icono
                    size={32}
                    strokeWidth={1.8}
                    className="
                      text-blue-600
                      transition-transform
                      duration-500
                    "
                  />

                </div>


                {/* NOMBRE */}

                
                <h3 className="font-semibold text-base sm:text-lg text-center text-gray-800 break-words leading-tight w-full">
                  {categoria.nombre}
                </h3>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;