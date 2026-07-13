import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <Link
        to={`/urun/${product.id}`}
        className="block aspect-square overflow-hidden bg-[#eceae4]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          {product.category}
        </span>

        <Link to={`/urun/${product.id}`}>
          <h3 className="mt-2 min-h-14 text-lg font-bold leading-7 transition hover:text-muted">
            {product.name}
          </h3>
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <strong className="text-lg">
            {product.price.toLocaleString("tr-TR")} TL
          </strong>

          <button
            type="button"
            className="rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-hover"
            onClick={() => addToCart(product)}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;