import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <section className="py-20">
        <div className="mx-auto flex min-h-[450px] w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-black">Ürün bulunamadı</h1>

          <Link
            to="/urunler"
            className="mt-7 rounded-full bg-primary px-7 py-3 font-bold text-white"
          >
            Ürünlere Dön
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#eceae4]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-muted">
            {product.category}
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <strong className="mt-6 block text-3xl">
            {product.price.toLocaleString("tr-TR")} TL
          </strong>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            {product.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="min-h-12 rounded-full bg-primary px-7 font-bold text-white transition hover:bg-primary-hover"
              onClick={() => addToCart(product)}
            >
              Sepete Ekle
            </button>

            <Link
              to="/urunler"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary px-7 font-bold transition hover:bg-primary hover:text-white"
            >
              Ürünlere Dön
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;