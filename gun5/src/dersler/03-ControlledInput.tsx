// 03 - CONTROLLED INPUT ve GEREKSİZ STATE
//
// Alıştırmadaki arama kutusu tam olarak bu dosyanın konusu.

import { useState } from "react";

// =====================================================================
//  ADIM 1: Input'u state'e bağlamak
// =====================================================================
//
// Bir input'u state'e bağlamak için iki şey yazarsın:
//
//   value={ad}                              → input'ta ad state'i görünsün
//   onChange={(e) => setAd(e.target.value)} → yazılınca ad state'i güncellensin
//
// Buna "controlled input" denir. Input'un değeri her zaman state'te duruyor.
//
// "A" tuşuna basınca sırayla ne oluyor?
//   1. onChange çalışır → setAd("A")
//   2. React component'i tekrar çalıştırır, artık ad = "A"
//   3. value={ad} olduğu için input "A" gösterir

function AdOrnegi() {
  const [ad, setAd] = useState("");

  return (
    <div className="kutu">
      <div className="satir">
        <input type="text" value={ad} onChange={(e) => setAd(e.target.value)} />
        {/* ADIM 2: Değeri koddan değiştirmek */}
        <button onClick={() => setAd("")}>Temizle</button>
      </div>
      <div>Merhaba, {ad || "..."}</div>
    </div>
  );
}

// =====================================================================
//  ADIM 2: Bunun faydası ne?
// =====================================================================
//
// Değer state'te olduğu için:
//   - Yazılan metni her an kullanabilirsin (yukarıdaki "Merhaba, ..." satırı)
//   - Input'u koddan değiştirebilirsin: Temizle butonu sadece setAd("") yapıyor,
//     input kendiliğinden boşalıyor.

// =====================================================================
//  ADIM 3: Diğer input türleri
// =====================================================================
//
// Hepsi aynı fikir, sadece küçük farklar var:
//
//   Sayı input'u:  e.target.value hep METİN gelir ("5"). Sayıya çevir:
//                  setAdet(Number(e.target.value))
//
//   Checkbox:      value yerine checked, e.target.value yerine e.target.checked
//                  checked={hediye}  onChange={(e) => setHediye(e.target.checked)}
//
//   Select:        text input ile aynı: value + e.target.value

function DigerTurler() {
  const [adet, setAdet] = useState(1);
  const [hediye, setHediye] = useState(false);
  const [kargo, setKargo] = useState("standart");

  return (
    <div className="kutu">
      <div className="satir">
        Adet:
        <input
          type="number"
          min={1}
          value={adet}
          onChange={(e) => setAdet(Number(e.target.value))}
        />
      </div>
      <div className="satir">
        <label>
          <input type="checkbox" checked={hediye} onChange={(e) => setHediye(e.target.checked)} />{" "}
          Hediye paketi
        </label>
      </div>
      <div className="satir">
        Kargo:
        <select value={kargo} onChange={(e) => setKargo(e.target.value)}>
          <option value="standart">Standart</option>
          <option value="hizli">Hızlı</option>
        </select>
      </div>
      <div className="soluk">
        {adet} adet, {hediye ? "hediye paketli" : "hediye paketi yok"}, {kargo} kargo
      </div>
    </div>
  );
}

// =====================================================================
//  ADIM 4: onChange'i unutursan
// =====================================================================
//
//   <input value={ad} />      ← onChange yok
//
// Input'a yazamazsın, kilitlenir. Çünkü yazınca state değişmiyor, input hep
// state'teki eski değeri gösteriyor. Konsolda da uyarı çıkar.
// value yazdıysan onChange'i de yaz.

// =====================================================================
//  ADIM 5: GEREKSİZ STATE (alıştırma için en önemli kısım)
// =====================================================================
//
// Şehir listesinde arama yapalım. Aklına şöyle iki state gelebilir:
//
//   ✘ const [arama, setArama] = useState("");
//   ✘ const [bulunanlar, setBulunanlar] = useState(sehirler);
//
// Buna GEREK YOK. Sadece arama state'i yeter:
//
//   ✔ const [arama, setArama] = useState("");
//   ✔ const bulunanlar = sehirler.filter(...);   ← normal const, state değil
//
// Neden çalışıyor? 01'deki ADIM 3'ü hatırla:
//   1. "an" yazılır → setArama("an")
//   2. React component'i BAŞTAN çalıştırır
//   3. const bulunanlar = ... satırı da tekrar çalışır, "an" ile yeniden hesaplanır
//
// Yani bulunanlar her seferinde kendiliğinden güncel.
//
// Kural: Bir değeri başka bir state'ten HESAPLAYABİLİYORSAN, onu state yapma.
//
// C# gözüyle: Bir sınıfta Items listesi varken ayrıca bir Count alanı tutmazsın.
//   public int Count => Items.Count;   // her seferinde hesaplanır

const sehirler = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Eskişehir"];

function SehirArama() {
  const [arama, setArama] = useState("");

  // State değil, hesaplanan değer.
  // toLocaleLowerCase("tr-TR"): Türkçe harfler için küçük harfe çevirme ("İ" → "i").
  const aranan = arama.trim().toLocaleLowerCase("tr-TR");
  const bulunanlar = sehirler.filter((s) => s.toLocaleLowerCase("tr-TR").includes(aranan));

  return (
    <div className="kutu">
      <input
        type="search"
        className="arama-kutusu"
        placeholder="Şehir ara..."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
      />
      <div className="soluk">
        {bulunanlar.length > 0 ? (`${bulunanlar.length} / ${sehirler.length} şehir`) : ("eşleşen şehir bulunumadı "

        )}
      </div>
      <ul>
        {bulunanlar.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ControlledInput() {
  return (
    <>
      <h2>03 - Controlled input</h2>
      <AdOrnegi />
      <DigerTurler />
      <SehirArama />
    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) AdOrnegi'nde onChange'i sil. Input'a yazabiliyor musun? (Sonra geri al.)
//  2) SehirArama'da hiçbir şehir bulunamazsa "Sonuç yok" yazsın.
//     (Gün 4'teki koşullu render)
//  3) Number(...) olmadan setAdet(e.target.value) yaz. TS ne diyor?
// ---------------------------------------------------------------------
