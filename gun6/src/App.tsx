// App: kök component. Bugünün ders component'lerini ve alıştırmayı alt alta diziyor.

import RenderAni from "./dersler/01-RenderAni";
import HataAvi from "./dersler/02-HataAvi";
import Harcamalar from "./alistirma/Harcamalar";

function App() {
  return (
    <main>
      <h1>Gün 6: State pekiştirme</h1>

      <RenderAni />
      <HataAvi />

      <h2>Alıştırma: Harcama takibi</h2>
      <Harcamalar />
    </main>
  );
}

export default App;
