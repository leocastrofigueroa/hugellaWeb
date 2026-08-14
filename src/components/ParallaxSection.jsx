import { useEffect, useRef, useState } from "react";

function ParallaxSection({
  children,
  speed = 0.15,
  className = "",
}) {
  const sectionRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const actualizar = () => {
      if (!sectionRef.current) return;

      const rect =
        sectionRef.current.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      /*
      Centro de la sección respecto
      del centro de la pantalla.
      */

      const centroSeccion =
        rect.top + rect.height / 2;

      const centroPantalla =
        windowHeight / 2;

      const distancia =
        centroSeccion - centroPantalla;

      /*
      Movimiento limitado para evitar
      desplazamientos exagerados.
      */

      const movimiento = Math.max(
        -90,
        Math.min(90, distancia * speed)
      );

      setOffset(movimiento);

      /*
      Opacidad suave al entrar/salir.
      */

      const visibilidad =
        1 -
        Math.min(
          0.18,
          Math.abs(distancia) /
            (windowHeight * 4)
        );

      setOpacity(visibilidad);
    };

    window.addEventListener(
      "scroll",
      actualizar,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      actualizar
    );

    actualizar();

    return () => {
      window.removeEventListener(
        "scroll",
        actualizar
      );

      window.removeEventListener(
        "resize",
        actualizar
      );
    };
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        opacity,
        willChange: "transform",
      }}
    >
      {children}
    </section>
  );
}

export default ParallaxSection;