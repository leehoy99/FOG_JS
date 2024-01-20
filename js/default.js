document.addEventListener('DOMContentLoaded', function () {
    // 장바구니 OPEN / CLOSE
    fetch('template.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('bag-container').innerHTML = html;
        });
    //nav
    fetch('nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-container').innerHTML = html;

            // nav 배경
            const navTop = document.querySelector('.nav-top');
            function navBg() {
                if (window.scrollY > 150) {
                    navTop.classList.add('bg');
                } else if (window.scrollY < 150) {
                    navTop.classList.remove('bg');
                }
            };                
            // nav 기능
            pageResize();
            window.addEventListener('resize', pageResize)
            //페이지 리사이즈 시, 검색창 작동방식 변경.
            function pageResize() {
                let windowWidth = window.innerWidth;
                const gnbData = [
                    { gnb: '.top-gnb1', gnbExtend: '.top-gnb1-extend-box' },
                    { gnb: '.top-gnb3', gnbExtend: '.top-gnb3-extend-box' },
                    { gnb: '.top-gnb4', gnbExtend: '.top-gnb4-extend-box' }
                ];
                if (windowWidth > 876) {
                    const backgroundBlur = document.querySelector('.container');
                    gnbData.forEach(function(item, index) {
                        const gnb = document.querySelector(item.gnb);
                        const gnbExtendBox = document.querySelector(item.gnbExtend);
                        if (gnb && gnbExtendBox) {
                            gnb.addEventListener('mouseenter', function() {
                                // 현재 gnb 제외 모든 확장 메뉴 닫기
                                closeAllExtendMenus(index);
                                gnbExtendBox.classList.add('bg')
                                navTop.classList.add('bg')
                                backgroundBlur.classList.add('bg')
                            });
                        
                            gnbExtendBox.addEventListener('mouseleave', function() {
                                gnbExtendBox.classList.remove('bg')
                                if (window.scrollY < 150) {navTop.classList.remove('bg');};
                                backgroundBlur.classList.remove('bg')
                            });
                        }
                    });
                
                    // 모든 확장 메뉴 닫기
                    function closeAllExtendMenus(excludeIndex) {
                        gnbData.forEach(function(item, index) {
                            const gnbExtendBox = document.querySelector(item.gnbExtend);
                            if (gnbExtendBox) {
                                if (index !== excludeIndex) {
                                    gnbExtendBox.classList.remove('bg')
                                    navTop.classList.remove('bg')
                                    backgroundBlur.classList.remove('bg')
                                }
                            }
                        });
                    };
                }
                //데스크톱 사이즈 미만일 경우, 검색창 작동방식 변경
                else{
                    
                    document.addEventListener('click', function(event) {
                        const clickedElement = event.target;
                        
                        if (clickedElement.classList.contains('search')) {
                            document.querySelector('.top-gnb4-extend-box').classList.add('bg');
                            navTop.classList.add('bg');
                            console.log('clicksearch')
                        } else if (clickedElement.classList.contains('top-gnb-extend-box')){
                            document.querySelector('.top-gnb4-extend-box').classList.add('bg');
                            navTop.classList.add('bg');
                            console.log('clicksearch')
                        } else if (clickedElement.classList.contains('nav-serch-input')){
                            document.querySelector('.top-gnb4-extend-box').classList.add('bg');
                            navTop.classList.add('bg');
                            console.log('clicksearch')
                        } else {
                            document.querySelector('.top-gnb4-extend-box').classList.remove('bg');
                            navTop.classList.remove('bg');
                        }
                    });
                }
            };
            window.addEventListener('scroll', function () {
                navBg();
            });
            // nav 의 요소들 클릭시 shop 페이지 카테고리로 이동.
            const clickableElements = document.querySelectorAll('.gnb-extend a');
            clickableElements.forEach(function (element) {
                element.addEventListener('click', function (event) {
                    const clickedElement = event.target;

                    // 클릭된 항목의 텍스트 추출
                    const category = clickedElement.textContent.trim().toUpperCase().replace(' ', '_');

                    // shop.html 페이지로 값 전달
                    window.location.href = `/shop.html?category=${category}`;
                });
            });
        });
    });
    
function openBag() {
    console.log(document.getElementById('bag-extend'));
    document.getElementById('bag-extend').classList.add('open')
}

function closeBag() {
    document.getElementById('bag-extend').classList.remove('open')
}
