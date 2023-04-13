import songs from "./playlist.js"

let musicContent = document.querySelector(".music-content")
let songName = document.querySelector(".song-name")
let artistName = document.querySelector(".artist-name")

// console.log(artistName)

var index = 1
window.addEventListener("load", () => {
    loadData(index)
})

function loadData(index) {
    songName.innerHTML = `${songs[index].name}`
    console.log(`${songs[index].name}`)
    artistName.innerHTML = `${songs[index].artist}`
}