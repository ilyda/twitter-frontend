export const products = [
  {
    id: 1,
    name: "Minimal Dekoratif Vazo",
    category: "Dekorasyon",
    price: 349,
    image: "/images/vazo.jpg",
    description:
      "Modern ve sade tasarıma sahip dekoratif vazo. Ev ve ofis dekorasyonunda kullanılabilir.",
  },
  {
    id: 2,
    name: "Ahşap Müzik Kutusu",
    category: "Müzik Kutusu",
    price: 599,
    image: "/images/muzik-kutusu.jpg",
    description:
      "El işçiliği görünümüne sahip dekoratif müzik kutusu.",
  },
  {
    id: 3,
    name: "Geometrik Saksı",
    category: "Dekorasyon",
    price: 279,
    image: "/images/saksi.jpg",
    description:
      "Küçük bitkiler ve sukulentler için geometrik tasarımlı saksı.",
  },
  {
    id: 4,
    name: "Ay Işığı Gece Lambası",
    category: "Aydınlatma",
    price: 449,
    image: "/images/gece-lambasi.jpg",
    description:
      "Yumuşak ışık veren dekoratif masa ve gece lambası.",
  },
  {
    id: 5,
    name: "Unicorn Kalemlik",
    category: "Çocuk",
    price: 249,
    image: "/images/unicorn-kalemlik.jpg",
    description:
      "Çocuk odaları için unicorn tasarımlı dekoratif kalemlik.",
  },
  {
    id: 6,
    name: "Masaüstü Organizer",
    category: "Organizer",
    price: 399,
    image: "/images/organizer.jpg",
    description:
      "Kalem, telefon ve küçük eşyalar için masaüstü organizer.",
  },
];

export const getProductById = (id) => {
  return products.find((product) => product.id === Number(id));
};