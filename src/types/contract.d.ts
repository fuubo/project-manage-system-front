export interface ContractFile {
    fileName: string;
    docUrl: string;
}
export interface Contract {
    businessTypeName: string;
    contractNo: string;
    signTime: string;
    files: ContractFile[];
}