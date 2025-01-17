export function transformAndEnrichDefibrillatorData(data: any[]): any[] {
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

    const enrichedData = transformedData.map((item) => {
        return {
            "@context": {
                "@vocab": "http://schema.org/",
                "serijski_broj_defibrilatora": "identifier",
                "model_defibrilatora": "name"
            },
            "@type": "MedicalDevice",
            serijski_broj_defibrilatora: item.serijski_broj_defibrilatora,
            ime_vlasnika: item.ime_vlasnika,
            adresa_vlasnika: item.adresa_vlasnika,
            model_defibrilatora: item.model_defibrilatora,
            lokacija_defibrilatora: item.lokacija_defibrilatora,
            javno_dostupan: item.javno_dostupan,
            povezan_s_hitnom_službom: item.povezan_s_hitnom_službom,
            datum_instalacije: item.datum_instalacije,
            datum_zadnjeg_servisa: item.datum_zadnjeg_servisa,
            datum_sljedećeg_servisa: item.datum_sljedećeg_servisa,
            //@ts-ignore 
            elektrode: item.elektrode.map(electrode => ({
                serijski_broj_elektrode: electrode.serijski_broj_elektrode,
                vrsta_elektrode: electrode.vrsta_elektrode,
                rok_trajanja_elektrode: electrode.rok_trajanja_elektrode
            }))
        };
    });

    return enrichedData;
}
