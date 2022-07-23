import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // prevent scrolling when switching between posts/friends tab on profile
    if (
      pathname.includes("profile") &&
      prevPathname.includes("profile") &&
      (prevPathname.includes(pathname) || pathname.includes(prevPathname))
    ) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    setPrevPathname(pathname);
  }, [pathname]);

  return null;
}
