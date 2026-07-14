import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 2000;

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const [couponOpen, setCouponOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const sendWhatsAppOrder = () => {
    const phoneNumber = "905468977833";

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
      <section className="bg-page/30 py-20">
        <div className="mx-auto flex min-h-[450px] w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            ALIŞVERİŞ
          </span>

          <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            🛒
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight">
            Sepetiniz boş
          </h1>

          <p className="mt-3 text-muted">
            Henüz sepetinize ürün eklemediniz.
          </p>

          <Link
            to="/urunler"
            className="mt-7 rounded-full bg-[#6ea4ae] px-7 py-3 text-sm font-bold text-white transition hover:bg-pink-600"
          >
            Ürünleri İncele
          </Link>
        </div>
      </section>
    );
  }

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  return (
    <section className="bg-page/30 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            ALIŞVERİŞ
          </span>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Sepetim
          </h1>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          {/* Sol taraf: ürün listesi */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              const lineTotal = item.price * item.quantity;
              const hasDiscount =
                item.originalPrice && item.originalPrice > item.price;

              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-5"
                >
                  {/* Görsel + isim */}
                  <div className="flex flex-1 items-center gap-4">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-2xl bg-page object-cover"
                    />

                    <div>
                      {item.brand && (
                        <p className="text-sm font-bold">{item.brand}</p>
                      )}
                      <p className="text-sm text-muted">{item.name}</p>
                    </div>
                  </div>

                  {/* Adet */}
                  <div className="flex items-center justify-between gap-4 sm:justify-center sm:gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-muted sm:hidden">
                        Adet
                      </span>
                      <div className="flex items-center overflow-hidden rounded-full bg-page">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center text-[#6ea4ae] transition hover:bg-line"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Azalt"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center text-[#6ea4ae] transition hover:bg-line"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Artır"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Fiyat */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-muted sm:hidden">
                        Fiyat
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-muted line-through">
                          {item.originalPrice.toLocaleString("tr-TR")} TL
                        </span>
                      )}
                      <span className="text-sm font-bold text-[#6ea4ae]">
                        {item.price.toLocaleString("tr-TR")} TL
                      </span>
                    </div>

                    {/* Toplam */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-bold text-muted sm:hidden">
                        Toplam
                      </span>
                      <span className="text-sm font-bold text-[#6ea4ae]">
                        {lineTotal.toLocaleString("tr-TR")} TL
                      </span>
                    </div>

                    {/* Sil */}
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-page hover:text-black"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Ürünü kaldır"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              className="mt-2 self-start text-sm font-bold text-muted transition hover:text-black"
              onClick={clearCart}
            >
              Sepeti Temizle
            </button>
          </div>

          {/* Sağ taraf: özet */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Sepet Toplamı</span>
                <span className="font-bold">
                  {totalPrice.toLocaleString("tr-TR")} TL
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-black">Genel Toplam</span>
                <span className="text-base font-black text-[#6ea4ae]">
                  {totalPrice.toLocaleString("tr-TR")} TL
                </span>
              </div>

              <p className="mt-4 text-sm text-muted">
                {remainingForFreeShipping > 0
                  ? `${FREE_SHIPPING_THRESHOLD.toLocaleString(
                      "tr-TR"
                    )} TL üzeri alışverişlerde kargo ücretsiz.`
                  : "Kargo ücretsiz."}
              </p>
            </div>

            <button
              type="button"
              className="min-h-14 w-full rounded-xl bg-[#6ea4ae] hover:bg-pink-600 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-pink-600 active:scale-95"
              onClick={sendWhatsAppOrder}
            >
              Satın Al
            </button>

      

            {couponOpen && (
              <div className="-mt-2 rounded-3xl bg-white p-5 shadow-sm">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Kupon kodunu girin"
                  className="h-11 w-full rounded-full bg-page px-4 text-sm outline-none focus:ring-2 focus:ring-[#6ea4ae]/30"
                />
              </div>
            )}

            <button
              type="button"
              className="flex items-center justify-between rounded-3xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
              onClick={() => setNoteOpen((current) => !current)}
            >
              <span className="text-sm font-semibold">Alışveriş Notu</span>
              <ChevronRight
                className={`h-5 w-5 text-muted transition-transform ${
                  noteOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {noteOpen && (
              <div className="-mt-2 rounded-3xl bg-white p-5 shadow-sm">
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Siparişinizle ilgili notunuzu yazın"
                  rows={3}
                  className="w-full resize-none rounded-2xl bg-page px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6ea4ae]/30"
                />
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;