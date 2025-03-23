export interface DTOBase {
    message: string;
    success: boolean;
}

export const baseResponse: DTOBase = {
    message: '',
    success: true
}

export const badResponse: DTOBase = {
    message: '',
    success: false
}