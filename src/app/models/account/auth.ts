export class Register {
        name: string;
        email: string;
        password: string;
        user_type: string;
        audience?: string;
}

export class Login {
    constructor(
        public email: string= '',
        public password: string= ''
    ) {}
}
