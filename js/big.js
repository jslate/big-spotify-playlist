function elipsify(string, length) {
  if (string.length > length)
     return string.slice(0, length) + '...';
  return string;
}

$(document).ready(function() {

  var sp = getSpotifyApi();
  var models = sp.require("$api/models");

  function updateNowPlayingWidget() {

    var playlist = models.Playlist.fromURI('spotify:user:jslate73:playlist:7kJcLlORQ1Kj5byQCc8feO');
    var player = models.player;
    var list = '<ul>';
    var current = null;
    var maxSongNameLength = 40;
    for(var track in playlist.tracks) { 
      if (player.track.data.uri == playlist.tracks[track].uri) {
        current = track;
      }

      if (current != null) {
        var diff = track - current;


        if (diff == 0) {
          name = elipsify(playlist.tracks[track].data.name, 40);
          document.getElementById('current').innerHTML = 
            '<img src="' + playlist.tracks[track].image + '" width="400" />' +
            '<h1 style="font-size: 50px; line-height: 50px">' + name + '</h1>' +
            '<h2 style="font-size: 30px; line-height: 30px">' + playlist.tracks[track].data.artists[0].name  + '</h2>';
        }


        if (diff >= 1 && diff < 4 ) {
          name = elipsify(playlist.tracks[track].data.name, 25);    
          list = list + '<li style="font-size: 35px; line-height: 30px; margin-bottom: 10px;">' + 
            name + '<br/><em style="font-size: 25px;">' + 
            playlist.tracks[track].data.artists[0].name + '</em></li>'; 
        }
    
      }
    }
    document.getElementById('songs').innerHTML = list + '</ul>';
  }

  setInterval(updateNowPlayingWidget, 3000);
});



