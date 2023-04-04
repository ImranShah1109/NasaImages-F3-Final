// 9yxGNtiHgikldDdAiYSLBnQm528CnZKBtzJMSVA9

// https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}

// https://api.nasa.gov/planetary/apod?date=2023-03-03&api_key=9yxGNtiHgikldDdAiYSLBnQm528CnZKBtzJMSVA9


let my_api_key = "9yxGNtiHgikldDdAiYSLBnQm528CnZKBtzJMSVA9";

let img = document.querySelector('img');
let desc_title = document.querySelector('.desc-title');
let desc = document.getElementById('para');
let heading = document.getElementById('heading');


async function getCurrentImageOfTheDay(){
    let currDate  = new Date().toISOString().split("T")[0];
    // console.log("currDate ",currDate);
    let res = await fetch(`https://api.nasa.gov/planetary/apod?date=${currDate}&api_key=${my_api_key}`);
    let data = await res.json();

    // console.log("data >> ",data.hdurl,data.explanation,data.title);

    heading.innerText = "Nasa Picture Of The Day";
    img.src = data.url;
    desc_title.innerText = data.title;
    desc.innerText = data.explanation;

}

getCurrentImageOfTheDay();

// show search history if available in localstorage
addSearchToHistory();

let form = document.getElementById('search-form');
let getDate = document.getElementById('search-input');
getDate.max = new Date().toISOString().split("T")[0];

let nasaSearches = [];


form.addEventListener('submit',getImageOfTheDay);

async function getImageOfTheDay(e){
    e.preventDefault();
    console.log("select Date ",getDate.value);

    let res = await fetch(`https://api.nasa.gov/planetary/apod?date=${getDate.value}&api_key=${my_api_key}`);
    let data = await res.json();

    // console.log("data >> ",data.hdurl,data.explanation,data.title);

    heading.innerText = `Picture On ${getDate.value}`;
    img.src = data.url;
    desc_title.innerText = data.title;
    desc.innerText = data.explanation;

    saveSearch(getDate.value);

    addSearchToHistory();
}


function saveSearch(date){
    let d = {};
    d.date = date;
    // console.log(d);
    let searches = JSON.parse(localStorage.getItem('nasaSearches'));
    console.log(searches);
    if(searches != null){
        console.log(searches,typeof searches);
        searches.push(d);
        localStorage.setItem('nasaSearches',JSON.stringify(searches));
    }else{
        nasaSearches.push(d);
        console.log(nasaSearches);
        localStorage.setItem('nasaSearches',JSON.stringify(nasaSearches));
    }
}


function addSearchToHistory(){
    let ul = document.getElementById('search-history');
    // console.log(ul);
    let searches = JSON.parse(localStorage.getItem('nasaSearches'));
    if(searches != null){
        let myHtml = searches.map((item)=>{
            return `<li onclick="showPreviousSearch(event)">
                        ${item.date}
                    </li>`
        })
        // console.log("myHtml",myHtml);
        ul.innerHTML = myHtml.join("");
    }
}

async function showPreviousSearch(e){
    console.log(e.target.innerText);
    let date = e.target.innerText;

    let res = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${my_api_key}`);
    let data = await res.json();

    // console.log("data >> ",data);

    heading.innerText = `Picture On ${date}`;
    img.src = data.url;
    desc_title.innerText = data.title;
    desc.innerText = data.explanation;

}