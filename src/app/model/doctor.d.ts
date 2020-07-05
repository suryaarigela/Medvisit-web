import { Address } from "./address";

export interface Doctor {
    name: string;
    speciality: string;
    id: string;
    description: string;
    reviews: string[];
    rating: number;
    address: Address;

}