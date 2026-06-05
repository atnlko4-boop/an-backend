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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let BlogsService = class BlogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(publishedOnly = false) {
        return this.prisma.blog.findMany({
            where: publishedOnly ? { published: true } : undefined,
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(idOrSlug) {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
        const blog = await this.prisma.blog.findFirst({
            where: isObjectId
                ? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
                : { slug: idOrSlug }
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async create(data) {
        const existing = await this.prisma.blog.findUnique({ where: { slug: data.slug } });
        if (existing)
            throw new common_1.ConflictException('A blog with this slug already exists');
        return this.prisma.blog.create({ data });
    }
    async update(id, data) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (data.slug && data.slug !== blog.slug) {
            const existing = await this.prisma.blog.findUnique({ where: { slug: data.slug } });
            if (existing)
                throw new common_1.ConflictException('A blog with this slug already exists');
        }
        return this.prisma.blog.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        await this.prisma.blog.delete({ where: { id } });
        return { success: true };
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map