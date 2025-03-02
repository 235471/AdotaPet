import { MigrationInterface, QueryRunner } from "typeorm";

export class DateColumnsPet1740930072686 implements MigrationInterface {
    name = 'DateColumnsPet1740930072686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "pets"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`ALTER TABLE "temporary_pets" RENAME TO "pets"`);
        await queryRunner.query(`CREATE TABLE "temporary_pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId", "created_at", "updated_at", "deleted_at") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId", "created_at", "updated_at", "deleted_at" FROM "pets"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`ALTER TABLE "temporary_pets" RENAME TO "pets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" RENAME TO "temporary_pets"`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId", "created_at", "updated_at", "deleted_at") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId", "created_at", "updated_at", "deleted_at" FROM "temporary_pets"`);
        await queryRunner.query(`DROP TABLE "temporary_pets"`);
        await queryRunner.query(`ALTER TABLE "pets" RENAME TO "temporary_pets"`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "temporary_pets"`);
        await queryRunner.query(`DROP TABLE "temporary_pets"`);
    }

}
