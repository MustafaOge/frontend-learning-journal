// 04 - STATE'İ DOĞRUDAN DEĞİŞTİRME
//
// State'te bir dizi ya da nesne varsa onu ELLE DEĞİŞTİRMİYORUZ.
// C#'tan gelenlerin en çok yaptığı hata bu. Önce hatayı görelim.

import { useState } from "react";

// =====================================================================
//  ADIM 1: C# alışkanlığıyla yazalım (ÇALIŞMIYOR)
// =====================================================================
//
// Listeye isim eklemek istiyoruz. C#'ta liste.Add("Yeni") yapardık.
// JS'teki karşılığı push. Deneyelim:

function BozukListe() {
  const [isimler, setIsimler] = useState(["Ayşe", "Mehmet"]);
  const [isimCounter, setIsimCounter] = useState(1);
  function ekle() {
    setIsimCounter(isimCounter + 1);
    setIsimler([...isimler, `yeni isim-${isimCounter}`])
  }

  return (
    <div className="kutu">
      <strong>Bozuk:</strong> {isimler.join(", ")} <button onClick={ekle}>Ekle</button>
    </div>
  );
}

// Butona bas: ekran değişmiyor. setIsimler çağırdık, neden olmadı?

// =====================================================================
//  ADIM 2: Neden olmadı?
// =====================================================================
//
// setIsimler çağrılınca React kısa bir kontrol yapar:
//
//   "Bana verilen dizi, elimdeki diziyle AYNI dizi mi?"
//     Aynıysa  → "Değişen bir şey yok" der, ekranı yenilemez.
//     Farklıysa → ekranı yeniler.
//
// React dizinin içine tek tek bakmaz. Sadece "aynı dizi mi?" diye sorar.
// C#'taki ReferenceEquals(eski, yeni) gibi.
//
// push ne yaptı? Var olan dizinin İÇİNE ekledi. Dizi hâlâ aynı dizi.
// setIsimler(isimler) ile React'e aynı diziyi geri verdik.
// React "aynı dizi" dedi ve hiçbir şey yapmadı.
//
// Çözüm: React'e YENİ bir dizi vermek.

// =====================================================================
//  ADIM 3: Doğrusu, yeni dizi oluşturmak (ÇALIŞIYOR)
// =====================================================================
//
//   setIsimler([...isimler, "Yeni"]);
//
// [...isimler, "Yeni"] şu demek:
//   "Yeni bir dizi oluştur. İçine isimler'in tüm elemanlarını koy, sonuna "Yeni" ekle."
//   (Gün 2'deki spread: ... "elemanları buraya aç" demek)
//
// Eski dizi hiç değişmedi. React yeni bir dizi aldı, "farklı" dedi, ekranı yeniledi.

function DogruListe() {
  const [isimler, setIsimler] = useState(["Ayşe", "Mehmet"]);

  function ekle() {
    setIsimler([...isimler, "Yeni"]);
  }

  function sil() {
    // filter zaten yeni bir dizi döner, eskisini değiştirmez
    setIsimler(isimler.filter((isim) => isim !== "Yeni"));
  }

  return (
    <div className="kutu">
      <strong>Doğru:</strong> {isimler.join(", ")} <button onClick={ekle}>Ekle</button>{" "}
      <button onClick={sil}>"Yeni"leri sil</button>
    </div>
  );
}

// =====================================================================
//  ADIM 4: Hangi işlem için ne yazılır?
// =====================================================================
//
//   Yapmak istediğin   ✘ Yazma (diziyi değiştirir)   ✔ Yaz (yeni dizi oluşturur)
//   ----------------   ---------------------------   ------------------------------------
//   Eleman ekle        dizi.push(x)                  [...dizi, x]
//   Eleman sil         dizi.splice(i, 1)             dizi.filter(e => e.id !== id)
//   Eleman değiştir    dizi[i] = x                   dizi.map(e => e.id === id ? x : e)
//
// C# gözüyle: LINQ gibi düşün. Where ve Select orijinal listeyi değiştirmez,
// yeni bir sonuç üretir. filter = Where, map = Select.

