const generate = document.getElementById("generate");
const file_input = document.getElementById("file");
const table = document.querySelector("table tbody");
const toggleSwitch = document.getElementById('toggleSwitch');

let toggleState = false;
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        console.log('Toggle is ON');
        // Add your logic here when toggle is ON
        generate.textContent = "Charger";
        generate.style.backgroundColor = "green";
        toggleState = true
    } else {
        console.log('Toggle is OFF');
        // Add your logic here when toggle is OFF
        generate.textContent = "Analyser"
        generate.style.backgroundColor = "blue";
        toggleState = false
    }
});

generate.addEventListener("click", () => {
    //    PapaParse(file_input)
    if(toggleState == false){
        addLastMonthData()
    }
    else {
        PapaParse()
    }
    
});

// adding the last month data
function addLastMonthData() {
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
                let nullChecker = null
                const matchedData = getLastMonthData.map(obj1 => {
                    const matchingObj2 = getCurrentMonthData.find(obj2 => obj2.S_Lc_ref === obj1.reference);
                    if (matchingObj2) {
                        // console.log(obj1.phase1 - matchingObj2.S_Phase1,obj1.phase2 - matchingObj2.S_Phase2,obj1.phase3 - matchingObj2.S_Phase3)
                        nullChecker = [obj1.reference, matchingObj2.S_Phase1 - obj1.phase1, matchingObj2.S_Phase2 - obj1.phase2, matchingObj2.S_Phase3 - obj1.phase3]
                        const tr = document.createElement('tr');
                        if (nullChecker.includes(0)) {
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

            // Add data to local storage
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

}