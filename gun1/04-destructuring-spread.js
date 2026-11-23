// 04 - Destructuring ve spread (...)
// Çalıştır: node 04-destructuring-spread.js

// ---------- NESNE DESTRUCTURING ----------
const urun = { id: 1, ad: "Klavye", fiyat: 750, stok: 12 };

// Eski yöntem:
// const ad = urun.ad; const fiyat = urun.fiyat;
const { ad, fiyat } = urun;
console.log(ad, fiyat);

const { stok } = urun;
console.log(`ürün stoğu: ${stok}`)

// Yeniden adlandırma ve varsayılan değer
const { ad: urunAdi, indirim = 0 } = urun;
console.log(urunAdi, indirim); // indirim nesnede yok, 0 geldi

// Fonksiyon parametresinde destructuring (React'te sürekli göreceksin)
const etiketYaz = ({ ad, fiyat }) => `${ad} - ${fiyat} TL`;
console.log(etiketYaz(urun));

// ---------- DİZİ DESTRUCTURING ----------
const renkler = ["kırmızı", "yeşil", "mavi"];
const [ilk, ikinci] = renkler;
console.log(ilk, ikinci);

// Değer takası (swap), geçici değişken gerekmez
let a = 1, b = 2;
[a, b] = [b, a];
console.log("swap:", a, b);

// ---------- REST (...): "geri kalanları topla" ----------
const { id, ...geriKalan } = urun;
console.log("id hariç:", geriKalan);

const [bas, ...digerleri] = renkler;
console.log(bas, digerleri);

// ---------- SPREAD (...): "aç / kopyala" ----------
// Dizi kopyalama ve birleştirme
const yeniRenkler = [...renkler, "sarı"];
console.log(yeniRenkler);
console.log("orijinal bozulmadı:", renkler);

// Nesne kopyalama ve güncelleme (immutable güncelleme, React'in temeli)
const zamliUrun = { ...urun, fiyat: 900 }; // sonra yazılan kazanır
console.log("zamlı:", zamliUrun);
console.log("orijinal:", urun);

// Dikkat: spread SIĞ (shallow) kopya yapar
const siparis = { no: 1, musteri: { ad: "Ali" } };
const kopya = { ...siparis };
kopya.musteri.ad = "Veli";
console.log("sığ kopya tuzağı:", siparis.musteri.ad); // Veli! iç nesne ortak
// Derin kopya için: structuredClone(siparis)
