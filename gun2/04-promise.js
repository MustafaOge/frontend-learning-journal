// 04 - Promise mantığı
// Çalıştır: node 04-promise.js
//
// C# karşılığı: Promise ≈ Task<T>
//   resolve -> Task başarıyla tamamlandı (sonuç döndü)
//   reject  -> Task exception fırlattı
//   .then   -> ContinueWith
//   Promise.all  -> Task.WhenAll
//   Promise.race -> Task.WhenAny
//
// FARK: JS tek thread'lidir. Promise yeni thread açmaz; işi "sonra yapılacaklar"
// kuyruğuna koyar (event loop). Bu yüzden kod BLOKLANMAZ.

// Gecikmeli çalışan sahte bir "sunucu" fonksiyonu
const bekle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const urunGetir = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, ad: `Ürün ${id}` });
      else reject(new Error("Geçersiz id"));
    }, 500);
  });

// ---------- Çalışma sırası ----------
console.log("1) başla");
urunGetir(1).then((urun) => console.log("3) geldi:", urun));
console.log("2) beklemeden devam ediyorum");
// Çıktı sırası: 1, 2, 3  -> then içindeki kod SONRA çalışır

// ---------- then zinciri + catch + finally ----------
urunGetir(-1)
  .then((urun) => console.log("buraya gelmez", urun))
  .catch((hata) => console.log("catch:", hata.message)) // C#: catch
  .finally(() => console.log("finally: her durumda çalışır"));

// ---------- Paralel çalıştırma ----------
await bekle(1000); // (önceki çıktılar karışmasın diye) — top-level await, modüllerde serbest

console.time("Promise.all");
const hepsi = await Promise.all([urunGetir(1), urunGetir(2), urunGetir(3)]);
console.timeEnd("Promise.all"); // ~500ms, 1500ms DEĞİL: üçü aynı anda bekledi
console.log("hepsi:", hepsi);

// Biri hata verirse Promise.all tamamen reject olur.
// Hepsinin sonucunu (başarılı/başarısız) istiyorsan: Promise.allSettled
const sonuclar = await Promise.allSettled([urunGetir(1), urunGetir(-1)]);
console.log("allSettled:", sonuclar);
