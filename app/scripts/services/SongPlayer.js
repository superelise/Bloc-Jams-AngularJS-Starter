(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         
         var currentAlbum = Fixtures.getAlbum();
    
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
     SongPlayer.currentSong = null;
     var currentBuzzObject = null;
    
     /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
     var setSong = function(song) {
        if (currentBuzzObject) {
            currentBuzzObject.stop();
            currentSong.playing = null;
        }
         
     /**
     * @desc Buzz object audio file
     * @type {Object}
     */
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

        currentSong = song;
     };
    
     /**
     * @function playSong
     * @play the current Buzz object and set the playing property of the song object to true
     */
     function playSong() {
         currentBuzzObject.play();
         song.playing = true;         
     }
    
     /**
     * @function play
     * @desc Play current or new song
     * @param {Object} song
     */
     SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (currentSong !== song) {
             setSong(song);
             playSong();
            
         } else if (currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 playSong();
         }
        }       
     };
         
      /**
     * @function pause
     * @desc Pause current song
     * @param {Object} song
     */       
     SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
         
     };
    
     SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
         
         if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
          } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
     }
 };
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();