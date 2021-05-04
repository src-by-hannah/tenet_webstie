var slideIndex = 1;
showSlides(slideIndex);

//Youtube API 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1;
var player2;

//자동 호출 함수, 플레이어 객체 구현
function onYouTubeIframeAPIReady(){
	player1 = new YT.Player('player1',{			
		events: {				
			'onReady': onPlayerReady,	//플레이어 로드가 완료되면
			'onStateChange': function(event){	//플레이어 상태가 변경될 때마다 실행
				if(event.data == YT.PlayerState.PLAYING){
					player2.pauseVideo();
				}
			}
		}
	});
	
	player2 = new YT.Player('player2',{			
		events: {				
			'onReady': onPlayerReady,	//플레이어 로드가 완료되면
			'onStateChange': function(event){	//플레이어 상태가 변경될 때마다 실행
				if(event.data == YT.PlayerState.PLAYING){
					player1.pauseVideo();
				}
			}
		}
	});
}

function onPlayerReady(event) {
	// 플레이어 자동실행
	event.target.playVideo();
}	

var playerState;
function onPlayerStateChange(event) {
	playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
			event.data == YT.PlayerState.PLAYING ? '재생 중' :
			event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
			event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
			event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
			event.data == -1 ? '시작되지 않음' : '예외';
}

function plusSlides(n) {
	showSlides(slideIndex += n);
	player1.pauseVideo();
	player2.pauseVideo();
}

function currentSlide(n) {
	showSlides(slideIndex = n);
	player1.pauseVideo();
	player2.pauseVideo();
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("videos-mySlides");
	var dots = document.getElementsByClassName("videos-dot");
	
	if (n > slides.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = slides.length}
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" videos-active", "");
	}
	
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " videos-active";
}