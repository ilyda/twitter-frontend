import { useMemo, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchText, setSearchText] = useState("");
  // 🌟 Performans için: Kullanıcının yazdığı anlık değer ile filtrelenen değeri ayırdık (Debounce)
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  // Yazma işlemi bittikten 250ms sonra filtrelemeyi tetikler
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const categories = useMemo(() => {
    return [
      "Tümü",
      ...new Set(products.map((product) => product.category)),
    ];
  }, []); // Kategorileri gereksiz yere her renderda baştan hesaplamasın

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearchText
      .trim()
      .toLocaleLowerCase("tr-TR");

    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "Tümü" ||
        product.category === selectedCategory;

      const searchMatch =
        !normalizedSearch ||
        product.name
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, debouncedSearchText]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            MAĞAZA
          </span>

          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">
            Ürünler
          </h1>

          <p className="mt-4 text-lg leading-8 text-muted">
            LilyCo ve özel tasarım ürünlerimizi keşfedin.
          </p>
        </div>

        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "border-primary bg-primary text-[#f06fb9]"
                    : "border-line bg-transparent text-muted hover:border-primary hover:text-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <input
            type="search"
            className="min-h-12 w-full rounded-full border border-line bg-white px-5 outline-none transition placeholder:text-muted focus:border-primary lg:w-72"
            placeholder="Ürün ara..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        {filteredProducts.length > 0 ? (
          // 🌟 grid elemanlarına "will-change" ve GPU hızlandırma sınıfları ekleyerek renderı hızlandırdık
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transform-gpu">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-line bg-white px-6 text-center">
            <h2 className="text-2xl font-bold">Ürün bulunamadı</h2>

            <p className="mt-3 text-muted">
              Arama kriterlerinizi değiştirerek tekrar deneyin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;