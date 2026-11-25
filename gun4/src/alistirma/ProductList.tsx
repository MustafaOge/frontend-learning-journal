// ALIŞTIRMA 2/2: ProductList
// Ürün dizisini alıp her biri için bir ProductCard çizen component.
// Önce ProductCard.tsx'i bitir.

import ProductCard from "./ProductCard";
import type { Urun } from "./urunler";

// GÖREV 1: Props tipi
//   ProductList dışarıdan bir ürün DİZİSİ alsın. Prop'un adı "urunler" olsun.
//   Neden ürünleri burada import etmek yerine prop olarak alıyoruz?
//   Cevabını yorum olarak yaz. (İpucu: 2. haftada veri API'den gelecek.
//   Aynı listeyi "sadece stokta olanlar" için de kullanmak istersen?)

interface ProductListProps {
  urunler: Urun[];
}

// Cevap: yeniden kullanılabilirlik (reusability) ve sorumlulukların ayrılmasıdır.
//

export default function ProductList({ urunler }: ProductListProps) {
  // GÖREV 2: Boş liste
  //   urunler boşsa "Gösterilecek ürün yok." yazan bir <p> döndür.
  //   (04'teki "YOL 1: erken return")
  if (urunler.length === 0) {
    return <p>Gösterilecek ürün yok.</p>
  }
  const toplamUrun = urunler.length;
  const tukenenSayisi = urunler.filter((u) => u.stok < 1).length;

  return (
    // GÖREV 3: Listeyi çiz
    //   Her ürün için <ProductCard> çiz, key'i unutma. key nereye verilir?
    //   Kartları <div className="urun-listesi"> içine koy (grid olarak dizilirler).


    //
    // GÖREV 4: Başlıkta özet göster
    //   Listenin üstünde: "8 ürün, 2 tanesi tükendi"
    //   Tükenen sayısını filter ile hesapla (return'den ÖNCE, normal JS olarak).
    //
    // Şimdilik sadece ilk ürünü gösteriyor. Bunu sil, kendi JSX'ini yaz.
    <>
      <p>{toplamUrun} ürün, {tukenenSayisi} tanesi tükendi</p>
      <div className="urun-listesi">
        {urunler.map((urun) => (
          <ProductCard key={urun.id} urun={urun} />
        ))}
      </div>
    </>
  );
}

// Bonus görevler ayrı dosyada: Bonus.tsx
