
exports.up = function(knex) {
    return knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id')
        table.string('recipe_name',128).notNullable().unique()
        table.string('created_at',128).notNullable()
    })
    .createTable('steps', table => {
        table.increments('step_id')
        table.integer('step_number')
        table.string('step_instructions')
        table.integer('recipe_id').notNullable()
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id')
        table.string('ingredient_name',128).notNullable()
        table.integer('step_id')
            .unsigned() 
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('RESTRICT')
    })
    .createTable('step-ingredients', table => {
        table.increments('step_ingredients_id')
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('RESTRICT')
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('RESTRICT')
        table.integer('quantity')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('step_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('recipes')
};
