// 05 - ALT COMPONENT'TEN ÜSTE HABER VERMEK
//
// Alıştırmadaki soru: "Sepete ekle" butonu ProductCard'ın içinde.
// Sepet ise ProductCard'ın dışında, Magaza'da. Buton sepeti nasıl değiştirecek?
// Bu dosya o sorunun cevabı. Aynısını kitaplarla yapıyoruz.

import { useState } from "react";

// =====================================================================
//  ADIM 1: State nerede durmalı?
// =====================================================================
//
// Ekranda kitap kartları var. Her kartta "Okudum" butonu var.
// Kartların üstünde de "Okuduklarım: ..." listesi var.
//
// Okunanlar listesi state olmalı. Ama hangi component'te?
//   - KitapKarti'nda olamaz. Her kartın kendi listesi olur, üstteki
//     "Okuduklarım" satırı bunları göremez.
//   - Kutuphane'de olmalı. Hem listeyi gösteren hem kartları çizen o.
//
// Kural: State'i, ona ihtiyacı olan component'lerin ÜSTÜNDEKİ component'e koy.

// =====================================================================
//  ADIM 2: Alt component'e bir FONKSİYON prop'u ver
// =====================================================================
//
// Gün 4'te props ile aşağıya metin ve sayı verdik. Fonksiyon da verebiliriz.
//
// Kutuphane, KitapKarti'na diyor ki:
//   "Al bu fonksiyonu. Butona basılınca bunu çağır, gerisini ben hallederim."
//
// KitapKarti listeyi bilmiyor, değiştirmiyor. Sadece fonksiyonu çağırıyor.
//
// Gelenek: Böyle prop'ların adı "on" ile başlar: onOkudum, onSepeteEkle, onSil.
// (onClick'e benzesin diye.)
//
// C# gözüyle: Alt component bir event tanımlıyor, üst component dinliyor.
//   kart.Okudum += kitap => okunanlar.Add(kitap);

interface KitapKartiProps {
  kitap: string;
  onOkudum: (kitap: string) => void;
  okundu?: boolean;
  // Tipini okuyalım: "string alan, bir şey döndürmeyen fonksiyon"
  // C#'taki Action<string>
}

function KitapKarti({ kitap, onOkudum, okundu }: KitapKartiProps) {
  return (
    <div className="kutu">
      {kitap} <button onClick={() => { onOkudum(kitap) }} disabled={okundu}>Okudum</button>
    </div>
  );
}

const kitaplar = ["Suç ve Ceza", "Tutunamayanlar", "Kürk Mantolu Madonna"];

export default function StateYukariTasima() {
  // State burada, üst component'te
  const [okunanlar, setOkunanlar] = useState<string[]>([]);

  // Bu fonksiyonu kartlara vereceğiz
  function okudum(kitap: string) {
    setOkunanlar(okunanlar.includes(kitap) ? okunanlar : [...okunanlar, kitap]); // 04, ADIM 3: yeni dizi
  }

  return (
    <>
      <h2>05 - Alt component'ten üste haber vermek</h2>
      <p>
        <strong>Okuduklarım:</strong> {okunanlar.length === 0 ? "henüz yok" : okunanlar.join(", ")}
      </p>
      {kitaplar.map((kitap) => (
        // onOkudum={okudum}: fonksiyonun kendisini veriyoruz, okudum() değil (02, ADIM 1)
        <KitapKarti key={kitap} kitap={kitap} onOkudum={okudum} okundu={okunanlar.includes(kitap)} />
      ))}
    </>
  );
}

// =====================================================================
//  ADIM 3: "Okudum"a basınca SIRAYLA ne oluyor?
// =====================================================================
//
//   1. KitapKarti'ndaki buton: onOkudum("Tutunamayanlar") çağrılır.
//   2. onOkudum aslında Kutuphane'nin okudum fonksiyonu. O çalışır.
//   3. okudum içinde setOkunanlar(...) → state güncellenir.
//   4. React Kutuphane'yi tekrar çalıştırır → "Okuduklarım" satırı güncellenir.
//
// Alıştırmada: KitapKarti = ProductCard, Kutuphane = Magaza,
// onOkudum = onSepeteEkle, okunanlar = sepet.

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) Aynı kitaba iki kez basınca listede iki kez çıkıyor. Bunu engelle:
//     okunanlar zaten o kitabı içeriyorsa ekleme. (İpucu: includes)
//  2) Okunan kitabın butonu disabled olsun. KitapKarti'na bunu nasıl
//     söyleyeceksin? (İpucu: yeni bir prop, okundu: boolean)
// ---------------------------------------------------------------------
