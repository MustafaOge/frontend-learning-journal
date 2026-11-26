// App: kök component. Bugünün ders component'lerini ve alıştırmayı alt alta diziyor.

import UseState from "./dersler/01-UseState";
import Olaylar from "./dersler/02-Olaylar";
import ControlledInput from "./dersler/03-ControlledInput";
import Immutability from "./dersler/04-Immutability";
import StateYukariTasima from "./dersler/05-StateYukariTasima";
import Magaza from "./alistirma/Magaza";

function App() {
  return (
    <main>
      <h1>Gün 5: State ve olaylar</h1>

      <UseState />
      <Olaylar />
      <ControlledInput />
      <Immutability />
      <StateYukariTasima />

      <h2>Alıştırma: Mağaza</h2>
      <Magaza />
    </main>
  );
}

export default App;
