import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryItemsModule } from './inventory-items/inventory-items.module';
// import { AdminPanelModule } from './adminPanel/adminPanel.module';


@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), AuthModule, UsersModule, StoresModule, EquipmentsModule, InventoryModule, InventoryItemsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
