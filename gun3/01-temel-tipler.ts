// 01 - Temel tipler
// Çalıştır:       node 01-temel-tipler.ts
// Tip kontrolü:   npm run kontrol   (gun3 klasörünün içindeyken)
//
// =====================================================================
//  ÖNCE BÜYÜK RESİM: TypeScript nedir, ne işe yarar?
// =====================================================================
//
// JavaScript'te değişkenlerin tipi YOKTUR. Aynı değişkene önce sayı, sonra
// metin koyabilirsin; JS buna ses çıkarmaz. Hata ancak kod ÇALIŞIRKEN, o satıra
// gelindiğinde ortaya çıkar (bazen hiç çıkmaz, sadece yanlış sonuç üretir):
//
//     let fiyat = 750;
//     fiyat = "yediyüzelli";     // JS: sorun yok
//     fiyat.toFixed(2);          // ÇALIŞIRKEN patlar: toFixed is not a function
//
// TypeScript (TS), JavaScript'in üzerine TİP sistemi ekleyen bir dildir.
// Yukarıdaki hatayı sen daha dosyayı kaydetmeden, VS Code'da kırmızı çizgiyle
// gösterir. C#'ta alıştığın "derleyici beni uyarıyor" konforunu JS'e getirir.
//
// TS kodu doğrudan çalışmaz. Önce tipleri silinip düz JS'e çevrilir, sonra
// o JS çalışır. Yani süreç iki ayrı adımdır:
//
//   1) TİP KONTROLÜ  -> tsc (TypeScript derleyicisi) yapar. Hataları burada görürsün.
//                       Bu klasörde: npm run kontrol
//   2) ÇALIŞTIRMA    -> node yapar. Tipleri SİLER ve kalan JS'i çalıştırır.
//                       Tip hatası olsa bile çalıştırır! Kontrol etmez.
//
// C#'tan en büyük fark şu: C#'ta tipler program çalışırken de vardır
// (GetType(), is, reflection). TS'te tipler sadece YAZARKEN vardır; program
// çalışırken hiçbiri kalmaz. Bunu aklında tut, ileride çok işine yarayacak.
//
// VS Code TS'i kendi içinde zaten kontrol eder. Bir değişkenin üstüne fareyle
// gelirsen TS'in onun tipini ne sandığını görürsün. Bu dosyada bunu sık sık yap.

// =====================================================================
//  1) TİP NASIL YAZILIR?  değişken: tip
// =====================================================================
//
// C#'ta tip ismin SOLUNDA yazılır:   string ad = "Klavye";
// TS'te ismin SAĞINDA, iki noktadan sonra yazılır:

const ad: string = "Klavye";
const fiyat: number = 750;
const stoktaMi: boolean = true;

console.log("1)", ad, fiyat, stoktaMi);

// Bu ": string" kısmına "tip açıklaması" (type annotation) denir.
// Yanlış tipte değer verirsen tsc hata verir:
//
//   const yanlis: number = "750";
//   -> Type 'string' is not assignable to type 'number'.
//      ("string tipi, number tipine atanamaz")
//
// Bu hata mesajı kalıbını çok göreceksin: "X is not assignable to type Y"
// = "Y bekliyordum, sen bana X verdin."

// =====================================================================
//  2) İLKEL (primitive) TİPLER
// =====================================================================
//
// | TS tipi   | Ne tutar                | C# karşılığı                         |
// |-----------|-------------------------|--------------------------------------|
// | string    | metin                   | string                               |
// | number    | HER TÜRLÜ sayı          | int, long, double, decimal... hepsi  |
// | boolean   | true / false            | bool                                 |
// | null      | "bilerek boş"           | null                                 |
// | undefined | "hiç değer verilmemiş"  | karşılığı yok (aşağıda)              |
//
// number konusu önemli: JS'te tam sayı / ondalık ayrımı YOKTUR. 5 ile 5.0 aynı
// şeydir ve ikisinin tipi de number'dır.

const adet: number = 3;
const birimFiyat: number = 249.9;
console.log("2)", adet * birimFiyat); // 749.7 (int * decimal derdi yok, ikisi de number)

// Tip isimleri KÜÇÜK harfle yazılır: string, number, boolean.
// String, Number, Boolean (büyük harfle) de var ama başka şeylerdir. Kullanma.

// =====================================================================
//  3) TİP ÇIKARIMI (type inference): tipi her yere yazmak zorunda değilsin
// =====================================================================
//
// Değişkene ilk değerini verdiğinde TS tipini o değerden anlar.
// C#'taki "var urun = ...;" ile aynı fikir. Tip yine var, sadece sen yazmıyorsun.

