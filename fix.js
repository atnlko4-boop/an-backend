const fs = require('fs');

// 1. auth.module.ts
let content = fs.readFileSync('src/modules/auth/auth.module.ts', 'utf8');
content = content.replace("expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d')", "expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d') as string");
fs.writeFileSync('src/modules/auth/auth.module.ts', content);

// 2. auth.service.ts
content = fs.readFileSync('src/modules/auth/auth.service.ts', 'utf8');
content = content.replace("this.generateTokens(user, deviceInfo, ipAddress)", "this.generateTokens(user, deviceInfo || undefined, ipAddress || undefined)");
content = content.replace("this.generateTokens(session.user, session.deviceInfo, session.ipAddress)", "this.generateTokens(session.user, session.deviceInfo || undefined, session.ipAddress || undefined)");
fs.writeFileSync('src/modules/auth/auth.service.ts', content);

// 3. billing.service.ts
content = fs.readFileSync('src/modules/billing/billing.service.ts', 'utf8');
content = content.replace("let customerId = subscription?.razorpayCustId;", "let customerId = subscription?.razorpayCustId || undefined;");
fs.writeFileSync('src/modules/billing/billing.service.ts', content);

// 4. razorpay-provider.service.ts
try {
content = fs.readFileSync('src/modules/billing/providers/razorpay-provider.service.ts', 'utf8');
content = content.replace("import * as Razorpay from 'razorpay';", "import Razorpay from 'razorpay';");
fs.writeFileSync('src/modules/billing/providers/razorpay-provider.service.ts', content);
} catch (e) {}

// 5. razorpay-webhook.controller.ts
try {
content = fs.readFileSync('src/modules/billing/webhooks/razorpay-webhook.controller.ts', 'utf8');
content = content.replace("import { Request, Response } from 'express';", "import type { Request, Response } from 'express';");
fs.writeFileSync('src/modules/billing/webhooks/razorpay-webhook.controller.ts', content);
} catch (e) {}

// 6. document.service.ts
try {
content = fs.readFileSync('src/modules/document/document.service.ts', 'utf8');
content = content.replace("companyId: dto.companyId,", "company: { connect: { id: dto.companyId } },");
content = content.replace("taskId: dto.taskId,", "task: dto.taskId ? { connect: { id: dto.taskId } } : undefined,");
content = content.replace("licenseId: dto.licenseId,", "license: dto.licenseId ? { connect: { id: dto.licenseId } } : undefined,");
fs.writeFileSync('src/modules/document/document.service.ts', content);
} catch(e) {}

// 7. task.service.ts
try {
content = fs.readFileSync('src/modules/task/task.service.ts', 'utf8');
content = content.replace("companyId: dto.companyId,", "company: { connect: { id: dto.companyId } },");
content = content.replace("lawId: dto.lawId,", "law: dto.lawId ? { connect: { id: dto.lawId } } : undefined,");
content = content.replace("branchId: dto.branchId,", "branch: dto.branchId ? { connect: { id: dto.branchId } } : undefined,");
content = content.replace("assignedToId: dto.assignedToId,", "assignee: dto.assignedToId ? { connect: { id: dto.assignedToId } } : undefined,");
content = content.replace("reviewerId: dto.reviewerId,", "reviewer: dto.reviewerId ? { connect: { id: dto.reviewerId } } : undefined,");
fs.writeFileSync('src/modules/task/task.service.ts', content);
} catch(e) {}

// 8. notification-router.processor.ts
try {
content = fs.readFileSync('src/modules/notification/processors/notification-router.processor.ts', 'utf8');
content = content.replace(/preferences\./g, "preferences?.");
fs.writeFileSync('src/modules/notification/processors/notification-router.processor.ts', content);
} catch (e) {}

console.log("Done");
