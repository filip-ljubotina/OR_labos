import fs from 'fs';
import path from 'path';

function transformDefibrillatorData(data: any[]): any[] {
    const transformedData: any[] = [];
    const groupedData: Record<string, any[]> = {};

    data.forEach((entry) => {
        if (!groupedData[entry.serial_number]) {
            groupedData[entry.serial_number] = [];
        }
        groupedData[entry.serial_number].push(entry);
    });

    for (const [serialNumber, entries] of Object.entries(groupedData)) {
        const baseEntry = entries[0];
        const transformedEntry = {
            serijski_broj_defibrilatora: baseEntry.serial_number,
            ime_vlasnika: baseEntry.name,
            adresa_vlasnika: baseEntry.address,
            model_defibrilatora: baseEntry.model,
            lokacija_defibrilatora: baseEntry.location_address,
            javno_dostupan: baseEntry.publicly_accessible.toLowerCase() === "true" ? "t" : "f",
            povezan_s_hitnom_službom: baseEntry.connected_to_ems.toLowerCase() === "true" ? "t" : "f",
            datum_instalacije: baseEntry.installation_date === "NULL" ? "" : baseEntry.installation_date,
            datum_zadnjeg_servisa: baseEntry.last_service_date === "NULL" ? "" : baseEntry.last_service_date,
            datum_sljedećeg_servisa: baseEntry.next_service_date === "NULL" ? "" : baseEntry.next_service_date,
            elektrode: []
        };

        entries.forEach((entry) => {
            const electrode = {
                serijski_broj_elektrode: entry.serial_number_2,
                vrsta_elektrode: entry.type,
                rok_trajanja_elektrode: entry.expiration_date
            };
            // @ts-ignore
            transformedEntry.elektrode.push(electrode);
        });

        transformedData.push(transformedEntry);
    }

    return transformedData;
}

function convertToCSV(data: any[]): string {
    const headers = [
        "serijski_broj_defibrilatora",
        "ime_vlasnika",
        "adresa_vlasnika",
        "model_defibrilatora",
        "lokacija_defibrilatora",
        "javno_dostupan",
        "povezan_s_hitnom_službom",
        "datum_instalacije",
        "datum_zadnjeg_servisa",
        "datum_sljedećeg_servisa",
        "elektrode"
    ];

    const csvRows = [headers.join(",")];

    data.forEach(entry => {
        const row = [
            entry.serijski_broj_defibrilatora,
            entry.ime_vlasnika,
            entry.adresa_vlasnika,
            entry.model_defibrilatora,
            entry.lokacija_defibrilatora,
            entry.javno_dostupan,
            entry.povezan_s_hitnom_službom,
            entry.datum_instalacije,
            entry.datum_zadnjeg_servisa,
            entry.datum_sljedećeg_servisa,
            entry.elektrode.map((elektroda: any) => `${elektroda.serijski_broj_elektrode}|${elektroda.vrsta_elektrode}|${elektroda.rok_trajanja_elektrode}`).join(";")
        ];

        csvRows.push(row.map(value => `"${value}"`).join(","));
    });

    return csvRows.join("\n");
}

export function updateFiles(data: any[]): void {
    const transformedData = transformDefibrillatorData(data);
    const csvData = convertToCSV(transformedData);
    const csvPath = path.join(__dirname, "../public/AVD_RH.csv");
    const jsonPath = path.join(__dirname, "../public/AVD_RH.json");

    if (fs.existsSync(csvPath)) {
        fs.unlinkSync(csvPath);
    }
    if (fs.existsSync(jsonPath)) {
        fs.unlinkSync(jsonPath);
    }

    fs.writeFileSync(csvPath, csvData, "utf-8");
    fs.writeFileSync(jsonPath, JSON.stringify(transformedData, null, 4), "utf-8");
}