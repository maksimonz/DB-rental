'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // function onSlider (slidesWrapper, slidesClass, dotsWrapper, prevBtn, nextBtn) {
    //     const slider = document.querySelector(slidesWrapper),
    //             slides = document.querySelectorAll(slidesClass),
    //             nextSlideBtn = document.querySelector(nextBtn),
    //             prevSlideBtn = document.querySelector(prevBtn),
    //             width = window.getComputedStyle(slider).width,
    //             dots = document.querySelectorAll(dotsWrapper);


    //     let offset = 0;
    //     let touchStartX = 0;
    //     let touchEndX = 0;
    //     // let currentSlide = 0;
    //     // let sliderNumber = 0;
    //     let slidesLength = slides.length;
    //     slider.style.transition = '0.5s all';

    //     function createSliderDots () {
    //         dots.forEach((item, i) => {
    //             for (let j = 0; j < slidesLength; j++) {
    //                 let dot = document.createElement('div');
    //                 dot.classList.add('cards__slider-dot');
    //                 item.append(dot); 
    //                 dot.addEventListener('click', (e) => {
    //                     offset = (+width.replace("px", "")) * j;
    //                     slider.style.transform = `translateX(-${offset}px)`;
    //                 })
    //             };
    //             item.children[i].classList.add('active-card');
    //         })
    //     }

    //     createSliderDots ()




    //     function prevSlide () {
    //         console.log('prev');
    //         if(offset == 0){
    //             offset = (+width.replace("px", "")) * (slides.length - 1);

    //         } else{
    //             offset -= (+width.replace("px", ""));
   
    //         }

    //         slider.style.transform = `translateX(-${offset}px)`;
    //         // return offset
    //     }

    //     function nextSlide () {
    //         console.log('next');
    //         if(offset == (+width.replace("px", "")) * (slides.length - 1)){
    //             offset = 0;

    //             // sliderNumber = 0;
    //             // currentSlide = 0;

    //         } else{
    //             offset += (+width.replace("px", ""));

    //             // sliderNumber++;
    //             // currentSlide++;
    //         }
    //         // console.log(offset);
    //         slider.style.transform = `translateX(-${offset}px)`;
    //         // return offset

    //     }

    //     nextSlideBtn.addEventListener('click', () => nextSlide());
    //     prevSlideBtn.addEventListener('click', () => prevSlide());

    //     // prevSlideBtn.forEach(btn => {
    //     //     btn.addEventListener('click', (e) => {
      
    //     //         if(e.target == btn) {
    //     //             prevSlide();
    //     //             // console.log(btn);
    //     //             // console.log(e.target);
    //     //         }
    //     //     });
      
    //     // })

    //     // nextSlideBtn.forEach(btn => {
    //     //     btn.addEventListener('click', (e) => {
    //     //         // console.log(e.target);
    //     //         if(e.target == btn) {
    //     //             nextSlide()
    //     //         }
    //     //     });
    //     // })


    //     slider.addEventListener('touchstart', (e) => {
    //         touchStartX = e.touches[0].clientX;
    //     }, { passive: true })

    //     slider.addEventListener('touchmove', (e) => {
    //         touchEndX = e.touches[0].clientX;
    //     }, { passive: true })

    //     slider.addEventListener('touchend', () => {
    //         let distance = touchEndX - touchStartX;
    //         // console.log(distance);
    //         if (distance > 0) {
    //             prevSlide()
    //         } else if (distance < 0 ) {
    //             nextSlide()
    //         }
    //     })

    //     // console.log(offset);


    // }

    // onSlider('.cards__items-wrapper', '.cards__item', '.cards__slider-dots', '.fa-chevron-left', '.fa-chevron-right');


    // ==================================
