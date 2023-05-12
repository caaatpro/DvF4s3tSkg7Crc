import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683897067558 implements MigrationInterface {
    name = 'Init1683897067558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`login\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`surname\` varchar(255) NOT NULL, \`patronymic\` varchar(255) NULL, \`birthDate\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`contactPhone\` varchar(255) NULL, \`contactTelegram\` varchar(255) NULL, \`city\` varchar(255) NULL, \`position\` varchar(255) NOT NULL, \`statusText\` varchar(255) NULL, \`statusIcon\` varchar(255) NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` (\`login\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
