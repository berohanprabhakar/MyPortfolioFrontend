import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: navHeight }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
