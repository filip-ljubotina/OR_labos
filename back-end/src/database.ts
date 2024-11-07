import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'AVD-RH',
    password: 'matematika',
    port: 5432,
});

function formatDate(date: any) {
    if (!date) return "NULL";
    return new Date(date).toISOString().split('T')[0];
}

export async function fetchDefibrillators() {
    try {
        const res = await pool.query(`
      SELECT 
          defibrillators.serial_number,
          defibrillators.model,
          defibrillators.publicly_accessible,
          defibrillators.connected_to_ems,
          defibrillators.installation_date,
          defibrillators.last_service_date,
          defibrillators.next_service_date,
          defibrillators.location_address,
          electrodes.serial_number AS serial_number_2,
          electrodes.type,
          electrodes.expiration_date,
          owners.name,
          owners.address 
      FROM 
          defibrillators
      JOIN 
          electrodes ON electrodes.defibrillator_id = defibrillators.id
      JOIN 
          owners ON owners.id = defibrillators.owner_id;
    `);

        const formattedResult = res.rows.map(row => ({
            serial_number: row.serial_number,
            model: row.model,
            publicly_accessible: row.publicly_accessible ? "True" : "False",
            connected_to_ems: row.connected_to_ems ? "True" : "False",
            installation_date: formatDate(row.installation_date),
            last_service_date: formatDate(row.last_service_date),
            next_service_date: formatDate(row.next_service_date),
            location_address: row.location_address,
            serial_number_2: row.serial_number_2,
            type: row.type,
            expiration_date: formatDate(row.expiration_date),
            name: row.name,
            address: row.address
        }));


        return formattedResult;

    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}

