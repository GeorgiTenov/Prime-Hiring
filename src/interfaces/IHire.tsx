import IDeveloper from "./IDeveloper";

export interface IHire{
    startDate:string | undefined;
    endDate:string | undefined;
    developers:IDeveloper[] | undefined;
}