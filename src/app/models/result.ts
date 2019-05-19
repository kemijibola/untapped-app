export class Result {
    status: boolean;
    message: string;
    data: any;
}

export class Error {
    status: boolean;
    error: {
        type: string;
        message: string
    };
    data: {};
}
