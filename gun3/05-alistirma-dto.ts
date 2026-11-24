// 05 - ALIŞTIRMA: Backend DTO'larının TypeScript karşılıkları
// Çalıştır: node 05-alistirma-dto.ts
// Tip kontrolü: npm run kontrol   (asıl test bu: hata vermemeli)
// Bitirince bana "review et" de, birlikte bakalım.
//
// Kaynak: ~/dotnet/OrderInventory/src/OrderInventory.Application/DTOs/
// Hatırlatma: interface'i C# koduna göre değil, API'nin döndüğü JSON'a göre yaz
// (camelCase, DateTime -> string, decimal -> number). 04 numaralı dosyadaki tabloya bak.

// GÖREV 1: ProductDto
//   C#: public record ProductDto(int Id, string name, string sku, decimal price, int StockQuantity);
//   Not: Parametre isimlerinin bazıları büyük, bazıları küçük harfle başlıyor.
//        JSON'da hepsi nasıl görünür? (İpucu: camelCase politikası)

interface ProductDto {
    id: number;
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
}

// GÖREV 2: OrderStatus
//   C#: public enum OrderStatus { Pending = 1, Confirmed, Cancelled }
//   DİKKAT, TUZAK: Backend'inde JsonStringEnumConverter ayarlı değil. Yani API
//   "Pending" değil 1 döndürüyor! İki seçeneğin var:
//     a) TS'te sayıların union'ı: type OrderStatus = 1 | 2 | 3;
//     b) Backend'e JsonStringEnumConverter ekleyip TS'te "Pending" | ... kullanmak
//   İkisini de yaz (birine OrderStatusKodu de), hangisini tercih ettiğini ve
//   nedenini yorum satırı olarak yaz.

type OrderStatus = 1 | 2 | 3;
/*
"Metin tercih ediyorum, çünkü kod okunur oluyor ve enum'un sırası değişirse sayılar kayıyor. Bunun için backend'e converter eklemem gerekiyor."
*/


// GÖREV 3: OrderItemDto
//   C#:
//     public int OrderId { get; set; }
//     public int ProductId { get; set; }
//     public int Quantity { get; set; }
//     public decimal UnitPrice { get; set; }
//     public ProductDto ProductDto { get; set; } = null!;
//   Not: = null! ne anlama geliyordu? Bu alan TS'te opsiyonel mi olmalı?

interface OrderItemDto {
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    productDto: ProductDto;
}

// bunu bilmiyorum

// GÖREV 4: OrderDto
//   C#:
//     public int Id { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public OrderStatus Status { get; set; } = OrderStatus.Pending;
//     public decimal TotalAmount { get; set; }
//     public ICollection<OrderItemDto> OrderItems { get; set; }

interface OrderDto {
    id: number;
    createdAt: string;
    status: OrderStatus;
    totalAmount: number;
    orderItems: OrderItemDto[];
}

// GÖREV 5: Sipariş oluşturma (istek) DTO'ları
//   CreateOrderItemDto { ProductId, Quantity }
//   CreateOrderDto { ICollection<CreateOrderItemDto> OrderItems }
//   Bunlar 3. haftadaki sipariş ekranında backend'e göndereceğin şekil olacak.

interface CreateOrderItemDto {
    productId: number;
    quantity: number;
}

interface CreateOrderDto {
    orderItems: CreateOrderItemDto[];
}

// GÖREV 6: Örnek veri
//   Yazdığın tiplerle bir OrderDto nesnesi oluştur: 2 kalemli bir sipariş.
//   Sonra bilerek hata yap (bir alanı sil, tipini değiştir, olmayan bir status yaz)
//   ve npm run kontrol'ün yakaladığını gör. Sonra düzelt.

const orderDto: OrderDto = {
    id: 1,
    createdAt: "2026-11-24T12:07:00Z",
    status: 2, // Ok
    totalAmount: 250,
    orderItems: [
        {
            orderId: 10,
            productId: 11,
            quantity: 1,
            unitPrice: 100,
            productDto: { // Zorunlu hale gelen product nesnesi eklendi
                id: 11,
                name: "Kablosuz Klavye",
                sku: "KLV-011",
                price: 100,
                stockQuantity: 20
            }
        },
        {
            orderId: 1,
            productId: 12,
            quantity: 1,
            unitPrice: 150,
            productDto: {
                id: 12,
                name: "Kablosuz Mouse",
                sku: "MSE-012",
                price: 150,
                stockQuantity: 35
            }
        }
    ]
};
// GÖREV 7: Fonksiyonlar (tiplerini sen yaz)
//   siparisToplami(siparis)  -> kalemlerden quantity * unitPrice toplamını döndürsün

function siparisToplami(siparis: OrderDto): number {
    let toplam = 0;

    for (const kalem of siparis.orderItems) {
        toplam += kalem.quantity * kalem.unitPrice;
    }

    return toplam;
}

console.log(siparisToplami(orderDto))

//   durumMetni(status)       -> "Onay bekliyor" / "Onaylandı" / "İptal edildi"
//   Hesapladığın toplam, örnek verideki totalAmount ile tutuyor mu? Yazdır.

function durumMetni(orderStatus: OrderStatus): string {
    if (orderStatus === 1) {
        return "Onay bekliyor";
    } else if (orderStatus === 2) {
        return "Tamamlandı";
    } else if (orderStatus === 3) {
        return "İptal Edildi"
    }
    return "bilinmeyen durum"
}




// GÖREV 8 (bonus): Generic sayfalama cevabı
//   Backend'deki GetAllProductsRequest'i (PageNumber, PageSize, SearchName?) TS'e çevir.
//   Backend'inde zaten generic bir PagedResult<T> var (ProductRepository.GetAllProducts
//   bunu döndürüyor). Onu bul, TS'te generic interface olarak yaz ve
//   PagedResult<ProductDto> tipinde örnek bir değer oluştur.


// 1. GetAllProductsRequest karşılığı (SearchName opsiyonel olduğu için '?' eklendi)
interface GetAllProductsRequest {
    pageNumber: number;
    pageSize: number;
    searchName?: string;
}

// 2. Generic PagedResult<T> karşılığı
interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean; // Eklendi
    hasNextPage: boolean;     // Eklendi
}

// 3. PagedResult<ProductDto> tipinde örnek değer
const pagedProducts: PagedResult<ProductDto> = {
    items: [
        {
            id: 1,
            name: "Mekanik Klavye",
            sku: "KLV-101",
            price: 1500,
            stockQuantity: 20
        },
        {
            id: 2,
            name: "Kablosuz Mouse",
            sku: "MSE-202",
            price: 850,
            stockQuantity: 35
        }
    ],
    totalCount: 2,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    hasPreviousPage: false, // 1. sayfada olduğumuz için false
    hasNextPage: false      // Toplam 1 sayfa olduğu için false

};
export { }; // Bu dosyayı modül yapar (diğer dosyalardaki isimlerle çakışmasın diye)