// =====================================================================
//  ADIM 5: Nesneler için de aynı kural
// =====================================================================
//
//   ✘ kullanici.puan = 15;  setKullanici(kullanici);       // aynı nesne
//   ✔ setKullanici({ ...kullanici, puan: 15 });            // yeni nesne
//
// { ...kullanici, puan: 15 } şu demek:
//   "Yeni bir nesne oluştur. kullanici'nin tüm alanlarını kopyala, puan'ı 15 yap."
//
// C#'ta record kullandıysan bu "with" ile aynı şey:
//   var yeni = kullanici with { Puan = 15 };

function NesneOrnegi() {
  const [kullanici, setKullanici] = useState({ ad: "Ayşe", puan: 10 });

  function puanEkle() {
    setKullanici({ ...kullanici, puan: kullanici.puan + 5 });
  }

  return (
    <div className="kutu">
      {kullanici.ad}: {kullanici.puan} puan <button onClick={puanEkle}>+5 puan</button>
    </div>
  );
}

// =====================================================================
//  ADIM 6: Dizi içinde nesne (alıştırmadaki sepet tam olarak bu)
// =====================================================================
//
// Görev listesinde bir görevi "bitti" yapmak istiyoruz.
//
//   ✘ const gorev = gorevler.find(g => g.id === id);
//     gorev.bitti = true;      // state'teki nesneyi elle değiştirdin
//
//   ✔ setGorevler(gorevler.map(g => g.id === id ? { ...g, bitti: !g.bitti } : g));
//
// map satırını kelime kelime okuyalım:
//   gorevler.map(g => ...)   her görev için yeni dizide ne olacağına karar ver:
//     g.id === id ise        → { ...g, bitti: !g.bitti }  (kopyası, bitti tersine çevrilmiş)
//     değilse                → g                          (olduğu gibi kalsın)
//
// Sonuç: yeni bir dizi, içinde sadece tıklanan görev yenilenmiş.

interface Gorev {
  id: number;
  baslik: string;
  bitti: boolean;
}

function GorevListesi() {
  const [gorevler, setGorevler] = useState<Gorev[]>([
    { id: 1, baslik: "useState oku", bitti: true },
    { id: 2, baslik: "Bu dosyayı oku", bitti: false },
    { id: 3, baslik: "Alıştırmayı yap", bitti: false },
  ]);
  // useState<Gorev[]>: "Bu state bir Gorev dizisi" diye tipini söylüyoruz.
  // C#'taki List<Gorev> gibi.

  function degistir(id: number) {
    setGorevler(gorevler.map((g) => (g.id === id ? { ...g, bitti: !g.bitti } : g)));
  }

  function sil(id: number) {
    setGorevler(gorevler.filter((g) => g.id !== id));
  }

  function hepsiniBitir() {
    setGorevler(gorevler.map((g) => (g.bitti == false) ? { ...g, bitti: !g.bitti } : g));
  }

  // 03, ADIM 5: hesaplanabilen değer, state değil
  const kalan = gorevler.filter((g) => !g.bitti).length;

  return (
    <div className="kutu">
      <div className="soluk">{kalan} görev kaldı</div>
      {gorevler.map((g) => (
        <div key={g.id} className="satir">
          <label>
            <input type="checkbox" checked={g.bitti} onChange={() => degistir(g.id)} />{" "}
            {g.bitti ? <s>{g.baslik}</s> : g.baslik}
          </label>
          <button onClick={() => sil(g.id)}>Sil</button>
        </div>
      ))}
      <button onClick={() => hepsiniBitir()}>Hepsini bitir</button>
    </div>
  );
}

export default function Immutability() {
  return (
    <>
      <h2>04 - State'i doğrudan değiştirme</h2>
      <BozukListe />
      <DogruListe />
      <NesneOrnegi />
      <GorevListesi />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) BozukListe'yi ADIM 3'teki gibi düzelt.
//  2) NesneOrnegi'nde puanEkle'yi şöyle yaz ve dene:
//       kullanici.puan = kullanici.puan + 5;
//       setKullanici(kullanici);
//     Ekran değişiyor mu? Neden? (ADIM 2)
//  3) GorevListesi'ne "Hepsini bitir" butonu ekle.
//     İpucu: map ile her görevi { ...g, bitti: true } yap.
// ---------------------------------------------------------------------
