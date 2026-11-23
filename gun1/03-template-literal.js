// 03 - Template literal (backtick ` ile yazılır)
// Çalıştır: node 03-template-literal.js
// C#'taki $"Merhaba {isim}" ile aynı mantık, sadece ${ } kullanılır.

const ad = "Ayşe";
const fiyat = 149.9;
const adet = 3;

// Eski yöntem: + ile birleştirme
console.log("Merhaba " + ad + ", toplam: " + fiyat * adet);

// Template literal
console.log(`Merhaba ${ad}, toplam: ${fiyat * adet}`);

// Me Test
console.log(`Merhaba Dünya :${ad}`);

// ${ } içine her türlü ifade yazılabilir
console.log(`Toplam: ${(fiyat * adet).toFixed(2)} TL`);
console.log(`Durum: ${adet > 0 ? "stokta" : "tükendi"}`);

// Çok satırlı metin (C#'taki @"..." veya """ ... """ gibi)
const html = `
<div class="kart">
  <h2>${ad}</h2>
  <p>${adet} ürün</p>
</div>`;
console.log(html);
