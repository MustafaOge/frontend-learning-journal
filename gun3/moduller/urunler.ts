// Gün 2'deki ürün verisi, bu sefer TypeScript.
// GÖREV 0 (06-alistirma'dan önce): Aşağıdaki Urun tipini doldur ve export et,
// sonra urunler dizisine tipini ver: export const urunler: Urun[] = [...]
// Dikkat: etiketler sadece bir üründe var. Kategori için union tip kullan.

export const urunler = [
  { id: 1, ad: "Klavye", fiyat: 750, kategori: "aksesuar", stok: 12 },
  { id: 2, ad: "Mouse", fiyat: 350, kategori: "aksesuar", stok: 0 },
  { id: 3, ad: "Monitör", fiyat: 6200, kategori: "ekran", stok: 4 },
  { id: 4, ad: "Laptop", fiyat: 32000, kategori: "bilgisayar", stok: 2 },
  { id: 5, ad: "Kulaklık", fiyat: 1200, kategori: "aksesuar", stok: 7, etiketler: ["kablosuz", "bluetooth"] },
  { id: 6, ad: "Tablet", fiyat: 14500, kategori: "bilgisayar", stok: 0 },
  { id: 7, ad: "Webcam", fiyat: 1800, kategori: "aksesuar", stok: 9 },
  { id: 8, ad: "Projeksiyon", fiyat: 21000, kategori: "ekran", stok: 1 },
];
