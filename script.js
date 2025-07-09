function fullPage() {
    const elems = document.querySelectorAll(".elem");
    const fullElemPage = document.querySelectorAll(".fullElem")
    const fullElemPagebtn = document.querySelectorAll(".btn")

    elems.forEach(function (elem) {

        elem.addEventListener("click", function () {
            fullElemPage[elem.id].style.display = "block"

        })
    });

    fullElemPagebtn.forEach(function (button) {
        // console.log(button.id);

        button.addEventListener("click", function () {
            fullElemPage[button.id].style.display = "none"
        })
    })
}
fullPage()


function todolist() {

    let currentask = []

    const form = document.querySelector(".addTask form")
    const Taskinput = document.querySelector(".addTask form input")
    const TaskTextarea = document.querySelector(".addTask form textarea")
    const taskCheckbox = document.querySelector(".addTask form #CheckInp")


    if (localStorage.getItem("CurrentTask")) {
        currentask = JSON.parse(localStorage.getItem("CurrentTask"))
    }
    else {
        console.log("task list is empty")
    }

    renderTask();

    function renderTask() {

        const viewTask = document.querySelector(".viewTask")
        let sum = ""
        currentask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                    <h5>${elem.task} <span class="imp ${elem.imp}">imp</span></h5>
                    <button ${idx}>Mark as Completed</button>
                </div>`
        })
        viewTask.innerHTML = sum

        document.querySelectorAll(".viewTask .task button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentask.splice(btn.id, 1)
                localStorage.setItem("CurrentTask", JSON.stringify(currentask))
                renderTask()
            })
        })
    }



    form.addEventListener("submit", function (e) {
        e.preventDefault()
        currentask.push(
            {
                task: Taskinput.value,
                details: TaskTextarea.value,
                imp: taskCheckbox.checked
            }
        )

        localStorage.setItem("CurrentTask", JSON.stringify(currentask))
        Taskinput.value = ""
        TaskTextarea.value = ""
        taskCheckbox.checked = false
        renderTask()

    })

}
todolist()

function Dailyplanner(){
    
let DayplanData={}
let hours=Array.from({length:18}, (elem, idx)=> `${6+idx}:00 - ${7+idx}:00`)

DayplanData=JSON.parse(localStorage.getItem("DailyPlanner")) || {}

let DailyTime=document.querySelector(".day-planner")

Time=""
hours.forEach(function(elem,idx){

    let savedData=DayplanData[idx] || ""

   Time+=`<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="..." value=${savedData}>
                </div>
                `
})
 
DailyTime.innerHTML=Time


let input=document.querySelectorAll(".day-planner input")

input.forEach(function(elem){
    
    elem.addEventListener("input",function(){
         DayplanData[elem.id]=elem.value
          localStorage.setItem("DailyPlanner",JSON.stringify(DayplanData))
    })
   
})
}

Dailyplanner()

function motivationFullpage(){
let motivationQuote=document.querySelector(".wrapper .motivation")
let author=document.querySelector(".wrapper .author" )
async function motivation(){
     let res=await fetch("https://api.realinspire.live/v1/quotes/random")
    let data= await res.json()

    motivationQuote.innerHTML=data[0].content
    author.innerHTML=`${"- "}${data[0].author}`
}
motivation()
}
motivationFullpage()



function pomodoroTimer(){

let totalseconds=1500
let time=document.querySelector(".timer h2")
let timeInterval = null;
let worksession=true;
let session=document.querySelector(".pomodoro-timer .session")

function updateTimer(){
    let minutes=Math.floor(totalseconds/60)
    let seconds=totalseconds%60
   time.innerHTML=`${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")}`
}   
updateTimer()
 
function startTimer(){
    clearInterval(timeInterval)
    session.style.display="block"
    if(worksession){
         session.innerHTML="Work Session"
        totalseconds=1500
        timeInterval=setInterval(()=>{
        if(totalseconds>0){
             totalseconds--
             updateTimer()
        }
        else{
            time.innerHTML="05:00"
            session.innerHTML="Break"
            worksession=false
            clearInterval(timeInterval)
        }
    },1000)
    }else{
        totalseconds=300
        timeInterval=setInterval(()=>{
       
        if(totalseconds>0){
             totalseconds--
             updateTimer()
        }
        else{
             session.innerHTML="Work Session"
            worksession=true
            clearInterval(timeInterval)
             time.innerHTML="25:00"
            
        }
    },1000)
    }
   
}

let startbtn=document.querySelector(".timer .start")
startbtn.addEventListener("click", startTimer)

function pauseTimer(){
    clearInterval(timeInterval)
}

let pausebtn=document.querySelector(".timer .pause")
pausebtn.addEventListener("click",pauseTimer)

function resetTimer(){
    clearInterval(timeInterval)
    totalseconds=1500
    updateTimer()
}

let resetbtn=document.querySelector(".timer .reset")
resetbtn.addEventListener("click",resetTimer)

}
pomodoroTimer()




function weatherDisplay(){

    navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  weather(`${lat},${lon}`);
}

function error() {
    console.log("Location not accessed showing weather of Delhi by default")
  weather("Mumbai");
}

const config = {
  weatherKey: "24c75b82b7b445539e682612250807"
};
const apikey = config.weatherKey

let temp=document.querySelector(".header2 h1")
let precipitation=document.querySelector(".header2 .prec")
let humidity=document.querySelector(".header2 .humidity")
let wind=document.querySelector(".header2 .wind")
let condition=document.querySelector(".header2 .condition")
let mycity=document.querySelector(".header1 h3")

async function weather(CityQuery){

    try{

     let res= await fetch( `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${CityQuery}`)
     let details=await res.json()
    //  console.log(details)

     temp.innerHTML=` ${details.current.temp_c}°C`
     precipitation.innerHTML=`Precipitation: ${details.current.precip_in}%`
     humidity.innerHTML=`Humidity: ${details.current.humidity}%`
     wind.innerHTML=`Wind: ${details.current.wind_kph} Km/h`
     condition.innerHTML=`${details.current.condition.text}`
     mycity.innerHTML=`${details.location.name}(${details.location.region})`

    }catch(error){
        temp.innerHTML = `--`;
        precipitation.innerHTML = `Precipitation: --%`;
        humidity.innerHTML = `Humidity: --%`;
        wind.innerHTML = `Wind: -- Km/h`;
        condition.innerHTML = `Unavailable`;
        mycity.innerHTML = `Location Unknown`;
    }
     
}
}
weatherDisplay()


function DateTimeDisplay(){
let daytime=document.querySelector(".allElems .header1 h2")
let daydate=document.querySelector(".allElems .header1 h1")

function Daytime(){
    let daysofweek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

    let date=new Date()

    let weekday=daysofweek[date.getDay()]
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let seconds=date.getSeconds();
    let day=date.getDate()
    let month=months[date.getMonth()]
    let year=date.getFullYear()

    daydate.innerHTML=`${ month} ${day}, ${year}`
    daytime.innerHTML=`${weekday}, ${hours}:${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")}
    `
    if(hours>12){
         daytime.innerHTML=`${weekday}, ${String(hours-12).padStart("2","0")}:${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")} pm`
    }else{
        daytime.innerHTML=`${weekday}, ${hours}:${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")} am`
    }
}


setInterval(function(){
    Daytime();
},1000)



}
DateTimeDisplay()