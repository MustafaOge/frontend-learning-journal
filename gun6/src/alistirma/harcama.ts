// Alıştırmanın verisi ve tipleri. Bu dosyada görev yok, sadece oku.

export type Kategori = "yemek" | "ulaşım" | "fatura" | "eğlence";

// <select> içindeki <option>'ları ve kategori özetini çizmek için
export const kategoriler: Kategori[] = ["yemek", "ulaşım", "fatura", "eğlence"];

export interface Harcama {
  id: number;
  aciklama: string;
  tutar: number;
  kategori: Kategori;
}

// Başlangıç verisi. useState'e bunu ver.
export const ornekHarcamalar: Harcama[] = [
  { id: 1, aciklama: "Market", tutar: 850, kategori: "yemek" },
  { id: 2, aciklama: "Akbil", tutar: 300, kategori: "ulaşım" },
  { id: 3, aciklama: "Elektrik", tutar: 620, kategori: "fatura" },
  { id: 4, aciklama: "Sinema", tutar: 250, kategori: "eğlence" },
  { id: 5, aciklama: "Öğle yemeği", tutar: 180, kategori: "yemek" },
];

// Para formatı: 1250 → "1.250 ₺"
export function tl(tutar: number): string {
  return `${tutar.toLocaleString("tr-TR")} ₺`;
}
