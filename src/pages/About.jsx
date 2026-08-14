import ParallaxSection from "../components/ParallaxSection";

function About() {
  return (
    <main className="bg-[#f5f6f8] overflow-hidden">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.05}
        className="relative z-10"
      >
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl">

              <p className="text-[#315b91] text-xl sm:text-2xl font-extrabold uppercase tracking-[0.2em]">
                HUGELLA
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-4 leading-tight text-gray-900">
                Una historia que
                <span className="text-[#315b91]">
                  {" "}recién comienza.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-500 mt-8 leading-relaxed max-w-3xl">
                Somos una empresa familiar que decidió emprender y apostar
                por un rubro que conocemos desde hace más de 15 años.
              </p>

            </div>

          </div>

        </section>
      </ParallaxSection>


      {/* ===================================================== */}
      {/* NUESTRA HISTORIA */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.09}
        className="relative z-20"
      >
        <section className="py-20 sm:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* AÑO */}

              <div className="relative">

                <div className="absolute -inset-4 bg-blue-100/40 rounded-[2.5rem] blur-2xl" />

                <div className="relative bg-[#315b91] rounded-[2rem] p-10 sm:p-14 text-white shadow-2xl">

                  <p className="text-blue-200 uppercase tracking-[0.25em] text-sm font-bold">
                    Nuestro comienzo
                  </p>

                  <p className="text-8xl sm:text-9xl font-extrabold mt-4 leading-none">
                    2025
                  </p>

                  <div className="h-1 w-20 bg-white/60 rounded-full mt-8" />

                  <p className="text-xl text-blue-100 mt-8 leading-relaxed">
                    El año en que decidimos convertir nuestra experiencia
                    en un proyecto propio.
                  </p>

                </div>

              </div>


              {/* TEXTO */}

              <div>

                <p className="text-[#315b91] font-extrabold uppercase tracking-widest text-sm">
                  Nuestra historia
                </p>

                <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 text-gray-900">
                  Una empresa familiar
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mt-6">
                  HUGELLA nació en 2025 como una empresa familiar que
                  decidió emprender y apostar por el rubro del
                  equipamiento comercial.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mt-5">
                  Llegamos a este proyecto con más de 15 años de experiencia
                  trabajando en el sector, conociendo de cerca las
                  necesidades de nuestros clientes y las características
                  del mercado.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mt-5">
                  Esa experiencia es la base sobre la que construimos
                  HUGELLA y sobre la que queremos seguir creciendo.
                </p>

              </div>

            </div>

          </div>

        </section>
      </ParallaxSection>


      {/* ===================================================== */}
      {/* EXPERIENCIA */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.12}
        className="relative z-30"
      >
        <section className="bg-white py-20 sm:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto">

              <p className="text-[#315b91] font-extrabold uppercase tracking-widest text-sm">
                Experiencia
              </p>

              <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 text-gray-900">
                Más de 15 años en el rubro
              </h2>

              <p className="text-gray-500 text-lg mt-6 leading-relaxed">
                Nuestra experiencia nos permitió conocer de cerca las
                necesidades de quienes buscan equipar un negocio, un hogar
                o llevar adelante un nuevo proyecto.
              </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">

              {[
                {
                  numero: "+15",
                  titulo: "Años de experiencia",
                  texto: "Conocimiento del rubro y sus necesidades.",
                },
                {
                  numero: "2025",
                  titulo: "Nace HUGELLA",
                  texto: "Una nueva etapa como empresa familiar.",
                },
                {
                  numero: "∞",
                  titulo: "Mirando hacia adelante",
                  texto: "Un proyecto pensado para seguir creciendo.",
                },
              ].map((item) => (

                <div
                  key={item.titulo}
                  className="group rounded-3xl bg-[#f5f6f8] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >

                  <p className="text-5xl font-extrabold text-[#315b91] group-hover:scale-110 transition-transform duration-500">
                    {item.numero}
                  </p>

                  <p className="font-bold text-xl mt-3">
                    {item.titulo}
                  </p>

                  <p className="text-gray-500 mt-2">
                    {item.texto}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>
      </ParallaxSection>


      {/* ===================================================== */}
      {/* QUÉ OFRECEMOS */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.15}
        className="relative z-40"
      >
        <section className="py-20 sm:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              <div>

                <p className="text-[#315b91] font-extrabold uppercase tracking-widest text-sm">
                  Qué ofrecemos
                </p>

                <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 text-gray-900">
                  Todo para tu negocio y tu hogar
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mt-6">
                  Buscamos ofrecer una amplia variedad de productos para
                  acompañar diferentes necesidades, desde el equipamiento
                  de un comercio hasta productos para el hogar.
                </p>

              </div>


              <div className="grid grid-cols-2 gap-4">

                {[
                  "Heladeras",
                  "Freezers",
                  "Cocinas",
                  "Calefacción",
                  "Herramientas",
                  "Celulares",
                  "Electrodomésticos",
                  "Muebles",
                ].map((categoria) => (

                  <div
                    key={categoria}
                    className="group bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                  >

                    <div className="w-2 h-2 rounded-full bg-[#315b91] mb-4 group-hover:scale-150 transition-transform duration-300" />

                    <p className="font-bold text-gray-800">
                      {categoria}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="mt-8 text-center">

              <p className="text-gray-500">
                Y cientos de productos más para acompañar cada proyecto.
              </p>

            </div>

          </div>

        </section>
      </ParallaxSection>


      {/* ===================================================== */}
      {/* NUESTRA DIFERENCIA */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.18}
        className="relative z-50"
      >
        <section className="bg-[#315b91] text-white py-20 sm:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl">

              <p className="text-blue-200 font-extrabold uppercase tracking-widest text-sm">
                Nuestra diferencia
              </p>

              <h2 className="text-4xl sm:text-5xl font-extrabold mt-3">
                Las personas están primero.
              </h2>

              <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mt-6">
                Creemos que una empresa no se construye solamente con
                productos. También se construye con la forma en que
                tratamos a las personas.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

              {[
                {
                  titulo: "Cercanía",
                  texto:
                    "Queremos que nuestros clientes sientan que detrás de HUGELLA hay personas dispuestas a escucharlos.",
                },
                {
                  titulo: "Empatía",
                  texto:
                    "Entendemos que cada cliente tiene una necesidad y una realidad diferente.",
                },
                {
                  titulo: "Disponibilidad",
                  texto:
                    "Buscamos brindar una atención amplia y flexible, sin restricciones innecesarias de días u horarios.",
                },
              ].map((item) => (

                <div
                  key={item.titulo}
                  className="group border border-white/20 rounded-3xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500"
                >

                  <p className="text-2xl font-bold">
                    {item.titulo}
                  </p>

                  <p className="text-blue-100 mt-4 leading-relaxed">
                    {item.texto}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>
      </ParallaxSection>


      {/* ===================================================== */}
      {/* FUTURO */}
      {/* ===================================================== */}

      <ParallaxSection
        speed={0.21}
        className="relative z-60"
      >
        <section className="bg-white py-24 sm:py-32">

          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

            <p className="text-[#315b91] font-extrabold uppercase tracking-widest text-sm">
              Nuestro futuro
            </p>

            <h2 className="text-5xl sm:text-6xl font-extrabold mt-4 text-gray-900">
              Queremos llegar más lejos.
            </h2>

            <p className="text-gray-500 text-xl leading-relaxed mt-8 max-w-3xl mx-auto">
              HUGELLA nació como una empresa familiar, pero nuestro objetivo
              es crecer, consolidarnos y llevar nuestra propuesta a nuevos
              lugares.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mt-5 max-w-3xl mx-auto">
              Soñamos con construir una empresa con múltiples sucursales,
              manteniendo siempre aquello que nos identifica desde el
              comienzo: la cercanía, la atención y el compromiso con
              nuestros clientes.
            </p>


            <div className="mt-12 inline-flex items-center gap-4 bg-[#315b91] text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform duration-300">

              <span className="text-lg">
                HUGELLA
              </span>

              <span className="text-blue-200">
                •
              </span>

              <span>
                Equipamiento comercial
              </span>

            </div>

          </div>

        </section>
      </ParallaxSection>

    </main>
  );
}

export default About;