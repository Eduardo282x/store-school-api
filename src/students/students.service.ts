import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOStudents } from 'src/dto/DTOStudents';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {

    constructor(private prismaService: PrismaService) {

    }

    async getStudents() {
        return this.prismaService.students.findMany({ include: { parent: true } });
    }

    async createStudents(student: DTOStudents) {
        try {
            const createParent = await this.prismaService.parents.create({
                data: { name: student.nameParent, phone: student.phone }
            })

            await this.prismaService.students.create({
                data: {
                    name: student.name,
                    grade: student.grade,
                    parentId: createParent.id
                }
            });
            baseResponse.message = 'Estudiante creado';
            return baseResponse;;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async updateStudents(student: DTOStudents, id: number) {
        try {

            await this.prismaService.parents.update({
                data: { name: student.nameParent, phone: student.phone },
                where: { id }
            })

            const findStudentByParent = await this.prismaService.students.findFirst({ where: { parentId: id } })

            await this.prismaService.students.update({
                where: {
                    id: findStudentByParent.id
                },
                data: {
                    name: student.name,
                    grade: student.grade,
                }
            });

            baseResponse.message = 'Estudiante actualizado';
            return baseResponse;
        } catch (error) {

            badResponse.message = error.message;
            return badResponse;
        }
    }

    async deleteStudents(id: number) {
        try {
            await this.prismaService.students.delete({
                where: {
                    id
                }
            });

            return 'Estudiante eliminado';
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
