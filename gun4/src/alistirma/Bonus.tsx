// BONUS: ProductList'i tekrar kullanmak
// Ekranda görmek için: npm run dev  → sayfanın en altı "Bonus"
//
// B1) Stokta olanlar / Tükenenler: iki ayrı dizi hazırlayıp ProductList'i iki kez
//     çizmek. ProductList'e tek satır dokunmadan iki farklı liste elde edildi.

import ProductList from "./ProductList";
import { urunler } from "./urunler";

export default function Bonus() {
  const stoktaOlanlar = urunler.filter((urun) => urun.stok > 0)
  const tukenenler = urunler.filter((urun) => urun.stok < 1)

  return (
    <>
      <h2>Bonus</h2>
      <h3>B1</h3>
      <h4>Stokta olanlar</h4>
      <ProductList urunler={stoktaOlanlar} />
      <h4>Tükenenler</h4>
      <ProductList urunler={tukenenler} />
    </>
  );
}
