// 04 - C# bilen biri için TypeScript: farklar ve tuzaklar
// Çalıştır: node 04-csharp-karsilastirma.ts
//
// Bu dosya yeni konu öğretmekten çok, C# alışkanlıklarının TS'te seni nerede
// yanıltacağını gösteriyor. 05 numaralı alıştırmada backend'indeki DTO'ları
// TS'e çevireceksin. Oradaki her görev bu dosyadaki bir başlığa dayanıyor.

// =====================================================================
//  1) DTO için class değil interface yazılır
// =====================================================================
//
// C#'ta backend'inde şöyle yazıyorsun:
//
//   public class ProductDto
//   {
//       public int Id { get; set; }
//       public string Name { get; set; }
//       public decimal Price { get; set; }
//   }
//
// Frontend'de aynı veriyi şöyle tarif edersin:

interface ProductDto {
  id: number;
  name: string;
  price: number;
}

// Neden class değil? Backend'den gelen veri, fetch + response.json() ile elde
// edilen DÜZ bir JS nesnesidir. Hiçbir sınıftan new ile üretilmemiştir.
// TS'e "bu düz nesne şu şekilde" demek için interface yeterli ve doğru araçtır.
//
// (TS'te class yazıp içine JSON'u koyarsan, nesne yine de o sınıftan olmaz.
//  Sınıfın metotlarını çağırmaya çalıştığında patlar. C#'tan gelenlerin sık
//  yaptığı bir hata.)

// =====================================================================
//  2) Alan isimleri: C#'a göre değil, JSON'a göre yaz
// =====================================================================
//
// ASP.NET Core bir nesneyi JSON'a çevirirken alan adlarını varsayılan olarak
// camelCase yapar (ilk harf küçük):
//
//   C# property        JSON'daki adı
//   Id             ->  "id"
//   StockQuantity  ->  "stockQuantity"
//   OrderItems     ->  "orderItems"
//
// Frontend kodun C# sınıfını hiç görmez, sadece JSON'u görür. Bu yüzden
// interface'teki isimler JSON'daki isimlerle BİREBİR aynı olmalı.
// "StockQuantity" yazarsan TS hata vermez (sen öyle söyledin), ama gerçek veride
// o alan olmadığı için değeri undefined gelir ve ekranın boş kalır.
//
// Emin olmanın en iyi yolu: API'yi Swagger'dan veya Postman'den çağır,
// dönen JSON'a bak, interface'i ona göre yaz.

// =====================================================================
//  3) JSON'dan geçerken tiplerin başına gelenler
// =====================================================================
//
// JSON'da sadece şu tipler vardır: metin, sayı, true/false, null, dizi, nesne.
// C#'taki daha zengin tipler JSON'a çevrilirken bunlardan birine dönüşür.
//
// | C#                 | JSON'da görünüşü        | TS'te yazacağın tip      |
// |--------------------|-------------------------|--------------------------|
// | int, long          | 12                      | number                   |
// | decimal, double    | 99.9                    | number                   |
// | string             | "abc"                   | string                   |
// | string?  (null)    | null                    | string | null            |
// | bool               | true                    | boolean                  |
// | DateTime           | "2026-11-24T10:30:00"   | string   (Date DEĞİL!)   |
// | Guid               | "3f2a...-..."           | string                   |
// | ICollection<T>     | [ ... ]                 | T[]                      |
// | enum               | 1   (sayı!)             | 4. başlığa bak           |
// | başka bir DTO      | { ... }                 | o DTO'nun interface'i    |

// --- DateTime tuzağı ---
// JSON'da tarih diye bir tip YOKTUR. Tarih metin olarak gelir. interface'te
// "createdAt: Date" yazarsan TS sana inanır (çalışma zamanında kontrol yok!).
// Ama değer aslında bir string olduğu için createdAt.getFullYear() çağırınca
// program patlar. Doğrusu, string yazıp gerektiğinde Date'e çevirmek:

const createdAt: string = "2026-11-24T10:30:00Z"; // API'den böyle gelir
const tarih = new Date(createdAt); //                 gerçek bir Date nesnesi
console.log("3)", tarih.toLocaleDateString("tr-TR")); // 24.11.2026
console.log("3)", tarih.getFullYear()); //              2026

// --- decimal tuzağı ---
// C#'taki decimal, para hesabı için tasarlanmış hassas bir tiptir.
// JS'teki number ise C#'taki double'dır: bazı ondalık sayıları tam tutamaz.
console.log("3)", 0.1 + 0.2); // 0.30000000000000004  (C#'ta double ile de böyle olur)

