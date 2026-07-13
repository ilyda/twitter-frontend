import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage("Mesajınız başarıyla alındı.");
    setFormData(initialForm);
  };

  const inputClass =
    "min-h-12 w-full rounded-2xl border border-line bg-page px-4 outline-none transition focus:border-primary";

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            İLETİŞİM
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Bizimle iletişime geçin
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            Ürünler, özel tasarım talepleri ve siparişleriniz için
            bize ulaşabilirsiniz.
          </p>

          <div className="mt-10 flex flex-col gap-7">
            <div>
              <span className="block text-sm text-muted">Telefon</span>

              <a
                href="tel:+905555555555"
                className="mt-1 block text-lg font-bold"
              >
                0555 555 55 55
              </a>
            </div>

            <div>
              <span className="block text-sm text-muted">E-posta</span>

              <a
                href="mailto:info@sade.com"
                className="mt-1 block text-lg font-bold"
              >
                info@sade.com
              </a>
            </div>

            <div>
              <span className="block text-sm text-muted">Instagram</span>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-lg font-bold"
              >
                @sade
              </a>
            </div>
          </div>
        </div>

        <form
          className="rounded-[2rem] border border-line bg-white p-6 sm:p-9"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold"
            >
              Ad Soyad
            </label>

            <input
              id="name"
              name="name"
              type="text"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold"
            >
              E-posta
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-bold"
            >
              Telefon
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputClass}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-bold"
            >
              Mesajınız
            </label>

            <textarea
              id="message"
              name="message"
              rows="6"
              className="w-full resize-y rounded-2xl border border-line bg-page p-4 outline-none transition focus:border-primary"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {successMessage && (
            <p className="mb-5 rounded-2xl bg-green-50 p-4 font-bold text-green-700">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="min-h-12 rounded-full bg-primary px-7 font-bold text-white transition hover:bg-primary-hover"
          >
            Mesaj Gönder
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;