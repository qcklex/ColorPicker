
// Get every element by Id
const colorPickerInput = document.getElementById('color-picker-input')
const colorModeSelector = document.getElementById('color-mode-selector')

// This is how you get the selected value into a variable
let chosenColor = colorPickerInput.value
let chosenScheme = colorModeSelector.value

const getColorSchemeButton = document.getElementById('get-colorscheme-btn')
const colorBar1 = document.getElementById('color-bar1')
const colorBar2 = document.getElementById('color-bar2')
const colorBar3 = document.getElementById('color-bar3')
const colorBar4 = document.getElementById('color-bar4')
const colorBar5 = document.getElementById('color-bar5')
const colorBarsArr = [colorBar1, colorBar2, colorBar3, colorBar4, colorBar5]

const colorCode1 = document.getElementById('color-code1')
const colorCode2 = document.getElementById('color-code2')
const colorCode3 = document.getElementById('color-code3')
const colorCode4 = document.getElementById('color-code4')
const colorCode5 = document.getElementById('color-code5')
const colorCodeArr = [colorCode1, colorCode2, colorCode3, colorCode4, colorCode5]
let colorsFromAPI = []
//Good idea to make an array to know which elements are clickable
let clickableElements = colorCodeArr.concat(colorBarsArr)

function rgbToHex(color) {
    color = ""+ color;
    if (!color || color.indexOf("rgb") < 0) {
        return;
    }

    if (color.charAt(0) == "#") {
        return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
}

function showCopiedPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('hidden');
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 1000);
}

// click to copy for the colorCode from the colorCode below the colorBars
for (let i = 0; i < colorBarsArr.length; i++) {
    colorCodeArr[i].addEventListener("click", () => {
        let targetValue = (colorCodeArr[i].textContent); 

        navigator.clipboard.writeText(targetValue)
            .then(() => {
                console.log('Copied to clipboard:', targetValue);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });

            showCopiedPopup()
    });
}

// click to copy for the colorCode from the colorBars
for (let i = 0; i < colorBarsArr.length; i++) {
    colorBarsArr[i].addEventListener("click", () => {
        let computedStyle = getComputedStyle(colorBarsArr[i]);
        let targetValue = rgbToHex(computedStyle.backgroundColor).toUpperCase(); 

        navigator.clipboard.writeText(targetValue)
            .then(() => {
                console.log('Copied to clipboard:', targetValue);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
            showCopiedPopup()
    });
}



// Getting data from API and storing it into the colorBarsArr and the colorCodeArr(Hex). 
document.getElementById("btn").addEventListener("click", function(e) {
    e.preventDefault()
    chosenColor = colorPickerInput.value.substring(1)
    let chosenScheme = colorModeSelector.value

        fetch(`https://www.thecolorapi.com/scheme?format=json&hex=${chosenColor}&mode=${chosenScheme}`)
        .then(res => res.json())
        .then(data => {
        colorsFromAPI = []

        // getting colors.data into colorsFromAPI array
        for (let i = 0; i < data.colors.length; i++) {
            colorsFromAPI.push(data.colors[i].hex.value)
            console.log(colorsFromAPI)
        }

        //updating data for my already created arrays 1. colorBars and 2. colorHexCodes
        for (let i = 0; i < colorsFromAPI.length; i++) {
            colorBarsArr[i].style.background = colorsFromAPI[i]
            colorCodeArr[i].textContent = colorsFromAPI[i]
          
        }
    })
})




//dark / light modes

// Add to index.js
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

document.addEventListener('DOMContentLoaded', initTheme);