// Pratikte ne yapmalı?
//   - Toplam tutar gibi hassas hesapları backend'de yap (decimal ile),
//     frontend sadece göstersin. Senin OrderDto'da totalAmount zaten var.
//   - Gösterirken yuvarla. En temiz yol Intl.NumberFormat:
const paraFormati = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
console.log("3)", paraFormati.format(1234.5)); // ₺1.234,50
console.log("3)", (0.1 + 0.2).toFixed(2)); //    "0.30" (dikkat: sonuç string)

// =====================================================================
//  4) enum yerine union tipler
// =====================================================================
//
// TS'te de enum var:
//   enum OrderStatus { Pending = 1, Confirmed, Cancelled }
// Ama frontend dünyasında çoğunlukla union tercih edilir. İki nedeni var:
//
// (a) Tipler silinerek çalıştırılır (01'deki büyük resim). Bir interface'i ya da
//     union'ı silersin, geriye hiçbir şey kalmaz. Ama enum silinemez, çünkü
//     OrderStatus.Pending yazdığın yerde çalışma zamanında GERÇEK bir değere
//     ihtiyaç var. Bu yüzden TS enum'u ayrı bir JS koduna çevirmek zorunda.
//     Node'un .ts çalıştırma özelliği bu çeviriyi yapmaz ve enum gördüğünde hata verir.
//     tsconfig'deki "erasableSyntaxOnly" ayarı bunu tsc'de de hata yapar.
//     (Denemek istersen aşağıdaki satırın başındaki // işaretini kaldır ve çalıştır.)
//
// enum Durum { Pending, Cancelled }
//
// (b) Union daha basit: düz metinlerle çalışırsın, JSON'dan gelen değerle
//     doğrudan karşılaştırabilirsin.

type OrderStatus = "Pending" | "Confirmed" | "Cancelled";
const durum: OrderStatus = "Pending";
console.log("4)", durum);

// --- Değerlerin LİSTESİ de lazımsa: "as const" ---
// Union sadece bir tiptir, çalışma zamanında yoktur. O yüzden union'daki
// seçenekleri ekrana liste olarak basamazsın (örneğin bir açılır menüde).
// enum'da Object.values ile yapardın. TS'teki karşılığı:

const ORDER_STATUSES = ["Pending", "Confirmed", "Cancelled"] as const;
// "as const": "Bu dizi hiç değişmeyecek, elemanlarının tipi de tam bu metinler olsun."
// as const olmasaydı tipi string[] olurdu. Şimdi: readonly ["Pending", "Confirmed", "Cancelled"]

type OrderStatus2 = (typeof ORDER_STATUSES)[number];
// Bu satır biraz karışık, parça parça okuyalım:
//   typeof ORDER_STATUSES   -> diziden tipini al (burada typeof, TS'in tip versiyonu)
//   [number]                -> o dizinin herhangi bir indeksindeki elemanın tipi
//   Sonuç: "Pending" | "Confirmed" | "Cancelled"  (OrderStatus ile birebir aynı)
// Faydası: liste ve tip tek bir yerden geliyor. Yeni bir durum eklersen
// sadece diziye eklemen yeterli, tip kendiliğinden güncellenir.

const durum2: OrderStatus2 = "Confirmed";
console.log("4)", ORDER_STATUSES, durum2);

// --- SENİN BACKEND'İNE ÖZEL TUZAK ---
// ASP.NET Core enum'ları JSON'a varsayılan olarak SAYI olarak yazar.
// Senin OrderStatus enum'un { Pending = 1, Confirmed, Cancelled } olduğu için
// API "status": 1 döndürür, "status": "Pending" değil!
//
// Frontend'de "Pending" | "Confirmed" | "Cancelled" yazarsan TS sana inanır
// ("as" kontrol etmez), ama durum === "Pending" karşılaştırmaların hiçbir zaman
// true olmaz. Hata da vermez, sadece yanlış çalışır. En sinsi hata türü.
//
// Bu durumda iki seçeneğin var. 05 numaralı alıştırmanın 2. görevi bu:
//   (a) TS'te sayıları kullan:  type OrderStatusKodu = 1 | 2 | 3;
//   (b) Backend'e JsonStringEnumConverter ekleyip metin döndürmesini sağla.

type OrderStatusKodu = 1 | 2 | 3; // literal tipler sayılarla da olur
const gelenDurum: OrderStatusKodu = 1;
console.log("4)", gelenDurum);

// =====================================================================
//  5) null kontrolü: uyarı değil, hata
// =====================================================================
//
// C#'ta nullable reference types açıkken null olabilecek bir şeyi kontrol
// etmeden kullanırsan derleyici UYARI verir. Görmezden gelip derlemeye devam
// edebilirsin. TS strict modda bu bir HATADIR; tsc geçmez.
//
// İlk günlerde can sıkıcı gelecek, ama "Cannot read properties of undefined"
// hatası frontend'de en sık görülen çalışma zamanı hatası. TS bunu baştan engelliyor.

