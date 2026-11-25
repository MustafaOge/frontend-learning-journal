// App: kök component. main.tsx bunu ekrana çiziyor, ekrandaki her şey buradan başlıyor.
// Bugün sadece ders component'lerini ve alıştırmayı alt alta diziyor.

// Dosya adı sayıyla başlıyor ama import ederken istediğimiz ismi verebiliyoruz:
// "export default" edilen şeyin adı import eden tarafta belirlenir.
import JsxKurallari from "./dersler/01-JsxKurallari";
import ComponentVeProps from "./dersler/02-ComponentVeProps";
import ListeRender from "./dersler/03-ListeRender";
import KosulluRender from "./dersler/04-KosulluRender";
import ProductList from "./alistirma/ProductList";
import Bonus from "./alistirma/Bonus";
import { urunler } from "./alistirma/urunler"; // named export, süslü parantezle

function App() {
  return (
    <main>
      <h1>Gün 4: İlk React projesi</h1>

      <JsxKurallari />
      <ComponentVeProps />
      <ListeRender />
      <KosulluRender />

      <h2>Alıştırma: Ürün listesi</h2>
      <ProductList urunler={urunler} />

      <Bonus />
    </main>
  );
}

export default App;
