// ALIŞTIRMA 3/3: ProductList prop'u aşağıya iletsin
// Gün 4'teki çözümün aynısı. ProductCard'ın GÖREV 3'ünü bitirince burası
// TS hatası verecek (eksik prop). Hatayı okuyarak düzelt.

import ProductCard from "./ProductCard";
import type { Urun } from "./urunler";

// GÖREV 4: ProductList'e de onSepeteEkle prop'unu ekle ve her ProductCard'a ilet.
//   Not: ProductList bu fonksiyonu kendisi kullanmıyor, sadece aşağıya geçiriyor.
//   Buna "prop drilling" denir. 2-3 seviye için sorun değil. Çok derinleşirse
//   ileride Context denen bir çözüm var.
interface ProductListProps {
  urunler: Urun[];
  onSepeteEkle: (sepetUrun: Urun) => void;

}

export default function ProductList({ urunler, onSepeteEkle }: ProductListProps) {
  if (urunler.length === 0) {
    return <p>Gösterilecek ürün yok.</p>;
  }
  const toplamUrun = urunler.length;
  const tukenenSayisi = urunler.filter((u) => u.stok < 1).length;

  return (
    <>
      <p>
        {toplamUrun} ürün, {tukenenSayisi} tanesi tükendi
      </p>
      <div className="urun-listesi">
        {urunler.map((urun) => (
          <ProductCard key={urun.id} urun={urun} onSepeteEkle={onSepeteEkle} />
        ))}
      </div>
    </>
  );
}
