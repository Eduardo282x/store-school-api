import { IsNumber } from "class-validator";

export class DTOCarrito {
    @IsNumber()
    productId: number;
    @IsNumber()
    amount: number;
}