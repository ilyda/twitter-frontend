import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid min-h-[580px] w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#e8e5dc] lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center px-7 py-14 sm:px-12 lg:px-16">
            <span className="mb-4 text-xs font-black tracking-[0.2em] text-muted">
              SADE TASARIMLAR
            </span>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Yaşam alanınıza özel ürünler
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">
              Dekoratif, modern ve özenle hazırlanmış ürünleri
              keşfedin.
            </p>

            <Link
              to="/urunler"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Ürünleri İncele
            </Link>
          </div>

          <div className="min-h-[350px] lg:min-h-[580px]">
            <img
              src="/images/hero.jpg"
              alt="Dekoratif ürünler"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-black tracking-[0.2em] text-muted">
                ÖNE ÇIKANLAR
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Popüler ürünler
              </h2>
            </div>

            <Link
              to="/urunler"
              className="border-b border-primary pb-1 font-bold"
            >
              Tüm ürünler
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-page text-xl">
              ✦
            </div>

            <h3 className="text-xl font-bold">Özel Tasarım</h3>

            <p className="mt-3 leading-7 text-muted">
              Her yaşam alanına uyum sağlayan sade ve modern ürünler.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-page text-xl">
              ⬡
            </div>

            <h3 className="text-xl font-bold">Güvenli Paketleme</h3>

            <p className="mt-3 leading-7 text-muted">
              Ürünleriniz zarar görmeyecek şekilde özenle paketlenir.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-page text-xl">
              ✓
            </div>

            <h3 className="text-xl font-bold">Kolay Sipariş</h3>

            <p className="mt-3 leading-7 text-muted">
              Sepetinizi oluşturup WhatsApp üzerinden sipariş
              verebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;