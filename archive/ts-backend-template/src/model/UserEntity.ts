class User {
    id: string = '';
    email: string = '';

    constructor(id: string='', email: string='') {
        this.id = id;
        this.email = email;
    }

    equals(rhs: User) {
        if(this.id !== rhs.id) return false;
        if(this.email !== rhs.email) return false;

        return true;
    }
}

export default User;