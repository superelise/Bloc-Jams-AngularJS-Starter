(function() {
     function SongPlayer() {
         var SongPlayer = {};
         
     var currentSong = null;
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
     * @method play a song
     */
     SongPlayer.play = function(song) {
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
     * @method pause a song
     */         
     SongPlayer.pause = function(song) {
         currentBuzzObject.pause();
         song.playing = false;
         
     };
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();