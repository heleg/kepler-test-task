import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736814394977 implements MigrationInterface {
    name = 'Migration1736814394977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_answer" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "answer" json NOT NULL, "sessionIdId" integer, CONSTRAINT "PK_9d91777df633c542d7084197b64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session_answer" ADD CONSTRAINT "FK_dbce3df8a3b274ff5156c67efdd" FOREIGN KEY ("sessionIdId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_answer" DROP CONSTRAINT "FK_dbce3df8a3b274ff5156c67efdd"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "session_answer"`);
    }

}
