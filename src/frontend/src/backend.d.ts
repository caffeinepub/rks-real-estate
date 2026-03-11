import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    id: bigint;
    status: PropertyStatus;
    title: string;
    featured: boolean;
    propertyType: PropertyType;
    bedrooms: bigint;
    area: bigint;
    description: string;
    bathrooms: bigint;
    price: bigint;
    location: string;
}
export interface Enquiry {
    id: bigint;
    name: string;
    propertyId?: bigint;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum PropertyStatus {
    sold = "sold",
    available = "available"
}
export enum PropertyType {
    commercial = "commercial",
    villa = "villa",
    plot = "plot",
    apartment = "apartment"
}
export interface backendInterface {
    addProperty(title: string, propertyType: PropertyType, location: string, price: bigint, bedrooms: bigint, bathrooms: bigint, area: bigint, description: string, featured: boolean): Promise<bigint>;
    deleteProperty(id: bigint): Promise<void>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllProperties(): Promise<Array<Property>>;
    getPropertiesByStatus(status: PropertyStatus): Promise<Array<Property>>;
    getPropertiesByType(propertyType: PropertyType): Promise<Array<Property>>;
    getPropertyById(id: bigint): Promise<Property>;
    searchProperties(location: string, propertyType: PropertyType | null, minPrice: bigint | null, maxPrice: bigint | null): Promise<Array<Property>>;
    seedProperties(): Promise<void>;
    submitEnquiry(name: string, email: string, phone: string, message: string, propertyId: bigint | null): Promise<bigint>;
    updateProperty(id: bigint, title: string, propertyType: PropertyType, location: string, price: bigint, bedrooms: bigint, bathrooms: bigint, area: bigint, description: string, status: PropertyStatus, featured: boolean): Promise<void>;
}
