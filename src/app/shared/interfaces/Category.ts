export interface ICategory {
    id: string;
	slug: string;
	name: string;
    created_on: string;
    updated_on: string;
    subCategories?: ISubCategory[]
}

export interface ISubCategory {
    id: string;
	slug: string;
	name: string;
    created_on: string;
    updated_on: string;
}