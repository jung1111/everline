import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Root({cartCount}) {
  return (
    <div>
      <Header cartCount={cartCount} />
      <Outlet />
      <Footer />
    </div>
  );
}
