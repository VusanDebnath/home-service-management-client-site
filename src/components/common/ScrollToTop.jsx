import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  // pathname বদলালে মানে page change হলে top এ scroll করো

  return null; // কিছু render করে না, শুধু side effect
};

export default ScrollToTop;
