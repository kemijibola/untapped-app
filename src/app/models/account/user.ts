export class User {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public password?: string,
        public email_confirmed?: boolean,
        public phone_confimed?: boolean,
        public profile_completed?: boolean,
        public general_notification?: boolean,
        public email_notification?: boolean,
        public profile_visibility?: boolean,
        public login_count?: boolean,
        public status?: [],
        public roles?: [],
        public token?: string) {}
}
