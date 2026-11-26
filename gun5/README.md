# Gün 5: State ve olaylar

Gün 4'ün proje ayarları kopyalandı. `ProductCard` ve `ProductList` Gün 4'teki çözümler,
bugün bunlara state bağlıyoruz.

## Çalıştırma

```bash
cd gun5
npm install      # ilk seferde
npm run dev      # http://localhost:5173
npm run build    # tip kontrolü (hata vermemeli)
npm run lint     # hook kurallarını da kontrol eder
```

## Okuma sırası

1. [src/dersler/01-UseState.tsx](src/dersler/01-UseState.tsx): butona basınca ekranın değişmesi, `useState`
2. [src/dersler/02-Olaylar.tsx](src/dersler/02-Olaylar.tsx): `onClick`, `onChange`
3. [src/dersler/03-ControlledInput.tsx](src/dersler/03-ControlledInput.tsx): input'u state'e bağlamak, **gereksiz state**
4. [src/dersler/04-Immutability.tsx](src/dersler/04-Immutability.tsx): **state'i doğrudan değiştirmemek**
5. [src/dersler/05-StateYukariTasima.tsx](src/dersler/05-StateYukariTasima.tsx): alt component'ten üste haber vermek (fonksiyon prop'u)
6. **Alıştırma:** [src/alistirma/Magaza.tsx](src/alistirma/Magaza.tsx) ile başla, GÖREV numaralarını takip et

## Bugünün 3 kuralı

1. Ekranı değiştirecek veri **state**'te durur, normal değişkende değil.
2. State'i **yerinde değiştirme**, yeni dizi/nesne ver. (`push` yerine `[...a, x]`, `obj.x = y` yerine `{ ...obj, x: y }`)
3. Hesaplanabilen değeri **state'e koyma**, render sırasında hesapla.

## C# / .NET karşılıkları

| React | .NET karşılığı (yaklaşık) |
|---|---|
| `onClick={kaydet}` | `button.Click += Kaydet;` |
| `{ ...obj, ad: "Ali" }` | record `with { Ad = "Ali" }` |
| `arr.map` / `filter` / `[...arr, x]` | LINQ `Select` / `Where` / `Append` |
| React'in "aynı dizi mi?" kontrolü | `ReferenceEquals` |
| Türetilmiş değer | `public int Count => Items.Count;` |
| Fonksiyon prop'u (`onSepeteEkle`) | `event Action<Urun>` |

## AI ile review

Alıştırmayı bitirince şunu sor:
> "state'i yanlış mı güncelliyorum, gereksiz state var mı?"

## Kaynak

- [react.dev: Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [react.dev: Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [react.dev: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
