window.setInterval(()=>{
    let now = new Date()
    let timeText = ""
    timeText += now.getFullYear() + "-"
    let Month = now.getMonth() + 1
    timeText += (Month<10?"0" + Month:Month) + "-"
    let Day = now.getDate()
    timeText += (Day<10?"0"+Day:Day) + " "
    let H = now.getHours()
    timeText += (H<10?"0"+H:H) + ":"
    let mins = now.getMinutes()
    timeText += (mins<10?"0"+mins:mins) + ":"
    let sec = now.getSeconds()
    timeText += sec<10?"0"+sec:sec
    const timeEle = document.querySelector("#showtime")
    timeEle.innerHTML = timeText
},200)