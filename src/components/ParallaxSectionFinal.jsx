import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function ParallaxSectionFinal() {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const actualizar = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const alturaVentana = window.innerHeight;

      const progreso =
        (alturaVentana - rect.top) /
        (alturaVentana + rect.height);

      setProgress(
        Math.max(0, Math.min(1, progreso))
      );
    };

    actualizar();

    window.addEventListener("scroll", actualizar, {
      passive: true,
    });

    window.addEventListener("resize", actualizar);

    return () => {
      window.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, []);

  const movimientoFondo = (0.5 - progress) * 180;
  const movimientoGrande = (0.5 - progress) * 100;
  const movimientoTexto = (0.5 - progress) * 45;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[620px]
        sm:min-h-[680px]
        overflow-hidden
        bg-[#315b91]
        flex
        items-center
        justify-center
      "
    >

      {/* ================================= */}
      {/* FONDO PROFUNDO */}
      {/* ================================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${movimientoFondo}px) scale(1.15)`,
        }}
      >

        <div
          className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            bg-white/10
            blur-3xl
            -top-48
            -left-32
          "
        />

        <div
          className="
            absolute
            w-[600px]
            h-[600px]
            rounded-full
            bg-black/10
            blur-3xl
            -bottom-64
            -right-40
          "
        />

        <div
          className="
            absolute
            w-[300px]
            h-[300px]
            rounded-full
            bg-white/5
            blur-2xl
            top-[35%]
            left-[45%]
          "
        />

      </div>


      {/* ================================= */}
      {/* ELEMENTOS DECORATIVOS */}
      {/* ================================= */}

      <div
        className="
          absolute
          w-[180px]
          h-[180px]
          rounded-full
          border
          border-white/20
          pointer-events-none
        "
        style={{
          transform: `
            translate(
              ${movimientoGrande}px,
              ${-movimientoGrande}px
            )
          `,
        }}
      />

      <div
        className="
          absolute
          w-[280px]
          h-[280px]
          rounded-full
          border
          border-white/10
          pointer-events-none
        "
        style={{
          right: "-80px",
          top: "20%",
          transform: `
            translateY(${movimientoFondo * -0.5}px)
          `,
        }}
      />

      <div
        className="
          absolute
          w-5
          h-5
          rounded-full
          bg-white/30
          pointer-events-none
        "
        style={{
          left: "15%",
          top: "25%",
          transform: `
            translateY(${movimientoGrande * -1.5}px)
          `,
        }}
      />

      <div
        className="
          absolute
          w-3
          h-3
          rounded-full
          bg-white/40
          pointer-events-none
        "
        style={{
          right: "18%",
          bottom: "22%",
          transform: `
            translateY(${movimientoGrande * 1.4}px)
          `,
        }}
      />


      {/* ================================= */}
      {/* CONTENIDO */}
      {/* ================================= */}

      <div
        className="
          relative
          z-10
          max-w-4xl
          mx-auto
          px-6
          py-24
          text-center
          text-white
        "
        style={{
          transform: `translateY(${movimientoTexto}px)`,
          opacity: Math.min(1, progress * 2),
        }}
      >

        <p className="
          text-blue-100
          text-lg
          sm:text-xl
          font-bold
          uppercase
          tracking-[0.3em]
        ">
          HUGELLA
        </p>


        <h2 className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-extrabold
          leading-tight
          mt-5
        ">
          Todo lo que necesitás
          <br />
          para tu negocio.
        </h2>


        <p className="
          max-w-2xl
          mx-auto
          text-blue-100
          text-base
          sm:text-lg
          leading-relaxed
          mt-7
        ">
          Equipamiento comercial, productos para el hogar
          y atención cercana para ayudarte a encontrar
          exactamente lo que necesitás.
        </p>


        {/* ================================= */}
        {/* BOTONES */}
        {/* ================================= */}

        <div className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-4
          mt-10
        ">

          <Link
            to="/productos"
            className="
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-xl
              bg-white
              text-[#315b91]
              font-bold
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            Ver productos →
          </Link>


          <Link
            to="/contacto"
            className="
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-xl
              border
              border-white/40
              bg-white/10
              backdrop-blur-sm
              text-white
              font-bold
              hover:bg-white/20
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            Contactanos
          </Link>

        </div>


        {/* ================================= */}
        {/* FRASE FINAL */}
        {/* ================================= */}

        <p className="
          text-sm
          text-blue-100/70
          mt-10
        ">
          Cercanía · Atención · Confianza
        </p>

      </div>

    </section>
  );
}

export default ParallaxSectionFinal;
