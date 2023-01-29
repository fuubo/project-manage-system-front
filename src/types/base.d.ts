export interface User {
    employName: string;
    employId: string;
    employEmail: string;
}
export interface Menu {
    icon: string;
    title: string;
    path: string;
    children: Menu[];
}
export interface NormalResponse {
    code: number;
    message: string;
    data: any;
}