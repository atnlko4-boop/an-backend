"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let TestimonialsService = class TestimonialsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTestimonialDto) {
        return this.prisma.testimonial.create({
            data: createTestimonialDto,
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, isPublished, featured } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { clientName: { contains: search, mode: 'insensitive' } },
                { companyName: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (isPublished !== undefined) {
            where.isPublished = isPublished === 'true';
        }
        if (featured !== undefined) {
            where.featured = featured === 'true';
        }
        const [items, total] = await Promise.all([
            this.prisma.testimonial.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    { displayOrder: 'asc' },
                    { createdAt: 'desc' }
                ],
            }),
            this.prisma.testimonial.count({ where }),
        ]);
        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const testimonial = await this.prisma.testimonial.findUnique({
            where: { id },
        });
        if (!testimonial) {
            throw new common_1.NotFoundException(`Testimonial with ID ${id} not found`);
        }
        return testimonial;
    }
    async update(id, updateTestimonialDto) {
        try {
            return await this.prisma.testimonial.update({
                where: { id },
                data: updateTestimonialDto,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Testimonial with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.testimonial.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Testimonial with ID ${id} not found`);
        }
    }
};
exports.TestimonialsService = TestimonialsService;
exports.TestimonialsService = TestimonialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestimonialsService);
//# sourceMappingURL=testimonials.service.js.map