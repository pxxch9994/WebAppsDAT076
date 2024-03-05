import {ISessionData} from "../interfaces/ISessionData";
import axios from "axios";
import {useState} from "react";

export async function FetchSession (): Promise<ISessionData | null | undefined> {

    const [user, setUser] = useState<ISessionData | null>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
        try {
            const data: ISessionData = await axios.get('http://localhost:8080/user/session', {withCredentials: true});
            console.log(data);
            setUser(data);
            setLoggedIn(true);
        } catch (error) {
            setError('Failed to fetch user session');
            setLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }

        return user;

}