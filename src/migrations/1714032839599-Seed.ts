import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums/role.enums';

export class Seed1714032839599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create(User, {
        uName: 'mika',
        email: 'mika@gmail.com',
        password: 'ExTRaPaSsWoRd',
        role: Role.EXPERT,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
