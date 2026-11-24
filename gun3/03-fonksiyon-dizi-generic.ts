// 03 - Dizi tipleri, fonksiyon tipleri, generic'ler
// Çalıştır: node 03-fonksiyon-dizi-generic.ts   (sondaki fetch için internet gerekir)
//
// 01'de değerlerin, 02'de nesnelerin tiplerini gördük. Bu dosyada:
//   1-2) dizilerin tipleri
//   3-6) fonksiyonların tipleri (Gün 2'de bol bol yazdığın arrow function'lar dahil)
//   7-8) generic'ler: "tipi sonra belli olacak" kodlar
//   9)   fetch'ten gelen veriye tip vermek

interface Urun {
  id: number;
  ad: string;
  fiyat: number;
  stok: number;
}

// =====================================================================
//  1) DİZİ TİPLERİ
// =====================================================================
//
// "Urun'lardan oluşan bir dizi" iki şekilde yazılır. İkisi BİREBİR aynıdır:
//   Urun[]         <- daha yaygın, kısa
//   Array<Urun>    <- generic yazım (7. bölümde anlatılıyor)
// C#'taki Urun[] veya List<Urun> gibi düşün. JS'te dizinin boyutu sabit
// değildir, push ile büyür; yani C#'taki List'e daha çok benzer.

const urunler: Urun[] = [
  { id: 1, ad: "Klavye", fiyat: 750, stok: 12 },
  { id: 2, ad: "Mouse", fiyat: 350, stok: 0 },
  { id: 3, ad: "Monitör", fiyat: 6200, stok: 4 },
];

const isimler: string[] = ["Klavye", "Mouse"];
const fiyatlar: Array<number> = [750, 350];

// Diziye yanlış tipte eleman eklemeye çalışırsan:
//   isimler.push(42);
//   -> Argument of type 'number' is not assignable to parameter of type 'string'.

console.log("1)", urunler.length, isimler, fiyatlar);

// =====================================================================
//  2) DİZİ METOTLARI VE TİPLER: Gün 2'deki kodun TS hali
// =====================================================================
//
// İyi haber: map/filter/reduce'a verdiğin fonksiyonlara tip yazmana GEREK YOK.
// TS dizinin tipine bakıp (Urun[]) callback'teki parametrenin Urun olduğunu
// kendisi anlar. Yani Gün 2'deki kodun neredeyse hiç değişmeden çalışır.

const pahalilar = urunler.filter((u) => u.fiyat > 1000);
// u'nun üstüne fareyle gel: (parameter) u: Urun
// pahalilar'ın üstüne gel: const pahalilar: Urun[]

const urunIsimleri = urunler.map((u) => u.ad);
// map yeni bir dizi üretir. Callback string döndürdüğü için sonuç: string[]

const toplam = urunler.reduce((t, u) => t + u.fiyat, 0);
// başlangıç değeri 0 (number) olduğu için t: number, sonuç: number

console.log("2)", pahalilar.length, urunIsimleri, toplam);

// --- find tuzağı ---
// find aradığını BULAMAYABİLİR. Bulamazsa undefined döner. TS bunu bildiği için
// dönüş tipi "Urun" değil "Urun | undefined" olur:

const bulunan = urunler.find((u) => u.id === 42); // const bulunan: Urun | undefined

// console.log(bulunan.ad);
// -> 'bulunan' is possibly 'undefined'.

console.log("2)", bulunan?.ad ?? "bulunamadı");
// Gün 2'nin 4. görevinde bunu kendin akıl etmiştin. TS ise bunu ZORUNLU kılıyor;
// bir daha unutamazsın. Gün 2'nin 6. alıştırmasında ilk find'da bu kontrolü
// yapmamıştın. TS'e çevirdiğinde orada hata göreceksin.

// =====================================================================
//  3) FONKSİYON TİPLERİ: parametreler ve dönüş değeri
// =====================================================================
//
// C#:  public decimal ToplamFiyat(List<Urun> liste) { ... }
// TS:  function toplamFiyat(liste: Urun[]): number { ... }
//                           ^^^^^^^^^^^^^  ^^^^^^^^
//                           parametre tipi  dönüş tipi (parantezden SONRA)

function toplamFiyat(liste: Urun[]): number {
  return liste.reduce((t, u) => t + u.fiyat, 0);
}

// Arrow function ile aynı şey:
const toplamFiyat2 = (liste: Urun[]): number => liste.reduce((t, u) => t + u.fiyat, 0);

