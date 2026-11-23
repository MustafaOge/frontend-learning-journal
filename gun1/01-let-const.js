// 01 - let / const (ve neden artık var kullanmıyoruz)
// Çalıştır: node 01-let-const.js

// const: yeniden ATANAMAZ (C#'taki readonly referans gibi düşün)
const pi = 3.14;
// pi = 3; // TypeError: Assignment to constant variable.

// AMA const nesnenin İÇİ değiştirilebilir. Sabit olan referanstır, içerik değil.
const kullanici = { ad: "Ali" };
kullanici.ad = "Ayşe"; // bu serbest
console.log("const nesne değişti:", kullanici);

// let: yeniden atanabilir, blok kapsamlıdır ({ } içinde yaşar)
let sayac = 0;
sayac = sayac + 1;
console.log("sayac:", sayac);

if (true) {
  let icerde = "sadece bu blokta";
}
// console.log(icerde); // ReferenceError

// var: eski yöntem, fonksiyon kapsamlı. Blok dışına "sızar".
if (true) {
  var sizan = "blok dışına sızdım";
}
console.log("var:", sizan); // çalışır, sürprizlere yol açar

// Kural: varsayılan olarak const kullan, değişecekse let. var kullanma.
