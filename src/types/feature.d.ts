export interface FeatureListDto {
    _id: string;
    featureName: string;
    jiraUrl: string;
    prdUrl: string;
    branchName: string;
    protoUrl: string;
    owner: string;
    frontendDays: string;
    backendDays: string;
    testDays: string;
    testSubmitDate: string;
    status: string;
    updatedAt: string;
    createdAt: string;
}
export interface FeatureUpdateDto {
    _id: string;
    featureName: string;
    jiraUrl: string;
    prdUrl: string;
    branchName: string;
    protoUrl: string;
    owner: string;
    frontendDays: string;
    backendDays: string;
    testDays: string;
    testSubmitDate: string;
    status: string;
}
export interface FeatureCreateDto {
    featureName: string;
    jiraUrl: string;
    prdUrl: string;
    branchName: string;
    protoUrl: string;
    owner: string;
    frontendDays: string;
    backendDays: string;
    testDays: string;
    testSubmitDate: string;
    status: string;
}
