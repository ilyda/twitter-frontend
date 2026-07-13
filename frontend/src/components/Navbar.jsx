import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  const linkClass = ({ isActive }) =>
    `border-b-2 py-2 text-sm font-semibold transition ${
      isActive
        ? "border-primary text-primary"
        : "border-transparent text-muted hover:text-primary"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/95 backdrop-blur-lg">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-2xl font-black tracking-[0.35em]"
          onClick={closeMenu}
        >
          SADE
        </NavLink>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Menüyü aç veya kapat"
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>

        <nav
          className={`absolute left-0 right-0 top-20 border-b border-line bg-page px-4 py-5 md:static md:flex md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-7">
            <NavLink to="/" className={linkClass} onClick={closeMenu}>
              Ana Sayfa
            </NavLink>

            <NavLink
              to="/urunler"
              className={linkClass}
              onClick={closeMenu}
            >
              Ürünler
            </NavLink>

            <NavLink
              to="/hakkimizda"
              className={linkClass}
              onClick={closeMenu}
            >
              Hakkımızda
            </NavLink>

            <NavLink
              to="/iletisim"
              className={linkClass}
              onClick={closeMenu}
            >
              İletişim
            </NavLink>

            <NavLink
              to="/sepet"
              className="mt-2 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover md:mt-0"
              onClick={closeMenu}
            >
              Sepet

              <span className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs text-primary">
                {totalQuantity}
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;