import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwzxeIv93ls0pdJmx6RUWqxGL9pNdJ-c_70K8V8L1_pPAR8xN9cz_ZGExr36hUPi0a41Q/exec";

function Footer() {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [suscripto, setSuscripto] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // IR AL INICIO
  // =========================

  const irAlInicio = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // =========================
  // NEWSLETTER
  // =========================

  const enviarNewsletter = async (e) => {
    e.preventDefault();

    setError("");
    setSuscripto(false);

    const emailLimpio = email.trim();

    if (!emailLimpio) {
      setError("Ingresá tu email.");
      return;
    }

    setEnviando(true);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          tipo: "newsletter",
          email: emailLimpio,
        }),
      });

      setEmail("");
      setSuscripto(true);

    } catch (error) {
      console.error(error);

      setError(
        "No pudimos registrar tu suscripción. Intentá nuevamente."
      );

    } finally {
      setEnviando(false);
    }
  };

  return (
    <footer className="mt-20">

      {/* ========================================= */}
      {/* REDES SOCIALES */}
      {/* ========================================= */}

      <div className="bg-[#315b91] py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center items-center gap-5">

          <a
            href="#"
            aria-label="Instagram"
            className="w-12 h-12 rounded-full bg-white text-[#315b91] flex items-center justify-center text-xl font-bold hover:scale-110 transition-transform duration-300"
          >
            ◎
          </a>

          <a
            href="#"
            aria-label="Facebook"
            className="w-12 h-12 rounded-full bg-white text-[#315b91] flex items-center justify-center text-xl font-bold hover:scale-110 transition-transform duration-300"
          >
            f
          </a>

          <a
            href="#"
            aria-label="YouTube"
            className="w-12 h-12 rounded-full bg-white text-[#315b91] flex items-center justify-center text-xl font-bold hover:scale-110 transition-transform duration-300"
          >
            ▶
          </a>

        </div>

      </div>


      {/* ========================================= */}
      {/* FOOTER PRINCIPAL */}
      {/* ========================================= */}

      <div className="bg-[#f5f6f8] border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


            {/* ========================================= */}
            {/* HUGELLA */}
            {/* ========================================= */}

            <div>

              <h3 className="text-xl font-extrabold text-[#315b91] tracking-wide">
                HUGELLA
              </h3>

              <p className="text-sm font-semibold text-gray-500 mt-1">
                Equipamiento comercial
              </p>

              <p className="text-gray-600 leading-relaxed mt-5 max-w-xs">
                Equipamiento para tu negocio y hogar, con atención cercana,
                personalizada y siempre dispuestos a ayudarte.
              </p>

              <Link
                to="/nosotros"
                className="inline-block mt-5 text-[#315b91] font-semibold hover:underline"
              >
                Conocé nuestra historia →
              </Link>

            </div>


            {/* ========================================= */}
            {/* NAVEGACIÓN */}
            {/* ========================================= */}

            <div>

              <h3 className="text-lg font-bold text-gray-900 mb-5">
                HUGELLA
              </h3>

              <div className="space-y-3">

                <Link
                  to="/"
                  onClick={irAlInicio}
                  className="block text-gray-600 hover:text-[#315b91] transition"
                >
                  Inicio
                </Link>

                <Link
                  to="/productos"
                  className="block text-gray-600 hover:text-[#315b91] transition"
                >
                  Productos
                </Link>

                <Link
                  to="/ofertas"
                  className="block text-gray-600 hover:text-[#315b91] transition"
                >
                  Ofertas
                </Link>

                <Link
                  to="/nosotros"
                  className="block text-gray-600 hover:text-[#315b91] transition"
                >
                  Nosotros
                </Link>

                <Link
                  to="/contacto"
                  className="block text-gray-600 hover:text-[#315b91] transition"
                >
                  Contacto
                </Link>

              </div>

            </div>


            {/* ========================================= */}
            {/* ATENCIÓN */}
            {/* ========================================= */}

            <div>

              <h3 className="text-lg font-bold text-gray-900 mb-5">
                Atención
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                WhatsApp
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">

                <a
                  href="https://wa.me/5492614685967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-700 hover:text-[#315b91] transition"
                >
                  +549261 468 5967
                </a>

                <span className="text-gray-400">
                  ·
                </span>

                <a
                  href="https://wa.me/5492613628574"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-700 hover:text-[#315b91] transition"
                >
                  +549261 362 8574
                </a>

              </div>

              <p className="text-sm text-gray-500 mt-6 mb-1">
                Atención
              </p>

              <p className="font-semibold text-gray-700">
                Atención personalizada
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Todos los días
              </p>

            </div>


            {/* ========================================= */}
            {/* NEWSLETTER */}
            {/* ========================================= */}

            <div>

              <h3 className="text-lg font-bold text-gray-900 mb-5">
                Recibí nuestras novedades
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Dejanos tu email y enterate de nuevos productos,
                promociones y oportunidades.
              </p>

              <form
                onSubmit={enviarNewsletter}
                className="space-y-3"
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  disabled={enviando}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-[#315b91] hover:bg-[#264a78] disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {enviando
                    ? "Enviando..."
                    : "Suscribirme"}
                </button>

                {suscripto && (
                  <p className="text-sm font-semibold text-green-600">
                    ¡Listo! Te suscribiste correctamente.
                  </p>
                )}

                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>
                )}

              </form>

            </div>

          </div>


          {/* ========================================= */}
          {/* SEPARADOR */}
          {/* ========================================= */}

          <div className="border-t border-gray-200 mt-12 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

              <p className="text-center md:text-left">
                © {new Date().getFullYear()} HUGELLA · Equipamiento comercial
              </p>

              <div className="flex gap-6">

                <Link
                  to="/nosotros"
                  className="hover:text-[#315b91] transition"
                >
                  Nosotros
                </Link>

                <Link
                  to="/contacto"
                  className="hover:text-[#315b91] transition"
                >
                  Contacto
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* FRANJA FINAL */}
      {/* ========================================= */}

      <div className="bg-[#e9edf2] py-4">

        <p className="text-center text-xs sm:text-sm text-gray-500 px-4">
          HUGELLA · Equipamiento comercial · Atención cercana y personalizada
        </p>

      </div>

    </footer>
  );
}

export default Footer;