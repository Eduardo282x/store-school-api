import { IsString } from "class-validator";

export class DTOSales {
    @IsString()
    methodPay: TypesMethodsPay;
}

type TypesMethodsPay = 'Efectivo' | 'Divisa' | 'Punto' | 'Transferencia'