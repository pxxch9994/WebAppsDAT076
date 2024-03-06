/**
 * Interface representing session data, ensuring Type Safety and defining the expected format
 * between the front-end and back-end. It includes attributes from the user model in the backend,
 * excluding the password.
 */
export interface ISessionData {
    username: string;
    name: string;
    email: string;
}