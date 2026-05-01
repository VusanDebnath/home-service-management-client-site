import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | HomeService`;
    // Tab এ দেখাবে: "Home | HomeService"

    return () => {
      document.title = "HomeService";
      // Page change হলে default title এ ফিরে আসবে
    };
  }, [title]);
};

export default usePageTitle;
