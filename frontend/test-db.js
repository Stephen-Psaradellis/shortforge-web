/**
 * Test script to check database connection and business intelligence data
 */

const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function testDatabase() {
  try {
    console.log('Connecting to database...');
    await client.connect();

    // Check available tables
    console.log('\n=== Available Tables ===');
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log(tablesResult.rows.map(row => row.table_name));

    // Check tables with domain_id column
    console.log('\n=== Tables with domain_id column ===');
    const domainTablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.columns
      WHERE column_name = 'domain_id'
        AND table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log(domainTablesResult.rows.map(row => row.table_name));

    if (domainTablesResult.rows.length > 0) {
      const tableName = domainTablesResult.rows[0].table_name;
      console.log(`\n=== Sample data from ${tableName} ===`);

      // Check data for domain_id = 1
      const dataResult = await client.query(`
        SELECT * FROM ${tableName}
        WHERE domain_id = $1
        LIMIT 5;
      `, ['1']);

      if (dataResult.rows.length > 0) {
        console.log('Found data for domain_id=1:');
        console.log('Columns:', dataResult.fields.map(f => f.name));
        dataResult.rows.forEach((row, index) => {
          console.log(`Row ${index + 1}:`, row);
        });
      } else {
        console.log('No data found for domain_id=1');
      }

      // Check all domain_ids in the table
      const allDomainsResult = await client.query(`
        SELECT DISTINCT domain_id, COUNT(*) as count
        FROM ${tableName}
        GROUP BY domain_id
        ORDER BY domain_id;
      `);

      console.log('\n=== All domain_ids in database ===');
      console.log(allDomainsResult.rows);
    }

  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await client.end();
  }
}

testDatabase();
