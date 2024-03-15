import { PaymentOrder } from "./PaymentOrder";
import { Provider } from "./Provider";

export interface Order {
    id: string;
    tax: number;
    exempt: number;
    total
    subtotal: number;
    order_items: Order_Item[];
    provider: Provider;
    payment_order: PaymentOrder;
    created_at: Date;
}

export interface Order_Item {
    item_name: string;
    item_quantity: number;
    item_amount: number;
    total_amount: number;
}