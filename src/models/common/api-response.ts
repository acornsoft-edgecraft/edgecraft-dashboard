export class APIResponse {
    constructor(data: any, message: string, error: boolean, statusCode?: number, code?: number) {
        this.data = data;
        this.message = message;
        this.isError = error;
        this.code = code || 20000;
        this.statusCode = statusCode || 200;
    }

    public data: any;
    public message: string;
    public isError: boolean;
    public code: number;
    public statusCode: number;
}