// PARAMETRE tipi ZORUNLU. Yazmazsan:
//   function yazdir(u) { ... }
//   -> Parameter 'u' implicitly has an 'any' type.
//   TS bu fonksiyona ne geleceğini tahmin edemez. Sessizce any yapmak yerine
//   (strict modda) "tipini söyle" diye hata verir.
//
// DÖNÜŞ tipini yazmak isteğe bağlı. Yazmazsan TS return'den kendisi çıkarır.
// Yazmanın faydası: yanlış şey döndürürsen hatayı fonksiyonun içinde görürsün,
// fonksiyonu kullandığın başka bir yerde değil.

console.log("3)", toplamFiyat(urunler), toplamFiyat2(urunler));

// Yanlış argümanla çağırırsan:
//   toplamFiyat("Klavye");
//   -> Argument of type 'string' is not assignable to parameter of type 'Urun[]'.

// --- void: hiçbir şey döndürmeyen fonksiyon ---
// C#'taki void ile aynı.
function urunYazdir(u: Urun): void {
  console.log(`3) ${u.ad} - ${u.fiyat} TL`);
}
urunYazdir(urunler[0]);

// =====================================================================
//  4) OPSİYONEL ve VARSAYILAN parametreler
// =====================================================================
//
// C#'taki gibi:
//   paraBirimi: string = "TL"  -> verilmezse "TL" kullanılır (varsayılan değer)
//   kurusluMu?: boolean        -> verilmeyebilir, verilmezse undefined olur

function fiyatYaz(u: Urun, paraBirimi: string = "TL", kurusluMu?: boolean): string {
  const tutar = kurusluMu ? u.fiyat.toFixed(2) : u.fiyat.toString();
  return `${u.ad}: ${tutar} ${paraBirimi}`;
}

console.log("4)", fiyatYaz(urunler[0])); //               Klavye: 750 TL
console.log("4)", fiyatYaz(urunler[0], "USD")); //        Klavye: 750 USD
console.log("4)", fiyatYaz(urunler[0], "TL", true)); //   Klavye: 750.00 TL

// Kural (C# ile aynı): opsiyonel parametreler zorunluların ARKASINDA olmalı.

// =====================================================================
//  5) FONKSİYONUN KENDİSİNİN TİPİ: fonksiyonu değişkene / parametreye koymak
// =====================================================================
//
// JS'te fonksiyonlar da değerdir. Bir değişkene atanabilir, başka bir
// fonksiyona parametre olarak verilebilir. Gün 2'de filter'a (u) => ... verirken
// bunu zaten yapıyordun.
//
// Böyle bir fonksiyonun tipi şöyle yazılır:
//   (parametreler) => dönüşTipi
//
// C#'taki delegate'lerle aynı fikir:
//   C#:  Func<Urun, bool>
//   TS:  (u: Urun) => boolean

type UrunFiltresi = (u: Urun) => boolean;
// Okunuşu: "UrunFiltresi; bir Urun alıp boolean döndüren fonksiyondur."

const ucuzMu: UrunFiltresi = (u) => u.fiyat < 1000;
// Burada u'nun tipini YAZMADIK. Değişkenin tipi UrunFiltresi olduğu için
// TS u'nun Urun olduğunu oradan biliyor.

const stoktaMi: UrunFiltresi = (u) => u.stok > 0;

// Fonksiyonu parametre olarak alan bir fonksiyon:
function filtrele(liste: Urun[], kosul: UrunFiltresi): Urun[] {
  return liste.filter(kosul);
}

console.log("5)", filtrele(urunler, ucuzMu).map((u) => u.ad)); //   [ 'Klavye', 'Mouse' ]
console.log("5)", filtrele(urunler, stoktaMi).map((u) => u.ad)); // [ 'Klavye', 'Monitör' ]

// Neden önemli? React'te bunu sürekli yapacaksın. Bir butona "tıklanınca
// şunu çağır" diye fonksiyon geçersin. O fonksiyonun tipi de buna benzer:
type SepeteEkleFonksiyonu = (urunId: number) => void;
const sepeteEkle: SepeteEkleFonksiyonu = (urunId) => console.log("5) sepete eklendi:", urunId);
sepeteEkle(3);

