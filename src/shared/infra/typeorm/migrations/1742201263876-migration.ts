import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBudgetFieldsAndUpdateUserDates1742201263876
  implements MigrationInterface
{
  name = "AddBudgetFieldsAndUpdateUserDates1742201263876";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "budgets",
      new TableColumn({
        name: "sequence_number",
        type: "int",
        isGenerated: true,
        generationStrategy: "increment",
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      "budgets",
      new TableColumn({
        name: "title",
        type: "varchar",
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      "budgets",
      new TableColumn({
        name: "observations",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT`
    );

    await queryRunner.dropColumn("budgets", "observations");
    await queryRunner.dropColumn("budgets", "title");
    await queryRunner.dropColumn("budgets", "sequence_number");
  }
}
