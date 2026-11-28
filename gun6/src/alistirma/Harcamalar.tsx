// ALIŞTIRMA 1/2: Harcama takibi
// Ekranda görmek için: npm run dev  → sayfanın en altı "Alıştırma"
// Tip kontrolü: npm run build      (hata vermemeli)
// Lint:         npm run lint
//
// Dünkü Magaza'dan farkı: Bugün hazır kod yok. Boş bir component'ten
// başlıyorsun. Görevler küçük adımlar, her adımdan sonra ekranda dene.
//
// Takıldığında önce kendine şu soruyu sor:
//   "Bu değer state mi, yoksa state'ten HESAPLANABİLİR mi?"
//
// Harcamalar ekrandaki listenin SAHİBİ. (Dünkü Magaza gibi)
//
// Hazır CSS sınıfları: kutu, satir, soluk, vurgu, sepet (vurgulu çerçeve)

import { useState } from "react";
import HarcamaFormu from "./HarcamaFormu";
import { ornekHarcamalar, type Harcama } from "./harcama";
// GÖREV 1'de ihtiyacın olacak import'lar:
//   import { useState } from "react";
//   import { ornekHarcamalar, tl, type Harcama } from "./harcama";

// =====================================================================
//  BÖLÜM A: Liste
// =====================================================================
//
// GÖREV 1: State ve liste
//   harcamalar adında bir state oluştur. Başlangıç değeri: ornekHarcamalar.
//   (Tipini yazman gerekir mi? useState<Harcama[]>(...). Gün 5, 04, ADIM 6)
//   Her harcamayı bir satırda göster:
//     Market  850 ₺  (yemek)
//   Para için tl(...) fonksiyonu hazır: tl(850) → "850 ₺"


//
// GÖREV 2: Toplam
//   Listenin altında "Toplam: 2.200 ₺" yazsın.
//   Toplam state mi? (Hata avındaki HATA 2'yi hatırla.)
//
// GÖREV 3: Silme
//   Her satıra "Sil" butonu ekle. Basınca o harcama listeden çıksın.
//   Toplam kendiliğinden güncellenmeli. Güncellenmiyorsa GÖREV 2'ye dön.
//
// =====================================================================
//  BÖLÜM B: Ekleme
// =====================================================================
//
// GÖREV 4-5: HarcamaFormu.tsx'e geç. Sonra buraya dön.
//
// =====================================================================
//  BÖLÜM C: Filtre ve özet
// =====================================================================
//
// GÖREV 6: Kategori filtresi
//   Listenin üstüne bir <select>: "hepsi / yemek / ulaşım / fatura / eğlence".
//   Seçilen kategorinin harcamaları görünsün. "hepsi" ise hepsi.
//   - Bu state'in tipi ne olacak? Kategori yetmez, "hepsi" de lazım:
//       useState<Kategori | "hepsi">("hepsi")
//   - <option>'ları elle yazma, harcama.ts'teki kategoriler dizisini map'le.
//   - Toplam da filtreye uysun: "yemek" seçiliyse sadece yemeklerin toplamı.
//   Soru: Filtrelenmiş listeyi state'e koymalı mısın? Cevabını yorum olarak yaz.
//   Cevap:
//
// GÖREV 7: Kategori özeti
//   <div className="sepet"> içinde, filtreden bağımsız, her kategorinin toplamı:
//     yemek: 1.030 ₺
//     ulaşım: 300 ₺
//     ...
//   İpucu: kategoriler.map(...) ve her kategori için harcamalar'ı filter + reduce.
//   (Gün 2, 02-reduce. Dünkü sepet toplamının aynısı)
//
// =====================================================================
//  BONUS
// =====================================================================
//
// B1) Sıralama: "Tutara göre sırala" checkbox'ı. İşaretliyse liste büyükten
//     küçüğe sıralansın.
//     DİKKAT: sort, diziyi YERİNDE değiştirir (push gibi). State'i doğrudan
//     sort'lama. Önce kopyala: [...liste].sort((a, b) => b.tutar - a.tutar)
//     Sıralı liste de state mi? (Hayır olmalı.)
// B2) Bütçe: Bir sayı input'u ile aylık bütçe gir (başlangıç 3000). Toplam
//     bütçeyi aşarsa "Bütçe 450 ₺ aşıldı!" yazsın, aşmadıysa "Kalan: 800 ₺".
// B3) Gün 5'teki Magaza'nın B1 bonusu: sepetten "−" ile çıkarma. Artık
//     map, filter ve updater'ı biliyorsun, dersin yardımı olmadan yap.

export default function Harcamalar() {
  // GÖREV 1 buradan başlıyor

  const [harcamalar, setHarcamalar] = useState<Harcama[]>(ornekHarcamalar);

  const toplam = harcamalar.reduce((toplam, h) => toplam + h.tutar, 0);

  function sil(id: number) {
    setHarcamalar(harcamalar.filter((h) => h.id !== id));
  }

  function harcamaEkle(harcama: Harcama) {
    setHarcamalar([...harcamalar, harcama]);
  }

  return (
    <div className="kutu">
      <strong>Harcamalar</strong>
      {harcamalar.map((h) => <li key={h.id}>
        {h.aciklama} - {h.tutar.toLocaleString("tr-TR") + " TL"} {` (${h.kategori})`}
        <button onClick={() => { sil(h.id) }}> Sil</button>
      </li>)}

      <p>Toplam: {toplam.toLocaleString("tr-TR")} TL</p>
      <HarcamaFormu onEkle={harcamaEkle} />
    </div>
  );
}
