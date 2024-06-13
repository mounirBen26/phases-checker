const generate = document.getElementById("generate");
const file_input = document.getElementById("file");
const file_input_container = document.getElementById("file-input");
const table = document.querySelector("table tbody");
const toggleSwitch = document.getElementById('toggleSwitch');
const role_fichier = document.getElementById('role-fichier');
const phasesButton = document.getElementById('phases-button');
const fileInput = document.getElementById('file');
const display = document.getElementById('display');
const tableTitle = document.getElementById('table-title');
const title = document.getElementById('title');
const loader = document.getElementById('loader')
const file_uploaded = document.getElementById('file-uploaded');
// FUNCTION STATE
let functionState = true
phasesButton.addEventListener('click',()=>{
    functionState = !functionState
    console.log('functionState',functionState)
    if (functionState === true) {
        phasesButton.textContent = "Phases"
        tableTitle.textContent = "Phases à consommation zéro"
        phasesButton.style.backgroundColor = "blue"
        title.textContent = "Phases Checker";
        file_input_container.style.backgroundColor ="#c6eed9"
        
    } if(functionState === false){ 
        title.textContent = "Export Energie Checker";
        phasesButton.textContent = "Export"
        tableTitle.textContent = "Clients Avec Energie Export"
        phasesButton.style.backgroundColor = "#000080"
        file_input_container.style.backgroundColor ="#FFFF00"
        
    }
})
// TOGGLE STATE
let toggleState = false;
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked && functionState === true) {
    console.log('Toggle is ON  and i can upload n-1 file and functionState is :',title.textContent);
        // // Add your logic here when toggle is ON
        generate.textContent = "Charger";
        generate.style.backgroundColor = "green";
        // role_fichier.textContent = "Charger le Fichier Dans la Mémoire";
        // role_fichier.style.fontSize = "14px";
        // role_fichier.style.fontWeight = "bold";
        // file_input_container.style.backgroundColor ="#FFE0E0"
        toggleState = true
    } else if (toggleSwitch.checked && functionState === false) {
        
       console.log('Toggle is ON and i can upload n -1 file and functionState is :',title.textContent);
        // Add your logic here when toggle is OFF
        generate.textContent = "Charger"
        generate.style.backgroundColor = "green";
        // role_fichier.textContent = "Charger le Fichier Pour analyser";
        // role_fichier.style.fontWeight = "bold";
        // role_fichier.style.fontSize = "14px";
        // file_input_container.style.backgroundColor = "#c6eed9"
        toggleState = true
    } else if (!toggleSwitch.checked && functionState === true) {
        console.log('Toggle is OFF and i can upload n file and functionState is :',title.textContent);
        // Add your logic here when toggle is OFF
        generate.textContent = "Analyser"
        generate.style.backgroundColor = "blue";
        // role_fichier.textContent = "Charger le Fichier Pour analyser";
        // role_fichier.style.fontWeight = "bold";
        // role_fichier.style.fontSize = "14px";
        // file_input_container.style.backgroundColor = "#c6eed9"
        toggleState = false
    } else if (!toggleSwitch.checked && functionState === false) {
        console.log('Toggle is OFF and i can upload n file and functionState is :',title.textContent);
        // Add your logic here when toggle is OFF
        generate.textContent = "Analyser";
        generate.style.backgroundColor = "blue";
        // role_fichier.textContent = "Charger le Fichier Dans la Mémoire";
        // role_fichier.style.fontSize = "14px";
        // role_fichier.style.fontWeight = "bold";
        // file_input_container.style.backgroundColor ="#FFE0E0"
        toggleState = true
    }
});



generate.addEventListener("click", () => {
    // check if toggle is on and the function state is 
    if (!toggleState && functionState) {
        addCurrentMonthDataPhases();
      } else if (toggleState && functionState) {
        loader.classList.add('show');
        addLastMonthDataPhases();
      } else if (!toggleState && !functionState) {
        addCurrentMonthDataExp();
      } else if (toggleState && !functionState) {
        addLastMonthDataExp();
      }
    
});



////////////// PHASES CHECKER PART


