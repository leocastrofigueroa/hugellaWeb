import { Link } from "react-router-dom";
import { Heart, ArrowRight, MessageCircle } from "lucide-react";

function ProductCard({ producto }) {
  const precioOferta =
    producto.precioOferta && producto.precioOferta > 0
      ? producto.precioOferta
      : null;

  const tieneOferta =
    producto.oferta === true && precioOferta !== null;

  const precioMostrar = tieneOferta
    ? precioOferta
    : producto.precio;

  const mensajeWhatsApp = encodeURIComponent(
    `Hola! Me interesa el producto: ${producto.nombre}`
  );

  return (
    <article
      className="
        group
        relative
        bg-white
        rounded-3xl
        overflow-hidden
        border border-gray-100
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-500
        ease-out
      "
    >

      {/* ================================= */}
      {/* IMAGEN */}
      {/* ================================= */}

      <div className="relative bg-gradient-to-b from-gray-50 to-white p-4 sm:p-5">

        {/* OFERTA */}

        {producto.oferta && (
          <div className="absolute top-4 left-4 z-20">

            <span
              className="
                inline-flex
                items-center
                bg-[#315b91]
                text-white
                text-[11px]
                sm:text-xs
                font-extrabold
                uppercase
                tracking-wider
                px-3
                py-1.5
                rounded-full
                shadow-lg
              "
            >
              Oferta
            </span>

          </div>
        )}


        {/* FAVORITOS */}

        <button
          type="button"
          aria-label="Agregar a favoritos"
          onClick={(e) => e.preventDefault()}
          className="
            absolute
            top-4
            right-4
            z-20
            w-10
            h-10
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-gray-500
            hover:text-[#315b91]
            hover:scale-110
            transition-all
            duration-300
          "
        >
          <Heart
            size={18}
            strokeWidth={1.8}
          />
        </button>


        {/* IMAGEN */}

        <Link
          to={`/productos/${producto.id}`}
          className="
            block
            relative
            cursor-pointer
            overflow-hidden
            rounded-2xl
          "
        >

          <div className="h-52 sm:h-56 md:h-60 flex items-center justify-center">

            <img
              src={
                producto.carpeta
                  ? `/imgHugella/productos/${producto.carpeta}/principal.png`
                  : "/imgHugella/logo.png"
              }
              alt={producto.nombre}
              className="
                max-h-full
                max-w-full
                w-full
                object-contain
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "
              onError={(e) => {
                e.currentTarget.src =
                  "/imgHugella/logo.png";
              }}
            />

          </div>

        </Link>

      </div>


      {/* ================================= */}
      {/* INFORMACIÓN */}
      {/* ================================= */}

      <div className="p-5 sm:p-6">

        {/* CATEGORÍA */}

        <p className="
          text-xs
          text-[#315b91]
          font-bold
          uppercase
          tracking-wider
          truncate
        ">
          {producto.categoria || "Producto"}
        </p>


        {/* MARCA */}

        {producto.marca && (
          <p className="
            text-xs
            sm:text-sm
            text-gray-400
            mt-1
            truncate
          ">
            {producto.marca}
          </p>
        )}


        {/* NOMBRE */}

        <Link
          to={`/productos/${producto.id}`}
          className="block"
        >

          <h3
            className="
              mt-2
              text-base
              sm:text-lg
              font-bold
              text-gray-900
              leading-snug
              min-h-[48px]
              sm:min-h-[56px]
              line-clamp-2
              group-hover:text-[#315b91]
              transition-colors
              duration-300
            "
          >
            {producto.nombre}
          </h3>

        </Link>


        {/* ================================= */}
        {/* PRECIO */}
        {/* ================================= */}

        <div className="mt-5">

          {tieneOferta ? (

            <>

              <p className="
                text-xs
                text-gray-400
                uppercase
                tracking-wide
              ">
                Precio anterior
              </p>

              <p className="
                text-base
                sm:text-lg
                text-gray-400
                line-through
              ">
                ${producto.precio.toLocaleString("es-AR")}
              </p>

              <div className="flex items-end gap-2 mt-1">

                <div>

                  <p className="
                    text-xs
                    text-[#315b91]
                    font-bold
                    uppercase
                    tracking-wide
                  ">
                    Precio oferta
                  </p>

                  <p className="
                    text-2xl
                    sm:text-3xl
                    font-extrabold
                    text-[#315b91]
                    leading-none
                    mt-1
                  ">
                    ${precioMostrar.toLocaleString("es-AR")}
                  </p>

                </div>

              </div>

            </>

          ) : (

            producto.precio > 0 && (

              <>

                <p className="
                  text-xs
                  text-gray-400
                  uppercase
                  tracking-wide
                ">
                  Precio
                </p>

                <p className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-[#315b91]
                  leading-none
                  mt-1
                ">
                  ${producto.precio.toLocaleString("es-AR")}
                </p>

              </>

            )

          )}

        </div>


        {/* ================================= */}
        {/* ACCIONES */}
        {/* ================================= */}

        <div className="mt-5 space-y-2.5">

          {/* VER DETALLES */}

          <Link
            to={`/productos/${producto.id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              rounded-xl
              bg-[#315b91]
              py-3
              text-center
              font-bold
              text-white
              hover:bg-[#264a78]
              transition-all
              duration-300
              hover:shadow-lg
              hover:-translate-y-0.5
              text-sm
              sm:text-base
            "
          >
            Ver detalles

            <ArrowRight
              size={17}
              strokeWidth={2}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>


          {/* WHATSAPP */}

          <a
            href={`https://wa.me/5492614685967?text=${mensajeWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              rounded-xl
              bg-green-600
              py-3
              text-center
              font-bold
              text-white
              hover:bg-green-700
              transition-all
              duration-300
              hover:shadow-lg
              hover:-translate-y-0.5
              text-sm
              sm:text-base
            "
          >

            <MessageCircle
              size={18}
              strokeWidth={2}
            />

            WhatsApp

          </a>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;