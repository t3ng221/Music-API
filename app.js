const searchSongs = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    const res = await fetch(url);
    const jsonData = await res.json();
    displaySongs(jsonData.data);
}
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerText='';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
  <source src="${song.preview}" type="audio/ogg">
</audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`

        songContainer.appendChild(songDiv);
    })
}
const getLyric= async(artist,title)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res= await fetch(url);
    const jsonData = await res.json();
    displayLyrics(jsonData.lyrics);
}
const displayLyrics=lyrics=>
{
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText=lyrics;
}