// adding the last month data
function addCurrentMonthDataPhases() {
    let getLastMonthData = null
    let getCurrentMonthData = null
    // reading the last month data from the localstorage
    let lastMonthData = localStorage.getItem('lastMonthData');
    getLastMonthData = JSON.parse(lastMonthData);
    
    // parsing the new data from the new month
    Papa.parse(file_input.files[0], {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            getCurrentMonthData = results.data;
            // comparing the new data with the last month data
            if (getLastMonthData) {
                let index = 0
                let nullChecker = null
                const matchedData = getLastMonthData.map(obj1 => {
                    const matchingObj2 = getCurrentMonthData.find(obj2 => obj2.S_Lc_ref === obj1.reference);
                    if (matchingObj2) {
                        // console.log(obj1.phase1 - matchingObj2.S_Phase1,obj1.phase2 - matchingObj2.S_Phase2,obj1.phase3 - matchingObj2.S_Phase3)
                        nullChecker = [obj1.reference, matchingObj2.S_Phase1 - obj1.phase1, matchingObj2.S_Phase2 - obj1.phase2, matchingObj2.S_Phase3 - obj1.phase3]
                        const tr = document.createElement('tr');
                        if (nullChecker.includes(0)) {
                            index++
                            const tdIndex = document.createElement('td');
                            tdIndex.textContent = index;
                            tr.appendChild(tdIndex);
                            const td = document.createElement('td');
                            td.textContent = obj1.reference;
                            tr.appendChild(td);
                            const td1 = document.createElement('td');
                            td1.textContent = matchingObj2.S_Phase1 - obj1.phase1;
                            if (matchingObj2.S_Phase1 - obj1.phase1 === 0) {
                                td1.style.backgroundColor = 'red';
                                td1.style.color = 'white';
                            }
                            tr.appendChild(td1);
                            const td2 = document.createElement('td');
                            td2.textContent = matchingObj2.S_Phase2 - obj1.phase2;
                            if (matchingObj2.S_Phase2 - obj1.phase2 === 0) {
                                td2.style.backgroundColor = 'red';
                                td2.style.color = 'white';
                            }
                            tr.appendChild(td2);
                            const td3 = document.createElement('td');
                            td3.textContent = matchingObj2.S_Phase3 - obj1.phase3;
                            if (matchingObj2.S_Phase3 - obj1.phase3 === 0) {
                                td3.style.backgroundColor = 'red';
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


// adding the n-1 month data
function addLastMonthDataPhases() {
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

            // Add data to local storage
            let lastMonthData = JSON.stringify(data);

            // Check if the data already exists in local storage
            let existingData = localStorage.getItem('lastMonthData');

            if (!existingData) {
                // Add the data to local storage
                localStorage.setItem('lastMonthData', lastMonthData);
                alert('Le fichier Energie par Phases n-1 chargé dans la mémoire correctement!');
            } else if(existingData !== lastMonthData) {
                // The data already exists in local storage
                localStorage.setItem('lastMonthData', lastMonthData);
                alert('Le fichier Energie par Phases n-1 chargé dans la mémoire correctement!');
            } else if (existingData === lastMonthData) {
                alert('Le fichier Energie par Phases n-1 a été déja chargé dans la mémoire!');
            }
        }
        
    });

}




////// EXPORT CHECKER PART //////////



// adding the n-1 month export energydata
function addLastMonthDataExp() {
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

            if (!existingDataExp) {
                // Add the data to local storage
                localStorage.setItem('lastMonthDataExp', lastMonthDataExp);
                alert('Le fichier Energie Export N-1 chargé dans la mémoire correctement!');
            } else if(existingDataExp !== lastMonthDataExp) {
                // The data already exists in local storage
                localStorage.setItem('lastMonthDataExp', lastMonthDataExp);
                alert('Le Fichier Energie Export N-1 chargé correctement dans la mémoire ');    
            } else if(existingDataExp === lastMonthDataExp) {
                alert('Le Fichier Energie Export N-1 a été déja chargé dans la mémoire ');
            }
        }
    });
}


// adding the N month data Export
function addCurrentMonthDataExp() {
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





