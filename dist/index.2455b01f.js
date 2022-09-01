const bar = document.querySelector(".loading__bar--inner");
const numCounter = document.querySelector(".loading__counter--number");
let counter = 0;
let barInterval = setInterval(()=>{
    bar.style.width = counter + "%";
    numCounter.innerText = `${counter}%`;
    counter++;
    if (counter === 101) clearInterval(barInterval);
}, 20);

//# sourceMappingURL=index.2455b01f.js.map
