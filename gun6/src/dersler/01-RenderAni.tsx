// 01 - HER RENDER BİR FOTOĞRAF
//
// Dün iki şey kafa karıştırdı:
//   - BozukSayac'ta console.log hep BİR ÖNCEKİ değeri yazdı.
//   - Render sırasında setX çağırınca sayfa bembeyaz oldu.
// İkisinin sebebi aynı fikir. Bu dosya o fikri anlatıyor.
// Yeni bir şey öğrenmiyoruz, dünkü şeylere başka bir açıdan bakıyoruz.

import { useState } from "react";

// =====================================================================
//  ADIM 1: Component bir FONKSİYON, render da o fonksiyonun bir ÇAĞRISI
// =====================================================================
//
// C#'ta şöyle bir metot düşün:
//
//   void Ciz(int sayac)
//   {
//       Console.WriteLine(sayac);
//   }
//
//   Ciz(0);   // birinci çağrı: bu çağrının içinde sayac hep 0
//   Ciz(1);   // ikinci çağrı:  bu çağrının içinde sayac hep 1
//
// Birinci çağrının ortasında sayac'ın birden 1 olması mümkün değil.
// O çağrıya 0 verildi, çağrı bitene kadar 0.
//
// React component'i de aynen böyle:
//
//   function Sayac() {
//     const [sayac, setSayac] = useState(0);   // bu render'ın sayac'ı
//     ...
//   }
//
// Her render ayrı bir çağrı. Her çağrının kendi sayac'ı var ve o çağrı
// boyunca DEĞİŞMİYOR. (Zaten const.)
//
// Buna "fotoğraf" diyelim: Her render, state'in o anki fotoğrafını çeker.
// Butonlar, fonksiyonlar, hepsi o fotoğraftaki değeri görür.

// =====================================================================
//  ADIM 2: Peki setSayac ne yapıyor?
// =====================================================================
//
// setSayac(5) "sayac'ı şimdi 5 yap" DEMEK DEĞİL.
// setSayac(5) şu demek:
//
//   "React, BİR SONRAKİ render'da sayac 5 olsun."
//
// Yani React'e bir not bırakıyorsun. Şu anki fotoğraf değişmiyor.
// React notu alır, fonksiyonu tekrar çağırır, YENİ fotoğrafta sayac = 5 olur.
//
// Dünkü console.log sırrı da bu:
//
//   function arttir() {
//     setSayac(sayac + 1);            // not bırakıldı: "sonraki render'da 1"
//     console.log("sayac =", sayac);  // ama bu fotoğrafta sayac hâlâ 0
//   }

function LogOrnegi() {
  const [sayac, setSayac] = useState(0);

  function arttir() {
    setSayac(sayac + 1);
    console.log("Tıklandı. Bu fotoğraftaki sayac =", sayac);
  }

  console.log("Render oldu. Yeni fotoğrafta sayac =", sayac);

  return (
    <div className="kutu">
      <strong>Log örneği:</strong> {sayac} <button onClick={arttir}>+1</button>
      <div className="soluk">F12 → Console. Önce "Tıklandı" (eski değer), sonra "Render oldu" (yeni değer).</div>
    </div>
  );
}

// =====================================================================
//  ADIM 3: Aynı fotoğrafla üç kez not bırakmak
// =====================================================================
//
// Bu butona basınca ekranda kaç artacak? Tahmin et, sonra bas.

function UcKezYanlis() {
  const [sayac, setSayac] = useState(0);

  function ucKezArttir() {
    setSayac((sayac) => sayac + 1); // sayac 0 → not: "1 olsun"
    setSayac((sayac) => sayac + 1); // sayac HÂLÂ 0 → not: "1 olsun"
    setSayac((sayac) => sayac + 1); // sayac HÂLÂ 0 → not: "1 olsun"
  }

  return (
    <div className="kutu">
      <strong>+3 (yanlış):</strong> {sayac} <button onClick={ucKezArttir}>+3</button>
    </div>
  );
}

// Sadece 1 arttı. Çünkü üç satır da AYNI fotoğrafa bakıyor, üçünde de sayac 0.
// React'e üç kez "1 olsun" dedik.

