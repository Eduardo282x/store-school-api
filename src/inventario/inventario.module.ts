import { Module } from '@nestjs/common';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [InventarioController],
  providers: [InventarioService, PrismaService, HistoryService]
})
export class InventarioModule {}
