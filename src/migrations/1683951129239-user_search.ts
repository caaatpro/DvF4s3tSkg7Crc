import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSearch1683951129239 implements MigrationInterface {
    name = 'UserSearch1683951129239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`searchFull\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_2f30ad85eca06df8e254607d68\` (\`searchFull\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`birthDate\` \`birthDate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`city\` \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`birthDate\` \`birthDate\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_2f30ad85eca06df8e254607d68\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`searchFull\``);
    }

}
