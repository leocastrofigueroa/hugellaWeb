import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function BrandsCarousel() {

  const marcas = [
    {
      nombre: "AIWA",
      imagen: "/imgHugella/marcas/aiwa.png",
    },
    {
      nombre: "ATMA",
      imagen: "/imgHugella/marcas/atma.png",
    },
    {
      nombre: "BRIKET",
      imagen: "/imgHugella/marcas/briket.png",
    },
    {
      nombre: "HISENSE",
      imagen: "/imgHugella/marcas/hisense.png",
    },
    {
      nombre: "INELRO",
      imagen: "/imgHugella/marcas/inelro.png",
    },
    {
      nombre: "KEN BROWN",
      imagen: "/imgHugella/marcas/kenbrown.png",
    },
    {
      nombre: "LILIANA",
      imagen: "/imgHugella/marcas/liliana.png",
    },
    {
      nombre: "LUSQTOFF",
      imagen: "/imgHugella/marcas/lusqtoff.png",
    },
    {
      nombre: "MAKITA",
      imagen: "/imgHugella/marcas/makita.png",
    },
    {
      nombre: "MORELLI",
      imagen: "/imgHugella/marcas/morelli.png",
    },
    {
      nombre: "MOTOROLA",
      imagen: "/imgHugella/marcas/motorola.png",
    },
    {
      nombre: "PHILCO",
      imagen: "/imgHugella/marcas/philco.png",
    },
    {
      nombre: "PHILLIPS",
      imagen: "/imgHugella/marcas/phillips.png",
    },
    {
      nombre: "SAMSUNG",
      imagen: "/imgHugella/marcas/samsung.png",
    },
    {
      nombre: "SEÑORIAL",
      imagen: "/imgHugella/marcas/senorial.png",
    },
    {
      nombre: "SOL REAL",
      imagen: "/imgHugella/marcas/solreal.png",
    },
    {
      nombre: "SYSTEL",
      imagen: "/imgHugella/marcas/systel.png",
    },
    {
      nombre: "TCL",
      imagen: "/imgHugella/marcas/tcl.png",
    },
    {
      nombre: "WHAL",
      imagen: "/imgHugella/marcas/whal.png",
    },
    {
      nombre: "YELMO",
      imagen: "/imgHugella/marcas/yelmo.png",
    },
  ];

  const carruselRef = useRef(null);

  useEffect(() => {

    const carrusel = carruselRef.current;

    if (!carrusel) return;

    let animacion;

    const velocidad = 0.5;

    const mover = () => {

      carrusel.scrollLeft += velocidad;

      /*
        Cuando llegamos aproximadamente
        a la mitad del contenido duplicado,
        volvemos al principio.

        Esto genera un movimiento continuo.
      */

      if (
        carrusel.scrollLeft >=
        carrusel.scrollWidth / 2
      ) {
        carrusel.scrollLeft = 0;
      }

      animacion = requestAnimationFrame(mover);
    };

    animacion = requestAnimationFrame(mover);

    return () => {
      cancelAnimationFrame(animacion);
    };

  }, []);

  return (

    <section className="relative bg-white py-12 overflow-hidden border-y border-gray-100">

      {/* ================================= */}
      {/* TÍTULO */}
      {/* ================================= */}

      <div className="max-w-7xl mx-auto px-6 mb-8">

        <div className="text-center">

          <p className="text-[#315b91] text-sm font-extrabold uppercase tracking-[0.2em]">
            Trabajamos con
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
            Primeras marcas
          </h2>

        </div>

      </div>


      {/* ================================= */}
      {/* CARRUSEL */}
      {/* ================================= */}

      <div className="relative w-full overflow-hidden">

        <div
          ref={carruselRef}
          className="
            flex
            items-center
            gap-6
            overflow-hidden
            px-6
            select-none
          "
        >

          {/* PRIMERA VUELTA */}

          {marcas.map((marca, index) => (

            <Link
              key={`primera-${marca.nombre}-${index}`}
              to={`/productos?marca=${encodeURIComponent(
                marca.nombre
              )}`}
              className="
                shrink-0
                w-36
                h-24
                bg-white
                border
                border-gray-200
                rounded-2xl
                flex
                items-center
                justify-center
                p-5
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
              title={`Ver productos ${marca.nombre}`}
            >

              <img
                src={marca.imagen}
                alt={marca.nombre}
                className="
                  max-w-full
                  max-h-full
                  object-contain
                  pointer-events-none
                "
              />

            </Link>

          ))}


          {/* SEGUNDA VUELTA */}

          {marcas.map((marca, index) => (

            <Link
              key={`segunda-${marca.nombre}-${index}`}
              to={`/productos?marca=${encodeURIComponent(
                marca.nombre
              )}`}
              className="
                shrink-0
                w-36
                h-24
                bg-white
                border
                border-gray-200
                rounded-2xl
                flex
                items-center
                justify-center
                p-5
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
              title={`Ver productos ${marca.nombre}`}
            >

              <img
                src={marca.imagen}
                alt={marca.nombre}
                className="
                  max-w-full
                  max-h-full
                  object-contain
                  pointer-events-none
                "
              />

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default BrandsCarousel;