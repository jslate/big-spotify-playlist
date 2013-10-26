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
            '<img src="' + playlist.tracks[track].image + '" />' +
            '<h1>' + name + '</h1>' +
            '<h2>' + playlist.tracks[track].data.artists[0].name  + '</h2>';
        }


        if (diff >= 1 && diff < 4 ) {
          name = elipsify(playlist.tracks[track].data.name, 25);    
          list = list + '<h1>' + name + '</h1>' +
          '<h2>' + playlist.tracks[track].data.artists[0].name + '</h2>'; 
        }
    
      }
    }
    document.getElementById('songs').innerHTML = list;
  }

  setInterval(updateNowPlayingWidget, 3000);

  //twitter feed
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

  setTimeout(function(){
      $(".twitter-timeline").contents().find(".e-entry-title").css({'font-size':'30px', 'line-height': '30px'});
    }, 1000);

});