function urunAdi(p: ProductDto | undefined): string {
  if (!p) return "yok"; //   !p -> p undefined ise (ya da null, 0, "" gibi "boş" bir değerse)
  return p.name; //          bu satırda p kesinlikle ProductDto
}
console.log("5)", urunAdi(undefined), urunAdi({ id: 1, name: "Klavye", price: 750 }));

// C#'taki "!" (null-forgiving operator) TS'te de var ve aynı anlama geliyor:
//   p!.name  -> "Bunun null olmadığından eminim, kontrol etme."
// C#'taki kadar tehlikeli. Mümkünse kullanma, if ile kontrol et.

// =====================================================================
//  6) Tipler çalışma zamanında YOK: "is" ile interface kontrolü yapılamaz
// =====================================================================
//
// C#'ta:  if (nesne is ProductDto p) { ... }
// TS'te bunun karşılığı YOKTUR. interface çalışma zamanında silindiği için
// "bu nesne ProductDto mu?" diye soramazsın:
//
//   if (nesne instanceof ProductDto)
//   -> 'ProductDto' only refers to a type, but is being used as a value here.
//      ("ProductDto sadece bir tip, ama sen onu bir değer gibi kullanıyorsun")
//
// Bu hata mesajını iyi tanı: "X only refers to a type" = "bu şey çalışma
// zamanında yok". Yerine alanlarına bakarak kontrol edersin (01'deki "in" gibi)
// veya union tiplerde ayırt edici bir alan kullanırsın.

// =====================================================================
//  7) Metot overload'ı yerine union / opsiyonel parametre
// =====================================================================
//
// C#'ta aynı isimde, farklı parametreli birden fazla metot yazabilirsin:
//   Product Bul(int id) { ... }
//   Product Bul(string ad) { ... }
// JS'te aynı isimde iki fonksiyon olamaz, ikincisi birincinin üzerine yazar.
// TS'te genelde tek bir fonksiyon yazılır, parametre union olur ve içeride
// typeof ile ayrılır:

function bul(kriter: number | string): string {
  return typeof kriter === "number" ? `id ile arandı: ${kriter}` : `isimle arandı: ${kriter}`;
}
console.log("7)", bul(1), bul("Klavye"));

// =====================================================================
//  8) Kısa sözlük: C#'ta bunu biliyorsan TS'te karşılığı şu
// =====================================================================
//
// | C#                              | TS                                  |
// |---------------------------------|-------------------------------------|
// | string ad = "x";                | const ad: string = "x";             |
// | var ad = "x";                   | const ad = "x";                     |
// | string? ad                      | ad: string | null                   |
// | public int Id { get; set; }     | id: number;   (interface içinde)    |
// | public int Id { get; init; }    | readonly id: number;                |
// | List<T> / T[]                   | T[]  veya  Array<T>                 |
// | Dictionary<string, int>         | Record<string, number>              |
// | (string, int)                   | [string, number]   (tuple)          |
// | Func<Urun, bool>                | (u: Urun) => boolean                |
// | Action<int>                     | (x: number) => void                 |
// | Task<T>                         | Promise<T>                          |
// | where T : IEntity               | <T extends Entity>                  |
// | enum Durum { A, B }             | type Durum = "A" | "B";             |
// | dynamic                         | any       (kaçın!)                  |
// | object  (bilinmeyen değer)      | unknown                             |
// | obj is Urun u                   | yok. Alanlara bakarak kontrol et    |
// | x ?? y,  x?.y                   | x ?? y,  x?.y    (aynı!)            |

// Record'u ilk kez görüyorsun. Anahtarları ve değerleri belli tipte bir nesne:
const kategoriAdetleri: Record<string, number> = { aksesuar: 4, ekran: 2 };
console.log("8)", kategoriAdetleri["aksesuar"]);
// Gün 2'nin ek alıştırmasındaki kategori raporunu TS'e çevirirken işine yarayacak.

// =====================================================================
//  ÖZET
// =====================================================================
// - DTO'yu class ile değil interface ile tarif et.
// - Alan isimlerini JSON'daki gibi yaz (camelCase). Emin değilsen gerçek cevaba bak.
// - DateTime -> string, decimal -> number, ICollection<T> -> T[].
// - Para hesabını backend yapsın, frontend Intl.NumberFormat ile göstersin.
// - enum yerine union. Liste de lazımsa "as const".
// - Senin backend'in enum'ları SAYI olarak gönderiyor, dikkat!
// - null kontrolü TS'te zorunlu. "!" ile susturmaktan kaçın.
// - interface çalışma zamanında yok: "is" / "instanceof" ile kontrol edilemez.
