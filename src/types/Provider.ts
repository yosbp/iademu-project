export interface Provider {
    id: string;
    name: string;
    address: string;
    rif: string;
    phone: string;
    created_at: string;
}

export interface ProviderCreateBody {
    name: string;
    address: string;
    rif: string;
    phone: string;
}