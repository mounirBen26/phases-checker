const generate = document.getElementById("generate");
const file_input = document.getElementById("file");
const table = document.querySelector("table tbody");
console.log('table',table)

generate.addEventListener("click", () => {
//    PapaParse(file_input)
   addLastMonthData()
});

// adding the last month data
function addLastMonthData() {
    let getLastMonthData = null
    let getCurrentMonthData = null
    // reading the last month data from the localstorage
    let lastMonthData = localStorage.getItem('lastMonthData');
    getLastMonthData = JSON.parse(lastMonthData);
    console.log(typeof getLastMonthData[0].reference)
    // console.log(jsonData[0].phase1 * 100000)
  // Iterate over the jsonData array
//   for (var i = 0; i < jsonData.length; i++) {
//     var obj = jsonData[i];

//     // Convert the values of the phase1, phase2, and phase3 properties to numbers
//     obj.phase1 = Number(obj.phase1);
//     obj.phase2 = Number(obj.phase2);
//     obj.phase3 = Number(obj.phase3);

//     // Access the properties of the JavaScript object
//     console.log(obj.reference, obj.phase1, obj.phase2, obj.phase3);
//   }
    // console.log('----',lastMonthData)
    // if (lastMonthData) {
    //     getLastMonthData = Papa.parse(lastMonthData[0],{
    //         header:true,
    //         dynamicTyping: true,
    //         skipEmptyLines: true,
    //     });
    //     console.log(getLastMonthData);
    // }
    
    // parsing the new data from the new month
    Papa.parse(file_input.files[0], {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            getCurrentMonthData = results.data;
            // console.log(getCurrentMonthData);
            // comparing the new data with the last month data
            if (getLastMonthData) {
                let nullChecker = null
                const matchedData = getLastMonthData.map(obj1 => {
                    const matchingObj2 = getCurrentMonthData.find(obj2 => obj2.S_Lc_ref === obj1.reference);
                    if (matchingObj2) {
                        // console.log(obj1.phase1 - matchingObj2.S_Phase1,obj1.phase2 - matchingObj2.S_Phase2,obj1.phase3 - matchingObj2.S_Phase3)
                       nullChecker = [obj1.reference,obj1.phase1 - matchingObj2.S_Phase1,obj1.phase2 - matchingObj2.S_Phase2,obj1.phase3 - matchingObj2.S_Phase3]
                       const tr = document.createElement('tr');
                       if(!nullChecker.includes(0)){
                        console.log('===---->>',nullChecker)
                        const td = document.createElement('td');
                        td.textContent = obj1.reference;
                        tr.appendChild(td);
                        const td1 = document.createElement('td');
                        td1.textContent = obj1.phase1 - matchingObj2.S_Phase1;
                        tr.appendChild(td1);
                        const td2 = document.createElement('td');
                        td2.textContent = obj1.phase2 - matchingObj2.S_Phase2;
                        tr.appendChild(td2);
                        const td3 = document.createElement('td');
                        td3.textContent = obj1.phase3 - matchingObj2.S_Phase3;
                        tr.appendChild(td3);
                        table.appendChild(tr);
                        
                       }
                        
                    
                    } else {
                        console.log("nothing")
                      return obj1;
                    }
                    
                  });
                //   console.log(matchedData)
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