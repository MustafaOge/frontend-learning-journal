// 05 - async / await ve fetch
// Çalıştır: node 05-async-await-fetch.js   (internet bağlantısı gerekir)
//
// C#'takiyle neredeyse aynı: async fonksiyon her zaman Promise döndürür
// (C#: async Task<T>), await Promise'in bitmesini bekler.
// fetch ≈ HttpClient.GetAsync — tarayıcıda ve Node 18+'da hazır gelir.

const API = "https://jsonplaceholder.typicode.com";

// ---------- Temel fetch: İKİ adım var ----------
// 1) await fetch(...)      -> Response (başlıklar geldi, gövde henüz okunmadı)
// 2) await response.json() -> gövdeyi okuyup JSON'a çevirir (bu da async!)
const kullaniciGetir = async (id) => {
  const response = await fetch(`${API}/users/${id}`);

  // TUZAK: fetch 404/500'de HATA FIRLATMAZ! Sadece ağ hatasında fırlatır.
  // (C#'taki EnsureSuccessStatusCode'u kendin yazman gerekir)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};

// ---------- try / catch ile kullanım ----------
try {
  const kullanici = await kullaniciGetir(1);
  console.log("kullanıcı:", kullanici.name, "-", kullanici.email);
} catch (hata) {
  console.log("hata:", hata.message);
}

// Olmayan kayıt -> 404 -> bizim fırlattığımız hata
try {
  await kullaniciGetir(9999);
} catch (hata) {
  console.log("beklenen hata:", hata.message);
}

// ---------- Gelen veriyi dizi metotlarıyla işle (gerçek hayat bu) ----------
const response = await fetch(`${API}/todos`);
const todos = await response.json();

const tamamlanan = todos.filter((t) => t.completed).length;
console.log(`toplam ${todos.length} görev, ${tamamlanan} tanesi tamamlanmış`);
console.log("ilk 3 başlık:", todos.slice(0, 3).map((t) => t.title));

// ---------- Sıralı vs paralel await ----------
// Sıralı (yavaş): her biri bir öncekini bekler
console.time("sıralı");
const k1 = await kullaniciGetir(1);
const k2 = await kullaniciGetir(2);
console.timeEnd("sıralı");

// Paralel (hızlı): birbirine bağımlı değilse Promise.all kullan
console.time("paralel");
const [p1, p2] = await Promise.all([kullaniciGetir(1), kullaniciGetir(2)]);
console.timeEnd("paralel");
console.log(k1.name === p1.name, k2.name === p2.name);

// ---------- POST örneği ----------
const yeniPost = await fetch(`${API}/posts`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Merhaba", body: "Gün 2", userId: 1 }),
}).then((r) => r.json());
console.log("oluşturulan post (sahte):", yeniPost);

// ---------- TUZAK: map + async ----------
// ids.map(async id => ...) bir Promise DİZİSİ döndürür, sonuç dizisi değil.
// Doğrusu: await Promise.all(ids.map(id => kullaniciGetir(id)))
const isimler = (await Promise.all([3, 4, 5].map(kullaniciGetir))).map((k) => k.name);
console.log("isimler:", isimler);

// React'te: useEffect içinde fetch atıp sonucu setState ile saklayacaksın.
// Bu dosyadaki kalıp (fetch -> ok kontrolü -> json -> try/catch) aynen orada da geçerli.
