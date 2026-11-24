// 02 - interface, type, opsiyonel alanlar, union tipler
// Çalıştır: node 02-interface-type.ts
//
// 01'de tek tek değerlerin (string, number...) tiplerini gördük. Ama gerçek
// hayatta çoğunlukla NESNELERLE çalışırsın: bir ürün, bir sipariş, bir kullanıcı.
// Bu dosya, bir nesnenin "şeklini" nasıl tarif edeceğini anlatıyor.

// =====================================================================
//  1) interface NEDİR?
// =====================================================================
//
// interface, bir nesnenin hangi alanlara sahip olduğunu ve bu alanların
// tiplerini anlatan bir TARİFTİR. "Ürün dediğim şey; sayı tipinde bir id'si,
// metin tipinde bir adı olan nesnedir" demenin yolu.
//
// C#'taki interface'ten FARKLI bir şey, kafan karışmasın:
//   - C# interface'i bir SÖZLEŞMEDİR: sınıflar onu "implements" ile uygular,
//     genelde metotlar içerir.
//   - TS interface'i genelde sadece VERİNİN ŞEKLİDİR. C#'taki bir DTO sınıfının
//     yalnızca property listesine benzer, ama new ile nesne üretilmez.
//
// TS'te sınıf (class) da var, ama frontend'de veriyi tarif etmek için neredeyse
// hiç kullanılmaz. Backend'den gelen JSON zaten düz bir nesnedir. Onu bir
// sınıfa sokmak yerine "bu nesne şu şekildedir" demek yeterli.

interface Urun {
  id: number; //            her satır: alanAdı: tip;
  ad: string;
  fiyat: number;
  stok: number;
  etiketler?: string[]; //  ? = OPSİYONEL alan (aşağıda anlatılıyor)
  readonly sku: string; //  readonly = sonradan değiştirilemez (aşağıda)
}

// interface sadece bir tarif, kendi başına hiçbir şey üretmez.
// Kullanmak için bir değişkenin tipi olarak verirsin:
const klavye: Urun = {
  id: 1,
  ad: "Klavye",
  fiyat: 750,
  stok: 12,
  sku: "KLV-01",
  // etiketler yok, sorun değil: opsiyonel
};

console.log("1)", klavye.ad, klavye.fiyat);

// Artık TS bu nesneyi tanıyor:
//   - "klavye." yazınca VS Code tüm alanları öneriyor (otomatik tamamlama)
//   - Olmayan bir alanı yazarsan hata veriyor:
//       klavye.renk
//       -> Property 'renk' does not exist on type 'Urun'.
//   - Tipi yanlış değer verirsen hata veriyor:
//       klavye.fiyat = "bedava";
//       -> Type 'string' is not assignable to type 'number'.

// Zorunlu bir alanı unutursan da hata verir:
//   const mouse: Urun = { id: 2, ad: "Mouse" };
//   -> Type '{ id: number; ad: string; }' is missing the following properties
//      from type 'Urun': fiyat, stok, sku
//   Mesaj eksik alanların hepsini tek tek sayıyor. Böyle hataları okumayı alışkanlık yap.

// =====================================================================
//  2) OPSİYONEL alanlar:  alan?: tip
// =====================================================================
//
// Alan adından sonra ? koyarsan o alan nesnede OLMAYABİLİR.
// Olmadığında değeri undefined'dır. Yani "etiketler?: string[]" aslında
// "etiketler: string[] | undefined" demektir.
//
// Sonuç: opsiyonel bir alanı kullanmadan önce TS kontrol etmeni ister:

// console.log(klavye.etiketler.length);
// -> 'klavye.etiketler' is possibly 'undefined'.

console.log("2)", klavye.etiketler?.join(", ") ?? "etiket yok"); // Gün 2'deki ?. ve ??

// Ne zaman opsiyonel yapmalı?
//   Gerçekten bazen olup bazen olmayan alanlar için. Gün 2'deki ürün listesinde
//   etiketler sadece Kulaklık'ta vardı; o yüzden opsiyonel olmalı.
//   "Her zaman var" bildiğin bir alanı opsiyonel yaparsan, her yerde boş yere
//   kontrol yazmak zorunda kalırsın.

// =====================================================================
//  3) readonly: değiştirilemez alan
// =====================================================================
//
// C#'taki "public string Sku { get; }" ya da "init" gibi.
// Nesne oluşturulurken değer verilir, sonra değiştirilemez.

// klavye.sku = "YENI-01";
// -> Cannot assign to 'sku' because it is a read-only property.

