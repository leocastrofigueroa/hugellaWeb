import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsPromise from "../data/products.js";

function Offers() {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    productsPromise
      .then((datos) => {
        setProducts(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando ofertas:", error);
        setCargando(false);
      });
  }, []);

  // SOLO productos marcados como OFERTA = SI
  const ofertas = products.filter(
    (producto) => producto.oferta === true
  );

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#f5f6f8]">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="text-center">

            <p className="text-[#315b91] text-xl font-extrabold uppercase tracking-wide">
              HUGELLA
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold mt-2">
              Ofertas
            </h1>

            <p className="text-gray-500 mt-4">
              Cargando nuestras ofertas...
            </p>

          </div>

        </section>

      </main>
    );
  }

  // =========================================
  // PRIMERA OFERTA
  // =========================================

  const ofertaPrincipal = ofertas[0];

  // =========================================
  // RESTO DE LAS OFERTAS
  // =========================================

  const otrasOfertas = ofertas.slice(1);

  return (
    <main className="min-h-screen bg-[#f5f6f8]">

      {/* ========================================= */}
      {/* ENCABEZADO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden bg-[#315b91] text-white">

        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A4A]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

          <p className="text-blue-200 text-lg sm:text-xl font-extrabold uppercase tracking-[0.2em]">
            HUGELLA
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mt-3 tracking-tight">
            Ofertas
          </h1>

          <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mt-5 leading-relaxed">
            Encontrá productos para tu negocio y tu hogar a precios
            especiales.
          </p>

        </div>

      </section>


      {/* ========================================= */}
      {/* CONTENIDO */}
      {/* ========================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-12">

          <p className="text-[#315b91] font-bold uppercase tracking-wide">
            Oportunidades
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Aprovechá nuestras ofertas
          </h2>

          <p className="text-gray-500 mt-3">
            Productos seleccionados de HUGELLA.
          </p>

        </div>


        {/* ========================================= */}
        {/* SIN OFERTAS */}
        {/* ========================================= */}

        {ofertas.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

              <span className="text-3xl font-bold text-[#315b91]">
                %
              </span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              Próximamente nuevas ofertas
            </h2>

            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Estamos preparando nuevas oportunidades para vos.
            </p>

          </div>

        ) : (

          <>
            {/* ========================================= */}
            {/* OFERTA PRINCIPAL — GRANDE */}
            {/* ========================================= */}

            {ofertaPrincipal && (

              <Link
                to={`/productos/${ofertaPrincipal.id}`}
                className="group block mb-20"
              >

                <article className="relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">

                  {/* ETIQUETA */}

                  <div className="absolute top-7 left-7 z-20">

                    <span className="inline-flex items-center bg-[#315b91] text-white text-sm font-extrabold uppercase tracking-wide px-5 py-3 rounded-full shadow-lg">
                      Oferta destacada
                    </span>

                  </div>


                  {/* CONTENIDO */}

                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">

                    {/* INFORMACIÓN */}

                    <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-16">

                      <p className="text-gray-500 font-bold uppercase tracking-wide mb-3">
                        {ofertaPrincipal.marca}
                      </p>

                      <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight max-w-xl">
                        {ofertaPrincipal.nombre}
                      </h3>


                      {/* PRECIOS */}

                      <div className="mt-8">

                        {ofertaPrincipal.precioOferta ? (

                          <>
                            <p className="text-base text-gray-400">
                              Precio anterior
                            </p>

                            <p className="text-xl text-gray-400 line-through">
                              ${ofertaPrincipal.precio.toLocaleString("es-AR")}
                            </p>

                            <p className="text-base text-[#315b91] font-semibold mt-2">
                              Precio especial
                            </p>

                            <p className="text-5xl sm:text-6xl font-extrabold text-[#315b91]">
                              $
                              {ofertaPrincipal.precioOferta.toLocaleString(
                                "es-AR"
                              )}
                            </p>
                          </>

                        ) : (

                          <>
                            <p className="text-base text-gray-400">
                              Precio
                            </p>

                            <p className="text-5xl sm:text-6xl font-extrabold text-[#315b91]">
                              $
                              {ofertaPrincipal.precio.toLocaleString("es-AR")}
                            </p>
                          </>

                        )}

                      </div>


                      {/* BOTÓN */}

                      <div className="mt-8 text-[#315b91] font-extrabold text-lg">
                        Ver producto
                        <span className="inline-block ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-2">
                          →
                        </span>
                      </div>

                    </div>


                    {/* IMAGEN GRANDE */}

                    <div className="relative min-h-[400px] lg:min-h-full bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-hidden">

                      {ofertaPrincipal.carpeta ? (

                        <img
                          src={`/imgHugella/productos/${ofertaPrincipal.carpeta}/1.png`}
                          alt={ofertaPrincipal.nombre}
                          className="w-full h-full max-h-[450px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />

                      ) : (

                        <div className="text-gray-300 text-sm">
                          Imagen no disponible
                        </div>

                      )}

                    </div>

                  </div>

                </article>

              </Link>
            )}


            {/* ========================================= */}
            {/* LAS OTRAS 9 OFERTAS — CASCADA */}
            {/* ========================================= */}

            {otrasOfertas.length > 0 && (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 pb-24">

                {otrasOfertas.map((producto, index) => {

                  /*
                    Efecto cascada:
                    1 → baja
                    2 → baja más
                    3 → vuelve arriba
                    4 → baja
                    etc.
                  */

                  const posiciones = [
                    "lg:translate-y-0",
                    "lg:translate-y-10",
                    "lg:translate-y-20",
                    "lg:translate-y-0",
                    "lg:translate-y-10",
                    "lg:translate-y-20",
                    "lg:translate-y-0",
                    "lg:translate-y-10",
                    "lg:translate-y-20",
                  ];

                  const posicion =
                    posiciones[index % posiciones.length];

                  return (

                    <Link
                      key={producto.id}
                      to={`/productos/${producto.id}`}
                      className={`group block ${posicion}`}
                    >

                      <article className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                        {/* ETIQUETA */}

                        <div className="absolute top-4 left-4 z-10">

                          <span className="inline-flex items-center bg-[#315b91] text-white text-xs font-extrabold uppercase tracking-wide px-4 py-2 rounded-full shadow-lg">
                            Oferta
                          </span>

                        </div>


                        {/* IMAGEN */}

                        <div className="aspect-square bg-white flex items-center justify-center p-6 overflow-hidden">

                          {producto.carpeta ? (

                            <img
                              src={`/imgHugella/productos/${producto.carpeta}/1.png`}
                              alt={producto.nombre}
                              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />

                          ) : (

                            <div className="text-gray-300 text-sm">
                              Imagen no disponible
                            </div>

                          )}

                        </div>


                        {/* INFORMACIÓN */}

                        <div className="p-6">

                          <p className="text-sm text-gray-500 mb-2">
                            {producto.marca}
                          </p>

                          <h3 className="font-bold text-lg leading-tight line-clamp-2 text-gray-900">
                            {producto.nombre}
                          </h3>


                          {/* PRECIOS */}

                          <div className="mt-5">

                            {producto.precioOferta ? (

                              <>
                                <p className="text-sm text-gray-400">
                                  Precio anterior
                                </p>

                                <p className="text-lg text-gray-400 line-through">
                                  ${producto.precio.toLocaleString("es-AR")}
                                </p>

                                <p className="text-sm text-[#315b91] font-semibold mt-2">
                                  Precio de oferta
                                </p>

                                <p className="text-3xl font-extrabold text-[#315b91]">
                                  $
                                  {producto.precioOferta.toLocaleString(
                                    "es-AR"
                                  )}
                                </p>
                              </>

                            ) : (

                              <>
                                <p className="text-sm text-gray-400">
                                  Precio
                                </p>

                                <p className="text-3xl font-extrabold text-[#315b91]">
                                  $
                                  {producto.precio.toLocaleString("es-AR")}
                                </p>
                              </>

                            )}

                          </div>


                          {/* ACCIÓN */}

                          <div className="mt-5 text-[#315b91] font-bold">

                            Ver producto

                            <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>

                          </div>

                        </div>

                      </article>

                    </Link>

                  );
                })}

              </div>

            )}

          </>

        )}

      </section>


      {/* ========================================= */}
      {/* LLAMADO FINAL */}
      {/* ========================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="bg-[#315b91] rounded-3xl p-8 sm:p-12 text-white text-center">

          <p className="text-blue-200 font-bold uppercase tracking-wide">
            ¿No encontrás lo que buscás?
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            Tenemos cientos de productos
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto mt-4">
            Visitá nuestro catálogo completo o contactanos y te ayudamos
            a encontrar lo que necesitás.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <Link
              to="/productos"
              className="bg-white text-[#315b91] px-7 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Ver productos
            </Link>

            <Link
              to="/contacto"
              className="border border-white/50 px-7 py-3 rounded-xl font-bold hover:bg-white/10 transition"
            >
              Contactanos
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Offers;