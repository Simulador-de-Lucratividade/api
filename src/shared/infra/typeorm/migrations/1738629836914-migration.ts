import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1738629836914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("user_tokens");
    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: "user_tokens",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              generationStrategy: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "refresh_token",
              type: "varchar",
            },
            {
              name: "user_id",
              type: "uuid",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "expires_date",
              type: "timestamp",
            },
          ],
          foreignKeys: [
            {
              name: "FKUserToken",
              referencedTableName: "user",
              referencedColumnNames: ["id"],
              columnNames: ["user_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
          ],
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
