// 01 - JSX KURALLARI
// Ekranda görmek için: npm run dev  (App.tsx bu component'i zaten çiziyor)
//
// =====================================================================
//  JSX NEDİR?
// =====================================================================
//
// JSX, JavaScript'in içine HTML'e BENZEYEN bir sözdizimi yazmanı sağlar.
// Tarayıcı JSX'i anlamaz. Vite (derleme sırasında) her JSX etiketini bir
// fonksiyon çağrısına çevirir:
//
//   <h1 className="baslik">Merhaba</h1>
//        ↓ derlenince kabaca
//   jsx("h1", { className: "baslik", children: "Merhaba" })
//
// Yani JSX bir METİN (string) değil, bir NESNE üretir. Bu yüzden onu bir
// değişkene atayabilir, bir fonksiyondan döndürebilir, bir diziye koyabilirsin.
//
// Razor'daki @Model.Ad gibi düşün, ama tersi: Razor HTML'in içine C# koyar,
// JSX ise JS'in içine HTML koyar. Mantık hep JS tarafında kalır.
//
// Dosya uzantısı: JSX içeren TypeScript dosyaları .tsx olmak ZORUNDA.

const kullaniciAdi = "Mustafa";
const sepettekiUrunSayisi = 3;
// Tarihi component'in DIŞINDA hesaplıyoruz. Component içinde new Date() yazınca
// linter (npm run lint) uyarı veriyor: component her çizildiğinde (render)
// aynı girdiye aynı çıktıyı vermeli, yani "saf" (pure) olmalı. new Date() her
// çağrıda farklı sonuç döndürür. Detayı state/effect günlerinde.
const bugun = new Date().toLocaleDateString("tr-TR");

// =====================================================================
//  KURAL 1: Tek bir kök eleman döndür
// =====================================================================
//
// Bir fonksiyon iki değer döndüremez, JSX de iki kardeş etiket döndüremez.
// Hepsini bir kapsayıcıya sar. Ekrana fazladan <div> koymak istemiyorsan
// <>...</> (Fragment) kullan: DOM'a hiçbir şey eklemez.
//
//   YANLIŞ:  return <h1>A</h1><p>B</p>;
//   DOĞRU:   return <><h1>A</h1><p>B</p></>;

// =====================================================================
//  KURAL 2: Her etiket kapanmalı
// =====================================================================
//
// HTML'de <br> veya <img> açık bırakılabilir. JSX'te bırakılamaz:
//   <br />   <img src="..." />   <input />

// =====================================================================
//  KURAL 3: Özellik isimleri camelCase, bazıları farklı
// =====================================================================
//
// JSX sonunda JS nesnesine dönüştüğü için JS'te ayrılmış kelimeler kullanılamaz:
//   class     → className       (class JS'te bir anahtar kelime)
//   for       → htmlFor         (<label htmlFor="eposta">)
//   onclick   → onClick         (olaylar camelCase)
//   tabindex  → tabIndex
// İstisna: aria-* ve data-* özellikleri tireli kalır (aria-label, data-id).

// =====================================================================
//  KURAL 4: { } ile JS'e geç
// =====================================================================
//
// Süslü parantez içinde herhangi bir JS İFADESİ (expression) yazabilirsin:
// değişken, fonksiyon çağrısı, hesaplama, ternary (a ? b : c).
// Ama DEYİM (statement) yazamazsın: if, for, switch { } içine girmez.
// (Gün 1'deki template literal'daki ${ } ile aynı fikir.)
//
// { } iki yerde kullanılır:
//   - Metin arasında:        <p>Merhaba {kullaniciAdi}</p>
//   - Özellik değeri olarak: <img src={resimAdresi} />   (tırnak YOK)

// =====================================================================
//  KURAL 5: style bir nesne alır, metin değil
// =====================================================================
//
//   HTML:  style="color: red; font-size: 20px"
//   JSX:   style={{ color: "red", fontSize: 20 }}
//
// Dıştaki { } "JS'e geçiyorum", içteki { } bir JS nesnesi. Bu kadar.
// Sayı verirsen px kabul edilir. Pratikte style yerine className tercih edilir.

// =====================================================================
//  KURAL 6: Yorum satırı da { } içinde
// =====================================================================
//
//   {/* JSX içinde yorum böyle yazılır */}

// =====================================================================
//  HEPSİ BİR ARADA
// =====================================================================

// Component = BÜYÜK HARFLE başlayan ve JSX döndüren bir fonksiyon.
// (Detayı 02'de.) export default: bu dosyanın "ana" export'u, App.tsx bunu import ediyor.
export default function JsxKurallari() {
  return (
    // KURAL 1: tek kök, burada Fragment
    <>
      <h2>01 - JSX Kuralları</h2>

      {/* KURAL 4: metin içinde değişken ve hesaplama */}
      <p>
        Merhaba {kullaniciAdi}, bugün {bugun}. Sepetinde {sepettekiUrunSayisi} ürün var,
        iki katı {sepettekiUrunSayisi * 2} eder.
      </p>

      {/* KURAL 4: ternary bir ifadedir, { } içine girer. if giremez. */}
      <p>{sepettekiUrunSayisi > 0 ? "Sepetin dolu." : "Sepetin boş."}</p>

      {/* KURAL 3: className ve htmlFor */}
      <label htmlFor="arama" className="etiket">
        Ürün ara:
      </label>
      {/* KURAL 2: input kendini kapatıyor */}
      <input id="arama" placeholder="Klavye, mouse..." />
      <br />

      {/* KURAL 5: style nesnesi, fontSize camelCase */}
      <p style={{ color: "gray", fontSize: 13 }}>Bu satır inline style ile gri.</p>
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE (npm run dev açıkken):
//  1) return'deki <>'yi sil, iki kardeş etiket bırak. Editör ve terminal ne diyor?
//  2) className'i class yap. Çalışıyor mu, konsol ne uyarı veriyor?
//  3) {sepettekiUrunSayisi > 0 ? ...} yerine { if (...) } yazmayı dene.
//  4) <br /> yerine <br> yaz.
//  Her denemeden sonra geri al.
// ---------------------------------------------------------------------
