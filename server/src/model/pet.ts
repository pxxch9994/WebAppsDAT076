// Interface representing a pet
export interface Pet {
    id : number;
    owner : string;
    ownerEmail: string;
    name : string;
    image : string;
    kind : string;
    breed : string;
    birthday : number;
    status: string;
    description: string;
}
// Omit utility type to create a type representing pet updates without certain fields
export type PetUpdate = Omit<Pet, 'id' | 'owner' | 'ownerEmail'>;
