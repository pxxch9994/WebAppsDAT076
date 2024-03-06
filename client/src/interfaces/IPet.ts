/**
 * Interface representing the attributes of a pet, ensuring Type Safety and defining the expected format
 * between the front-end and back-end.
 * This is the pet interface which includes all attributes from the pet model in backend.
 */
export interface IPet {
    id: number;
    owner: string;
    ownerEmail: string;
    name: string;
    image: string;
    kind: string;
    breed: string;
    birthday: number;
    status: string;
    description: string;
}

export type IPetUpdate = Omit<IPet, 'id' | 'owner' | 'ownerEmail'>;