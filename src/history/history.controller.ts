import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { DTOHistoryFilter } from 'src/dto/DTOProducts';

@Controller('history')
export class HistoryController {

    constructor(private historyService: HistoryService) {
        
    }

    @Get()
    async getHistory() {
        return await this.historyService.getHistory();
    }
    @Post()
    async saveHistory(@Body() history: DTOHistoryFilter) {
        return await this.historyService.getHistoryFilter(history);
    }
}
