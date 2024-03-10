export interface Provider {
    name: string;
    address: string;
    rif: string;
    phone: string;
}

export interface ProviderCreateBody {
    name: string;
    address: string;
    rif: string;
    phone: string;
}