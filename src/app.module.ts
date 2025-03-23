import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventarioModule } from './inventario/inventario.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CarritoModule } from './carrito/carrito.module';
import { SalesModule } from './sales/sales.module';
import { CreditModule } from './credit/credit.module';
import { StudentsModule } from './students/students.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [InventarioModule, ProductModule, AuthModule, CarritoModule, SalesModule, CreditModule, StudentsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
