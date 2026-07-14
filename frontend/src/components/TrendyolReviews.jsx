import React from "react";

const TrendyolReviews = () => {
  // Trendyol Mağaza Linkin (Burayı kendi Trendyol mağaza URL'in ile değiştirmelisin)
  const trendyolStoreUrl = "https://www.trendyol.com/magaza/profil/alpdesign-m-1207224"; 

  // Trendyol'daki gerçek yorumların listesi
  const reviews = [
    {
      id: 1,
      user: "A*** K***",
      date: "20 Haziran 2026",
      rating: 5,
      comment: "Ürün beklediğimden daha kaliteli geldi. Baskı kalitesi ve işçiliği gayet başarılı. Masamın üzerinde şık duruyor ve verdiği ışık yeterli seviyede. Kargo da son derece sağlam ve özenli paketlenmişti.",
      verified: true
    },
    {
      id: 2,
      user: "Ş** H**",
      date: "2 Haziran 2026",
      rating: 5,
      comment: "Harika bir ürün. Ortamın havası anında değişti. Güvenli ve profesyonel paketleme yapılmıştı. Tereddütsüz alabilirsiniz, aydınlatması çok sıcak.",
      verified: true
    },
    {
      id: 3,
      user: "M*** B***",
      date: "18 Mayıs 2026",
      rating: 5,
      comment: "Salonum için dekoratif bir aydınlatma arıyordum, tam istediğim gibi oldu. Hem şık hem de loş ışığı çok huzurlu hissettiriyor. Satıcıya ilgisi için teşekkürler.",
      verified: true
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Üst Kısım: Trendyol Logosu ve Genel Puan */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-10 mb-12 gap-6">
          <div>
          
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Müşteri Değerlendirmeleri
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Trendyol mağazamız üzerinden gelen ve satın alımı doğrulanmış gerçek müşteri yorumları.
            </p>
          </div>

          {/* Mağaza Puanı Kartı */}
          <div className="flex items-center gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 self-start md:self-auto">
            <div className="text-center">
              <span className="text-4xl font-black text-gray-900">4.9</span>
              <span className="text-gray-400 text-sm block">/ 5</span>
            </div>
            <div className="h-10 w-[1px] bg-gray-200"></div>
            <div>
              <div className="flex text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-600 block">Tüm Değerlendirmeler</span>
            </div>
          </div>
        </div>

        {/* Yorumlar Grid Yapısı */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-gray-50/50 hover:bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* İsim ve Tarih */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-gray-800">{rev.user}</span>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>

                {/* Yıldızlar */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Yorum Metni */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Mağaza Satıcısı Badge */}
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-400">
                  <span className="text-gray-700 font-semibold">AlpDesign</span> satıcısından alındı
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trendyol Yönlendirme Butonu */}
        <div className="text-center">
          <a
            href={trendyolStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#6ea4ae] hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
          >
            {/* Trendyol Tarzı Alışveriş Sepeti / İkon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Tüm Yorumları Trendyol'da Gör
          </a>
        </div>

      </div>
    </section>
  );
};

export default TrendyolReviews;