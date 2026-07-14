import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa geçişi algılandığı an pencereyi en yukarı (X:0, Y:0) taşır
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Arayüzde bir şey çizmesine gerek yok
};

export default ScrollToTop;