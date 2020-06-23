let canScroll = true;
let resizeTimer;


export function slideshowInit() {
    const slideshow_list = document.querySelector('.slideshow__list');
    const slides = Array.from(slideshow_list.children);
    const btn_left = document.querySelector('.slideshow__arrow--left');
    const btn_right = document.querySelector('.slideshow__arrow--right');
    let slideWidth = slides[0].getBoundingClientRect().width;



    //set slides behind each other:
    slides.forEach((item, i) => {
        item.slideNumber = i;
        item.slideSlot = i == slides.length-1 ? -1 : i;
        item.style.left = slideWidth*item.slideSlot + 'px';
    });

    const scrollButtonClickHandler = (e) => {
        if(canScroll) {
            canScroll = false;
            btn_right.classList.add('no-click');
            btn_left.classList.add('no-click');
            setTimeout(() => {canScroll = true; btn_right.classList.remove('no-click'); btn_left.classList.remove('no-click');}, 600);

            const currentSlide = slideshow_list.querySelector('.current');
            if(currentSlide) {
                const prevSlideNum = currentSlide.slideNumber-1 < 0 ? slides.length-1 : currentSlide.slideNumber-1;
                const nextSlideNum = currentSlide.slideNumber+1 < slides.length ? currentSlide.slideNumber+1 : 0;
                const prevSlide = slides[prevSlideNum];
                const nextSlide = slides[nextSlideNum];
                if(e.target == btn_left) {
                    slides.forEach((item, i) => {
                        item.style.transition = (item == currentSlide || item == prevSlide) ? '500ms' : 'initial';
                        item.slideSlot = item.slideSlot == slides.length-2 ? -1 : item.slideSlot+1;
                        item.style.left = item.slideSlot*slideWidth + 'px';
                    });
                    prevSlide.classList.add('current');
                } else {
                    slides.forEach((item, i) => {
                        item.style.transition = (item == currentSlide || item == nextSlide) ? '500ms' : 'initial';
                        item.slideSlot = item.slideSlot == -1 ? slides.length-2 : item.slideSlot-1;
                        item.style.left = item.slideSlot*slideWidth + 'px';
                    });
                    nextSlide.classList.add('current');
                }
                currentSlide.classList.remove('current');
            } else {
                //console.log('ERROR: No current slide found;');
                return false;
            }
        } else {
            return false;
        }
    };

    btn_left.onclick = scrollButtonClickHandler;
    btn_right.onclick = scrollButtonClickHandler;


    const resizeSlideSpaces = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((item, i) => {
            item.style.left = slideWidth*item.slideSlot + 'px';
        });
    };

    window.onresize = (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeSlideSpaces, 250);
    };
}