// =====================================================================
//  6) TUPLE: sabit uzunlukta, her elemanı ayrı tipte dizi
// =====================================================================
//
// Normal dizide her eleman aynı tiptedir (string[]). Tuple'da ise eleman SAYISI
// sabittir ve her POZİSYONUN kendi tipi vardır. C#'taki (string, int) gibi.

const urunVeFiyat: [string, number] = ["Klavye", 750];
const [urunAdi, urunFiyati] = urunVeFiyat; // Gün 1'deki dizi destructuring
console.log("6)", urunAdi, urunFiyati);

// Neden bahsediyorum? React'in en çok kullanacağın fonksiyonu useState,
// tam olarak bir tuple döndürür:
//   const [sayac, setSayac] = useState(0);
//   -> [number, (yeniDeger: number) => void] gibi bir şey
// 5. günde bu satırı gördüğünde ne olduğunu bileceksin.

// =====================================================================
//  7) GENERIC'ler: "tipi kullanan kişi belirlesin"
// =====================================================================
//
// C#'taki List<T>, Task<T> ile aynı fikir. Sorun şu: bir dizinin ilk elemanını
// döndüren fonksiyon yazmak istiyorsun. Ama hangi dizinin?

// Kötü çözüm 1: her tip için ayrı fonksiyon
//   function ilkUrun(liste: Urun[]): Urun | undefined { ... }
//   function ilkSayi(liste: number[]): number | undefined { ... }
//   -> aynı kodu tekrar tekrar yazıyorsun

// Kötü çözüm 2: any
//   function ilk(liste: any[]): any { ... }
//   -> çalışır, ama dönüş değerinin tipi kaybolur. Otomatik tamamlama yok, kontrol yok.

// Doğru çözüm: generic. Tipi bir "parametre" gibi düşün:
function ilkEleman<T>(liste: T[]): T | undefined {
  return liste[0];
}
// <T>   -> "Bu fonksiyon T adında bir tip parametresi alıyor."
//          T sadece bir isim; C#'taki gibi gelenek T, ama istediğini yazabilirsin.
// T[]   -> "T'lerden oluşan bir dizi alıyorum."
// T | undefined -> "Ondan bir T döndürüyorum (dizi boşsa undefined)."
//
// Sihirli kısım: T'yi çağırırken yazmana gerek yok. TS verdiğin argümana
// bakıp T'nin ne olduğunu kendisi çıkarır:

const ilkUrun = ilkEleman(urunler); //       T = Urun    -> Urun | undefined
const ilkSayi = ilkEleman([10, 20, 30]); //  T = number  -> number | undefined
const ilkIsim = ilkEleman(["a", "b"]); //    T = string  -> string | undefined

// İstersen açıkça da yazabilirsin. C#'taki gibi: ilkEleman<number>([10, 20])

console.log("7)", ilkUrun?.ad, ilkSayi, ilkIsim);

// --- Kısıtlı generic: "T herhangi bir şey değil, şu özelliği olan bir şey" ---
// C#'taki "where T : IEntity" gibi. TS'te "extends" ile yazılır:

function idIleBul<T extends { id: number }>(liste: T[], id: number): T | undefined {
  return liste.find((x) => x.id === id);
}
// "T, en azından sayı tipinde bir id alanı olan herhangi bir nesne olabilir."
// Bu sayede fonksiyonun içinde x.id yazabiliyoruz. TS id'nin var olduğunu biliyor.
// Üstelik dönüş tipi { id: number } değil, verdiğin tipin TAMAMI (Urun) oluyor.

const monitor = idIleBul(urunler, 3); // Urun | undefined
console.log("7)", monitor?.ad);
// idIleBul(["a", "b"], 1);
// -> Type 'string' is not assignable to type '{ id: number; }'.
//    ("string, id alanı olan bir nesne değil")

// =====================================================================
//  8) GENERIC interface: API cevaplarını tarif etmek
// =====================================================================
//
// Generic'ler sadece fonksiyonlarda değil, interface'lerde de kullanılır.
// Backend'indeki PagedResult<T> gibi bir sarmalayıcıyı tarif etmek için birebir:

interface SayfaliSonuc<T> {
  veriler: T[]; //       içerideki liste: T'lerden oluşuyor
  sayfa: number;
  toplamKayit: number;
}

// Kullanırken T'yi sen belirlersin:
const urunSayfasi: SayfaliSonuc<Urun> = { veriler: urunler, sayfa: 1, toplamKayit: 3 };
const isimSayfasi: SayfaliSonuc<string> = { veriler: ["a", "b"], sayfa: 1, toplamKayit: 2 };