let sepetAdedi = 5; // fareyle üstüne gel: let sepetAdedi: number
sepetAdedi = 6; // sorun yok, yine number
// sepetAdedi = "altı";
// -> Type 'string' is not assignable to type 'number'.
//    TS ilk değerden "bu bir number" diye karar verdi ve kararını değiştirmez.

console.log("3)", sepetAdedi);

// Peki tipi ne zaman yazmalısın?
//   - Değişkenlere: çoğu zaman GEREK YOK. TS zaten anlıyor, yazmak gürültü olur.
//   - Fonksiyon parametrelerine: ŞART. TS parametreye ne geleceğini tahmin edemez.
//   - Dışarıdan gelen verilere (API cevabı, JSON.parse): ŞART. TS içeriği bilemez.
//
// Bu dosyada öğrenmek için çoğu yere tip yazdım, gerçek kodda bu kadar yazılmaz.

// =====================================================================
//  4) let ve const ile tip farkı: "literal" tipler
// =====================================================================
//
// İlginç bir ayrıntı (ama ileride union tiplerde çok önemli olacak):

let durum1 = "Pending"; // tipi: string
const durum2 = "Pending"; // tipi: "Pending"  <- fareyle üstüne gel ve bak!

// Neden? let ile tanımlanan değişken sonradan başka bir metin alabilir, o yüzden
// TS onu genel "string" sayar. const ise ASLA değişmez; TS "bu değişken her zaman
// tam olarak 'Pending' metnidir" diye düşünür ve tipini o metnin kendisi yapar.
//
// Sadece tek bir değeri kabul eden bu tiplere "literal tip" denir.
// Tek başına pek işe yaramaz, ama birkaçını birleştirince C#'taki enum'un
// yerini tutar. Bunu 02 numaralı dosyada göreceksin:
//     type SiparisDurumu = "Pending" | "Confirmed" | "Cancelled";

durum1 = "Cancelled"; // let, string: istediğin metni alabilir
console.log("4)", durum1, durum2);

// =====================================================================
//  5) null ve undefined: JS'te "boş"un iki hali var
// =====================================================================
//
// C#'ta boşluğu anlatan tek şey null'dır. JS'te iki tane var:
//
//   undefined -> "Buna hiç değer verilmedi." JS'in kendisi otomatik koyar:
//                tanımlanıp değer verilmemiş değişken, nesnede olmayan bir alan,
//                hiçbir şey döndürmeyen fonksiyonun sonucu, find'ın bulamadığı...
//   null      -> "Bilerek boş bıraktım." Bunu genelde programcı kendisi yazar.
//                Backend'den gelen JSON'daki null'lar da bu.

let tanimsiz;
const urunNesnesi = { ad: "Mouse" } as { ad: string; renk?: string };
console.log("5)", tanimsiz, urunNesnesi.renk); // undefined undefined

// strict modda (bu klasörün tsconfig'inde açık) "string" tipi null veya
// undefined OLAMAZ. Bir değer boş da olabiliyorsa bunu tipte açıkça söylersin:

let aciklama: string | null = null;
// Okunuşu: "aciklama ya bir string'dir YA DA null'dır."
// Ortadaki | işareti "veya" demektir; buna union (birleşim) tip denir.
// C#'taki "string? aciklama = null;" ile aynı fikir.

aciklama = "Mekanik klavye"; // sonradan string verebilirsin

// Asıl güzellik şimdi: null olabilecek bir değeri kontrol etmeden kullanmana
// TS İZİN VERMEZ. C#'ta bu sadece uyarıdır ve görmezden gelebilirsin; TS'te
// hatadır ve tsc geçmez.

function uzunluk(metin: string | null): number {
  // return metin.length;
  // -> 'metin' is possibly 'null'.   ("metin null olabilir")
  //    Çünkü bu fonksiyonu uzunluk(null) diye çağırabilirsin ve null.length patlar.

  // Çözüm 1: if ile kontrol et.
  if (metin === null) {
    return 0;
  }
  // Bu satıra gelindiyse metin null DEĞİLDİR. TS bunu anlar ve metin'in tipini
  // otomatik olarak "string"e daraltır (fareyle üstüne gel ve gör).
  // Buna "daraltma" (narrowing) denir. TS'in en önemli özelliklerinden biri.
  return metin.length;
}

