export interface PaymentOrder {
    id: string;
    payment_method: string;
    payment_reference: string;
    payment_number: string;
    bank: string;
    account_number: string;
    description: string;
    created_at: Date;
}