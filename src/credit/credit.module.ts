import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarritoService } from 'src/carrito/carrito.service';

@Module({
  controllers: [CreditController],
  providers: [CreditService, PrismaService, CarritoService]
})
export class CreditModule {}
