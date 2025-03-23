import { IsString } from "class-validator";

export class DTOStudents {
    @IsString()
    name: string;
    @IsString()
    grade: string;
    @IsString()
    phone: string;
    @IsString()
    nameParent: string;
}