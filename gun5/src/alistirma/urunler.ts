// Gün 2-3'teki ürün verisi. Bu sefer tipi hazır (Gün 3 GÖREV 0'ın cevabı).
// Henüz API yok: veri sabit bir dizi. 2. haftada bunun yerini
// backend'den (OrderInventory) gelen ProductDto[] alacak.

export type Kategori = "aksesuar" | "ekran" | "bilgisayar";

export interface Urun {
  id: number;
  ad: string;
  fiyat: number;
  kategori: Kategori;
  stok: number;
  etiketler?: string[];
}

export const urunler: Urun[] = [
  { id: 1, ad: "Klavye", fiyat: 750, kategori: "aksesuar", stok: 12 },
  { id: 2, ad: "Mouse", fiyat: 350, kategori: "aksesuar", stok: 0 },
  { id: 3, ad: "Monitör", fiyat: 6200, kategori: "ekran", stok: 4 },
  { id: 4, ad: "Laptop", fiyat: 32000, kategori: "bilgisayar", stok: 2 },
  { id: 5, ad: "Kulaklık", fiyat: 1200, kategori: "aksesuar", stok: 7, etiketler: ["kablosuz", "bluetooth"] },
  { id: 6, ad: "Tablet", fiyat: 14500, kategori: "bilgisayar", stok: 0 },
  { id: 7, ad: "Webcam", fiyat: 1800, kategori: "aksesuar", stok: 9 },
  { id: 8, ad: "Projeksiyon", fiyat: 21000, kategori: "ekran", stok: 1 },
];
