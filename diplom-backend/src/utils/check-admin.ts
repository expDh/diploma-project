// // src/common/utils/check-admin.ts
// import { ForbiddenException } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { Role } from '@prisma/client';


// export async function checkAdmin(
//   prisma: PrismaService,
//   userId: number,
// ) {
//   const user = await prisma.users.findUnique({
//     where: { id_users: userId },
//   });

//   if (!user || user.role !== Role.ADMIN) {
//     throw new ForbiddenException('Только админ');
//   }

//   return user;
// }
