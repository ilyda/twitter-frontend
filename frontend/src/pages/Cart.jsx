import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const sendWhatsAppOrder = () => {
    const phoneNumber = "905555555555";

    const productLines = cart.map((item) => {
      const productTotal = item.price * item.quantity;

      return `- ${item.name} / ${item.quantity} adet / ${productTotal.toLocaleString(
        "tr-TR"
      )} TL`;
    });

    const message = [
      "Merhaba, aşağıdaki ürünler için sipariş vermek istiyorum:",
      "",
      ...productLines,
      "",
      `Toplam: ${totalPrice.toLocaleString("tr-TR")} TL`,
    ].join("\n");

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (cart.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto flex min-h-[450px] w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl">
            🛒
          </div>

          <h1 className="mt-6 text-4xl font-black">Sepetiniz boş</h1>

          <p className="mt-3 text-muted">
            Henüz sepetinize ürün eklemediniz.
          </p>

          <Link
            to="/urunler"
            className="mt-7 rounded-full bg-primary px-7 py-3 font-bold text-white"
          >
            Ürünleri İncele
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            ALIŞVERİŞ
          </span>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Sepetim
          </h1>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[100px_1fr] gap-4 rounded-3xl border border-line bg-white p-4 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-2xl object-cover sm:h-36 sm:w-36"
                />

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      {item.category}
                    </span>

                    <h3 className="mt-2 text-lg font-bold sm:text-xl">
                      {item.name}
                    </h3>

                    <strong className="mt-2 block">
                      {item.price.toLocaleString("tr-TR")} TL
                    </strong>
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:items-end">
                    <div className="flex items-center overflow-hidden rounded-full border border-line">
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center text-xl hover:bg-page"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span className="min-w-9 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center text-xl hover:bg-page"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="text-sm font-bold text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-3xl border border-line bg-white p-7 lg:sticky lg:top-28">
            <h2 className="text-2xl font-black">Sipariş Özeti</h2>

            <div className="mt-6 flex justify-between gap-5 border-b border-line py-4 text-sm">
              <span className="text-muted">Ara toplam</span>

              <strong>{totalPrice.toLocaleString("tr-TR")} TL</strong>
            </div>

            <div className="flex justify-between gap-5 border-b border-line py-4 text-sm">
              <span className="text-muted">Kargo</span>

              <strong className="max-w-44 text-right">
                Sipariş sonrası belirlenir
              </strong>
            </div>

            <div className="flex justify-between gap-5 py-6 text-xl">
              <span className="font-bold">Toplam</span>

              <strong>{totalPrice.toLocaleString("tr-TR")} TL</strong>
            </div>

            <button
              type="button"
              className="min-h-12 w-full rounded-full bg-green-600 px-5 font-bold text-white transition hover:bg-green-700"
              onClick={sendWhatsAppOrder}
            >
              WhatsApp ile Sipariş Ver
            </button>

            <button
              type="button"
              className="mt-5 w-full text-sm font-bold text-red-600"
              onClick={clearCart}
            >
              Sepeti Temizle
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;