/* We use interfaces to guarantee Type Safety and to provide a clear expectation of the format between front- and backend
    This is the session interface which includes all attributes except password from the user model in backend. */
export interface ISessionData {
    username: string;
    name: string;
    email: string;
}