export type UserType = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

const Users = new Map();

export default Users;
