import { useState } from "react"; // useState eklendi
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Swiper kütüphanesi ve gerekli modüller
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false); // Popup görünürlük durumu

  // Ürünün ilk görselini popup için saklıyoruz
  const displayImages = product.images && product.images.length > 0 
    ? product.images 
    : ["https://unsplash.com"];

  const handleAddToCart = () => {
    addToCart(product);
    setShowPopup(true);

    // 2.5 saniye sonra popup'ı kapatır
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white pb-4 transition-all duration-300 shadow-md hover:shadow-xl border border-[#e5e5e5]">
      <div>
        {/* Ürün Görsel Alanı */}
        <div className="relative aspect-square w-full overflow-hidden bg-page rounded-t-xl">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="h-full w-full card-mini-swiper"
          >
            {displayImages.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl}
                  alt={`${product.name} - Görsel ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://unsplash.com";
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {product.isFeatured && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-black tracking-wider text-white uppercase shadow-sm">
              Popüler
            </span>
          )}
        </div>

        {/* Ürün Detay Bilgileri */}
        <div className="mt-4 px-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            {product.category}
          </span>
          
          <Link to={`/urun/${product.id}`} className="mt-1 block">
            <h3 className="text-base font-bold text-black transition hover:text-primary line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-2 text-sm text-muted line-clamp-2 min-h-[40px]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Fiyat ve Sepete Ekle Butonu */}
      <div className="mt-4 flex items-center justify-between pt-4 px-4 border-t border-[#e5e5e5]">
        <strong className="text-lg font-black text-black">
          {product.price.toLocaleString("tr-TR")} TL
        </strong>
        <button
          type="button"
          onClick={handleAddToCart} // Yenilenen fonksiyon bağlandı
          className="flex h-10 w-10 items-center justify-center rounded-full bg-page font-bold text-black transition-colors hover:bg-primary shadow-sm"
          title="Sepete Ekle"
        >
          ＋
        </button>
      </div>

      {/* SEPETE EKLENDİ POPUP BİLDİRİMİ */}
      {showPopup && (
        <div className="fixed top-30 right-5 z-[150] flex items-center gap-4 bg-white border border-[#6ea4ae]/30 p-4 rounded-xl shadow-2xl max-w-sm duration-300 animate-bounce-short">
          {/* Ürün Görseli */}
          <img 
            src={displayImages[0]} 
            alt={product.name} 
            className="w-12 h-16 object-cover rounded bg-gray-100 border border-gray-100"
          />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-[#6ea4ae] font-bold text-md">
             
              Sepete Eklendi!
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">
              {product.name}
            </p>
            <Link to="/sepet" className="text-[14px] text-[#6ea4ae] font-bold underline mt-1">
              Sepete Git →
            </Link>
          </div>
          {/* Manuel Kapatma Butonu */}
          <button 
            onClick={() => setShowPopup(false)} 
            className="text-gray-400 hover:text-gray-600 absolute top-2 right-2 text-xs"
          >
            ×
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductCard;