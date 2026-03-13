import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.string('user_id').primary().defaultTo(knex.raw('(UUID())'));
    table.enum('role', ['employer', 'freelancer']).notNullable();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.integer('pfi_score').defaultTo(500);
    table.integer('trust_score').defaultTo(500);
    table.json('pfi_history').nullable();
    table.boolean('grace_period_active').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