console.log("8)", urunSayfasi.veriler[0]?.ad, isimSayfasi.veriler.length);
// urunSayfasi.veriler[0]. yazınca Urun'un alanları önerilir.
// isimSayfasi.veriler[0]. yazınca string metotları önerilir. Tek interface, iki kullanım.

// Zaten bildiğin generic'ler:
//   Array<T>    -> T[]
//   Promise<T>  -> C#'taki Task<T>. async fonksiyonlar Promise<...> döndürür.

// =====================================================================
//  9) fetch'ten gelen veriye tip vermek
// =====================================================================
//
// Bütün bu dosyanın en pratik kısmı. Sorun şu:
//   response.json() -> Promise<any>
// TS, internetten ne geleceğini bilemez, o yüzden sonucu any sayar.
// any de tip kontrolünü kapatır (01'in 6. bölümü). Yani bir API'den veri çektiğin
// anda TS'in bütün faydası kaybolur. Tipi söylemek SENİN sorumluluğun.
//
// Yaygın kalıp: generic bir yardımcı fonksiyon.

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return (await response.json()) as T;
}
// Promise<T>  -> "Bu async fonksiyon sonunda bir T verecek." (C#: Task<T>)
// as T        -> "Tip iddiası" (type assertion): "TS, bana güven, bu veri T şeklinde."
//
// DİKKAT, ÇOK ÖNEMLİ: "as" hiçbir KONTROL yapmaz! Tipler çalışma zamanında
// yok olduğu için TS gelen JSON'un gerçekten T şeklinde olup olmadığını
// doğrulayamaz. Sadece senin sözüne güvenir. Backend farklı bir şey döndürürse
// TS bunu yakalayamaz. Bu yüzden interface'i gerçek cevaba bakarak yazmalısın.
// (Gelen veriyi gerçekten doğrulamak için zod gibi kütüphaneler var, şimdilik gerek yok.)

// jsonplaceholder /users cevabındaki alanlardan sadece kullandıklarımızı tarif ediyoruz:
interface Kullanici {
  id: number;
  name: string;
  email: string;
}
// Gelen JSON'da başka alanlar da var (address, phone...). Hepsini yazmak zorunda
// değilsin. 02'deki yapısal tiplemeyi hatırla: fazlası sorun değil.

try {
  const kullanicilar = await getJson<Kullanici[]>("https://jsonplaceholder.typicode.com/users");
  //                                ^^^^^^^^^^^^ T = Kullanici[]
  // Artık kullanicilar: Kullanici[] -> k.name otomatik tamamlanıyor, k.nme yazarsan hata.
  console.log(
    "9)",
    kullanicilar.slice(0, 3).map((k) => k.name),
  );
} catch (error) {
  // catch'teki error'ın tipi unknown. Neden? JS'te throw ile SADECE Error değil,
  // her şey fırlatılabilir: throw "metin", throw 42... C#'taki gibi her zaman
  // Exception gelmez. TS de bu yüzden "ne geldiğini bilmiyorum" der.
  //
  // error.message;
  // -> 'error' is of type 'unknown'.
  //
  // instanceof ile Error olduğunu kontrol edince tip daralır:
  if (error instanceof Error) {
    console.log("9) hata:", error.message); // burada error: Error
  } else {
    console.log("9) bilinmeyen hata:", error);
  }
}

// =====================================================================
//  ÖZET
// =====================================================================
// - Dizi tipi: Urun[] (veya Array<Urun>).
// - map/filter/reduce callback'lerine tip yazmana gerek yok, TS diziden anlar.
// - find -> T | undefined. Kontrol etmeden kullanamazsın.
// - Fonksiyon: function f(p: Tip): DonusTipi. Parametre tipi zorunlu.
// - void: bir şey döndürmüyor. p?: opsiyonel, p = deger: varsayılan.
// - Fonksiyon tipi: (u: Urun) => boolean. C#'taki Func / delegate.
// - Tuple: [string, number]. useState bunu döndürür.
// - Generic <T>: tipi çağıran belirler, TS çoğu zaman kendisi çıkarır.
// - <T extends {...}>: T'ye kısıt koy (C#: where T : ...).
// - fetch cevabı any gelir. "as T" ile tip verirsin, ama "as" kontrol ETMEZ.
// - catch (error) -> unknown. instanceof Error ile kontrol et.
