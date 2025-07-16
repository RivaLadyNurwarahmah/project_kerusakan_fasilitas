import { PrismaClient, role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const saltRounds = 10;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const users = [
        {
            nama_pengguna: 'Admin User',
            email: 'admin@example.com',
            sandi: hashedPassword,
            peran: role.admin,
        },
        {
            nama_pengguna: 'Teknisi User',
            email: 'teknisi@example.com',
            sandi: hashedPassword,
            peran: role.teknisi,
        },
        {
            nama_pengguna: 'Umum User',
            email: 'umum@example.com',
            sandi: hashedPassword,
            peran: role.umum,
        },
    ];

    for (const u of users) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id_user}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });