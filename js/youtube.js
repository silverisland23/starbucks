 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 function onYouTubeIframeAPIReady() {
    //아래의 player의 선택자는 html 구조에서 작성했었던 player의 태그를 말하는것임
    new YT.Player('player', {
     videoId: 'An6LvWQuj_8', // 최초로 재생할 유투브 영상 아이디
     playerVars: {
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 뮤누
      playlist: 'An6LvWQuj_8' // 반복재생할 유튜브 영상 아이디 목록
     },
     events: {
      onReady: function (event) {
        event.target.mute() // 영상이준비되면 익명의 함수가 실행되고, mute=> 음소거처리 
      }
     }
   });
 }

