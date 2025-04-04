import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1743690536906 implements MigrationInterface {
  name = "Migration1743690536906";

  // TODO - FAZER A FUNCIONALIDADE DE ADICIONAR SERVIÇOS NO ORÇAMENTO

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("budget_services");

    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: "budget_services",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              generationStrategy: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "budget_id",
              type: "uuid",
            },
            {
              name: "service_id",
              type: "uuid",
            },
            {
              name: "cost",
              type: "decimal",
              precision: 10,
              scale: 2,
            },
            {
              name: "quantity",
              type: "integer",
              default: 1,
            },
            {
              name: "total_cost",
              type: "decimal",
              precision: 10,
              scale: 2,
            },
          ],
          foreignKeys: [
            {
              name: "FKBudgetService",
              referencedTableName: "budgets",
              referencedColumnNames: ["id"],
              columnNames: ["budget_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            {
              name: "FKServiceBudget",
              referencedTableName: "services",
              referencedColumnNames: ["id"],
              columnNames: ["service_id"],
              onDelete: "SET NULL",
              onUpdate: "CASCADE",
            },
          ],
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("budget_services");

    if (tableExists) {
      await queryRunner.dropTable("budget_services");
    }
  }
}
