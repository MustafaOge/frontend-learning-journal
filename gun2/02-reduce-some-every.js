// 02 - reduce / some / every (+ includes, sort, flatMap)
// Çalıştır: node 02-reduce-some-every.js
//
// C# LINQ karşılıkları:
//   reduce   -> Aggregate (Sum, Max, GroupBy hepsi reduce ile yazılabilir)
//   some     -> Any
//   every    -> All
//   includes -> Contains
//   flatMap  -> SelectMany

import { urunler } from "./moduller/urunler.js";

// ---------- reduce: diziyi TEK bir değere indir ----------
// reduce((biriken, eleman) => yeniBiriken, BAŞLANGIÇ_DEĞERİ)
const toplamFiyat = urunler.reduce((toplam, u) => toplam + u.fiyat, 0);
console.log("toplam fiyat:", toplamFiyat);

// Başlangıç değerini (0) HER ZAMAN ver. Vermezsen ilk eleman (nesne!) başlangıç olur
// ve boş dizide TypeError alırsın.

// En pahalı ürün (C#: MaxBy)
const enPahali = urunler.reduce((enIyi, u) => (u.fiyat > enIyi.fiyat ? u : enIyi));
console.log("en pahalı:", enPahali.ad);

// Gruplama (C#: GroupBy) -> sonuç bir nesne: { aksesuar: [...], ekran: [...] }
const kategoriyeGore = urunler.reduce((gruplar, u) => {
  const liste = gruplar[u.kategori] ?? [];
  return { ...gruplar, [u.kategori]: [...liste, u.ad] };
}, {});
console.log("kategoriye göre:", kategoriyeGore);

// Not: Modern JS'te hazır fonksiyon da var (Node 21+):
console.log("Object.groupBy:", Object.groupBy(urunler, (u) => u.kategori));

// ---------- some / every: true/false döner ----------
console.log("tükenen ürün var mı?", urunler.some((u) => u.stok === 0));
console.log("hepsi 100 TL üstü mü?", urunler.every((u) => u.fiyat > 100));

// Boş dizide: some -> false, every -> true (C#'taki Any/All ile aynı mantık)
console.log([].some(() => true), [].every(() => false));

// ---------- includes: basit değer var mı? ----------
const kategoriler = urunler.map((u) => u.kategori);
console.log("ekran kategorisi var mı?", kategoriler.includes("ekran"));

// Tekrarsız liste (C#: Distinct) -> Set kullan
console.log("benzersiz kategoriler:", [...new Set(kategoriler)]);

// ---------- flatMap: iç içe dizileri düzleştir ----------
const tumEtiketler = urunler.flatMap((u) => u.etiketler ?? []);
console.log("tüm etiketler:", tumEtiketler);

// ---------- TUZAK: sort ORİJİNAL diziyi değiştirir! ----------
// urunler.sort(...) yaparsan import ettiğin dizi bozulur (React'te büyük bug kaynağı).
// Çözüm: toSorted (yeni dizi döner) veya önce kopyala: [...urunler].sort(...)
const fiyataGore = urunler.toSorted((a, b) => a.fiyat - b.fiyat);
console.log("ucuzdan pahalıya:", fiyataGore.map((u) => u.ad));
console.log("orijinal sıra korundu:", urunler.map((u) => u.ad));

// TUZAK 2: Sayıları karşılaştırıcısız sıralama string sıralamasıdır!
console.log([10, 9, 100].toSorted()); // [10, 100, 9]  :(
console.log([10, 9, 100].toSorted((a, b) => a - b)); // [9, 10, 100]
