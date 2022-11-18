/*
  Warnings:

  - A unique constraint covering the columns `[assetId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `ProductAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_assetId_key` ON `Category`(`assetId`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductAsset_productId_key` ON `ProductAsset`(`productId`);
