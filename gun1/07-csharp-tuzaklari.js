// 07 - C# bilen biri için JavaScript tuzakları
// Çalıştır: node 07-csharp-tuzaklari.js

// ================= 1) == ile === =================
// C#'ta == tip güvenlidir. JS'te == önce TİP DÖNÜŞTÜRÜR (type coercion).
console.log("--- == ile === ---");
console.log(0 == "0");          // true  (string sayıya çevrildi)
console.log(0 == "");           // true  (!)
console.log("0" == "");         // false (yani == geçişli bile değil)
console.log(null == undefined); // true
console.log(false == "0");      // true  (!)
console.log([] == false);       // true  (!!)

console.log(0 === "0");          // false, tip de karşılaştırılır
console.log(null === undefined); // false

// Kural: her zaman === ve !== kullan.

// Nesneler referansla karşılaştırılır (C#'taki class gibi)
console.log({ a: 1 } === { a: 1 }); // false, farklı nesneler
console.log([1, 2] === [1, 2]);     // false

// ================= 2) undefined ile null =================
// C#'ta sadece null var. JS'te iki tane "boş" değer var:
//   undefined -> "hiç değer atanmadı" (JS'in kendisi verir)
//   null      -> "bilerek boş bıraktım" (sen verirsin)
console.log("\n--- undefined / null ---");
let atanmamis;
console.log(atanmamis);           // undefined
const kisi = { ad: "Ali" };
console.log(kisi.yas);            // undefined (C#'ta derleme hatası olurdu!)
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JS'in tarihi bir hatası)

// Yazım hatası sessizce undefined döner, hata vermez:
console.log(kisi.adi);            // undefined, "ad" demek istemiştin

// C#'taki ?. ve ?? burada da var:
const siparis = { musteri: null };
console.log(siparis.musteri?.ad);       // undefined, patlamaz
console.log(siparis.musteri?.ad ?? "Misafir"); // "Misafir"

// ?? ile || farkı: || tüm "falsy" değerlerde (0, "", false) devreye girer
const stok = 0;
console.log(stok || 10); // 10 (yanlış! stok gerçekten 0)
console.log(stok ?? 10); // 0  (doğru, ?? sadece null/undefined'a bakar)

// Falsy değerler: false, 0, "", null, undefined, NaN. Gerisi truthy.
// Dikkat: [] ve {} TRUTHY'dir.
if ([]) console.log("boş dizi truthy!");

// ================= 3) this =================
// C#'ta this her zaman sınıfın örneğidir. JS'te this, fonksiyonun
// NEREDE TANIMLANDIĞINA değil, NASIL ÇAĞRILDIĞINA bağlıdır.
console.log("\n--- this ---");

const sepet = {
  sahibi: "Ayşe",
  normalFonk() {
    return this.sahibi;
  },
  arrowFonk: () => {
    // Arrow function kendi this'ine sahip değil, dışarıdakini alır.
    // Burada dışarısı modül seviyesi, orada this undefined.
    return this?.sahibi;
  },
};

console.log(sepet.normalFonk()); // "Ayşe"
console.log(sepet.arrowFonk());  // undefined

// Metodu başka değişkene alınca this kaybolur:
const kopyalanmis = sepet.normalFonk;
try {
  console.log(kopyalanmis()); // this artık undefined
} catch (e) {
  console.log("Hata:", e.message);
}

// Çözüm 1: bind ile this'i sabitle
const bagli = sepet.normalFonk.bind(sepet);
console.log(bagli()); // "Ayşe"

// Klasik tuzak: callback içinde this
const sayac = {
  deger: 0,
  baslatYanlis() {
    [1, 2, 3].forEach(function () {
      // normal function, this burada sayac DEĞİL
      try { this.deger++; } catch (e) { console.log("forEach + function:", e.message); }
    });
  },
  baslatDogru() {
    // Çözüm 2: arrow function dıştaki this'i (sayac) kullanır
    [1, 2, 3].forEach(() => this.deger++);
    console.log("arrow ile deger:", this.deger);
  },
};
sayac.baslatYanlis();
sayac.baslatDogru();

// ================= 4) Bonus tuzaklar =================
console.log("\n--- bonus ---");
console.log(0.1 + 0.2);       // 0.30000000000000004 (decimal yok, hepsi double)
console.log("5" + 3);         // "53" (string birleştirme)
console.log("5" - 3);         // 2    (sayıya çevirdi!)
console.log([10, 1, 2].sort()); // [1, 10, 2], varsayılan sıralama STRING'e göre
console.log([10, 1, 2].sort((a, b) => a - b)); // [1, 2, 10], doğrusu
console.log(typeof NaN);      // "number"
console.log(NaN === NaN);     // false, kontrol için Number.isNaN(x)
