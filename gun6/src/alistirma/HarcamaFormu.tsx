// ALIŞTIRMA 2/2: Harcama ekleme formu
// Önce Harcamalar.tsx'teki GÖREV 1-3'ü bitir.
//
// Bugünün yeni fikri: HER STATE YUKARI GİTMEZ.
//
//   Formdaki input'ların yazılmakta olan değerleri (açıklama, tutar,
//   kategori) sadece formu ilgilendiriyor. Harcamalar, sen "Ekle"ye
//   basana kadar yarım yazılmış metinle ilgilenmiyor.
//   → Bu state'ler HarcamaFormu'nun İÇİNDE durur.
//
//   Harcama listesini ise hem form (ekleme) hem liste (gösterme) etkiliyor.
//   → O state Harcamalar'da durur. Form sadece "yeni harcama hazır" diye
//     haber verir.
//
// Kural: State'i, ona ihtiyacı olan component'lerin EN YAKIN ortak üstüne koy.
// Tek bir component ihtiyaç duyuyorsa onun içinde kalsın.

import { useState } from "react";
import { kategoriler, type Harcama, type Kategori } from "./harcama";
// GÖREV 4-5'te ihtiyacın olacak import'lar:
//   import { useState } from "react";
//   import { kategoriler, type Harcama, type Kategori } from "./harcama";

// GÖREV 4: Üç controlled input
//   Bu component'in içinde üç state:
//     aciklama  (text input)         başlangıç ""
//     tutar     (number input)       başlangıç 0
//     kategori  (select)             başlangıç "yemek"
//   Her birini input'una bağla. (Gün 5, 03-ControlledInput.tsx, ADIM 1 ve 3)
//
//   Select için küçük bir TS detayı:
//     e.target.value her zaman string gelir. Ama state'in tipi Kategori.
//     TS "string, Kategori'ye atanamaz" der. Çözüm:
//       setKategori(e.target.value as Kategori)
//     as Kategori = "TS, ben eminim, bu bir Kategori". C#'taki (Kategori)deger
//     cast'i gibi. Option'ları kategoriler dizisinden ürettiğimiz için güvenli.
//
// GÖREV 5: "Ekle" butonu
//   a) Bu component'e onEkle adında bir prop ekle. Tipi: bir Harcama alan,
//      bir şey döndürmeyen fonksiyon. (Dünkü onSepeteEkle'nin aynısı)
//      Ekleyince Harcamalar.tsx'te TS hatası çıkacak. Hatayı oku ve düzelt:
//      Harcamalar'da yeni harcamayı listeye ekleyen fonksiyonu yaz ve
//      onEkle'ye ver.
//   b) Butona basınca yeni bir Harcama oluştur ve onEkle ile gönder.
//      id için: Date.now()  (şu anki zaman, milisaniye. Her seferinde farklı.)
//   c) Gönderdikten sonra input'ları temizle (açıklama "", tutar 0).
//   d) Açıklama boşsa VEYA tutar 0 ya da daha küçükse buton disabled olsun.
//      Bu "geçersiz mi?" bilgisi state mi, hesaplanan değer mi?
//      (Hata avı HATA 2'deki "eklenemez" satırına bak.)
//
//   Soru: aciklama state'ini neden Harcamalar'a taşımadık? Cevabını yorum
//   olarak yaz. (Yukarıdaki "HER STATE YUKARI GİTMEZ" kısmı)
//   Cevap:


interface HarcamaFormuProps {
  onEkle: (harcama: Harcama) => void
}




export default function HarcamaFormu({ onEkle }: HarcamaFormuProps) {

  const [aciklama, setAciklama] = useState("");
  const [tutar, setTutar] = useState(0);
  const [kategori, setKategori] = useState<Kategori>("yemek")


  function ekle() {
    const gonderilecekHarcama: Harcama = { id: Date.now(), aciklama: aciklama, tutar: tutar, kategori: kategori };

    onEkle(gonderilecekHarcama);
    setAciklama("");
    setTutar(0);
  }
  const eklenemez = aciklama.trim() === "" || tutar <= 0 || Number.isNaN(tutar);

  return (
    <div className="satir">
      <input type="text" placeholder="Açıklama" value={aciklama} onChange={(e) => setAciklama(e.target.value)} />

      <input type="number" min={0} placeholder="Tutar" value={tutar} onChange={(e) => setTutar(e.target.valueAsNumber)} />
      <select value={kategori} onChange={(e) => setKategori(e.target.value as Kategori)}>
        {kategoriler.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>

        ))}

      </select>
      <button disabled={eklenemez} onClick={ekle} >Ekle</button>

    </div>
  );
}
