// 07 - EK ALIŞTIRMALAR (çözüm yok — sen çöz, sonra review ettir)
// Çalıştır: node 07-ek-alistirmalar.js
// Biraz daha düşündürmesi için zorluk artıyor.

import { urunler } from "./moduller/urunler.js";

// EK 1 — Kategori raporu (reduce)
//   Her kategori için ürün sayısını ve toplam stok değerini (fiyat * stok) hesapla.
//   Beklenen yapı:
//   { aksesuar: { adet: 4, stokDegeri: ... }, ekran: { ... }, bilgisayar: { ... } }
//   Object.groupBy KULLANMADAN, sadece reduce ile yap.

const kategoriyeGore = urunler.reduce((gruplar, u) => {
    const liste = gruplar[u.kategori] ?? [];
    return { ...gruplar, [u.kategori]: [...liste, u.ad, u.stok] };
}, {});
console.log("kategoriye göre:", kategoriyeGore);



// EK 2 — Sepet (immutable güncelleme)
//   const sepet = [{ urunId: 1, adet: 2 }, { urunId: 3, adet: 1 }];
//   Üç fonksiyon yaz, hiçbiri sepeti değiştirmesin, hep YENİ sepet döndürsün:
//     sepeteEkle(sepet, urunId)  -> ürün varsa adedini 1 artır, yoksa adet:1 ile ekle
//     sepettenCikar(sepet, urunId) -> ürünü tamamen kaldır
//     sepetToplami(sepet)        -> urunler dizisinden fiyatları bulup toplam tutarı döndür
//   Orijinal sepetin değişmediğini console.log ile kanıtla.

// EK 3 — Arama fonksiyonu (filter + some)
//   ara(metin) fonksiyonu yaz: ürün adında VEYA etiketlerinde metin geçen ürünleri döndürsün.
//   Büyük/küçük harf duyarsız olsun. ara("blue") -> Kulaklık, ara("KLAV") -> Klavye
//   İpucu: etiketi olmayan ürünlerde patlamamaya dikkat.

// EK 4 — Fetch ile birleştirme (join)
//   /users ve /todos verilerini çek (paralel!). Her kullanıcı için
//   { ad, tamamlanan, toplam } nesnesi oluştur; tamamlanan sayısına göre
//   büyükten küçüğe sırala ve console.table ile yazdır.
//   (C#'taki LINQ Join + GroupBy + OrderByDescending'i elle yazıyorsun.)

// EK 5 — Zaman aşımlı fetch (Promise.race)
//   zamanAsimliFetch(url, ms) yaz: istek ms içinde dönmezse
//   "Zaman aşımı" hatasıyla reject olsun. Promise.race kullan.
//   Önce 5000 ms ile (başarılı), sonra 1 ms ile (hata) dene.
//   Bonus: AbortController ile isteği gerçekten iptal etmenin yolunu araştır.
