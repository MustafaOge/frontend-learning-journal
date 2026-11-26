// 02 - OLAYLAR: onClick ve onChange
//
// "Olay" (event): kullanıcının yaptığı bir şey. Butona tıklamak, input'a yazmak.
// 01'de onClick'i zaten kullandık. Burada biraz daha yakından bakıyoruz.

import { useState } from "react";

// =====================================================================
//  ADIM 1: onClick'e bir FONKSİYON verirsin
// =====================================================================
//
//   <button onClick={selamla}>
//
// Anlamı: "Bu butona tıklanınca selamla fonksiyonunu çalıştır."
//
// DİKKAT: selamla yazıyoruz, selamla() DEĞİL.
//   selamla    → fonksiyonun kendisi. React tıklanınca çalıştırır.
//   selamla()  → fonksiyonu HEMEN, ekran çizilirken çalıştırır. Yanlış.
//
// C#'taki event bağlamanın aynısı:
//   button.Click += Selamla;      ✔
//   button.Click += Selamla();    ✘

function SelamlaOrnegi() {
  const [mesaj, setMesaj] = useState("Henüz tıklanmadı");

  function selamla() {
    setMesaj("Merhaba!");
  }

  return (
    <div className="kutu">
      <button onClick={selamla}>Selamla</button>{" "}
      <span className="vurgu">{mesaj}</span>
    </div>
  );
}

// =====================================================================
//  ADIM 2: Fonksiyona parametre vermek gerekirse
// =====================================================================
//
// sec("mavi") gibi parametreli çağırmak istiyorsun. Ama ADIM 1'e göre
// onClick={sec("mavi")} yazamazsın, hemen çalışır.
//
// Çözüm: Onu küçük bir fonksiyonun içine koy.
//
//   onClick={() => sec("mavi")}
//
// () => sec("mavi") şu demek: "Çalıştırılınca sec("mavi")'yi çağıran bir fonksiyon."
// Bu yeni fonksiyonu React'e veriyoruz. React tıklanınca onu çalıştırıyor.
// (Gün 1'deki arrow fonksiyon. C#'taki lambda: () => Sec("mavi"))

function RenkOrnegi() {
  const [renk, setRenk] = useState("seçilmedi");

  function sec(yeniRenk: string) {
    setRenk(yeniRenk);
  }

  return (
    <div className="kutu">
      <button onClick={() => sec("kırmızı")}>Kırmızı</button>{" "}
      <button onClick={() => sec("mavi")}>Mavi</button>{" "}
      <button onClick={() => sec("yesil")}>Yeşil </button>{" "}
      {/* Kısa işlerde ayrı fonksiyon yazmadan direkt setRenk de çağırabilirsin: */}
      <button onClick={() => setRenk("seçilmedi")}>Temizle</button>{" "}
      Seçilen renk: <span className="vurgu">{renk}</span>
    </div>
  );
}

// =====================================================================
//  ADIM 3: onChange (input'a yazılınca)
// =====================================================================
//
// Input'a her harf yazıldığında onChange çalışır.
// React fonksiyona bir "e" parametresi verir. Olayın bilgileri onun içinde.
// Bizim işimize yarayan tek şey: e.target.value → input'ta şu an yazan metin.
//
//   onChange={(e) => setYazi(e.target.value)}
//
// Anlamı: "Input değişince, içindeki yeni metni yazi state'ine koy."

function YaziOrnegi() {
  const [yazi, setYazi] = useState("");

  return (
    <div className="kutu">
      <input
        type="text"
        placeholder="Bir şey yaz"
        value={yazi}
        onChange={(e) => setYazi(e.target.value.toUpperCase())}
      />
      <div>
        Yazdığın: <span className="vurgu">{yazi}</span> ({yazi.length} karakter)
      </div>
    </div>
  );
}

// value={yazi} kısmını şimdilik dert etme, 03'ün konusu o.

// =====================================================================
//  ÖZET
// =====================================================================
//
//   onClick={fonksiyon}              tıklanınca fonksiyon çalışır
//   onClick={() => fonksiyon(x)}     parametre lazımsa
//   onChange={(e) => ...}            input değişince. Yeni metin: e.target.value

export default function Olaylar() {
  return (
    <>
      <h2>02 - Olaylar</h2>
      <SelamlaOrnegi />
      <RenkOrnegi />
      <YaziOrnegi />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) RenkOrnegi'ne "Yeşil" butonu ekle.
//  2) onClick={() => sec("mavi")} satırını onClick={sec("mavi")} yap,
//     kaydet ve tarayıcıya bak. Ne oldu? (Sonra geri al.)
//  3) YaziOrnegi'nde yazıyı büyük harfle sakla:
//       setYazi(e.target.value.toUpperCase())
//     Input'a küçük harf yaz. Ne görüyorsun?
// ---------------------------------------------------------------------