function onSlider () {
    const slider = document.querySelector(".cards");
    const slides = document.querySelector(".cards__items-wrapper");
    const prevBtn = document.querySelector(".fa-chevron-left");
    const nextBtn = document.querySelector(".fa-chevron-right");
    const dots = document.querySelectorAll('.cards__slider-dots');

    let currentIndex = 0;
    const slideWidth = slides.querySelector(".cards__item").offsetWidth;

    slides.style.transition = '0.5s all';

    function createSliderDots () {
        dots.forEach((item, i) => {
            for (let j = 0; j < slides.children.length; j++) {
                let dot = document.createElement('div');
                dot.classList.add('cards__slider-dot');
                item.append(dot); 
                dot.addEventListener('click', (e) => {
                    // console.log(e.target);
                    currentIndex = j % slides.children.length;
                    // console.log(currentIndex);
                    // offset = (+width.replace("px", "")) * j;
                    // slider.style.transform = `translateX(-${offset}px)`;
                    slideTo(currentIndex);
                })
            };
            item.children[i].classList.add('active-card');
        })
    }

    createSliderDots ()

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
        slideTo(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.children.length;
        slideTo(currentIndex);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
        // console.log('start');
        document.body.style.overflowY = "hidden";
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
    console.log('end');
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        document.body.style.overflowY = "visible";
    }, { passive: true });




    function slideTo(index) {
        slides.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function handleSwipe() {
        const threshold = slideWidth / 4;

        if (touchStartX - touchEndX > threshold) {
            currentIndex = (currentIndex + 1) % slides.children.length;
            slideTo(currentIndex);
        } else if (touchEndX - touchStartX > threshold) {
            currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
            slideTo(currentIndex);
        }

        

    }

    slideTo(currentIndex);
// 
}
// onSlider();

////////////////////////////HEADER MENU/////////////////////////////////////////////////////////////////////////
    const menu = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', (e) => {
        const scrollTop = window.scrollY  || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);


        if (scrollTop < 50) {

            menu.style.top = "0"; 
            menu.style.background = 'transparent';
            menu.style.boxShadow = '#acacac 0px 0px 0px';

            
            // if (scrollTop < 100) {
            //     console.log('top');
            //     // console.log(scrollTop);
            //     // menu.classList.add('fixed');
            //     // menu.classList.add('fixed');
            //     menu.classList.remove('activeMenu');
            //     // console.log(scrollTop);
            //     // menu.style.background = 'transparent';
            //     // menu.style.boxShadow = 'none';
            //     // menu.style.top = "0"; 
            //     // menu.style.transform = 'translateY(0)';
            // }
        } else if (scrollTop < lastScrollTop) {
            menu.style.top = "0"; 
            menu.style.background = '#000000';
            menu.style.boxShadow = '#acacac 2px 1px 17px';
        }
        else {
            menu.style.top = "-150px"; 
        }
        lastScrollTop = scrollTop;
    });

