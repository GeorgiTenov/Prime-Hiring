export default interface IDeveloper{
    id:number;
    name:string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    location: string | undefined;
    profilePicture?: string | undefined;
    pricePerHour: number | undefined;
    technology:string | undefined;
    description?:string;
    yearsOfExperience:number | undefined;
    nativeLanguage:string | undefined;
    linkedIn?:string;
}

