# Gün 6: State pekiştirme

Yeni konu yok. Gün 5'in konusu olan state'i başka örneklerle tekrar ediyoruz.
Proje ayarları Gün 5'ten kopyalandı.

## Çalıştırma

```bash
cd gun6
npm install      # ilk seferde
npm run dev      # http://localhost:5173
npm run build    # tip kontrolü (hata vermemeli)
npm run lint
```

## Okuma sırası

0. **Isınma (10 dk), Gün 5'te:** [../gun5/src/dersler/05-StateYukariTasima.tsx](../gun5/src/dersler/05-StateYukariTasima.tsx)
   dosyasındaki `KitapKarti` hatasını düzelt. Okunan kitabın butonu disabled olsun.
   İki soru: `okundu = true` neden işe yaramıyor? `okundu` bilgisini kim hesaplamalı?
1. [src/dersler/01-RenderAni.tsx](src/dersler/01-RenderAni.tsx): her render bir fotoğraf. Dünkü `console.log` ve beyaz sayfanın sebebi, updater fonksiyon
2. [src/dersler/02-HataAvi.tsx](src/dersler/02-HataAvi.tsx): üç bozuk component. Belirtiyi gör, kuralı bul, düzelt
3. **Alıştırma:** [src/alistirma/Harcamalar.tsx](src/alistirma/Harcamalar.tsx) ile başla, GÖREV numaralarını takip et

## Kurallar (Gün 5 + bugün)

1. Ekranı değiştirecek veri **state**'te durur, normal değişkende değil.
2. State'i **yerinde değiştirme**, yeni dizi/nesne ver.
3. Hesaplanabilen değeri **state'e koyma**, render sırasında hesapla.
4. State, ona ihtiyacı olan component'lerin **en yakın ortak üstünde** durur. Tek component'in ihtiyacıysa onun içinde kalır.
5. `setX` değeri hemen değiştirmez, **sonraki render** için not bırakır. Yeni değer eskisinden hesaplanıyorsa `setX((onceki) => ...)`.
6. `setX` **olaylarda** çağrılır (onClick, onChange), render gövdesinde değil.

## C# / .NET karşılıkları

| React | .NET karşılığı (yaklaşık) |
|---|---|
| Bir render | Bir metot çağrısı, state o çağrının parametresi |
| Render sırasında `setX` | Getter içinden setter çağırmak (sonsuz döngü) |
| `e.target.value as Kategori` | `(Kategori)deger` cast'i |
| `[...liste].sort(...)` | `liste.OrderBy(...)` (orijinale dokunmaz). `liste.sort` ise `List.Sort()` gibi yerinde sıralar |

## Bugün ne zaman "oturdu" sayılır?

- Hata avındaki üç hatayı ipuçlarına bakmadan bulabildiysen,
- Harcama alıştırmasında GÖREV 1-5'i dersten kopyalamadan yazabildiysen,

state konusu tamam, Gün 7'ye geçeriz. GÖREV 6-7 ve bonuslar ekstra.

## AI ile review

Bitirince şunu sor:
> "state'i yanlış mı güncelliyorum, gereksiz state var mı, state doğru component'te mi?"

## Kaynak

- [react.dev: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [react.dev: Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [react.dev: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
