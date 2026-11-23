// 03 - Nesne ve dizileri DEĞİŞTİRMEDEN (immutable) güncelleme
// Çalıştır: node 03-degistirmeden-guncelleme.js
//
// Neden önemli? React, state'in değişip değişmediğini REFERANSA bakarak anlar
// (eski === yeni ?). Nesnenin içini değiştirirsen referans aynı kalır,
// React "değişiklik yok" der ve ekranı güncellemez.
// Kural: Var olanı değiştirme, YENİ bir kopya oluştur.

import { urunler } from "./moduller/urunler.js";

// ================= NESNELER =================
const kullanici = { ad: "Ali", yas: 30, adres: { sehir: "İstanbul", ilce: "Kadıköy" } };

// YANLIŞ (mutasyon): kullanici.yas = 31;

// DOĞRU: alan güncelle
const buyumus = { ...kullanici, yas: 31 };

// Alan ekle
const epostali = { ...kullanici, eposta: "ali@ornek.com" };

// Alan sil (rest ile)
const { yas, ...yassiz } = kullanici;

// İç içe nesne güncelle: HER seviyeyi ayrıca kopyala
const tasinmis = {
  ...kullanici,
  adres: { ...kullanici.adres, ilce: "Beşiktaş" },
};

console.log("orijinal:", kullanici);
console.log("güncel:", buyumus, epostali, yassiz, tasinmis);

// TUZAK: spread SIĞ (shallow) kopyadır. İç nesne hâlâ ortak referanstır:
const sigKopya = { ...kullanici };
console.log("adres ortak mı?", sigKopya.adres === kullanici.adres); // true!
// Derin kopya gerekiyorsa: structuredClone(kullanici)

// ================= DİZİLER =================
// Mutasyon yapan metotlar (React state'inde KULLANMA):
//   push, pop, shift, unshift, splice, sort, reverse, arr[i] = x
// Yerine:

// Ekle (sona / başa)
const sonaEkli = [...urunler, { id: 9, ad: "Hoparlör", fiyat: 900, kategori: "aksesuar", stok: 3 }];
const basaEkli = [{ id: 0, ad: "Mousepad", fiyat: 150, kategori: "aksesuar", stok: 20 }, ...urunler];

// Sil -> filter
const mousesuz = urunler.filter((u) => u.id !== 2);

// Güncelle -> map (eşleşeni değiştir, diğerlerini aynen döndür)
const stokGuncel = urunler.map((u) => (u.id === 2 ? { ...u, stok: 50 } : u));

// Araya ekle -> slice + spread (veya toSpliced)
const arayaEkli = [...urunler.slice(0, 2), { id: 99, ad: "Araya", fiyat: 1, kategori: "x", stok: 1 }, ...urunler.slice(2)];

console.log("uzunluklar:", urunler.length, sonaEkli.length, basaEkli.length, mousesuz.length, arayaEkli.length);
console.log("Mouse stoğu (orijinal / yeni):", urunler[1].stok, stokGuncel[1].stok);

// Modern alternatifler (yeni dizi döndürür): toSorted, toReversed, toSpliced, with
console.log("with ile 0. eleman:", urunler.with(0, { ...urunler[0], fiyat: 999 })[0]);

// ---------- Gün 1 hatırlatması: = ile === farkı ----------
// map içinde koşul yazarken `u.id = 5` ATAMADIR ve her zaman truthy döner
// -> tüm elemanlar güncellenir. Karşılaştırma için `u.id === 5` kullan.
