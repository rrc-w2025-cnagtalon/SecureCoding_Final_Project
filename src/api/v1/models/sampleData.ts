import { Product } from "./productModel";
import { ProductDTO } from "./productDTO";
import { OrderSlip } from "./orderSlipModel";

/**
 * Mock data representing the initial kakanin inventory.
 */
export const sampleKakanin: ProductDTO[] = [
  {
    productId: 'royal-bibingka',
    name: 'Royal Bibingka',
    currentStock: 200,
    lowStockThreshold: 50,
    isActive: true
  },
  {
    productId: 'pichi-pichi',
    name: 'Pichi-Pichi',
    currentStock: 100,
    lowStockThreshold: 50,
    isActive: true
  },
  {
    productId: 'sapin-sapin',
    name: 'Sapin-Sapin',
    currentStock: 200,
    lowStockThreshold: 50,
    isActive: true
  },
  {
    productId: 'kutsinta',
    name: 'Kutsinta',
    currentStock: 150,
    lowStockThreshold: 50,
    isActive: true
  }
];

export const sampleOrderSlips: OrderSlip[] = [
    {
        orderNumber: "001",
        customerName: "Shohei Ohtani",
        customerPhoneNumber: "204-234-2931",
        platterSize: 36,
        items: [
            { productId: "pichi-pichi", quantity: 18 },
            { productId: "kutsinta", quantity: 18 }
        ],
        totalPrice: 27.99,
        status: "Confirmed",
        pickupDate: "2026-04-06",
        pickupTime: "10:00 AM",
        createdAt: new Date()
    },
    {
        orderNumber: "002",
        customerName: "Will Smith",
        customerPhoneNumber: "204-563-3451",
        platterSize: 12,
        items: [
            { productId: "royal-kalamay-ube", quantity: 12 }
        ],
        totalPrice: 8.99,
        status: "Pending",
        pickupDate: "2026-04-06",
        pickupTime: "11:00 AM",
        createdAt: new Date()
    }
];