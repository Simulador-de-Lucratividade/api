import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migration1743775484274 implements MigrationInterface {
  name = "Migration1743775484274";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "budget_other_costs",
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
            name: "description",
            type: "varchar",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "cost_type",
            type: "enum",
            enum: ["fixed", "percentage"],
            default: "'fixed'",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "budget_other_costs",
      new TableForeignKey({
        name: "BudgetOtherCostsBudget",
        columnNames: ["budget_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "budgets",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "budget_other_costs",
      "BudgetOtherCostsBudget"
    );
    await queryRunner.dropTable("budget_other_costs");
  }
}
