// 02 - HATA AVI
//
// Aşağıda üç küçük component var. Üçü de "çalışıyor gibi" ama her birinde
// dünkü kurallardan biri çiğnenmiş.
//
// Her hata için:
//   1. Ekranda dene, BELİRTİ'yi kendi gözünle gör.
//   2. Kodu oku. Hangi kural çiğnenmiş? (Kurallar aşağıda)
//   3. Düzelt.
//   4. Takılırsan dosyanın en altındaki İPUÇLARI'na bak. Önce kendin dene.
//
// Dünkü kurallar:
//   K1. Ekranı değiştirecek veri state'te durur, normal değişkende değil.
//   K2. State'i yerinde değiştirme, yeni dizi/nesne ver.
//   K3. Hesaplanabilen değeri state'e koyma, render sırasında hesapla.
//   K4. Birden çok component'in ihtiyaç duyduğu state ortak üstte durur.
//       Alt component fonksiyon prop'u ile haber verir.

import { useState } from "react";

// =====================================================================
//  HATA 1: Favori şehirler
// =====================================================================
//
// BELİRTİ: Bir şehrin yanındaki "★" butonuna bas. "Favoriler" satırı değişmiyor.

const sehirler = ["İstanbul", "Ankara", "İzmir", "Trabzon"];

function HataFavoriler() {
  const [favoriler, setFavoriler] = useState<string[]>([]);

  function favoriEkle(sehir: string) {
    if (favoriler.includes(sehir)) return;
    setFavoriler((favoriler) => [...favoriler, sehir]);
  }

  return (
    <div className="kutu">
      <strong>Hata 1</strong>
      <div>Favoriler: {favoriler.length === 0 ? "yok" : favoriler.join(", ")}</div>
      <div className="satir">
        {sehirler.map((s) => (
          <button key={s} onClick={() => favoriEkle(s)}>
            ★ {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
//  HATA 2: Alışveriş listesi
// =====================================================================
//
// BELİRTİ: Birkaç madde ekle: sayı doğru. Sonra bir maddeyi sil: sayı yanlış.

function HataAlisveris() {
  const [maddeler, setMaddeler] = useState<string[]>(["Süt", "Ekmek"]);
  const [yeni, setYeni] = useState("");

  const temizYeni = yeni.trim();
  const eklenemez = temizYeni === "" || maddeler.includes(temizYeni);

  function ekle() {
    setMaddeler([...maddeler, temizYeni]);
    setYeni("");
  }

  function sil(madde: string) {
    setMaddeler(maddeler.filter((m) => m !== madde));

  }

  return (
    <div className="kutu">
      <strong>Hata 2</strong>
      <div className="soluk">{maddeler.length} madde</div>
      <div className="satir">
        <input type="text" placeholder="Madde" value={yeni} onChange={(e) => setYeni(e.target.value)} />
        <button onClick={ekle} disabled={eklenemez}>
          Ekle
        </button>
      </div>
      <ul>
        {maddeler.map((m) => (
          <li key={m}>
            {m} <button onClick={() => sil(m)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =====================================================================
//  HATA 3: Anket
// =====================================================================
//
// BELİRTİ: Butonlara bas. Butonların üstündeki sayılar artıyor ama
//          "Toplam oy" hep 0 kalıyor.
//
// Bu en zoru. İki kural birden çiğnenmiş. Düzeltmek için kodu biraz
// yeniden düzenlemen gerekecek.
//
// Düzeltince ekle: "Önde giden: React" satırı (en çok oyu alan seçenek).
// Doğru düzelttiysen bu satırı eklemek kolay olacak. Yanlış yerde
// düzelttiysen imkânsız gibi gelecek. Bu bir ipucu.

function SecenekButonu({ ad, oy, onOy }: { ad: string; oy: number; onOy: () => void }) {
  return (
    <button onClick={onOy}>
      {ad} ({oy})
    </button>
  );
}

function HataAnket() {

  const [oylar, setOylar] = useState<string[]>([]);

  function oyGeldi(ad: string) {
    console.log("toplamOy =", oylar.length);

    setOylar([...oylar, ad]);
  }
  let ondeGiden = "henüz oy yok";

  const reactOy = oylar.filter((o) => o === "React").length;
  const vueOy = oylar.filter((o) => o === "Vue").length;
  const angularOy = oylar.filter((o) => o === "Angular").length;

  if (reactOy > vueOy && reactOy > angularOy) ondeGiden = "React";
  else if (vueOy > reactOy && vueOy > angularOy) ondeGiden = "Vue";
  else if (angularOy > reactOy && angularOy > vueOy) ondeGiden = "Angular";

  return (
    <div className="kutu">
      <strong>Hata 3</strong>
      <div>Toplam oy: {oylar.length}</div>
      <div>Önde giden: {ondeGiden}</div>

      <div className="satir">
        <SecenekButonu ad="React" oy={oylar.filter((o) => o === "React").length} onOy={() => oyGeldi("React")} />
        <SecenekButonu ad="Vue" oy={oylar.filter((o) => o === "Vue").length} onOy={() => oyGeldi("Vue")} />
        <SecenekButonu ad="Angular" oy={oylar.filter((o) => o === "Angular").length} onOy={() => oyGeldi("Angular")} />
      </div>
    </div>
  );
}

export default function HataAvi() {
  return (
    <>
      <h2>02 - Hata avı</h2>
      <HataFavoriler />
      <HataAlisveris />
      <HataAnket />
    </>
  );
}

// =====================================================================
//  İPUÇLARI (önce kendin dene)
// =====================================================================
//
//
//
//
//
//
//
//
//
//
// HATA 1 → K2. push var olan diziyi değiştiriyor. React "aynı dizi" diyor.
//          (Gün 5, 04-Immutability.tsx, ADIM 2-3)
//
//
// HATA 2 → K3. adet, maddeler'den hesaplanabiliyor. İki yerde tutunca biri
//          güncellenip diğeri unutuluyor. adet state'ini tamamen sil.
//          Bu hatayı neden "yapma" diyoruz, şimdi gördün: sil'de setAdet'i
//          eklemek de çalışırdı, ama asıl çözüm unutulacak bir şeyi
//          ortadan kaldırmak.
//
//
// HATA 3 → K1 + K4.
//          K1: toplamOy normal bir let. Artıyor (konsola bak) ama React'in
//              haberi yok. Haberi olsa bile her render'da "let toplamOy = 0"
//              satırı onu tekrar 0 yapar. (Gün 5, 01-UseState.tsx, ADIM 3)
//              npm run lint de bunu görüyor: "Cannot reassign variable after
//              render completes ... Consider using state instead". Düzeltince
//              uyarı kaybolmalı. (HATA 1'deki push'u lint yakalayamıyor,
//              o yüzden kuralları bilmek gerekiyor.)
//          K4: Her butonun oyu kendi içinde. HataAnket onları göremiyor.
//              Oyları HataAnket'e taşı:
//
//                const [oylar, setOylar] = useState([
//                  { ad: "React", oy: 0 },
//                  ...
//                ]);
//
//              Oy verme: map + { ...secenek, oy: secenek.oy + 1 }
//              (Dünkü sepette adet artırmanın aynısı)
//              SecenekButonu'nun kendi state'i kalmasın: oy'u prop olarak alsın.
//              Toplam ve "önde giden" ise hesaplanan değer (K3).
