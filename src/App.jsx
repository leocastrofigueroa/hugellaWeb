import Header from "./components/HeaderPrincipal.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Offers from "./pages/Offers.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<Products />} />

        <Route
          path="/productos/:id"
          element={<ProductDetail />}
        />

        <Route path="/ofertas" element={<Offers />} />

        <Route path="/nosotros" element={<About />} />

        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;