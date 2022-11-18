/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_id_fkey`;

-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `productAssetId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Example`;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_productAssetId_fkey` FOREIGN KEY (`productAssetId`) REFERENCES `ProductAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
