import { UserModel } from "./user";

export interface AppContextModel {
    loggedIn: boolean;
    user?: UserModel | null;

    logout: (data: any) => void;
    login: (user: UserModel) => void;
}