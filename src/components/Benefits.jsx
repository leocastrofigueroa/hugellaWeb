import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Truck,
  Headphones,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

function Benefits() {

  const navigate = useNavigate();

  const sectionRef = useRef(null);

  const [scrollProgress, setScrollProgress] =
    useState(0);

  const items = [
    {
      icon: Truck,
      title: "Envíos",
      text: "A todo el país",
      accion: null,
    },
    {
      icon: Headphones,
      title: "Atención personalizada",
      text: "Te ayudamos a elegir",
      accion: null,
    },
    {
      icon: ShieldCheck,
      title: "Garantía",
      text: "Oficial y respaldada",
      accion: null,
    },
    {
      icon: BadgeCheck,
      title: "Primeras marcas",
      text: "Calidad asegurada",
      accion: null,
    },
  ];

  useEffect(() => {

    const actualizarParallax = () => {

      if (!sectionRef.current) return;

      const rect =
        sectionRef.current.getBoundingClientRect();

      const windowHeight =
        window.innerHeight;

      const progreso =
        (windowHeight - rect.top) /
        (windowHeight + rect.height);

      setScrollProgress(
        Math.max(
          0,
          Math.min(1, progreso)
        )
      );

    };

    actualizarParallax();

    window.addEventListener(
      "scroll",
      actualizarParallax,
      {
        passive: true,
      }
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
      className="
        relative
        overflow-hidden
        bg-blue-600
        text-white
      "
    >

      {/* ================================= */}
      {/* FONDO PARALLAX */}
      {/* ================================= */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          transform: `translateY(${
            (0.5 - scrollProgress) * 120
          }px) scale(1.08)`,

          transition:
            "transform 0.08s linear",
        }}
      >

        <div className="
          absolute
          -top-32
          left-[10%]
          w-72
          h-72
          rounded-full
          bg-white/5
          blur-3xl
        " />

        <div className="
          absolute
          top-20
          right-[15%]
          w-96
          h-96
          rounded-full
          bg-white/5
          blur-3xl
        " />

        <div className="
          absolute
          -bottom-40
          left-[45%]
          w-80
          h-80
          rounded-full
          bg-white/5
          blur-3xl
        "/>

      </div>


      {/* ================================= */}
      {/* CONTENIDO */}
      {/* ================================= */}

      <div className="
        relative
        max-w-7xl
        mx-auto
        grid
        grid-cols-2
        md:grid-cols-4
        py-16
        px-6
      ">

        {items.map((item, index) => {

          const Icon = item.icon;

          const velocidades = [
            90,
            65,
            45,
            75,
          ];

          const desplazamiento =
            (0.5 - scrollProgress) *
            velocidades[index];

          const opacidad =
            Math.min(
              1,
              Math.max(
                0,
                scrollProgress * 2.2
              )
            );

          const escala =
            0.88 +
            Math.min(
              0.12,
              scrollProgress * 0.3
            );

          return (

            <div
              key={item.title}
              className="
                flex
                flex-col
                items-center
                text-center
                px-6
                py-5
                md:py-2
                gap-3
              "
              style={{
                transform: `
                  translateY(${desplazamiento}px)
                  scale(${escala})
                `,

                opacity: opacidad,

                transition:
                  "transform 0.12s linear, opacity 0.15s linear",
              }}
            >

              {/* ICONO */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-16
                  h-16
                  rounded-full
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  shadow-lg
                "
              >

                <Icon
                  size={32}
                  strokeWidth={1.7}
                  className="text-white"
                />

              </div>


              {/* TITULO */}

              <h3 className="
                font-bold
                text-lg
                sm:text-xl
                mt-1
              ">
                {item.title}
              </h3>


              {/* TEXTO */}

              <p className="
                text-blue-100
                text-sm
                sm:text-base
              ">
                {item.text}
              </p>

            </div>

          );

        })}

      </div>

    </section>

  );
}

export default Benefits;