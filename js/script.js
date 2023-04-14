import songs from "./playlist.js"

// let musicContent = document.querySelector(".music-content")
let songName = document.querySelector(".song-name")
let artistName = document.querySelector(".artist-name")
let songElem = document.querySelector(".song")
let playBtn = document.querySelector(".play-pause")
let prevBtn = document.querySelector(".backward")
let nextBtn = document.querySelector(".forward")
let repeatBtn = document.querySelector(".repeat")
let shuffleBtn = document.querySelector(".shuffle")
let progBarDetails = document.querySelector(".progressbar-details")
let progBar = document.querySelector(".progress-bar")
let currentTimeSpan = document.querySelector(".current")
let finalTimeSpan = document.querySelector(".final")


var index = 0
window.addEventListener("load", () => {
    loadData(index)
})

function loadData(index) {
    songName.innerHTML = `${songs[index].name}`
    console.log(`${index}`)
    console.log(`${songs[index].name}`)
    artistName.innerHTML = `${songs[index].artist}`
    songElem.src = `/media/${songs[index].audio}.mp3`
}
function playSong() {
    playBtn.classList.add("paused")
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
    songElem.play()
}
function pauseSong() {
    playBtn.classList.remove("paused")
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
    songElem.pause()
}

function prevSong() {
    if (index == 0) {
        index = songs.length - 1
    } else {
        index--
    }
    loadData(index)
    playSong()
}
function nextSong() {
    if (index == (songs.length) - 1) {
        index = 1
    } else {
        index++
    }

    loadData(index)
    playSong()
}
playBtn.addEventListener("click", () => {
    let paused = playBtn.classList.contains("paused")
    if (paused) {
        pauseSong()
    } else {
        playSong()
    }
})
prevBtn.addEventListener("click", prevSong )
nextBtn.addEventListener("click", nextSong)

songElem.addEventListener("timeupdate", (e) => {
    // console.log(e)
    let currTime = e.target.currentTime
    let songDuration = e.target.duration
    let progressPercentage = (currTime / songDuration) * 100
    progBar.style.width = `${progressPercentage}%`

    progBarDetails.addEventListener("click", (e) => {
        console.log(e)
        let progressBarWidth = progBarDetails.clientWidth; // Get the width of prog bar
        let clickedOffsetX = e.offsetX; // get offset X of a click
        let songDuration = songElem.duration // Get song Duration
        songElem.currentTime = (clickedOffsetX * songDuration) / progressBarWidth

    })

})
