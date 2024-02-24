
/* We use interfaces to guarantee Type Safety and to provide a clear expectation of the format between front- and backend
    This is the pet interface which includes all attributes from the pet model in backend. */
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