// ALIŞTIRMA 1/3: Mağaza (arama kutusu + sepet)
// Ekranda görmek için: npm run dev  → sayfanın en altı "Alıştırma"
// Tip kontrolü: npm run build      (hata vermemeli)
// Lint:         npm run lint
// Bitirince bana "review et" de: "state'i yanlış mı güncelliyorum, gereksiz state var mı?"
//
// Magaza, ekrandaki state'in SAHİBİ. ProductList ve ProductCard sadece
// gösteriyor ve haber veriyor. (05-StateYukariTasima.tsx: Kutuphane = Magaza)
//
// Hazır CSS sınıfları: arama-kutusu (input), sepet (sepet kutusu), satir (yan yana dizmek)

import { useState } from "react";
import ProductList from "./ProductList";
import { urunler, type Urun } from "./urunler";

interface SepetKalemi {
  urunId: number;
  adet: number;
}

// =====================================================================
//  BÖLÜM A: Arama kutusu
// =====================================================================
//
// GÖREV 1: Controlled input
//   Bir arama state'i oluştur ve <input type="search" className="arama-kutusu">
//   ile bağla. (03-ControlledInput.tsx, ADIM 1)
//
// GÖREV 2: Filtrele
//   Ürünleri isme göre filtrele ve ProductList'e filtrelenmiş diziyi ver.
//   - Büyük/küçük harf duyarsız olsun: "kla" yazınca "Klavye" gelsin.
//     Türkçe için toLocaleLowerCase("tr-TR") kullan.
//   - Baştaki/sondaki boşluklar önemsenmesin (trim).
//   DİKKAT: Filtrelenmiş listeyi AYRI BİR STATE'E koyma. Neden? (03, ADIM 5. SehirArama örneği neredeyse aynısı)
//   Boş sonuçta ProductList zaten "Gösterilecek ürün yok." diyor. Gün 4'teki iş
//   burada karşılığını veriyor.
//
// =====================================================================
//  BÖLÜM B: Sepet
// =====================================================================
//
// GÖREV 3-4: ProductCard.tsx ve ProductList.tsx'e geç, butonu ve prop'u ekle.
//   Sonra buraya dön.
//
// GÖREV 5: Basit sayaç
//   Önce en basit hali: sepetteki toplam ürün adedini tutan bir sayı state'i.
//   "Sepete ekle"ye her basışta 1 artsın. Arama kutusunun üstünde
//   "Sepet: 3 ürün" yazsın. Çalıştığını gör.
//
// GÖREV 6: Gerçek sepet
//   Sayaç yetmez, hangi üründen kaç tane olduğunu bilmemiz lazım. Sayacı SİL,
//   yerine bir sepet dizisi koy:
//
//     interface SepetKalemi {
//       urunId: number;
//       adet: number;
//     }
//
//   - Sepette olmayan ürün eklenince: yeni kalem, adet 1.
//   - Sepette olan ürün eklenince: o kalemin adedi 1 artar, yeni kalem EKLENMEZ.
//   DİKKAT: push YOK, kalem.adet++ YOK. (04-Immutability.tsx, ADIM 3 ve 6)
//   İpucu: önce sepette var mı diye bak (some veya find), sonra map veya [...].
//
// GÖREV 7: Sepeti göster
//   <div className="sepet"> içinde:
//   - Her kalem: "Klavye x2 = 1.500 ₺"
//   - En altta: "Toplam: 3 ürün, 8.200 ₺"
//   - Sepet boşsa: "Sepetin boş."
//   Ürünün adını ve fiyatını sepette tutmadık, sadece urunId var. Nasıl bulacaksın?
//   Toplam adet ve toplam tutar state mi olmalı? (03, ADIM 5)
//
//   Soru: SepetKalemi'nde urunId yerine bütün Urun nesnesini tutsaydık ne
//   kazanırdık, ne kaybederdik? (İpucu: 2. haftada fiyatlar API'den gelecek ve
//   değişebilecek.) Cevabını yorum olarak yaz.
//   Cevap: Bütün Urun'u tutsaydık ad/fiyat için find yapmazdık, ama aynı bilgi iki
//   yerde dururdu. Fiyat veya stok değişince sepetteki kopya eski kalırdı.
//   Sadece urunId tutunca ad ve fiyat hep güncel listeden okunuyor.
//
// =====================================================================
//  BONUS
// =====================================================================
//
// B1) Sepetteki her kalemin yanına "−" butonu. Adet 1 iken basılırsa kalem
//     sepetten tamamen çıksın. (map + filter)
// B2) Stok sınırı: sepetteki adet stoğa ulaştıysa o ürünün butonu disabled
//     olsun. ProductCard'a bu bilgiyi nasıl vereceksin?
// B3) Arama kutusunun yanına "Temizle" butonu. Sadece arama doluyken görünsün.
// B4) Kategori filtresi: <select> ile "hepsi / aksesuar / ekran / bilgisayar".
//     Arama ile BİRLİKTE çalışsın. Tipi için urunler.ts'teki Kategori'yi kullan.

export default function Magaza() {
  const [arama, setArama] = useState("");
  const [sepet, setSepet] = useState<SepetKalemi[]>([]);

  function sepeteUrunEkle(urun: Urun) {
    setSepet((oncekiSepet) => {
      const mevcutKalem = oncekiSepet.find((kalem) => kalem.urunId === urun.id);

      if (mevcutKalem) {
        return oncekiSepet.map((kalem) =>
          kalem.urunId === urun.id ? { ...kalem, adet: kalem.adet + 1 } : kalem
        );
      }
      return [...oncekiSepet, { urunId: urun.id, adet: 1 }];
    });
  }

  // Hesaplanan değerler (state değil)
  const aranan = arama.trim().toLocaleLowerCase("tr-TR");
  const bulunanlar = urunler.filter((u) => u.ad.toLocaleLowerCase("tr-TR").includes(aranan));

  const toplamAdet = sepet.reduce((toplam, kalem) => toplam + kalem.adet, 0);
  const toplamFiyat = sepet.reduce((toplam, kalem) => {
    const urun = urunler.find((u) => u.id === kalem.urunId);
    return urun ? toplam + urun.fiyat * kalem.adet : toplam;
  }, 0);

  return (
    <>
      <div className="sepet">
        <strong>Sepet</strong>
        {sepet.length === 0 ? (
          <p>Sepetin boş.</p>
        ) : (
          <>
            <ul>
              {sepet.map((kalem) => {
                const urun = urunler.find((u) => u.id === kalem.urunId);
                if (!urun) return null;

                const araToplam = urun.fiyat * kalem.adet;
                return (
                  <li key={kalem.urunId}>
                    {urun.ad} x{kalem.adet} = {araToplam.toLocaleString("tr-TR")} ₺
                  </li>
                );
              })}
            </ul>
            <p>
              Toplam: {toplamAdet} ürün, {toplamFiyat.toLocaleString("tr-TR")} ₺
            </p>
          </>
        )}
      </div>

      <input
        type="search"
        className="arama-kutusu"
        placeholder="Ürün ara..."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
      />

      <ProductList urunler={bulunanlar} onSepeteEkle={sepeteUrunEkle} />
    </>
  );
}
