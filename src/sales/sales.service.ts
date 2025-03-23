import { Injectable } from '@nestjs/common';
import { CarritoService } from 'src/carrito/carrito.service';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOSales } from 'src/dto/DTOSales';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalesService {

    constructor(private prismaService: PrismaService, private carritoService: CarritoService) {
    }

    async getSales() {
        return this.prismaService.sales.findMany({
            include: {
                DetSales: {
                    include: {
                        product: { include: { product: true } }
                    }
                }
            }
        });
    }

    async createSales(sales: DTOSales) {
        try {
            const getCarrito = await this.carritoService.getCarrito();
            const getTotalCarrito = getCarrito.reduce((acc, item) => acc + (item.product.product.total * item.amount), 0);

            const salesNew = await this.prismaService.sales.create({
                data: {
                    date: new Date(),
                    total: getTotalCarrito,
                    methodPay: sales.methodPay
                }
            });

            await this.prismaService.detSales.createMany({
                data: getCarrito.map(item => {
                    return {
                        salesId: salesNew.id,
                        productId: item.productId,
                        amount: item.amount,
                        total: item.product.product.total * item.amount
                    }
                })
            })

            getCarrito.map(async item => {
                const findProduct = await this.prismaService.inventory.findFirst({
                    where: {
                        productId: item.productId
                    }
                })

                await this.prismaService.inventory.update({
                    where: {
                        id: findProduct.id
                    },
                    data: {
                        amount: findProduct.amount - item.amount
                    }
                })
            })

            await this.carritoService.clearCarrito();
            baseResponse.message = 'Venta creada';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
