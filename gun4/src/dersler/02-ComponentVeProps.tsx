// 02 - COMPONENT VE PROPS

// "import type": sadece tip import ediyoruz, derlenince bu satır tamamen silinir.
import type { ReactNode } from "react";
//
// =====================================================================
//  1) COMPONENT NEDİR?
// =====================================================================
//
// Component, JSX döndüren sıradan bir fonksiyondur. Bu kadar. Sınıf yok,
// kalıtım yok, base class yok.
//
// İki kural:
//   a) İsmi BÜYÜK harfle başlar: SiparisSatiri, ProductCard.
//      React <div> gibi küçük harfli etiketleri HTML etiketi, <SiparisSatiri>
//      gibi büyük harflileri component sanar. Küçük harfle yazarsan çalışmaz.
//   b) Kullanırken fonksiyon gibi ÇAĞIRMAZSIN, etiket gibi YAZARSIN:
//      YANLIŞ: {SiparisSatiri()}
//      DOĞRU:  <SiparisSatiri />
//
// Component'ler birbirini kullanır ve bir ağaç oluşturur:
//   App → ComponentVeProps → SiparisSatiri (x3)
// C#'ta büyük bir metodu küçük metotlara bölmek gibi: ekranı küçük, tek işi
// olan parçalara bölersin.

// =====================================================================
//  2) PROPS NEDİR?
// =====================================================================
//
// Props (properties), bir component'e DIŞARIDAN verilen verilerdir.
// HTML'deki özelliklere (<img src="...">) benzer şekilde yazılır:
//
//   <SiparisSatiri siparisNo={1001} musteri="Ayşe" />
//
// React bunları TEK BİR NESNEDE toplayıp fonksiyona ilk parametre olarak verir:
//   SiparisSatiri({ siparisNo: 1001, musteri: "Ayşe" })
//
// C# gözüyle: metot parametresi gibi, ama hepsi tek bir "parametre nesnesi"
// içinde geliyor. Bir request DTO'su gibi düşün.

// =====================================================================
//  3) PROPS'A TİP VERMEK (Gün 3'teki interface burada işe yarıyor)
// =====================================================================
//
// Props nesnesinin şeklini bir interface ile tarif edersin. Gelenek:
// "<ComponentAdı>Props" diye isimlendirmek.

interface SiparisSatiriProps {
  siparisNo: number;
  musteri: string;
  tutar: number;
  not?: string; //            opsiyonel prop: verilmezse undefined
  paraBirimi?: string; //     opsiyonel, aşağıda varsayılan değer veriyoruz
}

// Parametrede DESTRUCTURING (Gün 1) yapıyoruz: props.musteri yerine direkt musteri.
// paraBirimi = "₺" → verilmezse varsayılan değer. C#'taki
// void Metot(string paraBirimi = "₺") ile aynı.
function SiparisSatiri({ siparisNo, musteri, tutar, not, paraBirimi = "₺" }: SiparisSatiriProps) {
  return (
    <div className="kutu">
      <strong>#{siparisNo}</strong> {musteri}: {tutar.toLocaleString("tr-TR")} {paraBirimi}
      {/* not varsa göster. Bu && kalıbı 04'te detaylı anlatılıyor. */}
      {not && <div className="soluk">Not: {not}</div>}
    </div>
  );
}

// Destructuring yapmadan da yazılabilir, aynı şey:
//   function SiparisSatiri(props: SiparisSatiriProps) {
//     return <div>{props.musteri}</div>;
//   }
// Topluluk genelde destructuring'i tercih eder, hangi prop'ların kullanıldığı
// imzadan okunur.

// =====================================================================
//  4) PROPS SALT OKUNURDUR
// =====================================================================
//
// Bir component kendi props'unu ASLA değiştirmez:
//   musteri = "başkası";   // YAPMA
// Props, veriyi veren (üst) component'e aittir. Değişmesi gerekiyorsa üst
// component yeni bir değerle tekrar çizer. (Gün 2'deki "değiştirmeden
// güncelleme" fikrinin React'teki karşılığı. Değişen veri için "state"
// kullanılır, o yarının konusu.)
//
// Veri akışı TEK YÖNLÜDÜR: yukarıdan aşağıya, üst component'ten alta.

// =====================================================================
//  5) children: etiketlerin ARASINA yazılan içerik
// =====================================================================
//
// <Kart>buraya yazılan her şey</Kart> → Kart'a "children" adlı prop olarak gelir.
// Tipi React.ReactNode: JSX, metin, sayı, null... ekrana çizilebilecek her şey.
// Razor'daki @RenderBody() gibi: "içeriği dışarıdan al, ben sadece çerçeveyim."

// (ReactNode tipini dosyanın en üstünde import ettik. import'lar hep en üstte durur.)

interface KartProps {
  baslik: string;
  children: ReactNode;
}

function Kart({ baslik, children }: KartProps) {
  return (
    <section className="kart">
      <h3>{baslik}</h3>
      {children}
    </section>
  );
}

// =====================================================================
//  6) KULLANIM
// =====================================================================

export default function ComponentVeProps() {
  return (
    <>
      <h2>02 - Component ve Props</h2>

      <Kart baslik="Son siparişler">
        {/* Metin prop'ları tırnakla, diğer her şey { } ile verilir */}
        <SiparisSatiri siparisNo={1001} musteri="Ayşe" tutar={1250} />
        <SiparisSatiri siparisNo={1002} musteri="Mehmet" tutar={32000} not="Hediye paketi" />
        <SiparisSatiri siparisNo={1003} musteri="Zeynep" tutar={99.9} paraBirimi="$" />
      </Kart>

    </>
  );
}

// ---------------------------------------------------------------------
//  KENDİN DENE:
//  1) Bir <SiparisSatiri>'ndan tutar'ı sil. TypeScript ne diyor? (Zorunlu prop)
//  2) tutar="1250" yaz (tırnakla). Neden hata? "1250" ile {1250} farkı ne?
//  3) SiparisSatiri'nın adını siparisSatiri yap (küçük harf). Ne oluyor?
//  4) Kart'a children vermeden <Kart baslik="Boş" /> yaz. Hata mı?
//     children'ı opsiyonel (children?: ReactNode) yapınca düzeliyor mu?
// ---------------------------------------------------------------------
