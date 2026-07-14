import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link
            to="/"
            className="text-2xl font-black tracking-[0.35em]"
          >
            LilyCo
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Özel tasarım dekorasyon ve yaşam ürünleri.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Hızlı Bağlantılar</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link to="/urunler" className="hover:text-primary">
              Ürünler
            </Link>

            <Link to="/hakkimizda" className="hover:text-primary">
              Hakkımızda
            </Link>

            <Link to="/iletisim" className="hover:text-primary">
              İletişim
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">İletişim</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
        

            <a
              href="mailto:info@lilycompany.com"
              className="hover:text-primary"
            >
              info@lilycompany.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 text-sm text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} LilyCo. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;