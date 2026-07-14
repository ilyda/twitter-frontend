import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  // "Merhaba, aydınlatma ürünleriniz hakkında bilgi ve fiyat alabilir miyim?"
  const whatsappUrl = "https://wa.me/905438617965?text=Merhaba%2C%20%C3%BCr%C3%BCnleriniz%20hakk%C4%B1nda%20bilgi%20ve%20alabilir%20miyim%3F";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-50"
      aria-label="WhatsApp ile İletişime Geçin"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsappButton;