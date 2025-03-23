import { Injectable } from '@nestjs/common';
import { CarritoService } from 'src/carrito/carrito.service';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOCredit } from 'src/dto/DTOCredit';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreditService {

    constructor(private prismaService: PrismaService, private carritoService: CarritoService) {
    }

    async getCredit() {
        return this.prismaService.credit.findMany({
            include: {
                student: true,
                DetCredit: {
                    include: {
                        product: { include: { product: true } }
                    }
                },
            }
        });
    }

    async saveCredit(credit: DTOCredit) {
        try {
            const getCarrito = await this.carritoService.getCarrito();
            const getTotalCarrito = getCarrito.reduce((acc, item) => acc + (item.product.product.total * item.amount), 0);

            const saveCredit = await this.prismaService.credit.create({
                data: {
                    studentId: credit.studentId,
                    total: getTotalCarrito,
                    pending: true,
                    date: new Date(),
                    datePay: null,
                }
            });

            await this.prismaService.detCredit.createMany({
                data: getCarrito.map(item => {
                    return {
                        creditId: saveCredit.id,
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
            baseResponse.message = 'Crédito creado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async updateCredit(id: number) {
        try {
            await this.prismaService.credit.update({
                where: {
                    id
                },
                data: {
                    pending: false,
                    datePay: new Date(),
                }
            });
            baseResponse.message = 'Crédito actualizado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async deleteCredit(id: number) {
        try {
            await this.prismaService.credit.delete({
                where: {
                    id
                }
            });

            baseResponse.message = 'Crédito eliminado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
