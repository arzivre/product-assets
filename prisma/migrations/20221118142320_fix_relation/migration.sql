/*
  Warnings:

  - You are about to drop the column `assetId` on the `ProductAsset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductAsset` DROP FOREIGN KEY `ProductAsset_assetId_fkey`;

-- AlterTable
ALTER TABLE `ProductAsset` DROP COLUMN `assetId`;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_id_fkey` FOREIGN KEY (`id`) REFERENCES `ProductAsset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
