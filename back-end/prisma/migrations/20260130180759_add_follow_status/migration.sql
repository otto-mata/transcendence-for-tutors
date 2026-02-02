-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'accepted';

-- CreateIndex
CREATE INDEX "Follow_status_idx" ON "Follow"("status");
