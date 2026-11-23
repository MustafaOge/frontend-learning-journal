// 02 - Arrow function
// Çalıştır: node 02-arrow-function.js

// Klasik fonksiyon
function topla(a, b) {
  return a + b;
}

// Arrow function: C#'taki lambda'ya (a, b) => a + b çok benzer
const toplaArrow = (a, b) => a + b; // tek ifade varsa return yazmana gerek yok

// Tek parametrede parantez opsiyonel
const kare = (x) => x * x;

// Birden fazla satır gerekiyorsa { } ve return kullan
const selamla = (isim) => {
  const mesaj = "Merhaba " + isim;
  return mesaj;
};

// Nesne döndürürken parantez şart. Yoksa { } blok sanılır.
const kisiOlustur = (ad, yas) => ({ ad, yas });

console.log(topla(2, 3));
console.log(toplaArrow(2, 3));
console.log(kare(4));
console.log(selamla("Ayşe"));
console.log(kisiOlustur("Ali", 30));

// En sık kullanım: dizi metotlarıyla (C#'taki LINQ'in karşılığı)
const sayilar = [1, 2, 3, 4, 5];
console.log("map (Select):", sayilar.map((n) => n * 2));
console.log("filter (Where):", sayilar.filter((n) => n % 2 === 0));
console.log("reduce (Aggregate):", sayilar.reduce((top, n) => top + n, 0));
console.log("find (FirstOrDefault):", sayilar.find((n) => n > 3));
