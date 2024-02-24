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

export type PetUpdate = Omit<Pet, 'id' | 'owner'>;
