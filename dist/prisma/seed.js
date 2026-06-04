"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting seeding...');
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminName = process.env.ADMIN_NAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminName || !adminPassword) {
        console.error('Missing ADMIN_EMAIL, ADMIN_NAME, or ADMIN_PASSWORD in environment variables.');
        process.exit(1);
    }
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (existingAdmin) {
        console.log('Admin user already exists. Skipping admin creation.');
    }
    else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        await prisma.user.create({
            data: {
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
            },
        });
        console.log(`Successfully created admin user: ${adminEmail}`);
    }
    const existingSettings = await prisma.siteSettings.findFirst();
    if (existingSettings) {
        console.log('Site settings already exist. Skipping site settings creation.');
    }
    else {
        await prisma.siteSettings.create({
            data: {
                siteTitle: 'AN Consultant - Compliance Consultancy',
                metaDescription: 'Expert HR compliance and consulting services for modern enterprises.',
            },
        });
        console.log('Successfully created default site settings.');
    }
    const corePages = [
        { slug: 'home', title: 'Home', metaTitle: 'Home | AN Consultant', metaDescription: 'Expert HR compliance and consulting services for modern enterprises.' },
        { slug: 'about', title: 'About Us', metaTitle: 'About Us | AN Consultant', metaDescription: 'Learn about AN Consultant and our mission to simplify enterprise compliance.' },
        { slug: 'solutions', title: 'Solutions', metaTitle: 'Solutions | AN Consultant', metaDescription: 'Discover our tailored compliance solutions for startups, enterprises, and HR teams.' },
        { slug: 'industries', title: 'Industries', metaTitle: 'Industries | AN Consultant', metaDescription: 'Explore the industries we serve with specialized compliance services.' },
        { slug: 'blog', title: 'Blog & Insights', metaTitle: 'Blog & Insights | AN Consultant', metaDescription: 'Read the latest updates and insights on HR, compliance, and labor laws.' },
        { slug: 'contact', title: 'Contact Us', metaTitle: 'Contact Us | AN Consultant', metaDescription: 'Get in touch with our compliance experts for a consultation.' },
    ];
    for (const page of corePages) {
        const existingPage = await prisma.page.findUnique({
            where: { slug: page.slug },
        });
        if (!existingPage) {
            await prisma.page.create({
                data: {
                    slug: page.slug,
                    title: page.title,
                    metaTitle: page.metaTitle,
                    metaDescription: page.metaDescription,
                    content: {},
                    isPublished: true,
                },
            });
            console.log(`Created core page: ${page.title}`);
        }
        else {
            console.log(`Core page already exists: ${page.title}`);
        }
    }
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map