const generate = document.getElementById("generate");
const file_input = document.getElementById("file");
const table = document.getElementById("table");
console.log(generate)

generate.addEventListener("click", () => {
   PapaParse(file_input)
});

function PapaParse() {
    let arrayobj = [];
    Papa.parse(file_input.files[0], {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            arrayobj = results.data;
            let data = [];

            for (let i = 0; i < arrayobj.length; i++) {
                let item = arrayobj[i];
                let dataItem = {
                    reference: item.S_Lc_ref,
                    phase1: item.S_Phase1,
                    phase2: item.S_Phase2,
                    phase3: item.S_Phase3
                };
                data.push(dataItem);
            }

            let lastMonthData = JSON.stringify(data);
            

            // Check if the data already exists in local storage
            let existingData = localStorage.getItem('lastMonthData');

            if (!existingData || existingData !== lastMonthData) {
                // Add the data to local storage
                localStorage.setItem('lastMonthData', lastMonthData);
                console.log('Data added to local storage');
            } else {
                // The data already exists in local storage
                console.log('Data already exists in local storage');
            }
        }
    });
    let jsonString = localStorage.getItem('lastMonthData');
    let getlastMonthData = JSON.parse(jsonString);
    console.log('------------------',getlastMonthData)
}