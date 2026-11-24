// 06 - ALIŞTIRMA: Gün 2'yi TypeScript'e çevir
// Çalıştır: node 06-alistirma-gun2-ts.ts
// Tip kontrolü: npm run kontrol
//
// Önce moduller/urunler.ts içindeki GÖREV 0'ı yap (Urun tipi).
// Sonra ../gun2/06-alistirma.js dosyasındaki çözümlerini buraya kopyala ve
// TypeScript'e çevir. Amaç: kodda "any" ve tip hatası kalmasın.
//
// Dikkat edeceğin noktalar:
//   - Gün 2'de "var" kullandığın yerler vardı. Burada hepsini const/let yap.
//   - GÖREV 4'te ilkArananUrun.ad yazmıştın. TS bunu kabul edecek mi? Neden?
//   - GÖREV 7-9: fetch cevapları için User ve Post interface'leri yaz
//     (alanlara jsonplaceholder'dan gelen cevaba bakarak karar ver,
//     sadece kullandığın alanları yazman yeterli).
//   - kullaniciPostlariniGetir(id) fonksiyonunun parametresi ve dönüş tipi ne olmalı?
//   - catch (error) içinde error.message yazmıştın. TS'te error'ın tipi unknown.
//     03 numaralı dosyanın sonundaki çözüme bak.
//
// Bonus: ../gun2/07-ek-alistirmalar.js'deki EK 2 (sepet) fonksiyonlarını da çevir.
//   SepetKalemi tipi yaz. sepeteEkle'nin dönüş tipi ne?

// Import yolunda .ts uzantısını yazmalısın (Node'un kuralı):
import { urunler } from "./moduller/urunler.ts";

console.log(urunler.length, "ürün yüklendi");

// ================= BÖLÜM A: Dizi metotları =================

// ================= BÖLÜM B: fetch =================
