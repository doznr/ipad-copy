import ipads from '../ipads.js'
import navigations from '../navigations.js'

// 장바구니(Basket)
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
      //  event.stopPropagation() <= 이벤트의 전파를 멈춰라(제일 안의 class에서 윈도우로 나감)
      event.stopPropagation()

    // 지정된 class가 있는지 없는지 확인하는 요소 <= contains
    // basket 안에 show가 있는 경우 숨기기, 아닌 경우 보여주기
   if(basketEl.classList.contains('show')){
     hideBasket()
   }else{
     showBasket()
   }
})
basketEl.addEventListener('click', function(event){
    event.stopPropagation() 
})

window.addEventListener('click', function(){
    hideBasket()
})

function showBasket(){
    basketEl.classList.add('show')
}
function hideBasket(){
    basketEl.classList.remove('show')
}

// 검색(Search)
const headerEl = document.querySelector('header')
// ... <= 전개연산자, 뒤에 오는 연산자를 분산시킨다.
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')] 

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', function(){
    hideSearch()
})
function showSearch(){
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')
    headerMenuEls.reverse().forEach(function(el, index){
        // headerMenuEls.length = 12 / 's' <= 시간을 뜻함
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.forEach(function (el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    setTimeout(function(){
        searchInputEl.focus()
    }, 600)
}
function hideSearch(){
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
    headerMenuEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
    searchInputEl.value = ''
}


// 요소 가시성 관찰(observe)
const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      // 화면에 보이지 않게 되면 return 키워드로 함수를 사용하지 않고
        if(!entry.isIntersecting){
            return
        }
        entry.target.classList.add('show')
    })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
    io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})

// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad){
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')
    // `` <= template literal 방식

    let colorList = ''
    ipad.colors.forEach(function(color){
        colorList += `<li style="background-color: ${color};"></li>`
    })

    itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
        <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
        ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">${ipad.price}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `
    itemsEl.append(itemEl) 
})

// 푸터 내비게이션 맵 랜더링!
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})