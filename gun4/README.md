# Gün 4: İlk React projesi, component ve props

Bu klasör `npm create vite@latest gun4 -- --template react-ts` ile oluşturuldu.
Vite'ın demo sayacı ve logoları silindi, yerine bugünün ders ve alıştırma dosyaları kondu.

## Çalıştırma

```bash
cd gun4
npm install      # ilk seferde
npm run dev      # http://localhost:5173 , dosyayı kaydedince sayfa kendini yeniler (HMR)
npm run build    # tip kontrolü + üretim derlemesi (asıl test bu: hata vermemeli)
```

## Okuma sırası

1. Bu dosyadaki **klasör yapısı** bölümü
2. [src/dersler/01-JsxKurallari.tsx](src/dersler/01-JsxKurallari.tsx)
3. [src/dersler/02-ComponentVeProps.tsx](src/dersler/02-ComponentVeProps.tsx)
4. [src/dersler/03-ListeRender.tsx](src/dersler/03-ListeRender.tsx)
5. [src/dersler/04-KosulluRender.tsx](src/dersler/04-KosulluRender.tsx)
6. **Alıştırma:** [src/alistirma/](src/alistirma/) içindeki `ProductCard.tsx` ve `ProductList.tsx`

Her ders dosyası aynı zamanda ekranda görünen bir component. `npm run dev` açıkken
dosyayı değiştir, kaydet ve tarayıcıda sonucu gör. Okumanın en iyi yolu bu.

## Klasör yapısı

```
gun4/
├── index.html            Tek HTML sayfası. İçinde boş bir <div id="root"> var.
├── package.json          Bağımlılıklar ve script'ler (.csproj + dotnet CLI komutları gibi)
├── vite.config.ts        Vite ayarları (dev server, build). Şimdilik sadece React eklentisi.
├── tsconfig.json         Kök tsconfig, asıl ayarlar aşağıdaki ikisinde:
├── tsconfig.app.json       src/ altındaki uygulama kodu için (tarayıcıda çalışır)
├── tsconfig.node.json      vite.config.ts için (Node'da çalışır)
├── .oxlintrc.json        Linter ayarları (npm run lint)
├── public/               Olduğu gibi kopyalanan statik dosyalar (favicon vb.)
└── src/
    ├── main.tsx          GİRİŞ NOKTASI (Program.cs gibi)
    ├── App.tsx           Kök component. Ekrandaki her şey buradan başlar.
    ├── index.css         Global stiller
    ├── dersler/          Bugünün anlatım dosyaları
    └── alistirma/        Bugünün alıştırması
```

### Uygulama nasıl açılıyor?

1. Tarayıcı `index.html`'i yükler. Sayfada boş bir `<div id="root">` vardır.
2. `index.html` içindeki `<script type="module" src="/src/main.tsx">` çalışır.
3. `main.tsx`, `createRoot(document.getElementById('root')!)` ile o div'i alır ve
   içine `<App />` component'ini çizer.
4. `App` başka component'leri, onlar da başkalarını çizer. Sonuçta bir **component ağacı** oluşur.

Backend'den bir fark: sunucu HTML üretmiyor. Tarayıcıya boş bir sayfa ve JS gidiyor,
ekranı JS çiziyor (SPA, Single Page Application). `npm run build` sonrası `dist/` klasörü
sadece statik dosyalardır, herhangi bir statik sunucudan (Nginx, Vercel, Netlify) servis edilebilir.

### `main.tsx` içindeki iki detay

- `document.getElementById('root')!` sonundaki `!`: Gün 3'teki **non-null assertion**.
  `getElementById` `HTMLElement | null` döner. "Ben eminim, null değil" diyoruz.
  C#'taki `= null!` ile aynı fikir.
- `<StrictMode>`: Sadece geliştirme ortamında çalışan bir kontrol modu. Bazı şeyleri
  bilerek **iki kez** çalıştırır ki hataları erken yakalasın. İleride `console.log`'larının
  iki kez yazdığını görünce şaşırma, sebebi bu.

### C# / .NET karşılıkları

| Frontend | .NET karşılığı (yaklaşık) |
|---|---|
| `package.json` | `.csproj` (bağımlılıklar) |
| `npm install` | `dotnet restore` |
| `npm run dev` | `dotnet watch run` |
| `npm run build` | `dotnet publish` |
| `node_modules/` | NuGet paket önbelleği (ama proje içinde, git'e girmez) |
| `main.tsx` | `Program.cs` |
| Component | Razor partial view / Blazor component |
| Props | Bir metoda verilen parametreler, ya da bir view'a giden model |

## Kaynak

- [react.dev: Quick Start](https://react.dev/learn)
- [react.dev: Describing the UI](https://react.dev/learn/describing-the-ui)
