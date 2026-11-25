// ALIŞTIRMA 1/2: ProductCard
// Tek bir ürünü kart olarak gösteren component.
// Ekranda görmek için: npm run dev  → sayfanın en altı "Alıştırma"
// Tip kontrolü: npm run build      (hata vermemeli)
// Bitirince bana "review et" de, birlikte bakalım.
//
// Hazır CSS sınıfları (src/index.css içinde, stile vakit harcama):
//   urun-kart          kartın kendisi
//   urun-kart tukendi  stoğu biten kart (soluk görünür). İki sınıf boşlukla yazılır.
//   urun-fiyat         fiyat satırı
//   urun-etiket        küçük gri etiket (kablosuz, bluetooth...)
//   etiket-tukendi     kırmızı "Tükendi" etiketi

import { type Urun } from "./urunler";

// GÖREV 1: Props tipi
//   ProductCard dışarıdan tek bir ürün alsın. Prop'un adı "urun" olsun.
//   (02-ComponentVeProps.tsx'teki SiparisSatiriProps'a bak.)


interface ProductCardProps {
  urun: Urun;
}

export default function ProductCard({ urun }: ProductCardProps) {
  // GÖREV 2: Stok durumunu bir değişkene çıkar
  const tukendi = urun.stok < 1;

  return (
    // GÖREV 3: Kartın içeriği
    //   - Ürün adı (h3)
    //   - Kategori
    //   - Fiyat: "750 ₺" gibi. Binlik ayırıcı için: urun.fiyat.toLocaleString("tr-TR")
    //     32000 → "32.000" olmalı
    //   - Stok adedi: "Stok: 12"
    //
    // GÖREV 4: "Tükendi" etiketi
    //   Stoğu 0 olan üründe <span className="etiket-tukendi">Tükendi</span> göster.
    //   DİKKAT: 04-KosulluRender.tsx'teki "0 tuzağı"nı okurun. {urun.stok && ...}
    //   yazarsan ne olur? Önce bilerek öyle yaz, ekranda gör, sonra düzelt.
    //
    // GÖREV 5: Tükenen kartın className'i "urun-kart tukendi" olsun, diğerleri "urun-kart".
    //   İpucu: className bir metin, { } içinde ternary veya template literal kullanabilirsin.
    //
    // GÖREV 6: Etiketler (opsiyonel alan!)
    //   Sadece Kulaklık'ta var. Varsa her birini <span className="urun-etiket"> olarak listele.
    //   Hem "opsiyonel alan undefined olabilir" (Gün 3) hem map + key (03) burada birleşiyor.
    //   key ne olmalı? Etiketlerin id'si yok. (İpucu: etiketin kendisi benzersizse...)
    //
    // Şimdilik sadece adı gösteriyor ki proje derlensin. Bunu sil, kendi JSX'ini yaz.



    <div className={tukendi ? "urun-kart tukendi" : "urun-kart"}>
      <h3>{urun.ad}</h3>
      <p>{urun.kategori}</p>
      <div className="urun-fiyat">{urun.fiyat.toLocaleString("tr-TR")} TL</div>
      <p> Stok: {urun.stok}</p>
      {urun.etiketler?.map((etiket) => (
        <span key={etiket} className="urun-etiket">{etiket}</span>
      ))}

      {tukendi && <span className="etiket-tukendi">Tükendi</span>}

    </div>

  )
}