// =====================================================================
//  ADIM 4: Çözüm, updater fonksiyon
// =====================================================================
//
// setSayac'a değer yerine bir FONKSİYON verebilirsin:
//
//   setSayac((onceki) => onceki + 1);
//
// Anlamı: "React, fotoğrafa bakma. Elindeki EN GÜNCEL değeri bana ver,
//          ben ona 1 ekleyeyim."
//
// React bu fonksiyonları sırayla çalıştırır:
//   1. onceki = 0 → 1
//   2. onceki = 1 → 2
//   3. onceki = 2 → 3

function UcKezDogru() {
  const [sayac, setSayac] = useState(0);

  function ucKezArttir() {
    setSayac((onceki) => onceki + 1);
    setSayac((onceki) => onceki + 1);
    setSayac((onceki) => onceki + 1);
  }

  return (
    <div className="kutu">
      <strong>+3 (doğru):</strong> {sayac} <button onClick={ucKezArttir}>+3</button>
    </div>
  );
}

// Dün Magaza'da sepete ekleme için TAM OLARAK bunu yazdın:
//
//   setSepet((oncekiSepet) => { ... });
//
// Ne zaman hangisi?
//   Yeni değer eskisine BAĞLI DEĞİLSE     → setArama("")      düz değer yeter
//   Yeni değer eskisinden HESAPLANIYORSA  → setX((onceki) => ...)  her zaman güvenli
//
// Tek tıklamada tek setX çağırıyorsan düz yazım da doğru çalışır.
// (Dünkü 04'teki örneklerin hepsi doğruydu.) Updater ise her durumda doğru.
// Emin değilsen updater yaz.

// =====================================================================
//  ADIM 5: Beyaz sayfa. Render sırasında setX
// =====================================================================
//
// Fotoğraf fikriyle dünkü hatayı okuyalım:
//
//   function Sepet() {
//     const [sepet, setSepet] = useState([...]);
//     const [toplam, setToplam] = useState(0);
//
//     setToplam(sepet.length);    // ✘ render'ın ORTASINDA not bırakıyor
//     ...
//   }
//
//   1. React Sepet'i çağırır (render).
//   2. Render'ın ortasında setToplam → "bir sonraki render'da ... olsun"
//   3. React: "not var, tekrar render etmeliyim" → Sepet'i yine çağırır.
//   4. Yine setToplam → yine not → yine render → ...
//
// Sonsuz döngü. React bir süre sonra pes eder:
//   "Too many re-renders. React limits the number of renders..."
// ve sayfa bembeyaz kalır.
//
// Aynı hatanın kılık değiştirmiş hali:
//
//   <button onClick={setSayac(0)}>     ✘ setSayac render sırasında çalışır
//   <button onClick={() => setSayac(0)}>   ✔ sadece tıklanınca çalışır
//
// KURAL: setX sadece OLAYLARIN içinde (onClick, onChange...) çağrılır.
//        Render gövdesinde sadece okursun ve HESAPLARSIN:
//
//   const toplam = sepet.length;   ✔ state değil, her render'da yeniden hesaplanır
//
// C# gözüyle: Bir property'nin getter'ının içinde aynı property'nin setter'ını
// çağırmak gibi. Getter → setter → yeniden çiz → getter → setter → ...

// =====================================================================
//  ÖZET
// =====================================================================
//
//   - Her render ayrı bir çağrı. İçindeki state değeri o çağrı boyunca sabit.
//   - setX değeri hemen değiştirmez, SONRAKİ render için not bırakır.
//   - Yeni değer eskisinden hesaplanıyorsa: setX((onceki) => ...)
//   - setX'i render sırasında değil, olaylarda çağır.

export default function RenderAni() {
  return (
    <>
      <h2>01 - Her render bir fotoğraf</h2>
      <LogOrnegi />
      <UcKezYanlis />
      <UcKezDogru />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) UcKezYanlis'e basmadan önce sonucu tahmin et. Tahminin tuttu mu? evet
//  2) UcKezYanlis'i updater fonksiyonla düzelt.
//  3) Şunu tahmin et, sonra dene:
//       setSayac(sayac + 5);
//       setSayac((onceki) => onceki + 1);
//     sayac 0 iken basılınca sonuç ne olur? (İpucu: React notları sırayla okur.)
// 1 olur
// ---------------------------------------------------------------------
