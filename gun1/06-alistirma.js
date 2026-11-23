// 06 - ALIŞTIRMA: Ürün listesiyle destructuring ve spread
// Çalıştır: node 06-alistirma.js
// Her görevin altına kodunu yaz, sonucu console.log ile yazdır.

import { urunler } from "./moduller/urunler.js";

console.log("Tüm ürünler:", urunler);

// GÖREV 1: Dizi destructuring ile ilk iki ürünü `birinci` ve `ikinci`,
//          geri kalanları `digerleri` değişkenine al.

const [birinci, ikinci] = urunler;
const [, , ...digerleri] = urunler;

console.log(birinci, ikinci);
console.log(digerleri);




// GÖREV 2: Nesne destructuring ile ilk ürünün `ad` ve `fiyat` alanlarını al
//          ve template literal ile "Klavye: 750 TL" şeklinde yazdır.

const { ad, fiyat } = urunler[0];
console.log(`${ad}: ${fiyat} TL`);

// GÖREV 3: `urunAciklamasi` adında bir arrow function yaz. Parametrede
//          destructuring kullanarak ({ ad, fiyat, stok }) şu metni döndürsün:
//          "Klavye - 750 TL (12 adet)". Stok 0 ise "(tükendi)" yazsın.
//          Sonra tüm ürünler için map ile çalıştır.

const urunAciklamasi = (ad, fiyat, stok) => {
    const mesaj = stok > 0 ? `${ad} - ${fiyat} TL (${stok} adet)` : `${ad} ${fiyat} TL  (Tükendi)`;

    return mesaj;
};

console.log(urunler.map(({ ad, fiyat, stok }) => urunAciklamasi(ad, fiyat, stok)));


// GÖREV 4: Spread ile ORİJİNAL DİZİYİ BOZMADAN listeye yeni bir ürün ekle
//          (ör. { id: 6, ad: "Webcam", ... }). İki dizinin uzunluğunu yazdır.

const yeniUrunler = [...urunler, { id: 6, ad: "Webcam", fiyat: 6200, kategori: "Harici", stok: 12 }]

console.log(`ilk liste uzunluğu: ${urunler.length}`)
console.log(`ikinci liste uzunluğu: ${yeniUrunler.length}`)


// GÖREV 5: Spread ile tüm ürünlere %10 zam yapılmış YENİ bir dizi oluştur.
//          İpucu: urunler.map(u => ({ ...u, fiyat: ... }))
//          Orijinal fiyatların değişmediğini kontrol et.

const zamliUrunler = urunler.map(u => ({ ...u, fiyat: u.fiyat + u.fiyat * 0.1 }))

console.table(urunler.map(({ ad, fiyat }) => ({ ad, fiyat })));
console.table(zamliUrunler.map(({ ad, fiyat }) => ({ ad, fiyat })));

// GÖREV 6: Rest ile her üründen `stok` alanını çıkarıp kalan alanlarla
//          yeni bir dizi oluştur.

const stoksuzUrunler = urunler.map(({ stok, ...kalanAlanlar }) => kalanAlanlar);
console.log(stoksuzUrunler);

// GÖREV 7 (bonus): Kulaklık ürününün `etiketler` dizisine spread ile
//          "gürültü engelleme" ekle. Orijinal nesne ve dizi değişmesin.

const guncelUrunler = urunler.map((u) =>
    u.id = 5 ? {
        ...u, etiketler: [...(u.etiketler ?? []), "gürültü engelleme"],
    } : u);

console.log(guncelUrunler);


// GÖREV 8 (bonus): Stokta olan ürünlerin toplam değerini (fiyat * stok)
//          filter + reduce ile hesapla ve "Toplam stok değeri: ... TL" yazdır.

const toplamStokDegeri = urunler.filter((u) => u.stok > 0)
    .reduce((toplam, u) => toplam + u.fiyat * u.stok, 0);

console.log(`Toplam stok değeri: ${toplamStokDegeri} TL`);