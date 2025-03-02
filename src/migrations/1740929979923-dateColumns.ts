import { MigrationInterface, QueryRunner } from "typeorm";

export class DateColumns1740929979923 implements MigrationInterface {
    name = 'DateColumns1740929979923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "celular" varchar NOT NULL DEFAULT (''), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, CONSTRAINT "UQ_26195374e7857343c57a1080ce6" UNIQUE ("celular"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("id", "nome", "email", "senha", "celular") SELECT "id", "nome", "email", "senha", "celular" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "pets"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`ALTER TABLE "temporary_pets" RENAME TO "pets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" RENAME TO "temporary_pets"`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "temporary_pets"`);
        await queryRunner.query(`DROP TABLE "temporary_pets"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "celular" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_26195374e7857343c57a1080ce6" UNIQUE ("celular"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "usuarios"("id", "nome", "email", "senha", "celular") SELECT "id", "nome", "email", "senha", "celular" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
    }

}
