export interface IAuthType {
    isAuthenticated: boolean,
    strategy: string,
    schema: string,
    provider: string
}

export const defaultAuthType: IAuthType = {
    isAuthenticated: false,
    strategy: "",
    schema: null,
    provider: "",
}
