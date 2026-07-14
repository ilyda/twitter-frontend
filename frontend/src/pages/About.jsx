const About = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src="https://i.etsystatic.com/ij/8158fb/8226249255/ij_600x600.8226249255_azjjgis6.jpg?version=0"
            alt="Ürün hazırlama süreci"
            className="min-h-[450px] w-full object-cover lg:min-h-[620px]"
          />
        </div>

        <div>
          <span className="text-xs font-black tracking-[0.2em] text-muted">
            HAKKIMIZDA
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            LilyCo tasarım, özgün ürünler
          </h1>

          <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
            <p>
              Yaşam alanlarına sıcaklık ve karakter kazandıran
              dekoratif ürünler tasarlıyoruz.
            </p>

            <p>
              Ürünlerimizi hazırlarken LilyCo görünüm, kullanım
              kolaylığı ve kaliteli üretim anlayışını ön planda
              tutuyoruz.
            </p>

            <p>
              Dekorasyon ürünlerinden kişiye özel tasarımlara kadar
              farklı ürün seçenekleri sunuyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;