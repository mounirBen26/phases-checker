console.log('im script 2')
const exportButton = document.getElementById('export-button');
const fileInput = document.getElementById('file');
// const table = document.querySelector('table tbody');
const display = document.getElementById('display');


function HandleExport() {
    fileInput.value = '';
    display.style.backgroundColor = "yellow";
    file_input_container.style.backgroundColor ="yellow"
}

// adding the n-1 month export energydata
function PapaParseExp() {
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
                    phase1Exp: item.S_attni1e,
                    phase2Exp: item.S_attni2e,
                    phase3Exp: item.S_attni3e
                };
                data.push(dataItem);
            }

            // Add data to local storage
            let lastMonthDataExp = JSON.stringify(data);

            // Check if the data already exists in local storage
            let existingDataExp = localStorage.getItem('lastMonthDataExp');

            if (!existingDataExp || existingDataExp !== lastMonthDataExp) {
                // Add the data to local storage
                localStorage.setItem('lastMonthDataExp', lastMonthDataExp);
                console.log('Export Data N-1 added to local storage');
            } else {
                // The data already exists in local storage
                localStorage.setItem('lastMonthDataExp', lastMonthDataExp);
                alert('Le Fichier Energie Export N-1 chargé correctement dans la mémoire ');
                
            }
        }
    });

}
exportButton.addEventListener('click', HandleExport)