// Çözüm 2: Gün 2'deki ?. ve ?? operatörleri, tek satırda aynı işi yapar.
//   metin?.length  -> metin null/undefined ise patlamadan undefined döner
//   ?? 0           -> soldaki null/undefined ise 0 kullan
function uzunluk2(metin: string | null): number {
  return metin?.length ?? 0;
}

console.log("5)", uzunluk(aciklama), uzunluk(null), uzunluk2(null));

// =====================================================================
//  6) any ve unknown: "tipini bilmiyorum" demenin iki yolu
// =====================================================================
//
// Bazen bir değerin tipini gerçekten bilemezsin. En sık örnek: JSON.parse ile
// bir metni nesneye çevirdiğinde ya da bir API'den cevap geldiğinde.
// TS bu durum için iki tip sunar ve aralarındaki fark çok önemli.
//
// --- any: "tip kontrolünü tamamen kapat" ---
// any olan bir değerle her şeyi yapabilirsin, TS hiçbir şeye itiraz etmez.
// C#'taki dynamic gibi. Kolay görünür ama TS kullanmanın bütün anlamını yok eder:

const herhangi: any = "metin";
// herhangi.olmayanMetot();
// -> tsc HİÇBİR hata vermez. Ama çalıştırınca patlar:
//    TypeError: herhangi.olmayanMetot is not a function
//    Satırın başındaki // işaretini kaldırıp node ile çalıştırarak dene.
console.log("6)", herhangi);

// Kural: any yazmaktan KAÇIN. Yazmak zorunda kalıyorsan genelde bir tip
// tanımlaman gerekiyordur.

// --- unknown: "tipini bilmiyorum, kullanmadan önce kontrol edeceğim" ---
// unknown da her değeri kabul eder, ama sen tipini kontrol edene kadar onunla
// HİÇBİR ŞEY yapmana izin vermez. any'nin güvenli hali budur.

const bilinmeyen: unknown = JSON.parse('{"ad":"Mouse"}');
// bilinmeyen.ad;
// -> 'bilinmeyen' is of type 'unknown'.
//    TS: "Bunun bir nesne olduğundan bile emin değilim, .ad diyemezsin."

// Önce kontrol edersin, TS her kontrolden sonra tipi biraz daha daraltır:
if (
  typeof bilinmeyen === "object" && // bir nesne mi? (typeof null da "object" der, JS'in tuhaflığı)
  bilinmeyen !== null && //            o yüzden null olmadığını ayrıca kontrol ediyoruz
  "ad" in bilinmeyen //                içinde "ad" diye bir alan var mı?
) {
  console.log("6) ürün adı:", bilinmeyen.ad); // artık izin var
}

// Bu kadar kontrol yazmak zahmetli görünüyor, haklısın. Gerçek projede API
// cevaplarına genelde bir interface yazar ve "as" ile "bu veri bu şekilde"
// dersin. 03 numaralı dosyanın sonunda bunu göreceksin.

// =====================================================================
//  7) typeof ile daraltma: bir değerin tipine göre farklı iş yapmak
// =====================================================================
//
// 5. bölümde "if ile kontrol edince TS tipi daraltır" demiştik. typeof en
// sık kullanılan kontrol yoludur. Değerin JS'teki tipini metin olarak verir:
//   typeof "a" -> "string"     typeof 5 -> "number"     typeof true -> "boolean"

function yazdir(deger: string | number) {
  // Burada deger "string veya number". İkisinde de olmayan bir şeyi kullanamazsın:
  // deger.toUpperCase();
  // -> Property 'toUpperCase' does not exist on type 'string | number'.
  //    Çünkü number'ın toUpperCase metodu yok.

  if (typeof deger === "string") {
    console.log("7) metin:", deger.toUpperCase()); // burada deger: string
  } else {
    console.log("7) sayı:", deger.toFixed(2)); // burada deger: number (geriye sadece o kaldı)
  }
}
yazdir("klavye");
yazdir(750);

// =====================================================================
//  ÖZET
// =====================================================================
// - TS = JS + tipler. Tipler sadece yazarken var, çalışırken silinir.
// - Hataları node değil, tsc (npm run kontrol) ve VS Code gösterir.
// - Tip yazımı: degisken: tip
// - Tip çıkarımı sayesinde değişkenlere tip yazmak çoğu zaman gereksiz.
// - number tüm sayıları kapsar. null ve undefined iki ayrı "boş"tur.
// - "string | null" = ikisinden biri. Kullanmadan önce null kontrolü zorunlu.
// - if / typeof ile kontrol edince TS tipi daraltır (narrowing).
// - any'den kaçın, bilmediğin veriler için unknown kullan.
