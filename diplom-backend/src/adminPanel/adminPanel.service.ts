// import { ForbiddenException, Injectable } from '@nestjs/common';

// import { Position, Role } from '@prisma/client';
// import { checkAdmin } from '../utils/check-admin';
// import { PrismaService } from '../prisma.service';
// import { CreateStoreDto } from '../dto/create-store.dto';
// import { UpdateStoreDto } from '../dto/update-store.dto';

// // admin-panel.service.ts
// @Injectable()
// export class AdminPanelService {
//   constructor(private prisma: PrismaService) {}

//   // Убираем await checkAdmin(...) из всех методов!

//   async getAllResPerson(adminUserId: number) {
//     // Проверка уже прошла в AdminGuard
//     const allRes = await this.prisma.users.findMany({
//       where: { position: Position.RES_PERSON },
//       include: {
//         userStores: {
//           select: { store: { select: { address: true } } },
//         },
//       },
//       orderBy: { id_users: 'asc' },
//     });

//     return allRes.map((r) => ({
//       id: r.id_users,
//       email: r.email,
//       firstName: r.firstName,
//       lastName: r.lastName,
//       patronymic: r.patronymic,
//       role: r.role,
//       position: r.position,
//       address: r.userStores[0]?.store.address ?? null,
//     }));
//   }

//   async getAllStores(adminUserId: number) {
//     return this.prisma.stores.findMany({ orderBy: { id_store: 'asc' } });
//   }

//   async createStore(adminUserId: number, dto: CreateStoreDto) {
//     return this.prisma.stores.create({ data: { address: dto.address } });
//   }

//   async updateStore(adminUserId: number, storeId: number, dto: UpdateStoreDto) {
//     return this.prisma.stores.update({
//       where: { id_store: storeId },
//       data: { address: dto.address },
//     });
//   }

//   async getAllEquipments(adminUserId: number) {
//     const stores = await this.prisma.stores.findMany({
//       include: {
//         userStores: {
//           include: {
//             user: {
//               select: {
//                 id_users: true,
//                 firstName: true,
//                 lastName: true,
//                 patronymic: true,
//                 position: true,
//               },
//             },
//           },
//         },
//         equipments: { orderBy: { id_equipment: 'asc' } },
//       },
//       orderBy: { id_store: 'asc' },
//     });

//     return stores.map((store) => ({
//       address: store.address,
//       responsible:
//         store.userStores
//           .map((us) => us.user)
//           .find((u) => u.position === Position.RES_PERSON) || null,
//       equipments: store.equipments,
//     }));
//   }

//   async getAllUsersWithRelations(adminUserId: number) {
//     return this.prisma.users.findMany({
//       include: {
//         userStores: {
//           include: {
//             store: {
//               include: {
//                 equipments: true,
//                 inventories: {
//                   include: { inventoryItems: { include: { equipment: true } } },
//                 },
//               },
//             },
//           },
//         },
//         inventories: {
//           include: {
//             inventoryItems: { include: { equipment: true } },
//           },
//         },
//       },
//     });
//   }
// }








































// // import { ForbiddenException, Injectable } from '@nestjs/common';

// // import { Position, Role } from '@prisma/client';
// // import { checkAdmin } from '../utils/check-admin';
// // import { PrismaService } from '../prisma.service';
// // import { CreateStoreDto } from '../dto/create-store.dto';
// // import { UpdateStoreDto } from '../dto/update-store.dto';

// // @Injectable()
// // export class AdminPanelService {
// //   constructor(private prisma: PrismaService) {}

// //   async getAllResPerson(adminUserId: number) {
// //     await checkAdmin(this.prisma, adminUserId);

// //     const allRes = await this.prisma.users.findMany({
// //       where: { position: Position.RES_PERSON },
// //       include: {
// //         userStores: {
// //           select: {
// //             store: {
// //               select: {
// //                 address: true,
// //               },
// //             },
// //           },
// //         },
// //       },
// //       orderBy: { id_users: 'asc' },
// //     });

// //     return allRes.map((r) => ({
// //       id: r.id_users,
// //       email: r.email,
// //       firstName: r.firstName,
// //       lastName: r.lastName,
// //       patronymic: r.patronymic,
// //       role: r.role,
// //       position: r.position,
// //       address: r.userStores[0]?.store.address ?? null,
// //     }));
// //   }
// //   /////////////////////////////////////////////////////////////////////////////////////////////////////////
// //   async getAllStores(adminUserId: number) {
// //     await checkAdmin(this.prisma, adminUserId);
// //     const stores = await this.prisma.stores.findMany({
// //       orderBy: { id_store: 'asc' },
// //     });
// //     return stores;
// //   }
// //   async createStore(adminUserId: number, dto: CreateStoreDto) {
// //     await checkAdmin(this.prisma, adminUserId);

// //     return this.prisma.stores.create({
// //       data: {
// //         address: dto.address,
// //       },
// //     });
// //   }

// //   async updateStore(adminUserId: number, storeId: number, dto: UpdateStoreDto) {
// //     await checkAdmin(this.prisma, adminUserId);

// //     return this.prisma.stores.update({
// //       where: { id_store: storeId },
// //       data: {
// //         address: dto.address,
// //       },
// //     });
// //   }

// //   /////////////////////////////////////////////////////////////////////////////////////////////////////////
// //   async getAllEquipments(adminUserId: number) {
// //     await checkAdmin(this.prisma, adminUserId);
// //     const stores = await this.prisma.stores.findMany({
// //       include: {
// //         userStores: {
// //           include: {
// //             user: {
// //               select: {
// //                 id_users: true,
// //                 firstName: true,
// //                 lastName: true,
// //                 patronymic: true,
// //                 position: true,
// //               },
// //             },
// //           },
// //         },
// //         equipments: {
// //           orderBy: { id_equipment: 'asc' },
// //         },
// //       },
// //       orderBy: { id_store: 'asc' },
// //     });

// //     return stores.map((store) => ({
// //       address: store.address,
// //       responsible:
// //         store.userStores
// //           .map((us) => us.user)
// //           .find((u) => u.position === Position.RES_PERSON) || null,
// //       equipments: store.equipments,
// //     }));
// //   }
  

// //   async getAllUsersWithRelations(adminUserId: number) {
// //     const admin = await this.prisma.users.findUnique({
// //       where: { id_users: adminUserId },
// //     });

// //     if (!admin || admin.role !== Role.ADMIN) {
// //       throw new ForbiddenException(
// //         'Только админ может получать всех пользователей',
// //       );
// //     }
// //     return this.prisma.users.findMany({
// //       include: {
// //         userStores: {
// //           include: {
// //             store: {
// //               include: {
// //                 equipments: true,
// //                 inventories: {
// //                   include: {
// //                     inventoryItems: {
// //                       include: {
// //                         equipment: true,
// //                       },
// //                     },
// //                   },
// //                 },
// //               },
// //             },
// //           },
// //         },
// //         inventories: {
// //           include: {
// //             inventoryItems: {
// //               include: {
// //                 equipment: true,
// //               },
// //             },
// //           },
// //         },
// //       },

      
// //     });
// //   }
// // }
