/*
  Warnings:

  - You are about to drop the column `checked_in_at` on the `attendee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "attendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_attendee" ("created_at", "email", "event_id", "id", "name") SELECT "created_at", "email", "event_id", "id", "name" FROM "attendee";
DROP TABLE "attendee";
ALTER TABLE "new_attendee" RENAME TO "attendee";
CREATE UNIQUE INDEX "attendee_event_id_email_key" ON "attendee"("event_id", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
