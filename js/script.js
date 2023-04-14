import songs from "./playlist.js"

// let musicContent = document.querySelector(".music-content")
var songsList = document.querySelector(".songs-list")
var musicApp = document.querySelector(".music-app")
var openListIcon = document.querySelector(".open-list")

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
var currentTimeSpan = document.querySelector(".current")
var finalTimeSpan = document.querySelector(".final")

var index = 0

// Create PlayList
function createSongsList() {
    songs.forEach((song) => {
        let songInfo = document.createElement("p")
        songInfo.innerText = `${song.name}   |   ${song.artist}`
        songInfo.className = `song-info`
        songInfo.id = `${song.indx}`
        songsList.append(songInfo)
    })
}
function getSelectedSong(index) {
    musicApp.style.display = "none"
    songsList.style.display = "block"
    let songsParag = document.querySelectorAll(".song-info")
    Array.from(songsParag).forEach((songParag) => {
        songParag.addEventListener("click", () => {
            index = +(songParag.id)
            console.log("getSelectedSong:", index)
            musicApp.style.display = "flex"
            songsList.style.display = "none"
            loadData(index)
            playSong()
        })
    })
}
openListIcon.addEventListener("click", getSelectedSong )

window.addEventListener("load", () => {
    createSongsList()
    loadData(index)
})

function loadData(index) {
    console.log("loadData:",index)
    songName.innerHTML = `${songs[index].name}`
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
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

songElem.addEventListener("timeupdate", (e) => {
    // Updata The progress bar
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
    songElem.addEventListener("loadeddata", () => {
        // Updata Total Duration of audio
        let songFinalMinutes = Math.floor(songElem.duration / 60)
        let songFinalSeconds = Math.floor(songElem.duration % 60)
        if (songFinalSeconds < 10) {
            finalTimeSpan.innerHTML = `${songFinalMinutes}:0${songFinalSeconds}`
        } else {

            finalTimeSpan.innerHTML = `${songFinalMinutes}:${songFinalSeconds}`
        }
    })
    // Updata Current Duration of audio
    let songCurrentMinutes = Math.floor(songElem.currentTime / 60)
    let songCurrentSeconds = Math.floor(songElem.currentTime % 60)
    if (songCurrentSeconds < 10) {
        currentTimeSpan.innerHTML = `${songCurrentMinutes}:0${songCurrentSeconds}`
    } else {

        currentTimeSpan.innerHTML = `${songCurrentMinutes}:${songCurrentSeconds}`
    }
})

// Repeat Function
repeatBtn.addEventListener("click", () => {
    songElem.currentTime = 0;
})

// Shuffle Fnction
shuffleBtn.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * (songs.length)) // create random index between 0 and songs.length-1
    loadData(randomIndex)
    playSong()
})
// Auto Repaet

songElem.addEventListener("ended", nextSong)
