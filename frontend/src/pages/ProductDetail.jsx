import { useState } from "react"; 
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

// Popup içi Slider için Swiper bileşenleri ve stilleri eklendi
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart(); // cartMessage yerine direkt pop-up kullanacağımız için sadeleştirebiliriz

  // Popup penceresini ve açılış resmini kontrol eden durumlar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowPopup(true);

    // 2.5 saniye sonra popup'ı kapatır
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Ürün bulunamadı.</h2>
        <Link to="/" className="mt-4 inline-block text-primary">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  // Resimlere tıklandığında popup'ı açacak olan fonksiyon
  const handleImageClick = (index) => {
    setInitialSlide(index);
    setIsModalOpen(true);
  };

  // AVVA modelindeki gibi üstü çizili eski fiyat simülasyonu
  const originalPrice = Math.round(product.price * 1.25);

  return (
    <section className="py-8 relative">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Üst İki Sütunlu Ana Gövde */}
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-start">
          
          {/* SOL ALAN: GÖRSELLER VE DİNAMİK ÜRÜN TANIMI */}
          <div className="flex flex-col gap-8 w-full">
            
            {/* AVVA Tarzı Yan Yana İlk İki Görsel Izgarası */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.images && product.images.slice(0, 2).map((imgUrl, index) => (
                <div 
                  key={index} 
                  onClick={() => handleImageClick(index)}
                  className="overflow-hidden bg-white border border-[#e5e5e5] cursor-zoom-in hover:opacity-95 transition"
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} - Görsel ${index + 1}`}
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
              ))}
            </div>

            {/* Okyanus Lambası Konseptli Dinamik Bilgi Kartı */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xs font-black tracking-[0.2em] uppercase text-black border-b border-[#f1f1f1] pb-4">
                Ürün Tanımı
              </h2>
              
              <div className="mt-6 space-y-6 text-[13px] leading-relaxed text-[#4a4a4a] font-medium tracking-wide">
                <p className="whitespace-pre-line antialiased">
                  {product.description}
                </p>
                
                {product.extraInfo && (
                  <p className="whitespace-pre-line antialiased border-t border-[#f5f5f5] pt-6">
                    {product.extraInfo}
                  </p>
                )}

                {product.techSpecs && (
                  <p className="whitespace-pre-line antialiased border-t border-[#f5f5f5] pt-6 text-[#555]">
                    {product.techSpecs}
                  </p>
                )}
              </div>

              {/* Tasarım ve Malzeme Özellik Kartları */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#f1f1f1] pt-6">
                <div className="bg-[#fafafa] rounded-xl p-4 text-center border border-[#e5e5e5]/50">
                  <span className="text-[10px] font-black tracking-widest text-[#999] uppercase block mb-1">ÜRETİM</span>
                  <strong className="text-xs font-bold text-black block">3D & El İşçiliği</strong>
                </div>
                
                <div className="bg-[#fafafa] rounded-xl p-4 text-center border border-[#e5e5e5]/50">
                  <span className="text-[10px] font-black tracking-widest text-[#999] uppercase block mb-1">MATERYAL</span>
                  <strong className="text-xs font-bold text-black block">Bitki Bazlı PLA</strong>
                </div>

                <div className="bg-[#fafafa] rounded-xl p-4 text-center border border-[#e5e5e5]/50">
                  <span className="text-[10px] font-black tracking-widest text-[#999] uppercase block mb-1">AYDINLATMA</span>
                  <strong className="text-xs font-bold text-black block">Entegre USB LED</strong>
                </div>
              </div>

              {/* Detay Bilgileri Listesi */}
              <div className="mt-8 space-y-3 text-[11px] text-[#666] border-t border-[#f1f1f1] pt-6 font-medium">
                <div className="flex justify-between border-b border-[#f5f5f5] pb-2">
                  <span className="text-muted">Tasarım Serisi</span>
                  <span className="text-black font-bold">Leora Kompakt</span>
                </div>
                <div className="flex justify-between border-b border-[#f5f5f5] pb-2">
                  <span className="text-muted">Güç Kaynağı</span>
                  <span className="text-black font-bold">5V USB Kablo (ON/OFF Anahtarlı)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Üretim Yeri</span>
                  <span className="text-black font-bold">Türkiye</span>
                </div>
              </div>
            </div>

            {/* Kalan Diğer Alt Görseller */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.images && product.images.slice(2).map((imgUrl, index) => (
                <div 
                  key={index} 
                  onClick={() => handleImageClick(index + 2)}
                  className="overflow-hidden bg-white border border-[#e5e5e5] cursor-zoom-in hover:opacity-95 transition"
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} - Detay ${index + 3}`}
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* SAĞ ALAN: SATIN ALMA PANELİ (STICKY) */}
          <div className="pt-10 bg-white border border-[#e5e5e5] p-6 lg:sticky lg:top-24 flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
              Stok Kodu: (L-CO-{product.id}2026)
            </span>
            <h1 className="mt-2 text-xl font-bold text-black tracking-tight">
              {product.name}
            </h1>

            {/* Fiyat Satırı */}
            <div className="mt-4 flex items-center gap-3 border-b border-[#e5e5e5] pb-4">
              <span className="text-sm text-[#999] line-through">
                {originalPrice.toLocaleString("tr-TR")} TL
              </span>
              <strong className="text-2xl font-black text-black">
                {product.price.toLocaleString("tr-TR")} TL
              </strong>
              <span className="bg-red-500 text-white font-black text-[10px] px-2 py-0.5 rounded">
                -%20
              </span>
            </div>

            {/* Sepete Ekle Butonu */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                mt-8
                w-full
                h-12
                bg-[#6ea4ae]
                rounded-xl
                text-white
                font-bold
                text-sm
                tracking-widest
                uppercase
                hover:bg-[#5b929c]
                transition
              "
            >
              Sepete Ekle
            </button>
          </div>

        </div>
      </div>

      {/* 1. SEPETE EKLENDİ TOAST/POPUP BİLDİRİMİ */}
      {showPopup && (
        <div className="fixed top-30 right-5 z-[150] flex items-center gap-4 bg-white border border-[#6ea4ae]/30 p-4 rounded-xl shadow-2xl animate-bounce-short max-w-sm duration-300">
          {/* Ürün Küçük Görseli */}
          {product.images && product.images[0] && (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-12 h-16 object-cover rounded bg-gray-100 border border-gray-100"
            />
          )}
          <div className="flex flex-col">
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
          {/* Kapatma 'X' Butonu */}
          <button 
            onClick={() => setShowPopup(false)} 
            className="text-gray-400 hover:text-gray-600 absolute top-2 right-2 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. FULLSCREEN IMAGES POPUP MODAL ENTEGRASYONU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm select-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 transition cursor-pointer"
          >
            ×
          </button>

          <div className="w-full max-w-3xl h-[80vh] flex items-center justify-center">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              initialSlide={initialSlide}
              className="w-full h-full flex items-center justify-center popup-swiper"
            >
              {product.images && product.images.map((imgUrl, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center h-full">
                  <div className="flex h-full w-full items-center justify-center">
                    <img
                      src={imgUrl}
                      alt={`${product.name} - Büyük Görsel ${index + 1}`}
                      className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl mx-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

    </section>
  );
};

export default ProductDetail;