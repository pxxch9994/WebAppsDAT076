export interface User {
    id : number;
    name : string;

}

export interface Pet{
    name : string;
    petId : number;
    birthday : number;
    type : string;
    breed : string;
    ownerId : number;
}

export interface Post{
    postId : number;
    postOwnerId : number;
    content : string;
    type : string; // Adpot/Lost/Found/Birthday
}