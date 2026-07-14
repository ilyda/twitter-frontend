import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logoImg from "../assets/logo.png";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  const linkClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-primary"
        : "text-muted hover:text-primary"
    } after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center text-2xl font-black tracking-[0.35em] transition-opacity duration-200 hover:opacity-80"
          onClick={closeMenu}
        >
          <img
            src={logoImg}
            alt="Vinylora Logo"
            className="h-24 w-auto object-contain py-2"
          />
        </NavLink>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Menüyü aç veya kapat"
          aria-expanded={menuOpen}
        >
          <span className="text-xl transition-transform duration-200">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>

        <nav
          className={`absolute left-0 right-0 top-20 origin-top border-b border-line bg-white px-4 py-5 shadow-sm transition-all duration-200 md:static md:origin-top md:border-0 md:bg-transparent md:p-0 md:shadow-none md:flex md:items-center md:gap-8 ${
            menuOpen
              ? "block scale-y-100 opacity-100"
              : "hidden opacity-0 md:flex md:scale-y-100 md:opacity-100"
          }`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <NavLink to="/" className={linkClass} onClick={closeMenu}>
              Ana Sayfa
            </NavLink>

            <NavLink to="/hakkimizda" className={linkClass} onClick={closeMenu}>
              Hakkımızda
            </NavLink>

            <NavLink to="/iletisim" className={linkClass} onClick={closeMenu}>
              İletişim
            </NavLink>

            <NavLink
              to="/sepet"
              className="mt-2 flex items-center gap-2 rounded-full bg-[#6ea4ae] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md active:scale-95 md:mt-0"
              onClick={closeMenu}
            >
              <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2} />
              Sepet
              <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-white/25 px-1.5 text-xs font-bold text-white">
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