////////////////////////////Burger/////////////////////////////////////////////////////////////////////////

    function openBurger () {
        document.querySelector('.header__burger-openBtn:first-child').style.cssText  = `
            transform: translate(0px, 10px) rotate(-45deg);
        `;
        document.querySelector('.header__burger-openBtn:last-child').style.cssText  = `
            transform: translate(0px, -10px) rotate(45deg);
        `;
        document.querySelector('.header__burger-openBtn:nth-child(2)').style.cssText  = `
            transition: 0s linear all;
            height: 0;
        `;
        document.querySelector('.burger').style.display = 'block';
        document.querySelector('.nav').style.display = 'block';
        
        document.querySelector('.nav').classList.add('fade-in-burger');
        document.querySelector('.nav').classList.remove('fade-out-burger');

        document.body.style.overflow = 'hidden';

    }

    function closeBurger () {
        document.querySelector('.header__burger-openBtn:first-child').style.cssText  = `
            transform: translate(0px, 0px) rotate(0deg);
        `;
        document.querySelector('.header__burger-openBtn:last-child').style.cssText  = `
            transform: translate(0px, 0px) rotate(0deg);
        `;
        document.querySelector('.header__burger-openBtn:nth-child(2)').style.cssText  = `
            height: 2px;
        `;
        document.querySelector('.nav').classList.remove('fade-in-burger');
        document.querySelector('.nav').classList.add('fade-out-burger');
        
        setTimeout(() => {
            document.querySelector('.burger').style.display = 'none';
            document.querySelector('.nav').style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200); 
    }

    document.querySelector('.header__burger').addEventListener('click', (e) => {
        // console.log(e.target);

        document.querySelector('.header__burger').classList.toggle('active');
        if (document.querySelector('.header__burger').classList.contains('active')) {
            // console.log('open');
            openBurger ()
        } else {
            // console.log('close');
            closeBurger();
        }
    });

    document.querySelector('.burger').addEventListener('click', (e) => {
        // console.log(e.target);
        document.querySelector('.header__burger').classList.toggle('active');
        if (e.target === document.querySelector('.burger')) {

            closeBurger();
        }
    });

    ////////////////////////////Services/////////////////////////////////////////////////////////////////////////
    
    const cardDescription = document.querySelectorAll('.cards__title-description');

    function spliceText (card) {
        card.forEach(item => {
            if(item.textContent.length >= 220) {
                item.textContent = item.textContent.slice(0, 220) + '...'
            }
        })
    }

    spliceText (cardDescription)


    ////////////////////////////Modal/////////////////////////////////////////////////////////////////////////

    const modalForm = document.querySelector('#modal-form');
    const modalMessage = document.querySelector('#modal-message');
    const modalWrapperForm = modalForm.querySelector('.modal__wrapper');
    const modalWrapperMessage = modalMessage.querySelector('.modal__wrapper');
    const openModalBtn = document.querySelectorAll('.modal-btn');
    const closeModalForm = document.querySelector('.modal__close');
    const closeModalMsg = modalMessage.querySelector('.modal__close');

    console.log(document.body.offsetWidth);
    console.log(document.body.clientWidth);
    let width = document.body.offsetWidth
    
    
    function  openModal(modal, wrapper) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        wrapper.classList.add('fade-in-modal');
        wrapper.classList.remove('fade-out-modal');
        // document.body.style.overflow = 'hidden';


        let res = document.body.clientWidth - width;
        console.log(res);
        document.body.style.padding = `0 ${res}px 0 0`
        console.log(document.body.offsetWidth);
        console.log(document.body.clientWidth);
        
    }
    
    function closeModal(modal, wrapper) {
        wrapper.classList.remove('fade-in-modal');
        wrapper.classList.add('fade-out-modal');

        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.add('hide');
            // document.body.style.overflow = 'auto';
        }, 200); 

    }

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modalForm, modalWrapperForm);
        })
    })



    modalForm.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target === modalForm  || e.target === closeModalForm) {
            closeModal(modalForm, modalWrapperForm);
            // console.log('object');
        }
    })

    function showModalWindowByTime (time){
        setTimeout(() => {
            openModal(modalMessage, modalWrapperMessage);
        }, time);
    }

    // showModalWindowByTime(10000);

    modalMessage.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target === modalMessage  || e.target === closeModalMsg) {
            closeModal(modalMessage, modalWrapperMessage);
            // console.log('object');
        }
    })




    
    

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // document.querySelectorAll('.nav-item').forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         console.log(e.target);
    //     })
    // })
    

    // const forms = document.querySelectorAll('form');
    // const prevModalDialog = document.querySelector('.modal__wrapper');
    // const modal = document.querySelector('.modal');

    // const message = {
    //     loading: "Loading...",
    //     success: "Thank you! We will contact you later",
    //     failue: "Something went wrong. Try again."
    // };

    // forms.forEach(item => {
    //     bindpostData(item);
    // });

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: data
    //     });
    //     return await res.json();
    // };

    // function onChangePhone () {
        

    // }

    // document.querySelector('.form__tel').addEventListener('input', (e) => {
    //     let phone = document.querySelector('.form__tel');
   
    //     // console.log(phone.value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+38($1)$2-$3-$4"));
    //     phone.value = phone.value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+38($1)$2-$3-$4")
    //     // let res = 

    //     console.log(phone.value);
    //     // if(phone.value.length > 10) return
    // })

    // function showThanksModal(message) {

    //     modal.style.display = 'block'

    //     document.querySelector('.modal__subTitle').textContent = message;

    //     let timout = setTimeout(() => {
    //         modal.style.display = 'none'
    //         document.querySelector('.modal__subTitle').textContent = '';
    //     }, 4000);

    //     modal.addEventListener('click',  (e) => {
    //         if(e.target === document.querySelector('.modal__close') || 
    //         e.target === document.querySelector('.modal__closeBtn') ||
    //         e.target === modal) {
    //             clearTimeout(timout);
    //             closeModal();
    //         }
    //     })
    // }

    // function closeModal () {
    //     prevModalDialog.classList.add('show');
    //     prevModalDialog.classList.remove('hide');
    //     document.querySelector('.modal').style.display = 'none';
    // }

    // function bindpostData (form) {
    //     form.addEventListener('submit', async (e) => {
    //         e.preventDefault();

    //         const formData = new FormData(form);

    //         const object = {};
    //         formData.forEach(function(value, key){
    //             object[key] = value;
    //         });

    //         console.log(object);


    //         postData('http://localhost:3000/requests', JSON.stringify(object))
    //             .then(data => {
    //                 console.log(data);
    //                 showThanksModal(message.success);
    //             }).catch(() => {
    //                 console.log('error');
    //                 showThanksModal(message.failue);
    //             })
    //             .finally(() => {
    //                 form.reset();
    //             });

    //     });
    // }



});













