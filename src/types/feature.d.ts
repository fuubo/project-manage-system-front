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
    releaseDate: string;
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
    releaseDate: string;
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
    releaseDate: string;
    status: string;
}
export interface FeatureTaskListDto {
    _id: string;
    featureId: string;
    taskName: string;
    description: string;
    engineer: string;
    project: string;
    module: string;
    startDate: string;
    endDate: string;
    status: string;
    remark: string;
    updatedAt: Date;
    createdAt: Date;
}
export interface FeatureTaskUpdateDto {
    _id: string;
    featureId: string;
    taskName: string;
    description: string;
    engineer: string;
    project: string;
    module: string;
    startDate: string;
    endDate: string;
    status: string;
    remark: string;
}
export interface FeatureTaskCreateDto {
    featureId: string;
    taskName: string;
    description: string;
    engineer: string;
    project: string;
    module: string;
    startDate: string;
    endDate: string;
    status: string;
    remark: string;
}