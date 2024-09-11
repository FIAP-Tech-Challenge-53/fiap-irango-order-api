import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableExclusionRequest1726059960665 implements MigrationInterface {
    name = 'CreateTableExclusionRequest1726059960665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` DROP FOREIGN KEY \`FK_7c6a2bddcda5e096ce69072ac9d\``);
        await queryRunner.query(`ALTER TABLE \`Pedido\` DROP FOREIGN KEY \`FK_7c6d2423ee562c77254361ac756\``);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` DROP FOREIGN KEY \`FK_253d048ad87d3579a5cd7935f4a\``);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` DROP FOREIGN KEY \`FK_355616aab641874d52a5a1d9447\``);
        await queryRunner.query(`CREATE TABLE \`ExclusionRequest\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`telefone\` varchar(255) NOT NULL, \`data\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Produto\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`Produto\` ADD \`deleted_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` ADD CONSTRAINT \`FK_7c6a2bddcda5e096ce69072ac9d\` FOREIGN KEY (\`produto_id\`) REFERENCES \`Produto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Pedido\` ADD CONSTRAINT \`FK_7c6d2423ee562c77254361ac756\` FOREIGN KEY (\`consumidor_id\`) REFERENCES \`Consumidor\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` ADD CONSTRAINT \`FK_355616aab641874d52a5a1d9447\` FOREIGN KEY (\`pedido_id\`) REFERENCES \`Pedido\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` ADD CONSTRAINT \`FK_253d048ad87d3579a5cd7935f4a\` FOREIGN KEY (\`produto_id\`) REFERENCES \`Produto\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` DROP FOREIGN KEY \`FK_253d048ad87d3579a5cd7935f4a\``);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` DROP FOREIGN KEY \`FK_355616aab641874d52a5a1d9447\``);
        await queryRunner.query(`ALTER TABLE \`Pedido\` DROP FOREIGN KEY \`FK_7c6d2423ee562c77254361ac756\``);
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` DROP FOREIGN KEY \`FK_7c6a2bddcda5e096ce69072ac9d\``);
        await queryRunner.query(`ALTER TABLE \`Produto\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`Produto\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`DROP TABLE \`ExclusionRequest\``);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` ADD CONSTRAINT \`FK_355616aab641874d52a5a1d9447\` FOREIGN KEY (\`pedido_id\`) REFERENCES \`Pedido\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ItemPedido\` ADD CONSTRAINT \`FK_253d048ad87d3579a5cd7935f4a\` FOREIGN KEY (\`produto_id\`) REFERENCES \`Produto\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Pedido\` ADD CONSTRAINT \`FK_7c6d2423ee562c77254361ac756\` FOREIGN KEY (\`consumidor_id\`) REFERENCES \`Consumidor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` ADD CONSTRAINT \`FK_7c6a2bddcda5e096ce69072ac9d\` FOREIGN KEY (\`produto_id\`) REFERENCES \`Produto\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
