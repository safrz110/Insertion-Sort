let sizeElement = document.getElementById('array-size-input'); // Array Size Element
let layoutElement = document.getElementById('array-layout-input'); // Array Layout Element
let sortOrderElement = document.getElementById('sort-order-input'); // Sort Order Element
let valuesElement = document.getElementById('array-values-input'); // Values Element 
let runButtonElemet = document.getElementById('run-button'); // Run Button
let resetButtonElemet = document.getElementById('reset-button'); // Reset Button Element

let visualizeContainer = document.getElementById('visualize-container'); // Container Element which holds sorted Bar or Array

let data = {
    size: parseInt(sizeElement.value), //store array size value selected by user
    layout: layoutElement.value, // store array layout selected by user
    sortOrder: sortOrderElement.value, // sort order
    values: "" // values entered by user
}

// handle array size dropdown change
sizeElement.addEventListener('change', (e) => {
    e.preventDefault();
    data.size = parseInt(e.target.value);
});

// handle layout array dropdown change
layoutElement.addEventListener('change', (e) => {
    e.preventDefault();
    data.layout = e.target.value;
});

// handle sort order dropdown change
sortOrderElement.addEventListener('change', (e) => {
    e.preventDefault();
    data.sortOrder = e.target.value;
});

// handle input array values entered by user
valuesElement.addEventListener('input', (e) => {
    e.preventDefault();
    let currValue = e.target.value;
    if(currValue.length > data.values.length){
        let lastChar = currValue[currValue.length-1];
        let validInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
        if(validInput.indexOf(lastChar) == -1){
            valuesElement.value = data.values;
            return;
        }
    }
    if(currValue[0] == ','){
        valuesElement.value = currValue.slice(1);
        data.values = currValue.slice(1);
        return;
    }
    if(currValue.length > 1 && currValue[currValue.length-1] == ',' && currValue[currValue.length-2] == ','){
        valuesElement.value = data.values;
        return;
    }
    data.values = currValue;
});


// handle reset button click event
resetButtonElemet.addEventListener('click', (e) => {
    e.preventDefault();
    valuesElement.value = "";
    data.values = "";
});

// handle run button click 
runButtonElemet.addEventListener('click', (e) => {
    e.preventDefault();
    let arrayValues = data.values.split(','); // spliting array values with comma
    arrayValues = arrayValues.filter( value => value != ""); // removing empty value 

    // showing alert if entered values size not matched with selected size from dropdown
    if(arrayValues.length !== data.size){
        alert(`You have selected array size : ${data.size} but entered ${arrayValues.length} elements`);
    }else{

        // runs if values size matched with selected size from dropdown
        arrayValues = arrayValues.map(value => parseInt(value));
        let sortedValues = [];
        // checking sort order 'ascending' or 'descending'
        if(data.sortOrder == "ascending"){
            sortedValues = arrayValues.sort((a,b) => a-b);
        }else{
            sortedValues = arrayValues.sort((a,b) => a-b).reverse();
        }
        // after sorting displaying bar or array
        displayOutput(sortedValues)
    }
    
});
function displayOutput(sortedValues){
    // display bars
    if(data.layout == 'bar'){
        let n = sortedValues.length;
        let maxVal = sortedValues[0] > sortedValues[n-1] ? sortedValues[0] : sortedValues[n-1];
        let percentValues = sortedValues.map(item => {
            return (item/maxVal)*100;
        });
        let htmlContent = `<div class="bar-container">`;
        for(let i=0;i<n;i++){
            htmlContent += generateBarElement(i, sortedValues[i], percentValues[i]);
        }
        htmlContent += '</div>'
        visualizeContainer.innerHTML = htmlContent;
    }else{
        // display array
        let n = sortedValues.length;
        let htmlContent = `<div class="array-container">`;
        for(let i=0;i<n;i++){
            htmlContent += generateArrayElement(i, sortedValues[i]);
        }
        htmlContent += '</div>'
        visualizeContainer.innerHTML = htmlContent;
    }
}

// generates bar element
function generateBarElement(index, value, percent){
    let ele = `
        <div class="bar" style="height: ${percent}%">
            <div class="label">${value}</div>
            <div class="index">${index}</div>
        </div>
    `;
    return ele;
}

// genereate array box element
function generateArrayElement(index, value){
    let ele = '';
    if(index == 0){
        ele = `
            <div class="box box-first">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }else if (index == data.size -1){
        ele = `
            <div class="box box-last">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }else{
        ele = `
            <div class="box">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }
    return ele;
}