import { Pet } from "./pet";

export interface Post {
    id : number;
    author : string;
    content : string;
    page : string;
    pet : Pet ; // TODO
}