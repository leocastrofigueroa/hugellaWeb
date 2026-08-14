import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import BrandsCarousel from "../components/BrandsCarousel";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />

      <Benefits />

      <Categories />

      <BrandsCarousel />

      <FeaturedProducts />
    </>
  );
}

export default Home;