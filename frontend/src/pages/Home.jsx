import { useState } from "react";
import ProductCard from "../components/ProductCard";
import TrendyolReviews from "../components/TrendyolReviews";
import { products } from "../data/products";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const categories = ["Tümü", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Banner Bölümü */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid min-h-[500px] w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#f5c7e1] lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center px-7 py-14 sm:px-12 lg:px-16">
            <span className="mb-4 text-xs font-black tracking-[0.2em] text-muted">
              LilyCo TASARIMLAR
            </span>
            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Yaşam alanınıza özel ürünler
            </h1>
          </div>
          <div className="min-h-[300px] lg:min-h-[500px]">
            <img
              src="https://media.eczaneden.com/files/containers/cildinizeihtiyaciolannemiverin@3x-36.jpg"
              alt="Dekoratif ürünler"
              className="h-full w-full object-cover"
              loading="lazy" // Tarayıcı sadece ekrana yaklaştığında yükler
              decoding="async" // Görsel çözümlemesini asenkron yaparak ana iş parçacığını (thread) rahatlatır
            />
          </div>
        </div>
      </section>

      {/* TÜM ÜRÜNLER VE FİLTRELEME ALANI */}
      <section className="py-12 lg:py-16 bg-page/30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Başlık, Arama ve Filtre Paneli */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-8">
            <div>
              <span className="text-xs font-black tracking-[0.2em] text-muted">KOLEKSİYON</span>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Tüm Ürünlerimiz</h2>
            </div>

            {/* Dinamik Arama Kutusu */}
            <div className="w-full max-w-xs">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // 🌟 Hata Düzeltildi: e.value -> e.target.value
                className="w-full h-11 px-4 rounded-full bg-white text-sm font-medium outline-none focus:border-primary transition border border-gray-100 shadow-sm"
              />
            </div>
          </div>

          {/* Kategori Butonları */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                  selectedCategory === category
                    ? "bg-primary bg-[#6ea4ae] text-white"
                    : "bg-white text-black hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Ürün Kartları Grid Yapısı */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted font-medium">
              Aradığınız kriterlere uygun ürün bulunamadı.
            </div>
          )}

        </div>
      </section>

      {/* TRENDYOL DEĞERLENDİRMELERİ BÖLÜMÜ */}
      <TrendyolReviews />
    </>
  );
};

export default Home;