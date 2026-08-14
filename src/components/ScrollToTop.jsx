import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => {
    const volverArriba = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("hugella-scroll-top", volverArriba);

    return () => {
      window.removeEventListener(
        "hugella-scroll-top",
        volverArriba
      );
    };
  }, []);

  return null;
}

export default ScrollToTop;