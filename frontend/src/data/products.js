// --- GÖRSEL IMPORTLARI ---

// O1 Gravity Sculpted Lamp
import O1_01 from "@/assets/O1 Gravity Sculpted Lamp/Photos/01.jpg";
import O1_02 from "@/assets/O1 Gravity Sculpted Lamp/Photos/02.jpg";

// O2 Landscape Sculpted Lamp
import O2_01 from "@/assets/O2 Landscape Sculpted Lamp/Photos/01.jpg";
import O2_02 from "@/assets/O2 Landscape Sculpted Lamp/Photos/04.jpg";
import O2_03 from "@/assets/O2 Landscape Sculpted Lamp/Photos/03.jpg";
import O2_04 from "@/assets/O2 Landscape Sculpted Lamp/Photos/02.jpg";

// O3 Dune Sculpted Lamp
import O3_01 from "@/assets/O3 Dune Sculpted Lamp/Photos/01.jpg";
import O3_02 from "@/assets/O3 Dune Sculpted Lamp/Photos/02.jpg";
import O3_03 from "@/assets/O3 Dune Sculpted Lamp/Photos/03.jpg";


export const products = [
  {
    id: 1,
    name: "O1 Gravity Sculpted Lamp",
    category: "Aydınlatma",
    price: 4275,
    images: [O1_01, O1_02],
    description: "Modern dekoratif masaüstü LED aydınlatma. Yerçekimine meydan okuyan özgün tasarımı ile yaşam alanlarına estetik bir atmosfer katar.",
    extraInfo: "3D üretim teknolojisi ile hazırlanmış modern gövde tasarımı.",
    techSpecs: "USB bağlantılı LED sistem. Kablo üzerinde açma kapama anahtarı bulunur."
  },
  {
    id: 2,
    name: "O2 Landscape Sculpted Lamp",
    category: "Aydınlatma",
    price: 1873,
    images: [O2_01, O2_02, O2_03, O2_04],
    description: "Doğal yeryüzü şekillerinden esinlenen dokulu yüzeyi ile modern ve dekoratif masaüstü aydınlatma.",
    extraInfo: "Minimal tasarım anlayışı ile üretilmiştir.",
    techSpecs: "LED aydınlatma sistemi ve pratik kullanım."
  },
  {
    id: 3,
    name: "O3 Dune Sculpted Lamp",
    category: "Aydınlatma",
    price: 2450,
    images: [O3_01, O3_02, O3_03],
    description: "Kum tepelerinin akıcı ve yumuşak hatlarından ilham alan dekoratif masa lambası.",
    extraInfo: "3D baskı teknolojisiyle sürdürülebilir malzemelerden üretilmiştir.",
    techSpecs: "USB bağlantılı, enerji tasarruflu LED lamba."
  },
];

export const getProductById = (id) => {
  return products.find((product) => product.id === Number(id));
};