// Dikkat: readonly da diğer tipler gibi sadece TS'in yaptığı bir kontroldür.
// Çalışma zamanında nesneyi gerçekten kilitlemez.

// =====================================================================
//  4) YAPISAL TİPLEME (structural typing): C#'tan en farklı nokta!
// =====================================================================
//
// C#'ta bir nesnenin tipi, onun hangi SINIFTAN üretildiğidir. Alanları birebir
// aynı olan iki ayrı sınıf, C# için yine de iki FARKLI tiptir.
//
// TS ise ADA bakmaz, ŞEKLE bakar: "Urun'un istediği alanların hepsi bu nesnede
// var mı ve tipleri doğru mu?" Cevap evetse, o nesne bir Urun'dur. Nesnenin
// nereden geldiği, kimin oluşturduğu önemli değildir.

const disaridanGelen = {
  id: 9,
  ad: "Hoparlör",
  fiyat: 900,
  stok: 3,
  sku: "HPR-09",
  renk: "siyah", // Urun'da olmayan fazladan bir alan
};

const hoparlor: Urun = disaridanGelen; // HATA YOK: Urun'un istediği her şey var
console.log("4)", hoparlor.ad);

// Fazladan "renk" alanı sorun değil, çünkü Urun'un istediklerinin hepsi mevcut.
// (hoparlor.renk yazamazsın ama: TS onu artık Urun olarak görüyor.)

// Kafa karıştıran istisna: Nesneyi DOĞRUDAN yazarken fazladan alan koyarsan
// TS hata verir:
//   const h2: Urun = { id: 9, ad: "Hoparlör", fiyat: 900, stok: 3, sku: "H", renk: "siyah" };
//   -> Object literal may only specify known properties, and 'renk' does not exist in type 'Urun'.
// Neden? Doğrudan yazılan bir nesnede fazladan alan büyük ihtimalle bir yazım
// hatasıdır (örneğin "fiyat" yerine "fyat"). TS bu yüzden ekstra kontrol yapar.
// Hazır bir değişkeni atadığında ise bu kontrolü yapmaz.

// =====================================================================
//  5) type: bir tipe İSİM vermek
// =====================================================================
//
// "type" anahtar kelimesi herhangi bir tipe isim verir. Buna "type alias"
// (tip takma adı) denir. Nesne şekli için interface ile neredeyse aynı işi yapar:

type Kategori = {
  id: number;
  ad: string;
};
// interface'ten yazım farkı: type'ta = işareti var ve sonuna ; konur.

const aksesuar: Kategori = { id: 1, ad: "aksesuar" };
console.log("5)", aksesuar.ad);

// Ama type, interface'in YAPAMADIĞI şeyleri de yapar. Herhangi bir tipe,
// ilkel tiplere ve union'lara da isim verebilir:
type UrunId = number; //            bir ilkel tipe anlamlı isim
type Kimlik = number | string; //   bir union'a isim (aşağıda)

const birId: UrunId = 42; // UrunId aslında sadece number, ama kodu okuyana niyetini anlatır
console.log("5)", birId);

// =====================================================================
//  6) UNION tipler:  A | B | C   ("bunlardan biri")
// =====================================================================
//
// 01'de "string | null" görmüştük: "ya string ya null". | işaretiyle istediğin
// kadar tipi birleştirebilirsin.
//
// En güçlü kullanımı LITERAL tiplerle birlikte. 01'in 4. bölümünü hatırla:
// "Pending" sadece tek bir metni kabul eden bir tip olabiliyordu. Bunlardan
// birkaçını | ile birleştirirsen, C#'taki enum gibi bir şey elde edersin:

type SiparisDurumu = "Pending" | "Confirmed" | "Cancelled";
// Okunuşu: "SiparisDurumu; 'Pending', 'Confirmed' veya 'Cancelled' metinlerinden
// biridir. Başka hiçbir metin olamaz."

let durum: SiparisDurumu = "Pending";
durum = "Cancelled"; // listede var, sorun yok

// durum = "Shipped";
// -> Type '"Shipped"' is not assignable to type 'SiparisDurumu'.
// durum = "pending";   // küçük harfle
// -> Bu da HATA. Yazım hatalarını derleme anında yakalarsın.

// Bonus: VS Code'da durum = " yazdığın anda üç seçeneği öneriyor.
// Düz string kullansaydın bu kontrollerin hiçbiri olmazdı.

