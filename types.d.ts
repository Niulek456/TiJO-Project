declare module '@env' {
    export const APPWRITE_ENDPOINT: string;
    export const APPWRITE_PROJECT: string;
    export const APPWRITE_DATABASE: string;
}

declare module '*.png' {
    const value: any;
    export = value;
}
declare module '*.jpg' {
    const value: any;
    export = value;
}