/**
 * npm run prisma:seed
 * Peuple la DB avec 8 avocats de démo + créneaux + un client test.
 */
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Client test
  const clientHash = await argon2.hash('test1234');
  await prisma.user.upsert({
    where: { email: 'client@jurilib.fr' },
    update: {},
    create: {
      email: 'client@jurilib.fr',
      passwordHash: clientHash,
      firstName: 'Julie',
      lastName: 'Martin',
      role: 'client',
    },
  });

  const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse'];
  const firstNames = ['Sophie', 'Alexandre', 'Marie', 'Thomas', 'Camille', 'Julien', 'Laure', 'Nicolas'];
  const lastNames = ['Dupont', 'Bernard', 'Lefebvre', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Leroy'];

  const specialtySlugs = [
    'droit-du-travail',
    'droit-penal',
    'droit-de-la-famille',
    'droit-des-affaires',
    'droit-immobilier',
  ];

  for (let i = 0; i < 8; i++) {
    const email = `avocat${i + 1}@jurilib.fr`;
    const hash = await argon2.hash('test1234');
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash: hash,
        firstName: firstNames[i],
        lastName: lastNames[i],
        role: 'lawyer',
      },
    });

    const slug = `${firstNames[i]}-${lastNames[i]}`.toLowerCase();
    const lawyer = await prisma.lawyer.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        slug,
        barAssociation: `Barreau de ${cities[i % cities.length]}`,
        yearsExperience: 5 + i,
        bio: `Maître ${lastNames[i]} exerce depuis ${5 + i} ans. Approche humaine, consultation claire.`,
        consultationPrice: 80 + i * 10,
        ratingAvg: 4.2 + (i % 8) / 10,
        ratingCount: 20 + i * 3,
        verified: 'verified',
        city: cities[i % cities.length],
        country: 'FR',
      },
    });

    // 2 spécialités
    for (let s = 0; s < 2; s++) {
      const spec = await prisma.specialty.findUnique({
        where: { slug: specialtySlugs[(i + s) % specialtySlugs.length] },
      });
      if (spec) {
        await prisma.lawyerSpecialty.upsert({
          where: { lawyerId_specialtyId: { lawyerId: lawyer.id, specialtyId: spec.id } },
          update: {},
          create: { lawyerId: lawyer.id, specialtyId: spec.id },
        });
      }
    }

    // 10 créneaux sur 14 jours
    for (let d = 1; d <= 10; d++) {
      const day = new Date();
      day.setDate(day.getDate() + d);
      day.setHours(9 + (d % 6), 0, 0, 0);
      const end = new Date(day.getTime() + 30 * 60 * 1000);
      await prisma.availability.create({
        data: {
          lawyerId: lawyer.id,
          startsAt: day,
          endsAt: end,
          meetingType: 'video',
        },
      });
    }
  }

  console.log('✅ Seed terminé.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
