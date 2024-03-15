export interface PaymentOrder {
    id: string;
    payment_method: string;
    payment_reference: string;
    bank: string;
    account_number: string;
    created_at: Date;
}