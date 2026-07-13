import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="py-20">
      <div className="mx-auto flex min-h-[500px] w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <span className="text-8xl font-black text-[#d8d4ca] sm:text-9xl">
          404
        </span>

        <h1 className="mt-5 text-4xl font-black">
          Sayfa bulunamadı
        </h1>

        <p className="mt-3 text-muted">
          Aradığınız sayfa kaldırılmış veya taşınmış olabilir.
        </p>

        <Link
          to="/"
          className="mt-7 rounded-full bg-primary px-7 py-3 font-bold text-white transition hover:bg-primary-hover"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  );
};

export default NotFound;