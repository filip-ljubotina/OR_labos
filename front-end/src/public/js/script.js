fetch('http://localhost:3001/fetchDefibrillators')
    .then(response => response.json())
    .then(data => {
        const tableData = data.map(item => [
            item.serial_number,
            item.model,
            item.publicly_accessible,
            item.connected_to_ems,
            item.installation_date,
            item.last_service_date,
            item.next_service_date,
            item.location_address,
            item["serial_number_2"],
            item.type,
            item.expiration_date,
            item.name,
            item.address
        ]);

        const grid = new gridjs.Grid({
            columns: [
                "Serijski broj defibrilatora",
                "Model defibrilatora",
                "Javno dostupan",
                "Povezan s hitnom službom",
                "Datum instalacije",
                "Datum zadnjeg servisa",
                "Datum sljedećeg servisa",
                "Lokacija defibrilatora",
                "Serijski broj elektrode",
                "Vrsta elektrode",
                "Rok trajanja elektrode",
                "Ime vlasnika",
                "Adresa vlasnika"
            ],
            data: tableData,
            search: false,
            pagination: false,
            sort: true
        }).render(document.getElementById("grid-table"));

        const searchInput = document.getElementById("search-input");
        const columnSelect = document.getElementById("column-select");

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const selectedColumn = columnSelect.value;

            if (selectedColumn === "all") {
                const filteredData = tableData.filter(row =>
                    row.some(cell => cell.toString().toLowerCase().includes(query))
                );

                grid.updateConfig({
                    data: filteredData
                }).forceRender();
            } else {
                const columnIndex = getColumnIndex(selectedColumn);
                const filteredData = tableData.filter(row => {
                    return row[columnIndex].toString().toLowerCase().includes(query);
                });

                grid.updateConfig({
                    data: filteredData,
                    search: false
                }).forceRender();
            }
        });

        document.getElementById("export-csv").addEventListener("click", () => {
            const visibleData = getVisibleData();
            exportToCSV(visibleData);
        });

        document.getElementById("export-json").addEventListener("click", () => {
            const visibleData = getVisibleData();
            exportToJSON(visibleData);
        });

        function getColumnIndex(columnName) {
            const columnMap = {
                "serial_number": 0,
                "model": 1,
                "publicly_accessible": 2,
                "connected_to_ems": 3,
                "installation_date": 4,
                "last_service_date": 5,
                "next_service_date": 6,
                "location_address": 7,
                "serial_number_2": 8,
                "type": 9,
                "expiration_date": 10,
                "name": 11,
                "address": 12
            };
            return columnMap[columnName];
        }
    })
    .catch(error => console.error("Error loading JSON data:", error));

function getVisibleData() {
    const rows = document.querySelectorAll("#grid-table .gridjs-tbody .gridjs-tr");
    const visibleData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll(".gridjs-td");
        const rowData = Array.from(cells).map(cell => cell.textContent.trim());
        visibleData.push(rowData);
    });

    return visibleData;
}

function exportToCSV(data) {
    const csvContent = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    a.click();
    URL.revokeObjectURL(url);
}

function exportToJSON(data) {
    const jsonData = data.map(row => {
        return {
            "Serial Number": row[0],
            "Model": row[1],
            "Publicly Accessible": row[2],
            "Connected to EMS": row[3],
            "Installation Date": row[4],
            "Last Service Date": row[5],
            "Next Service Date": row[6],
            "Location Address": row[7],
            "Serial Number 2": row[8],
            "Type": row[9],
            "Expiration Date": row[10],
            "Owner Name": row[11],
            "Owner Address": row[12]
        };
    });

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.json";
    a.click();
    URL.revokeObjectURL(url);
}
