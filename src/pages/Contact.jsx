import { useState } from "react";

const CONTACTO_URL =
  "https://script.google.com/macros/s/AKfycbwzxeIv93ls0pdJmx6RUWqxGL9pNdJ-c_70K8V8L1_pPAR8xN9cz_ZGExr36hUPi0a41Q/exec";

function Contact() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();

    setEnviando(true);
    setEnviado(false);
    setError("");

    const formulario = new FormData(e.target);

    const datos = {
      nombre: formulario.get("nombre"),
      whatsapp: formulario.get("telefono"),
      email: formulario.get("email"),
      motivo: formulario.get("motivo"),
      mensaje: formulario.get("mensaje"),
    };

    try {
      await fetch(CONTACTO_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(datos),
      });

      setEnviado(true);
      e.target.reset();
    } catch (error) {
      console.error("Error enviando consulta:", error);
      setError(
        "No pudimos enviar la consulta. Por favor, intentá nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-160px)] bg-[#f5f6f8] py-16 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        {/* ENCABEZADO */}

        <div className="text-center mb-12">

          <p className="text-[#315b91] text-xl sm:text-2xl font-extrabold uppercase tracking-wide">
            HUGELLA
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2">
            Contactanos
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            ¿Tenés alguna consulta sobre nuestros productos,
            financiación o servicios? Dejanos tus datos y nos
            comunicaremos con vos.
          </p>

        </div>

        {/* CONTENEDOR */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* INFORMACIÓN */}

          <div className="bg-[#315b91] text-white rounded-3xl p-8 sm:p-10">

            <h2 className="text-2xl font-bold mb-6">
              Estamos para ayudarte
            </h2>

            <p className="text-blue-100 leading-relaxed mb-10">
              Completá el formulario y nuestro equipo se pondrá
              en contacto con vos para responder tu consulta.
            </p>

            <div className="space-y-6">

              <div>
                <p className="text-sm text-blue-200 mb-3">
                  WhatsApp
                </p>

                <div className="space-y-2">

                  <a
                    href="https://wa.me/5492614685967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold hover:text-blue-200 transition"
                  >
                     · 549 261 468 5967
                  </a>

                  <a
                    href="https://wa.me/5492613628574"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold hover:text-blue-200 transition"
                  >
                     · 549 261 362 8574
                  </a>

                </div>
              </div>

              <div>
                <p className="text-sm text-blue-200">
                  Atención
                </p>

                <p className="font-semibold">
                  Atención personalizada
                </p>
              </div>

              <div>
                <p className="text-sm text-blue-200">
                  HUGELLA
                </p>

                <p className="font-semibold">
                  Equipamiento comercial
                </p>
              </div>

            </div>

          </div>

          {/* FORMULARIO */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6 sm:p-10">

            <form
              onSubmit={manejarEnvio}
              className="space-y-6"
            >

              {/* NOMBRE */}

              <div>

                <label
                  htmlFor="nombre"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre y apellido
                </label>

                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre y apellido"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition"
                />

              </div>

              {/* TELEFONO + EMAIL */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>

                  <label
                    htmlFor="telefono"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Teléfono / WhatsApp
                  </label>

                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    placeholder="Tu número"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition"
                  />

                </div>

                <div>

                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition"
                  />

                </div>

              </div>

              {/* MOTIVO */}

              <div>

                <label
                  htmlFor="motivo"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Motivo de consulta
                </label>

                <select
                  id="motivo"
                  name="motivo"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition"
                >

                  <option value="" disabled>
                    Seleccioná una opción
                  </option>

                  <option value="producto">
                    Consulta sobre un producto
                  </option>

                  <option value="financiacion">
                    Financiación / cuotas
                  </option>

                  <option value="compra">
                    Quiero realizar una compra
                  </option>

                  <option value="otro">
                    Otra consulta
                  </option>

                </select>

              </div>

              {/* MENSAJE */}

              <div>

                <label
                  htmlFor="mensaje"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mensaje
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="6"
                  placeholder="Contanos en qué podemos ayudarte..."
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#315b91] focus:border-transparent transition resize-none"
                />

              </div>

              {/* MENSAJE DE ÉXITO */}

              {enviado && (
                <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3">
                  <p className="font-semibold">
                    ¡Consulta enviada correctamente!
                  </p>

                  <p className="text-sm mt-1">
                    Recibimos tus datos. Nos pondremos en contacto con vos.
                  </p>
                </div>
              )}

              {/* MENSAJE DE ERROR */}

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                  {error}
                </div>
              )}

              {/* BOTÓN */}

              <button
                type="submit"
                disabled={enviando}
                className="w-full sm:w-auto bg-[#315b91] hover:bg-[#264a78] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {enviando
                  ? "Enviando..."
                  : "Enviar consulta →"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;