(function() {
      function SongPlayer($rootScope, Fixtures) {
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
    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;     
    
    var currentBuzzObject = null;
    
     /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
     var stopSong = function(song) {
        currentBuzzObject.stop();
        song.playing = null;
     }
     
     var setSong = function(song) {
        if (currentBuzzObject) {
            stopSong(SongPlayer.currentSong);
        }
         
     /**
     * @desc Buzz object audio file
     * @type {Object}
     */
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
         
         currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
         });

        SongPlayer.currentSong = song;
     };
          
    
    
     /**
     * @function playSong
     * @play the current Buzz object and set the playing property of the song object to true
     */
     var playSong = function(song) {
         currentBuzzObject.play();
         song.playing = true;         
     };
    
     /**
     * @function play
     * @desc Play current or new song
     * @param {Object} song
     */
     SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
            
         } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 playSong(song);
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
            stopSong();
             
          } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
     };
    
     SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;

         if (currentSongIndex < 0) {
         stopSong(SongPlayer.currentSong);
          } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
        }
     };  
          
            /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
         
          return SongPlayer;
     }
    
  
    
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();