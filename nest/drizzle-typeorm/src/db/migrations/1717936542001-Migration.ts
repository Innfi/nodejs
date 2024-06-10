import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717936542001 implements MigrationInterface {
    name = 'Migration1717936542001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyName\` text NOT NULL, \`city\` text NULL, \`country\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`supplierId\` int NOT NULL, \`unitPrice\` decimal(10,4) NOT NULL, \`unitsInStock\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_details\` (\`orderId\` int NOT NULL, \`productId\` int NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`orderId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderDate\` date NOT NULL, \`shippedDate\` date NULL, \`shipAddress\` text NOT NULL, \`shipPostalCode\` text NULL, \`shipCountry\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_c143cbc0299e1f9220c4b5debd8\` FOREIGN KEY (\`supplierId\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_147bc15de4304f89a93c7eee969\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_c67ebaba3e5085b6401911acc70\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_c67ebaba3e5085b6401911acc70\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_147bc15de4304f89a93c7eee969\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_c143cbc0299e1f9220c4b5debd8\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order_details\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
    }

}
