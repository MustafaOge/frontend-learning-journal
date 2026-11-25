// 04 - KOŞULLU RENDER
//
// "Şu durumda bunu göster, değilse şunu" demenin 4 yolu var.
// Hepsi aslında aynı fikir: JSX bir değerdir, hangi değeri döndüreceğine JS karar verir.

interface Kullanici {
  ad: string;
  admin: boolean;
  bildirimSayisi: number;
  engelli?: boolean;
}

// =====================================================================
//  YOL 1: if ile erken return (component'in tamamını değiştirmek için)
// =====================================================================
//
// JSX'in DIŞINDA, fonksiyonun gövdesinde normal if kullanabilirsin.
// C#'taki guard clause'un aynısı.

function KullaniciKarti({ kullanici }: { kullanici: Kullanici }) {
  if (kullanici.engelli) {
    return <div className="kutu soluk">{kullanici.ad} (hesap engelli)</div>;
  }

  return (
    <div className="kutu">
      {/* YOL 2: ternary  a ? b : c  — iki seçenekten biri */}
      {kullanici.admin ? <strong>{kullanici.ad} (Admin)</strong> : <span>{kullanici.ad}</span>}

      {/* YOL 3: &&  — "koşul doğruysa göster, değilse hiçbir şey" */}
      {kullanici.bildirimSayisi > 0 && (
        <span className="rozet">{kullanici.bildirimSayisi} yeni bildirim</span>
      )}
    </div>
  );
}

// =====================================================================
//  && NASIL ÇALIŞIYOR, TUZAĞI NE?
// =====================================================================
//
// JS'te  a && b : a "falsy" ise a'yı, değilse b'yi döndürür.
// React ekrana false, null, undefined ve true için HİÇBİR ŞEY çizmez.
//   false && <span/>   → false      → ekranda bir şey yok ✓
//   true  && <span/>   → <span/>    → span çizilir ✓
//
// TUZAK: 0 da falsy, ama React 0'ı EKRANA YAZAR (sayılar çizilir).
//   {kullanici.bildirimSayisi && <span>...</span>}
//   bildirimSayisi 0 ise ekranda yalnız başına bir "0" görürsün!
//
// Çözüm: && solunu her zaman gerçek bir boolean yap:
//   {kullanici.bildirimSayisi > 0 && ...}   ✓
//   {sepet.length > 0 && ...}              ✓   (sepet.length && ... ✗)
//
// Bu, Gün 1'deki "truthy/falsy" C# tuzaklarının React'teki en yaygın hali.
// Bugünkü alıştırmada stok: 0 olan ürünler var. Aklında olsun.

// =====================================================================
//  YOL 4: Değişkene atamak (koşul karmaşıksa)
// =====================================================================
//
// İç içe ternary okunmaz hale gelir. O zaman JSX'i önce bir değişkene
// hazırla, sonra { } içinde kullan.

function DurumMesaji({ siparisSayisi }: { siparisSayisi: number }) {
  let mesaj;
  if (siparisSayisi === 0) {
    mesaj = <p>Henüz siparişin yok.</p>;
  } else if (siparisSayisi < 5) {
    mesaj = <p>{siparisSayisi} siparişin var.</p>;
  } else {
    mesaj = <p className="vurgu">Sadık müşterimizsin, {siparisSayisi} sipariş!</p>;
  }

  return <div className="kutu">{mesaj}</div>;
}

// Bir şey göstermemek için component null döndürebilir:
//   if (!gorunur) return null;

const kullanicilar: Kullanici[] = [
  { ad: "Ayşe", admin: true, bildirimSayisi: 3 },
  { ad: "Mehmet", admin: false, bildirimSayisi: 0 },
  { ad: "Zeynep", admin: false, bildirimSayisi: 1, engelli: true },
];

export default function KosulluRender() {
  return (
    <>
      <h2>04 - Koşullu Render</h2>

      {kullanicilar.map((k) => (
        // Burada id yok, ad'ı key yaptık. Gerçek veride id kullan.
        <KullaniciKarti key={k.ad} kullanici={k} />
      ))}

      <DurumMesaji siparisSayisi={0} />
      <DurumMesaji siparisSayisi={2} />
      <DurumMesaji siparisSayisi={12} />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) KullaniciKarti'nda "> 0"ı sil: {kullanici.bildirimSayisi && ...}
//     Mehmet'in kartında ne görüyorsun?
//  2) DurumMesaji'nı iç içe ternary ile yeniden yaz. Hangisi daha okunur?
// ---------------------------------------------------------------------
