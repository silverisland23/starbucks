const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function () {
  console.log('window.scrollY');
  if (window.scrollY > 500) {
    // 500 밑으로 내려가면 배지 숨기기
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity:0,
      display: 'none'
    });
    // to-top위로 올라가기 버튼을 보이게 하기 
    gsap.to('#to-top', .2, {
      x: 0 
    });
  } else {
    //500 위로 올라가면 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity:1,
      display: 'block'
    });
    // to-top 위로 올라가기 버튼을 숨기게 하기
    gsap.to('#to-top', .2, {
      x: 100 
    });
  }
}, 300));
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7 초뒤에 각 요소가 나타나도록
    opacity: 1
  });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', <- 기본으로 깔려있는 옵션이기 떄문에 추가하지 않음
  slidesPerView: 3, // 한번에 보여줄 슬라이드의 갯수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 ` 번호 ` 요소 ` 선택자
    clickable: true // 사용자가 페이지, 번호, 요소, 제어가 가능한지 여부를 제어할수 있음
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // true이면 토글을 숨겨주는 처리를 해라 클래스만 추가, 제거된 상태이고 클래스는 css에서 꾸며주는게 나음
    promotionEl.classList.add('hide');
  } else {
    // false이면 토글을 다시 보여주는 처리를 해라
    promotionEl.classList.remove('hide');
  }
});

// 맨 하단의 로고들 스와이퍼 이동
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, //슬라이드로 몇개의 게시물을 보여줄것인지 
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});




// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 영상위에서 아이콘 3개 움직이는 애니메이션
// gsap을 통해 애니메이션 라이브러리 사용
// 함수가 호출될때 인수로 어떤요소를 선택할것인지 선택자 개념을 받을것이고 selector라는 매개로 받게 함
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(
    selector, // 선택자
     random(1.5, 2.5), // 애니메이션 동작시간
    { // 옵션
      y: size, // y축으로 20만큼 내려오도록 
      repeat: -1, // 무한대로 반복적으로 애니메이션 실행
      yoyo: true, // 한번 재생한 애니메이션을 다시 뒤로 반복되도록 하는 옵션
      ease: "power1.inOut",
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  // Scene => 화면에서 스크롤을 내릴떄 특정한 요소가 잘 동작하는지 감시하는 옵션을 지정해줌 
  // setClassToggle => html의 속성을 클래스로 넣었다 뺏다 제어하는 기능
  // addTo => scrollmagic의 자바스크립트 라이브러리가 필요한 컨트롤러라는 개념을 추가하기 위해 사용
  new ScrollMagic
    .Scene({
      triggerElement : spyEl, // 보여짐 여부를 감시할 요소들을 지정
      triggerHook: .8 // 0.8 이라는 뷰포트 지점에 걸리면 트리거가 실행됨 지점에 걸리면 아래의 메소드가 실행됨
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 올해의 년도를 파악해서 thisyear라는 클래스에 삽입됨