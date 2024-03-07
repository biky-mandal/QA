export interface IUser {
    uid: string;
	slug: string;
	type: 'user' | 'author' | 'admin';
	name: string;
	phone: string;
	email: string;
	email_verified: boolean;
	last_login: string;
	photoURL: string;
    created_on: string;
    updated_on: string;
}