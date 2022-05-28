// toggle mobile menu 
function toggleMenu() {
    let menu = document.querySelector('.menu-mobile');
    if (menu.style.display === 'block') {
        menu.style.display = "none"
    } else {
        menu.style.display = "block"
    }
}


let longLinkValue = document.querySelector("#longLinkValue")
let baseURl = "https://api.shrtco.de/v2/shorten";

// Shotening links and store to local storage
const makeLinkShort = async () => {
    console.log(longLinkValue.value)
   
    let errorMsg = document.querySelector('.shotren-error');
    if(longLinkValue.value === ''){
        errorMsg.style.visibility = "visible";
        longLinkValue.classList.add("error")
    }else{
        errorMsg.style.visibility = "hidden";
        longLinkValue.classList.remove("error")
    }
     // using api to shorten the link
    const shortenLink = await fetch(`${baseURl}?url=${longLinkValue.value}`)
    const response = await shortenLink.json();

    // Store data in local storge
    let storgeData = JSON.parse(localStorage.getItem("storgeData")) || [];
    let storeLink = JSON.stringify(response.result["short_link"])
    console.log(storeLink)
    storgeData.push(storeLink)
    localStorage.setItem(`${longLinkValue.value}`, storeLink)
    longLinkValue.value = ''
    showData()
}


// showing data in local storage and copy short link
let showData = () => {
    const box = document.querySelector(".links-box-container")
    let result = ''
    for (let i = 0; i < localStorage.length; i++) {
        const output = `
        <div class="links-box">
        <p>${localStorage.key(i)}</p>
        <hr>
        <div class="short-box">
        <p class="short-link"> ${JSON.parse(localStorage.getItem(localStorage.key(i)))} </p>
        <button class="copyBtn">copy</button>
        </div>
        </div> `
        result += output
    }
    box.innerHTML = result

    // copy function
    let copyTxt = document.querySelector(".short-link");
    let copyBtn = document.querySelectorAll(".copyBtn")
    copyBtn.forEach(item => {
        item.addEventListener("click", () => {
            if (item.innerText === "copy") {
                navigator.clipboard.writeText(copyTxt.innerText)
                item.textContent = "Copied!";
                item.style.backgroundColor = "hsl(260, 8%, 14%)";
                // alert("copied" + copyTxt.innerHTML)
            } else {
                alert("Already copied")
            }

        })
    });
}
if( localStorage.length > 0 ){
    console.log("heoo")
    showData()
}