const fs = require('fs');
const path = require('path');

const modules = ['auth', 'pages', 'blogs', 'enquiries', 'subscribers', 'media', 'settings'];
const baseDir = path.join(__dirname, 'src', 'modules');

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

modules.forEach(mod => {
  const modDir = path.join(baseDir, mod);
  fs.mkdirSync(modDir, { recursive: true });
  fs.mkdirSync(path.join(modDir, 'dto'), { recursive: true });

  // Module file
  const moduleName = mod.charAt(0).toUpperCase() + mod.slice(1) + 'Module';
  const controllerName = mod.charAt(0).toUpperCase() + mod.slice(1) + 'Controller';
  const serviceName = mod.charAt(0).toUpperCase() + mod.slice(1) + 'Service';

  const moduleContent = `import { Module } from '@nestjs/common';
import { ${controllerName} } from './${mod}.controller';
import { ${serviceName} } from './${mod}.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [${controllerName}],
  providers: [${serviceName}],
  exports: [${serviceName}],
})
export class ${moduleName} {}
`;
  fs.writeFileSync(path.join(modDir, `${mod}.module.ts`), moduleContent);

  // Controller file
  const controllerContent = `import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ${serviceName} } from './${mod}.service';

@Controller('api/${mod}')
export class ${controllerName} {
  constructor(private readonly service: ${serviceName}) {}
}
`;
  fs.writeFileSync(path.join(modDir, `${mod}.controller.ts`), controllerContent);

  // Service file
  const serviceContent = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ${serviceName} {
  constructor(private readonly prisma: PrismaService) {}
}
`;
  fs.writeFileSync(path.join(modDir, `${mod}.service.ts`), serviceContent);
});

console.log('Modules created successfully.');
