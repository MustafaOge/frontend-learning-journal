// ALIŞTIRMA 2/3: ProductCard'a "Sepete ekle" butonu
// Gün 4'teki çözümün aynısı. Sadece GÖREV'leri ekle.
// Önce Magaza.tsx'teki GÖREV 1-2'yi bitir.

import { type Urun } from "./urunler";

// GÖREV 3a: Callback prop
//   ProductCard'a "onSepeteEkle" adında bir prop ekle. Tipi: bir ürün alan,
//   bir şey döndürmeyen fonksiyon. (05-StateYukariTasima.tsx'teki onOkudum'a bak)
//
//   Soru: ProductCard sepet state'ini neden KENDİSİ tutmuyor? Cevabını yorum
//   olarak yaz.
//   Cevap: Her kart kendi sepetini tutsaydı 8 ayrı sepet olurdu ve Magaza toplamı
//   göremezdi. Sepeti birden çok component kullandığı için state ortak üstte (Magaza)
//   duruyor, kart sadece onSepeteEkle ile haber veriyor.
interface ProductCardProps {
  urun: Urun;
  onSepeteEkle: (sepetUrun: Urun) => void;
}

export default function ProductCard({ urun, onSepeteEkle }: ProductCardProps) {
  const tukendi = urun.stok < 1;

  return (
    <div className={tukendi ? "urun-kart tukendi" : "urun-kart"}>
      <h3>{urun.ad}</h3>
      <p>{urun.kategori}</p>
      <div className="urun-fiyat">{urun.fiyat.toLocaleString("tr-TR")} ₺</div>
      <p>Stok: {urun.stok}</p>
      {urun.etiketler?.map((etiket) => (
        <span key={etiket} className="urun-etiket">
          {etiket}
        </span>
      ))}
      {tukendi && <span className="etiket-tukendi">Tükendi</span>}

      <button disabled={tukendi} onClick={() => onSepeteEkle(urun)}>
        Sepete ekle
      </button>
    </div>
  );
}
