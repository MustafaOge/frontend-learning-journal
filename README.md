# Frontend Learning Journal

C# / .NET backend geçmişimin üzerine **React + TypeScript** öğrenerek full stack geliştiriciye dönüşme sürecimin günlük kaydı.

Her gün bir klasör: konu anlatımlı örnek dosyalar, alıştırmalar ve çözümler. Örneklerde C# karşılıklarını (LINQ, `Task<T>`, `readonly` vb.) not ederek ilerliyorum.

## Yol haritası (~4 hafta)

| Hafta | Odak | Durum |
|---|---|---|
| 1 | JS/TS temelleri, Vite ile React projesi, component / props / state | 🟡 Devam ediyor |
| 2 | `useEffect`, API'den veri çekme, ürün listesi ekranı | ⚪ |
| 3 | Form, routing, sipariş oluşturma ekranı | ⚪ |
| 4 | Hata yönetimi, UI cilası, deploy (Vercel / Netlify) | ⚪ |

Hedef: Kendi .NET backend'ime bağlanan, ürün listeleyen ve sipariş oluşturan bir React + TypeScript uygulaması.

## İlerleme

### Hafta 1

- [x] **[Gün 1](gun1/): Modern JavaScript temelleri**
  `let/const`, arrow function, template literal, destructuring & spread, ES modülleri, C# geliştiricisi için JS tuzakları (`==` / `===`, `null` / `undefined`, `this`)
- [x] **[Gün 2](gun2/): Dizi metotları ve async**
  `map`, `filter`, `find`, `reduce`, `some/every` (LINQ karşılıklarıyla), immutable güncelleme, Promise, `async/await`, `fetch`
- [ ] **Gün 3: TypeScript temelleri**
  Temel tipler, `interface` / `type`, union tipler, generic'ler, backend DTO'larının TS karşılıkları
- [ ] **Gün 4: İlk React projesi**
  Vite + React + TS, JSX, component ve props, liste render etme
- [ ] **Gün 5: State ve olaylar**
  `useState`, event handling, controlled input, immutability
- [ ] **Gün 6: Component'ler arası veri akışı**
  Lifting state up, callback props, arama + sepet uygulaması
- [ ] **Gün 7: Toparlama ve review**

## Çalıştırma

[Node.js](https://nodejs.org/) 18+ gerekir.

```bash
cd gun1
node 01-let-const.js
```

## Kaynaklar

- [react.dev](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
