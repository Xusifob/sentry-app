import Entity from "@/schemas/entity";

export enum RoleType {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
}

export type Me = Entity & {
    attributes: {
        email: string,
        familyName: string,
        givenName: string,
        fullName: string,
        projects: number[],
        role: RoleType,
        _id: string
    }
}


export type RegisterMe = Entity & {
    attributes: {
        email: string
        givenName: string
        familyName: string
        _id: string
        activationEmailSent: boolean
    }
}