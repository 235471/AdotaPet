import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigration1740744910491 implements MigrationInterface {
    name = 'NomeDaMigration1740744910491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "abrigos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_6246b3c380c3e2a1415c90e4fc" UNIQUE ("usuarioId"), CONSTRAINT "REL_45cb47c5bad7322db6e26ea5a6" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "celular" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "UQ_26195374e7857343c57a1080ce6" UNIQUE ("celular"))`);
        await queryRunner.query(`CREATE TABLE "adotantes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_2bbd25660d8c1562ed8e06ad8e" UNIQUE ("usuarioId"), CONSTRAINT "REL_46f044073bc3ef22aa5b4aecf9" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_abrigos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_6246b3c380c3e2a1415c90e4fc" UNIQUE ("usuarioId"), CONSTRAINT "REL_45cb47c5bad7322db6e26ea5a6" UNIQUE ("enderecoId"), CONSTRAINT "FK_6246b3c380c3e2a1415c90e4fc8" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_45cb47c5bad7322db6e26ea5a66" FOREIGN KEY ("enderecoId") REFERENCES "enderecos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_abrigos"("id", "usuarioId", "enderecoId") SELECT "id", "usuarioId", "enderecoId" FROM "abrigos"`);
        await queryRunner.query(`DROP TABLE "abrigos"`);
        await queryRunner.query(`ALTER TABLE "temporary_abrigos" RENAME TO "abrigos"`);
        await queryRunner.query(`CREATE TABLE "temporary_adotantes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_2bbd25660d8c1562ed8e06ad8e" UNIQUE ("usuarioId"), CONSTRAINT "REL_46f044073bc3ef22aa5b4aecf9" UNIQUE ("enderecoId"), CONSTRAINT "FK_2bbd25660d8c1562ed8e06ad8e1" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_46f044073bc3ef22aa5b4aecf93" FOREIGN KEY ("enderecoId") REFERENCES "enderecos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_adotantes"("id", "usuarioId", "enderecoId") SELECT "id", "usuarioId", "enderecoId" FROM "adotantes"`);
        await queryRunner.query(`DROP TABLE "adotantes"`);
        await queryRunner.query(`ALTER TABLE "temporary_adotantes" RENAME TO "adotantes"`);
        await queryRunner.query(`CREATE TABLE "temporary_pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer, CONSTRAINT "FK_b6446deb621d466984b3666a7a6" FOREIGN KEY ("adotanteId") REFERENCES "adotantes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e46d50b9ba2ee1b7c73a44aef5" FOREIGN KEY ("abrigoId") REFERENCES "abrigos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "pets"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`ALTER TABLE "temporary_pets" RENAME TO "pets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" RENAME TO "temporary_pets"`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "especie" varchar CHECK( "especie" IN ('cachorro','gato','passaro','tartaruga') ) NOT NULL, "porte" varchar CHECK( "porte" IN ('grande','medio','pequeno') ), "dataNascimento" date NOT NULL, "adotado" boolean NOT NULL DEFAULT (0), "adotanteId" integer, "abrigoId" integer)`);
        await queryRunner.query(`INSERT INTO "pets"("id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId") SELECT "id", "nome", "especie", "porte", "dataNascimento", "adotado", "adotanteId", "abrigoId" FROM "temporary_pets"`);
        await queryRunner.query(`DROP TABLE "temporary_pets"`);
        await queryRunner.query(`ALTER TABLE "adotantes" RENAME TO "temporary_adotantes"`);
        await queryRunner.query(`CREATE TABLE "adotantes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_2bbd25660d8c1562ed8e06ad8e" UNIQUE ("usuarioId"), CONSTRAINT "REL_46f044073bc3ef22aa5b4aecf9" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "adotantes"("id", "usuarioId", "enderecoId") SELECT "id", "usuarioId", "enderecoId" FROM "temporary_adotantes"`);
        await queryRunner.query(`DROP TABLE "temporary_adotantes"`);
        await queryRunner.query(`ALTER TABLE "abrigos" RENAME TO "temporary_abrigos"`);
        await queryRunner.query(`CREATE TABLE "abrigos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuarioId" integer, "enderecoId" integer, CONSTRAINT "REL_6246b3c380c3e2a1415c90e4fc" UNIQUE ("usuarioId"), CONSTRAINT "REL_45cb47c5bad7322db6e26ea5a6" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "abrigos"("id", "usuarioId", "enderecoId") SELECT "id", "usuarioId", "enderecoId" FROM "temporary_abrigos"`);
        await queryRunner.query(`DROP TABLE "temporary_abrigos"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TABLE "adotantes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "abrigos"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
