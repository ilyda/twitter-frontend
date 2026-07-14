import { useState } from "react";
import emailjs from "@emailjs/browser"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// 1. Yup ile Doğrulama Şeması
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Adınız en az 2 karakter olmalıdır")
    .required("Ad alanı zorunludur"),
  surname: Yup.string()
    .min(2, "Soyadınız en az 2 karakter olmalıdır")
    .required("Soyad alanı zorunludur"),
  email: Yup.string()
    .email("Geçersiz e-mail adresi")
    .required("E-mail alanı zorunludur"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sadece sayısal değerler girebilirsiniz")
    .min(10, "Telefon numarası en az 10 haneli olmalıdır")
    .required("Telefon alanı zorunludur"),
  message: Yup.string()
    .min(10, "Mesajınız en az 10 karakter olmalıdır")
    .required("Mesaj alanı zorunludur"),
});

const Contact = () => {
  // Pop-up'ın açık/kapalı durumunu kontrol eden state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Formik Kurulumu
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const serviceID = "service_qeoby8o";
      const templateID = "template_ctm3plm";
      const publicKey = "V7C82ItrSsmXKyqn6";

      const templateParams = {
        from_name: `${values.name} ${values.surname}`,
        from_email: values.email,
        phone_number: values.phone,
        message: values.message,
      };

      // toast.promise ile yüklenme ve hata durumlarını yönetiyoruz
      toast.promise(
        emailjs.send(serviceID, templateID, templateParams, publicKey),
        {
          loading: "Mesajınız gönderiliyor...",
          success: () => {
            resetForm();
            setSubmitting(false);
            setShowSuccessModal(true); // Gönderim başarılı olunca pop-up'ı açıyoruz
            return "Başarılı!"; // Bu toast hemen kaybolacak veya istersen toast.promise yerine düz emailjs.send kullanabiliriz.
          },
          error: (err) => {
            setSubmitting(false);
            console.error("EmailJS Hatası:", err);
            return "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.";
          },
        },
        {
          // Başarı toast'unun ekranda kalabalık yapmaması için görünür görünmez gizliyoruz (çünkü ortadaki pop-up yetecek)
          success: {
            duration: 1,
            style: { display: 'none' }
          }
        }
      );
    },
  });

  return (
    <section className="bg-gray-50 py-16 relative">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">İletişim</h1>
          <p className="text-gray-500 mt-3">
            Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşabilirsiniz.
          </p>
        </div>

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-12">
          <iframe
            title="map"
            className="w-full h-[380px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.6498559465485!2d29.21990599999999!3d40.90149499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac4ba9a32a467%3A0x1cfdb54fcfab17c!2sTwin%20Towers%20Kartal!5e0!3m2!1str!2str!4v1784049225833!5m2!1str!2str"
            loading="lazy"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* SOL BİLGİ ALANI */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bize Ulaşın</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Ürünlerimiz, siparişleriniz veya hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
            </p>

            <div className="space-y-5">
              <div className="flex">
                <h3 className="font-semibold text-gray-900 w-28 shrink-0">Adres</h3>
                <p className="text-gray-600 text-sm">Cumhuriyet Mahallesi, Kartal / İstanbul</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold text-gray-900 w-28 shrink-0">E-Mail</h3>
                <p className="text-gray-600 text-sm">info@lilycompany.com</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold text-gray-900 w-28 shrink-0">Çalışma</h3>
                <p className="text-gray-600 text-sm">Pazartesi - Cuma 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">İletişim Formu</h2>

            <form onSubmit={formik.handleSubmit} noValidate className="grid md:grid-cols-2 gap-5">
              {/* AD */}
              <div className="flex flex-col gap-1">
                <input
                  name="name"
                  placeholder="Adınız"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border rounded-xl p-4 outline-none focus:ring-1 transition ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#6ea4ae] focus:ring-[#6ea4ae]"
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <span className="text-red-500 text-xs px-1">{formik.errors.name}</span>
                )}
              </div>

              {/* SOYAD */}
              <div className="flex flex-col gap-1">
                <input
                  name="surname"
                  placeholder="Soyadınız"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border rounded-xl p-4 outline-none focus:ring-1 transition ${
                    formik.touched.surname && formik.errors.surname
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#6ea4ae] focus:ring-[#6ea4ae]"
                  }`}
                />
                {formik.touched.surname && formik.errors.surname && (
                  <span className="text-red-500 text-xs px-1">{formik.errors.surname}</span>
                )}
              </div>

              {/* E-MAIL */}
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail Adresiniz"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border rounded-xl p-4 outline-none focus:ring-1 transition ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#6ea4ae] focus:ring-[#6ea4ae]"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-500 text-xs px-1">{formik.errors.email}</span>
                )}
              </div>

              {/* TELEFON */}
              <div className="flex flex-col gap-1">
                <input
                  name="phone"
                  placeholder="Telefon Numaranız"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border rounded-xl p-4 outline-none focus:ring-1 transition ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#6ea4ae] focus:ring-[#6ea4ae]"
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <span className="text-red-500 text-xs px-1">{formik.errors.phone}</span>
                )}
              </div>

              {/* MESAJ */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  rows="6"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border rounded-xl p-4 outline-none focus:ring-1 transition ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#6ea4ae] focus:ring-[#6ea4ae]"
                  }`}
                />
                {formik.touched.message && formik.errors.message && (
                  <span className="text-red-500 text-xs px-1">{formik.errors.message}</span>
                )}
              </div>

              {/* GÖNDER BUTONU */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="
                md:col-span-2
                bg-[#6ea4ae]
                disabled:bg-gray-400
                text-white
                hover:bg-pink-600
                py-4
                rounded-xl
                font-semibold
                transition
                "
              >
                {formik.isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 🌟 ORTADA AÇILAN POP-UP (MODAL) 🌟 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100 transform transition-all scale-100 duration-300">
            {/* Onay İkonu */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6">
              <svg
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Mesajınız İletildi!
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Bizimle iletişime geçtiğiniz için teşekkür ederiz. Ekibimiz mesajınızı inceleyip en kısa sürede tarafınıza dönüş sağlayacaktır.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#6ea4ae] hover:bg-[#5b929c] text-white py-3 rounded-xl font-semibold transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;