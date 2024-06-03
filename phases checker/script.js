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
        complete: function (results) {
            arrayobj = results.data;
            
            console.log(parseFloat(arrayobj[1][4]));
        }
    });
    // console.log(arrayobj);
}