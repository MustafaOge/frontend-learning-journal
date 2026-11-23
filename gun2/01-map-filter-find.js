// 01 - map / filter / find
// Çalıştır: node 01-map-filter-find.js
//
// C# LINQ karşılıkları:
//   map    -> Select
//   filter -> Where
//   find   -> FirstOrDefault (bulamazsa null değil `undefined` döner)
//   findIndex -> (LINQ'te doğrudan yok) List.FindIndex
//
// ÖNEMLİ: Üçü de orijinal diziyi DEĞİŞTİRMEZ. map/filter YENİ dizi döndürür.
// Ve LINQ'in aksine "lazy" değildir: çağırdığın anda hemen çalışır.

import { urunler } from "./moduller/urunler.js";

// ---------- map: her elemanı dönüştür, AYNI UZUNLUKTA yeni dizi ----------
const isimler = urunler.map((u) => u.ad);
console.log("isimler:", isimler);

// Destructuring ile daha kısa:
const etiketler = urunler.map(({ ad, fiyat }) => `${ad} (${fiyat} TL)`);
console.log("etiketler:", etiketler);

// Nesne döndürürken PARANTEZ şart: ({ ... }) — yoksa { } fonksiyon gövdesi sanılır.
const ozet = urunler.map((u) => ({ id: u.id, ad: u.ad }));
console.log("özet:", ozet);

// map'in 2. parametresi index'tir (C#: Select((x, i) => ...))
console.log(urunler.map((u, i) => `${i + 1}. ${u.ad}`));

// ---------- filter: koşulu sağlayanlar, uzunluk değişebilir ----------
const stoktaOlanlar = urunler.filter((u) => u.stok > 0);
console.log("stokta:", stoktaOlanlar.length, "adet");

// Zincirleme (LINQ gibi): Where(...).Select(...)
const ucuzAksesuarIsimleri = urunler
  .filter((u) => u.kategori === "aksesuar")
  .filter((u) => u.fiyat < 1000)
  .map((u) => u.ad);
console.log("ucuz aksesuarlar:", ucuzAksesuarIsimleri);

// ---------- find: İLK eşleşen eleman (dizi değil, tek eleman) ----------
const laptop = urunler.find((u) => u.ad === "Laptop");
console.log("bulunan:", laptop);

const yok = urunler.find((u) => u.ad === "Telefon");
console.log("bulunamayan:", yok); // undefined

// Bulunamama durumunu güvenli ele almak için optional chaining (?.) kullan:
console.log("telefon fiyatı:", yok?.fiyat); // hata vermez, undefined

// findIndex: bulunamazsa -1
console.log("Monitör index:", urunler.findIndex((u) => u.ad === "Monitör"));

// ---------- React'te nerede göreceksin? ----------
// {urunler.map(u => <UrunKarti key={u.id} urun={u} />)}       -> liste render
// {urunler.filter(u => u.stok > 0).map(...)}                  -> filtreli liste
// const secili = urunler.find(u => u.id === seciliId);        -> detay sayfası

// ---------- TUZAK: forEach bir şey döndürmez ----------
const sonuc = urunler.forEach((u) => u.ad);
console.log("forEach sonucu:", sonuc); // undefined -> dönüşüm için map kullan
