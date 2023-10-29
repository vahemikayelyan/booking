/*
  Warnings:

  - The primary key for the `provider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `provider` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `provider` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `business_name` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `provider` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `business_name` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