// --- Union ile daraltma ---
// 01'deki typeof ile daraltma gibi, burada da her kontrolden sonra TS
// değerin hangi seçenek olduğunu bilir. switch bunun için çok uygundur:

function durumMetni(d: SiparisDurumu): string {
  switch (d) {
    case "Pending":
      return "Onay bekliyor";
    case "Confirmed":
      return "Onaylandı";
    case "Cancelled":
      return "İptal edildi";
    default: {
      // Buraya hiç gelinemez, çünkü üç seçeneğin üçü de yukarıda karşılandı.
      // TS de bunu biliyor ve burada d'nin tipini "never" yapıyor.
      // never = "hiçbir değer olamaz" demek.
      const kontrol: never = d;
      return kontrol;
    }
  }
}
// Bu default bloğu neden var? İleride SiparisDurumu'na "Shipped" eklersen
// ve switch'e case yazmayı unutursan, "Shipped" default'a düşer. Bu durumda
// d artık never değil "Shipped" olur ve TS şu satırda hata verir:
//   Type '"Shipped"' is not assignable to type 'never'.
// Yani "bir durumu unuttun" diye seni uyarır. Bu kalıba
// "exhaustive check" (tüm durumların karşılandığını kontrol etme) denir.
// Yeni bir durum eklediğinde onu kullanan her yeri bulmanı sağlar.

console.log("6)", durumMetni(durum));

// --- Farklı tiplerin union'ı ---
// Literal olmak zorunda değil, tamamen farklı tipleri de birleştirebilirsin:

function kimlikYazdir(k: Kimlik) {
  // 5. bölümde tanımladık: Kimlik = number | string
  if (typeof k === "number") {
    console.log("6) sayısal id:", k.toFixed(0)); // burada k: number
  } else {
    console.log("6) metin id:", k.toUpperCase()); // burada k: string
  }
}
kimlikYazdir(42);
kimlikYazdir("abc-1");

// =====================================================================
//  7) Tipleri GENİŞLETMEK ve BİRLEŞTİRMEK
// =====================================================================
//
// Bir tipin üzerine yeni alanlar eklemek istersen iki yol var.

// --- interface + extends ---
// C#'taki kalıtım (class IndirimliUrun : Urun) gibi düşün:
// "Urun'daki her şey + bir indirimOrani"
interface IndirimliUrun extends Urun {
  indirimOrani: number;
}

// --- type + & (intersection, kesişim) ---
// "Urun'daki her şey VE { kategori } nesnesindeki her şey"
type KategoriliUrun = Urun & { kategori: Kategori };

// | ile & arasındaki farka dikkat:
//   A | B  -> "A VEYA B": değer ikisinden biridir
//   A & B  -> "A VE B": değer ikisinin bütün alanlarına birden sahiptir

// Gün 1'deki spread (...) ile bu tiplerde nesneyi kolayca oluşturursun:
const indirimli: IndirimliUrun = { ...klavye, indirimOrani: 0.1 };
const kategorili: KategoriliUrun = { ...klavye, kategori: aksesuar };
console.log("7)", indirimli.indirimOrani, kategorili.kategori.ad);

// =====================================================================
//  8) interface mi, type mı?
// =====================================================================
//
// Yeni başlayanların en çok sorduğu soru. Kısa cevap:
//
// - Nesne şekilleri için (DTO'lar, ileride React component props'ları):
//   İKİSİ DE olur, aradaki fark pratikte çok küçük. Bir projede birini seçip
//   tutarlı gitmek yeterli. Bu dosyalarda nesneler için interface kullanıyorum.
//
// - Union ("A" | "B"), ilkel tipe isim (type UrunId = number) gibi nesne
//   olmayan her şey için: SADECE type olur.
//
// - interface "extends" ile, type "&" ile genişletilir.
//
// Mülakatta sorulursa bu üç madde yeterli.

// =====================================================================
//  ÖZET
// =====================================================================
// - interface = nesnenin şekli (hangi alanlar, hangi tipler). C# DTO'suna benzer.
// - alan?: tip  -> opsiyonel, değeri undefined olabilir, kullanmadan önce kontrol et.
// - readonly    -> sonradan değiştirilemez.
// - TS ada değil şekle bakar (structural typing).
// - type        -> herhangi bir tipe isim verir. Union için zorunlu.
// - "A" | "B" | "C" -> enum yerine kullanılan literal union.
// - switch + never  -> bir durumu unutmadığından emin ol.
// - extends / &     -> tipleri genişlet / birleştir.
