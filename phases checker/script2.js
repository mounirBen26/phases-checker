console.log('im script 2')
const exportButton = document.getElementById('export-button');
const fileInput = document.getElementById('file');
// const table = document.querySelector('table tbody');
const display = document.getElementById('display');
const tableTitle = document.getElementById('table-title');
let functonState = false
function HandleExport() {
    exportState = !exportState	
    title.textContent = "Energy Export Checker";
    tableTitle.textContent = "Clients Ayant une Energie Export";
    fileInput.value = '';
    container.style.backgroundColor = "#c6eed9";
    display.style.backgroundColor = "white";
    display.style.borderRadius = "10px";
    file_input_container.style.backgroundColor ="white";
    role_fichier.textContent = "Charger le Fichier Export Mois n";
}

// adding the n-1 month export energydata
function AddLastMonthDataExp() {
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


// adding the N month data Export
function AddCurrentMonthDataExp() {
    let getLastMonthDataExp = null
    let getCurrentMonthDataExp = null
    // reading the last month data from the localstorage
    let lastMonthDataExp = localStorage.getItem('lastMonthDataExp');
    getLastMonthDataExp = JSON.parse(lastMonthDataExp);

    // parsing the new data from the new month
    Papa.parse(file_input.files[0], {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            getCurrentMonthDataExp = results.data;
            // comparing the new data with the last month data
            if (getLastMonthDataExp) {
                let index = 0
                let nullChecker = null
                const matchedData = getLastMonthDataExp.map(obj1 => {
                    const matchingObj2 = getCurrentMonthDataExp.find(obj2 => obj2.S_Lc_ref === obj1.reference);
                    if (matchingObj2) {
                        // console.log(obj1.phase1 - matchingObj2.S_Phase1,obj1.phase2 - matchingObj2.S_Phase2,obj1.phase3 - matchingObj2.S_Phase3)
                        expChecker = [matchingObj2.S_attni1e - obj1.phase1Exp, matchingObj2.S_attni2e - obj1.phase2Exp, matchingObj2.S_attni3e - obj1.phase3Exp]
                        expChecker = expChecker.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                        const tr = document.createElement('tr');
                        if (expChecker !== 0) {
                            console.log('----->>>>>', nullChecker)
                            index++
                            const tdIndex = document.createElement('td');
                            tdIndex.textContent = index;
                            tr.appendChild(tdIndex);
                            const td = document.createElement('td');
                            td.textContent = obj1.reference;
                            tr.appendChild(td);
                            const td1 = document.createElement('td');
                            td1.textContent = matchingObj2.S_attni1e - obj1.phase1Exp;
                            if (matchingObj2.S_attni1e - obj1.phase1Exp !== 0) {
                                td1.style.backgroundColor = 'orange';
                                td1.style.color = 'white';
                            }
                            tr.appendChild(td1);
                            const td2 = document.createElement('td');
                            td2.textContent = matchingObj2.S_attni2e - obj1.phase2Exp;
                            if (matchingObj2.S_attni2e - obj1.phase2Exp !== 0) {
                                td2.style.backgroundColor = 'orange';
                                td2.style.color = 'white';
                            }
                            tr.appendChild(td2);
                            const td3 = document.createElement('td');
                            td3.textContent = matchingObj2.S_attni3e - obj1.phase3Exp;
                            if (matchingObj2.S_attni3e - obj1.phase3Exp !== 0) {
                                td3.style.backgroundColor = 'orange';
                                td3.style.color = 'white';
                            }
                            tr.appendChild(td3);
                            table.appendChild(tr);

                        }

                    } else {
                        return
                    }

                });
            }

        },

    })
}
//switch button betwenn phases checker and export checker
exportButton.addEventListener('click', HandleExport)

// toggle switch
// let toggleState = false;
// toggleSwitch.addEventListener('change', () => {
//     if (toggleSwitch.checked) {
//         // console.log('Toggle is ON');
//         // Add your logic here when toggle is ON
//         generate.textContent = "Charger";
//         generate.style.backgroundColor = "lightblue";
//         role_fichier.textContent = " 1- Charger le Fichier Export n-1 Dans la Mémoire";
//         role_fichier.style.fontSize = "14px";
//         role_fichier.style.fontWeight = "bold";
//         file_input_container.style.backgroundColor ="#9FE2BF"
//         toggleState = true
//     } else {
//         // console.log('Toggle is OFF');
//         // Add your logic here when toggle is OFF
//         generate.textContent = "Analyser"
//         generate.style.backgroundColor = "blue";
//         role_fichier.textContent = "2- Charger le Fichier Export Mois n";
//         role_fichier.style.fontWeight = "bold";
//         role_fichier.style.fontSize = "14px";
//         file_input_container.style.backgroundColor = "#c6eed9"
//         toggleState = false
//     }
// });

generate.addEventListener("click", () => {
    if(toggleState == false){
        AddCurrentMonthDataExp()
    }
    else {
        AddLastMonthDataExp()
    }
    
});

