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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicTestimonialsController = void 0;
const common_1 = require("@nestjs/common");
const testimonials_service_1 = require("./testimonials.service");
const query_testimonial_dto_1 = require("./dto/query-testimonial.dto");
const swagger_1 = require("@nestjs/swagger");
let PublicTestimonialsController = class PublicTestimonialsController {
    testimonialsService;
    constructor(testimonialsService) {
        this.testimonialsService = testimonialsService;
    }
    findAll(query) {
        query.isPublished = 'true';
        return this.testimonialsService.findAll(query);
    }
    findFeatured(query) {
        query.isPublished = 'true';
        query.featured = 'true';
        return this.testimonialsService.findAll(query);
    }
};
exports.PublicTestimonialsController = PublicTestimonialsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all published testimonials' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_testimonial_dto_1.QueryTestimonialDto]),
    __metadata("design:returntype", void 0)
], PublicTestimonialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured and published testimonials' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_testimonial_dto_1.QueryTestimonialDto]),
    __metadata("design:returntype", void 0)
], PublicTestimonialsController.prototype, "findFeatured", null);
exports.PublicTestimonialsController = PublicTestimonialsController = __decorate([
    (0, swagger_1.ApiTags)('Public Testimonials'),
    (0, common_1.Controller)('public/testimonials'),
    __metadata("design:paramtypes", [testimonials_service_1.TestimonialsService])
], PublicTestimonialsController);
//# sourceMappingURL=public-testimonials.controller.js.map