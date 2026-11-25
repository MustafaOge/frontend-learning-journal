// 03 - LİSTE RENDER ETME: map + key
//
// =====================================================================
//  1) for DÖNGÜSÜ YOK, map VAR
// =====================================================================
//
// 01'de gördük: JSX içinde { } arasına deyim (for, if) giremez, sadece ifade girer.
// O zaman bir diziyi nasıl ekrana basacağız?
//
// Cevap: Gün 2'deki map. Veri dizisini JSX dizisine dönüştürürsün.
// React, { } içinde bir JSX DİZİSİ görürse elemanları sırayla çizer.
//
//   const isimler = ["Ayşe", "Mehmet"];
//   isimler.map(isim => <li>{isim}</li>)
//   // → [<li>Ayşe</li>, <li>Mehmet</li>]
//
// C#'ta: isimler.Select(isim => $"<li>{isim}</li>") gibi. Razor'da @foreach
// yazardın, React'te Select (map) yazıyorsun.

interface Siparis {
  id: number;
  musteri: string;
  tutar: number;
  durum: "beklemede" | "onaylandi" | "iptal"; // Gün 3: union tip
}

const siparisler: Siparis[] = [
  { id: 1001, musteri: "Ayşe", tutar: 1250, durum: "onaylandi" },
  { id: 1002, musteri: "Mehmet", tutar: 32000, durum: "beklemede" },
  { id: 1003, musteri: "Zeynep", tutar: 480, durum: "iptal" },
  { id: 1004, musteri: "Can", tutar: 7600, durum: "onaylandi" },
];

// =====================================================================
//  2) key NEDİR, NEDEN ZORUNLU?
// =====================================================================
//
// map ile ürettiğin her elemana key vermelisin:
//   siparisler.map(s => <li key={s.id}>...</li>)
//
// Neden? Liste değiştiğinde (eleman eklendi, silindi, sıralandı) React
// "hangi eleman hangisiydi" diye eşleştirme yapar ve sadece değişeni günceller.
// key, o elemanın KİMLİĞİDİR. Veritabanındaki primary key gibi düşün.
//
// Kurallar:
//   - Kardeşler arasında BENZERSİZ olmalı (tüm uygulamada değil, aynı listede).
//   - DEĞİŞMEMELİ. Aynı veri her çizimde aynı key'i almalı.
//   - En iyi kaynak: veriden gelen id. Backend'den gelen veride zaten var.
//
// YAPMA:
//   key={Math.random()}   → her çizimde değişir, React her şeyi baştan yaratır.
//   key={index}           → map'in 2. parametresi. Liste hiç değişmiyorsa sorun
//                           çıkmaz, ama sıralama/silme olursa yanlış elemanı
//                           günceller. Sadece başka çare yoksa.
//
// key'i unutursan sayfa yine çalışır ama tarayıcı konsolunda
// "Each child in a list should have a unique key prop" uyarısı çıkar.
//
// ÖNEMLİ: key, map'in DÖNDÜRDÜĞÜ en dış elemana verilir. Aşağıda map bir
// <SiparisSatiri> döndürüyor, key de ona veriliyor, içindeki <li>'ye değil.
// key bir prop gibi yazılır ama component'e ULAŞMAZ (props.key undefined'dır).
// Component'in içinde id lazımsa ayrıca prop olarak geçmelisin.

function SiparisSatiri({ siparis }: { siparis: Siparis }) {
  // Props tipi inline yazılabilir: { siparis: Siparis }. Küçük component'lerde
  // pratik, büyüdükçe ayrı interface daha okunur.
  return (
    <li>
      #{siparis.id} {siparis.musteri}: {siparis.tutar.toLocaleString("tr-TR")} ₺ ({siparis.durum})
    </li>
  );
}

// =====================================================================
//  3) filter + map: önce süz, sonra çiz
// =====================================================================
//
// Gün 2'deki zincirleme burada da geçerli. Veriyi JSX'e dönüştürmeden ÖNCE
// istediğin gibi işle. Bunu return'den önce, normal JS olarak yapmak daha okunur.

export default function ListeRender() {
  const onaylananlar = siparisler.filter((s) => s.durum === "onaylandi");
  const onaylananToplam = onaylananlar.reduce((toplam, s) => toplam + s.tutar, 0);

  return (
    <>
      <h2>03 - Liste Render (map + key)</h2>

      <h3>Tüm siparişler</h3>
      <ul>
        {siparisler.map((s) => (
          // key, map'in döndürdüğü elemana: <SiparisSatiri>
          <SiparisSatiri key={s.id} siparis={s} />
        ))}
      </ul>

      <h3>Sadece onaylananlar ({onaylananlar.length} adet, toplam {onaylananToplam} ₺)</h3>
      <ul>
        {onaylananlar.map((s) => (
          <SiparisSatiri key={s.id} siparis={s} />
        ))}
      </ul>
    </>
  );
}

// ---------------------------------------------------------------------
//  DİKKAT, ARROW FUNCTION TUZAĞI (Gün 1):
//    siparisler.map(s => ( <li>...</li> ))    ✓ parantez: değer döner
//    siparisler.map(s => { <li>...</li> })    ✗ süslü: hiçbir şey dönmez!
//    siparisler.map(s => { return <li>...</li>; })  ✓ süslü + return
//  İkincisi hata vermez, sadece ekran boş kalır. Çok yaygın bir hata.
//
//  KENDİN DENE:
//  1) İlk map'teki key={s.id}'yi sil. Tarayıcıda F12 > Console'a bak.
//  2) map içindeki ( )'leri { } yap. Ne oluyor?
//  3) "iptal" olmayanları tutara göre BÜYÜKTEN küçüğe sıralayıp listele.
//     İpucu: sort diziyi YERİNDE değiştirir (Gün 2). Önce kopyala: [...siparisler].sort(...)
// ---------------------------------------------------------------------
