import { IsDate, IsNumber, IsString } from "class-validator";

export class DTOProducts {
    @IsString()
    product: string;
    @IsNumber()
    amount: number;
    @IsNumber()
    tax: number;
    @IsNumber()
    price: number;
}

export class DTOInventory {
    @IsNumber()
    productId: number;
    @IsNumber()
    amount: number;
}

export class DTOHistoryFilter {
    @IsDate()
    dateStart: Date;
    @IsDate()
    dateEnd: Date;
}