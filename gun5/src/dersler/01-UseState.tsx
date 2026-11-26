// 01 - useState
//
// Bugünün amacı: Butona basınca ekrandaki bir şey değişsin.
// Gün 4'te ekran hep sabitti. Bugün değişen ekran yapacağız.

import { useState } from "react";

// =====================================================================
//  ADIM 1: Önce aklına gelen yolu deneyelim (ÇALIŞMIYOR)
// =====================================================================
//
// Bir sayı tutalım, butona basınca 1 artıralım.
// Aşağıdaki kodu oku, sonra ekranda butona bas.

function BozukSayac() {

  const [sayac, setSayac] = useState(0);

  function arttir() {
    setSayac(sayac + 1);
    console.log("sayac =", sayac);
  }

  return (
    <div className="kutu">
      <strong>Bozuk sayaç:</strong> {sayac}{" "}
      <button onClick={arttir}>+1</button>
    </div>
  );
}

// Butona basınca ne oluyor?
//
//   - Konsolda (F12 → Console) sayı artıyor: 1, 2, 3...
//   - Ama ekranda hep 0 yazıyor.
//
// Neden?
//   sayac değişti ama React'in bundan haberi yok.
//   React "ekranı yeniden çizmem lazım" diye düşünmüyor.
//   Ekran ilk çizildiği gibi, 0 olarak kalıyor.
//
// Bize lazım olan şey:
//   "React, bu sayıyı sen sakla. Ben değiştirince ekranı yenile."
//
// İşte useState tam olarak bunu yapıyor.

// =====================================================================
//  ADIM 2: useState ile doğrusu (ÇALIŞIYOR)
// =====================================================================

function Sayac() {
  const [sayac, setSayac] = useState(0);

  return (
    <div className="kutu">
      <strong>Sayaç:</strong> {sayac}{" "}
      <button onClick={() => setSayac(sayac + 1)}>+1</button>
    </div>
  );
}

// Bu satırı parça parça okuyalım:
//
//   const [sayac, setSayac] = useState(0);
//
//   useState(0)   → "React, bana bir sayı sakla. Başlangıçta 0 olsun."
//   sayac         → saklanan sayının şu anki değeri. Ekranda bunu gösteriyoruz.
//   setSayac      → sayıyı değiştirmek için çağırdığımız fonksiyon.
//
// Kural basit:
//   Okumak için    → sayac
//   Değiştirmek için → setSayac(yeniDeger)
//
//   sayac = 5 diye ELLE DEĞİŞTİRMEK YOK. (Zaten const, TS izin vermez.)
//   Hep setSayac(5).
//
// (Köşeli parantezli yazım Gün 1'deki dizi destructuring. useState iki
//  elemanlı bir dizi döndürüyor, biz iki elemanına isim veriyoruz.)

// =====================================================================
//  ADIM 3: Butona basınca SIRAYLA ne oluyor?
// =====================================================================
//
//   1. Sayfa açılır. React Sayac fonksiyonunu çalıştırır.
//      sayac = 0 → ekrana "0" yazılır.
//
//   2. Butona basarsın. setSayac(0 + 1) çalışır.
//      React 1'i saklar.
//
//   3. React Sayac fonksiyonunu BAŞTAN tekrar çalıştırır.
//      Bu sefer useState saklanan değeri verir: sayac = 1
//      → ekrana "1" yazılır.
//
//   4. Tekrar basarsın → setSayac(1 + 1) → fonksiyon tekrar çalışır → "2"
//
// Önemli fikir: Ekranı güncellemek = component fonksiyonunu tekrar çalıştırmak.
// React buna "render" der. Yani "yeniden render" = "fonksiyon tekrar çalıştı".
//
// BozukSayac'ta neden olmuyordu?
//   setSayac çağırmadığımız için React fonksiyonu tekrar çalıştırmadı.
//   Çalıştırsaydı bile "let sayac = 0" satırı sayıyı yine 0 yapardı.
//   useState ise değeri fonksiyonun DIŞINDA, React'in yanında saklıyor.

// =====================================================================
//  ADIM 4: Birkaç buton daha
// =====================================================================
//
// setSayac'a istediğin değeri verebilirsin.

function GelismisSayac() {
  const [sayac, setSayac] = useState(0);

  return (
    <div className="kutu">
      <strong>Sayaç:</strong> {sayac}{" "}
      <button onClick={() => setSayac(sayac + 1)}>+1</button>{" "}

      {/* disabled: sayaç 0 ise buton basılamaz olsun */}
      <button onClick={() => setSayac(sayac - 1)} disabled={sayac === 0}>
        -1
      </button>{" "}
      <button onClick={() => setSayac(0)}>Sıfırla</button>
    </div>
  );
}


function GelismisSayacOnEkle() {
  const [sayac, setSayac] = useState(0);
  console.log("Sayac çalıştı, sayac =", sayac);

  return (
    <div className="kutu">
      <strong>Sayaç:</strong> {sayac}{" "}
      <button onClick={() => setSayac(sayac + 10)}>+10</button>{" "}

      {/* disabled: sayaç 0 ise buton basılamaz olsun */}
      <button onClick={() => setSayac(sayac - 10)} disabled={sayac === 0}>
        -10
      </button>{" "}
      <button onClick={() => setSayac(0)}>Sıfırla</button>
    </div>
  );
}

// =====================================================================
//  ADIM 5: Aynı component'i iki kez koyarsan
// =====================================================================
//
// Ekranda iki GelismisSayac var. Birine basınca diğeri değişmiyor.
// Her birinin kendi sayısı var.
// C#'ta bir sınıftan iki nesne oluşturmak gibi: her nesnenin kendi alanı olur.

// =====================================================================
//  ADIM 6: useState'in tek kuralı
// =====================================================================
//
// useState'i component'in EN ÜSTÜNE yaz. if'in, for'un içine YAZMA.
//
//   ✔ function Sayac() {
//       const [sayac, setSayac] = useState(0);
//       ...
//     }
//
//   ✘ function Sayac() {
//       if (birSey) {
//         const [sayac, setSayac] = useState(0);
//       }
//     }
//
// Şimdilik bunu ezberle, sebebini bilmen gerekmiyor.
// Yanlış yazarsan "npm run lint" seni uyarır.

export default function UseState() {
  return (
    <>
      <h2>01 - useState</h2>
      <BozukSayac />
      <Sayac />
      <GelismisSayac />
      <GelismisSayac />
      <GelismisSayacOnEkle />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) Sayac'a bir "+10" butonu ekle.
//  2) Sayac fonksiyonunun içine, return'den önce şunu yaz:
//       console.log("Sayac çalıştı, sayac =", sayac);
//     Butona her basınca konsola bak. ADIM 3'te anlatılan şeyi kendi
//     gözünle gör. (İki kez yazıyorsa sorun yok, Gün 4 README'deki StrictMode.)
//  3) BozukSayac'ı useState kullanarak düzelt.
// ---------------------------------------------------------------------
