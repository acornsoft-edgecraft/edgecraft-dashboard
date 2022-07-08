export class APIResponse {
    constructor(data: any, message: string, isError: boolean, statusCode: number = 200) {
        this.data = data;
        this.message = message;
        this.isError = isError;
        this.statusCode = statusCode;
    }

    public data: any;
    public message: string;
    public isError: boolean;
    public statusCode: number;
}