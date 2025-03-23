import { IsNumber } from "class-validator";

export class DTOCredit {
    @IsNumber()
    studentId: number;
}