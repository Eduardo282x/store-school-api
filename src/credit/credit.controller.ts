import { Controller, Get } from '@nestjs/common';
import { CreditService } from './credit.service';

@Controller('credit')
export class CreditController {

    constructor(private creditService: CreditService) {
        
    }

    @Get()
    async getCredit() {
        return this.creditService.getCredit()
    }
}
