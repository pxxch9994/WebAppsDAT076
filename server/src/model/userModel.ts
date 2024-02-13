export interface User {
    userId: number; // key, unique identifier
    username : string;
    password : string;
}

export interface Pet {
    petId: number; // key, unique identifier
    petName : string;
    userId : number; // Foreign key, referenses user
    image : string; // TODO
    kind : string;
    breed : string;
    birthday : number;

}

export interface Post {
    postId: number; // key, unique identifier
    userId: number; // Foreign key, referenses user
    image: string; // TODO
    content: string;
    page: string;
    pet: Pet; // TODO
  }