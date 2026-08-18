import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // =========================
  // DETECTAR SCROLL
  // =========================

  useEffect(() => {
    const manejarScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", manejarScroll, {
      passive: true,
    });

    manejarScroll();

    return () => {
      window.removeEventListener("scroll", manejarScroll);
    };
  }, []);

  // =========================
  // VOLVER AL INICIO
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

    setMenuAbierto(false);
  };

  // =========================
  // BUSCADOR
  // =========================

  const realizarBusqueda = (e) => {
    e.preventDefault();

    const texto = busqueda.trim();

    if (texto === "") {
      navigate("/productos");
      setMenuAbierto(false);
      return;
    }

    navigate(
      `/productos?busqueda=${encodeURIComponent(texto)}`
    );

    setMenuAbierto(false);
  };

  // =========================
  // CERRAR MENU
  // =========================

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // =========================
  // ESTILO NAVEGACIÓN
  // =========================

  const claseNav = ({ isActive }) =>
    `font-semibold transition-colors duration-300 cursor-pointer ${
      isActive
        ? "text-white"
        : "text-white/85 hover:text-white"
    }`;

  return (
    <header
      className={`
        sticky
        top-0
        z-[9999]
        isolate
        text-white
        shadow-sm
        transition-shadow
        duration-300
        ${scrolled ? "shadow-xl" : "shadow-none"}
      `}
      style={{
        backgroundColor: "var(--hugella-blue)",
      }}
    >

      {/* ================================================= */}
      {/* CABECERA PRINCIPAL */}
      {/* ================================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-2
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
            sm:gap-6
            h-20
          "
        >

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            to="/"
            onClick={irAlInicio}
            className="
              shrink-0
              flex
              items-center
              relative
              z-50
            "
          >

            <img
              src="/imgHugella/logo.png"
              alt="Hugella Equipamiento Comercial"
              className="
                w-56
                sm:w-64
                lg:w-72
                object-contain
              "
            />

          </Link>


          {/* ================================================= */}
          {/* BUSCADOR DESKTOP */}
          {/* ================================================= */}

          <form
            onSubmit={realizarBusqueda}
            className="
              hidden
              sm:flex
              flex-1
              h-12
              relative
              z-50
            "
          >

            <div className="relative flex-1">

              <Search
                size={21}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#0B2A4A]
                "
              />

              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="
                  w-full
                  h-12
                  rounded-l-xl
                  bg-white
                  text-gray-800
                  placeholder:text-gray-400
                  pl-12
                  pr-5
                  outline-none
                "
              />

            </div>

            <button
              type="submit"
              className="
                h-12
                bg-[#0B2A4A]
                hover:bg-[#08213A]
                text-white
                px-7
                rounded-r-xl
                transition
                font-bold
              "
            >
              Buscar
            </button>

          </form>


          {/* ================================================= */}
          {/* WHATSAPP DESKTOP */}
          {/* ================================================= */}

          <a
            href="https://wa.me/5492614685967"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden
              sm:flex
              relative
              z-50
              items-center
              justify-center
              h-11
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              rounded-xl
              font-bold
              transition
              shrink-0
            "
          >
            WhatsApp
          </a>


          {/* ================================================= */}
          {/* MENU MOBILE */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="
              sm:hidden
              ml-auto
              w-11
              h-11
              rounded-xl
              bg-white/10
              border
              border-white/30
              flex
              items-center
              justify-center
              relative
              z-50
            "
            aria-label="Abrir menú"
          >

            {menuAbierto ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}

          </button>

        </div>


        {/* ================================================= */}
        {/* BUSCADOR MOBILE */}
        {/* ================================================= */}

        <form
          onSubmit={realizarBusqueda}
          className="
            sm:hidden
            flex
            pb-4
            relative
            z-50
          "
        >

          <div className="relative flex-1">

            <Search
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#0B2A4A]
              "
            />

            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="
                w-full
                h-12
                rounded-l-xl
                bg-white
                text-gray-800
                placeholder:text-gray-400
                pl-11
                pr-3
                outline-none
              "
            />

          </div>

          <button
            type="submit"
            className="
              h-12
              bg-[#0B2A4A]
              hover:bg-[#08213A]
              text-white
              px-4
              rounded-r-xl
            "
          >
            <Search size={20} />
          </button>

        </form>

      </div>


      {/* ================================================= */}
      {/* NAVEGACIÓN DESKTOP */}
      {/* ================================================= */}

      <nav
        className="
          relative
          z-50
          hidden
          sm:block
          border-t
          border-white/20
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="
              flex
              items-center
              gap-10
              h-14
            "
          >

            <NavLink
              to="/"
              end
              onClick={irAlInicio}
              className={claseNav}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              end
              className={claseNav}
            >
              Productos
            </NavLink>

            <NavLink
              to="/ofertas"
              end
              className={claseNav}
            >
              Ofertas
            </NavLink>

            <NavLink
              to="/nosotros"
              end
              className={claseNav}
            >
              Nosotros
            </NavLink>

            <NavLink
              to="/contacto"
              end
              className={claseNav}
            >
              Contacto
            </NavLink>

          </div>

        </div>

      </nav>


      {/* ================================================= */}
      {/* MENU MOBILE */}
      {/* ================================================= */}

      {menuAbierto && (

        <div
          className="
            relative
            z-50
            sm:hidden
            border-t
            border-white/20
          "
        >

          <div className="px-4 py-4 space-y-2">

            <NavLink
              to="/"
              end
              onClick={irAlInicio}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold ${
                  isActive
                    ? "bg-[#0B2A4A] text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              end
              onClick={cerrarMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold ${
                  isActive
                    ? "bg-[#0B2A4A] text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              Productos
            </NavLink>

            <NavLink
              to="/ofertas"
              end
              onClick={cerrarMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold ${
                  isActive
                    ? "bg-[#0B2A4A] text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              Ofertas
            </NavLink>

            <NavLink
              to="/nosotros"
              end
              onClick={cerrarMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold ${
                  isActive
                    ? "bg-[#0B2A4A] text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              Nosotros
            </NavLink>

            <NavLink
              to="/contacto"
              end
              onClick={cerrarMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold ${
                  isActive
                    ? "bg-[#0B2A4A] text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              Contacto
            </NavLink>

            <a
              href="https://wa.me/5492614685967"
              target="_blank"
              rel="noopener noreferrer"
              className="
                block
                mt-3
                bg-green-600
                hover:bg-green-700
                text-white
                px-4
                py-3
                rounded-xl
                text-center
                font-bold
              "
            >
              WhatsApp
            </a>

          </div>

        </div>

      )}

    </header>
  );
}

export default Header;