// 06 - ALIŞTIRMA: Dizi metotları + fetch
// Çalıştır: node 06-alistirma.js
// Her görevin altına kodunu yaz, sonucu console.log ile yazdır.
// Bitirince bana "review et" de, birlikte bakalım.

import { urunler } from "./moduller/urunler.js";

// ================= BÖLÜM A: Dizi metotları =================

// GÖREV 1: Fiyatı 5000 TL'den yüksek olan (pahalı) ürünleri filter ile bul.

const pahaliUrunler = urunler.filter(u => u.fiyat > 5000);
console.log(pahaliUrunler);

// GÖREV 2: Pahalı ürünlerin sadece isimlerini map ile listele.
//          Beklenen: ["Monitör", "Laptop", "Tablet", "Projeksiyon"]

const pahaliUrunIsimleri = urunler.filter(u => u.fiyat > 5000).map(u => u.ad);
console.log(pahaliUrunIsimleri);

// GÖREV 3: Tüm ürünlerin toplam fiyatını reduce ile hesapla ve
//          "Toplam: ... TL" şeklinde yazdır.

const toplamFiyat = urunler.reduce((toplam, u) => toplam + u.fiyat, 0);
console.log(`Toplam: ${toplamFiyat} TL`)

// GÖREV 4: id'si 7 olan ürünü find ile bul ve adını yazdır.
//          Sonra id'si 42 olanı ara; programı patlatmadan "bulunamadı" yazdır.

const ilkArananUrun = urunler.find(u => u.id === 7);
console.log(`id 7 olan ürün: ${ilkArananUrun.ad}`);

const ikinciArananUrun = urunler.find(u => u.id === 42);

console.log(ikinciArananUrun?.ad ?? "bulunamadı");


// GÖREV 5: some ile "stokta olmayan ürün var mı?", every ile
//          "tüm ürünlerin fiyatı 100 TL'nin üstünde mi?" sorularını cevapla.

const stoktaOlmayanUrunVarMi = urunler.some(u => u.stok <= 0);
console.log(`stokta olmayan urun var mı: ${stoktaOlmayanUrunVarMi}`);
var tumUrunFiyatıYuzTlUstundeMı = urunler.every(u => u.fiyat > 100);
console.log(`tum Urun Fiyatı Yuz Tl Ustunde Mı: ${tumUrunFiyatıYuzTlUstundeMı}`);


// GÖREV 6: Orijinal diziyi BOZMADAN, stoğu 0 olan ürünlerin stoğunu 10 yap.
//          Orijinal dizideki Mouse stoğunun hâlâ 0 olduğunu kontrol et.


const stokuGuncellenmisUrunler = urunler.map((u) => (u.stok === 0 ? { ...u, stok: 10 } : u));

console.log(stokuGuncellenmisUrunler);
console.log(urunler);

// ================= BÖLÜM B: fetch =================
const API = "https://jsonplaceholder.typicode.com";

// GÖREV 7: /users adresine fetch at, gelen kullanıcıların sadece isimlerini yazdır.
//          response.ok kontrolünü ve try/catch'i unutma.

const kullaniciGetir = async () => {
    const response = await fetch(`${API}/users`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
};

try {
    var kullanicilar = await kullaniciGetir();
    console.log("kullanıcı:", kullanicilar.map(u => u.name));
} catch (error) {
    console.log("hata:", error.message);

}


// GÖREV 8: /posts?userId=1 adresinden 1 numaralı kullanıcının postlarını çek.
//          Kaç post olduğunu ve ilk postun başlığını yazdır.

// ---------- POST örneği ----------
const kullaniciPostlariniGetir = async (id) => {
    const response = await fetch(`${API}/posts?userId=${id}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
};

try {
    var kullaniciPostlari = await kullaniciPostlariniGetir(1);
    console.log("post sayısı:", kullaniciPostlari.length);
    console.log("ilk postun başlığı:", kullaniciPostlari[0].title);

} catch (error) {
    console.log("hata:", error.message);

}

// GÖREV 9 (bonus): /users/1 ve /posts?userId=1 isteklerini Promise.all ile
//          PARALEL at. "Leanne Graham 10 post yazmış" gibi bir cümle yazdır.

// Paralel (hızlı): birbirine bağımlı değilse Promise.all kullan

const kullaniciyiGetir = async (id) => {
    const response = await fetch(`${API}/users/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
};

try {

    const [kullanici, kullaniciPostlari] = await Promise.all([kullaniciyiGetir(1), kullaniciPostlariniGetir(1)]);

    console.log(`kullanici ismi:${kullanici.name} kullanici posltarı: ${kullaniciPostlari.length}`);


} catch (error) {
    console.log("hata:", error.message);

}