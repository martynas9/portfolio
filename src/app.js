import './app.css';
import {slideshowInit} from './slideshow';

window.onload = () => {
    // navigation open/close on mobile:
    const header = document.getElementById('header');
    const navListButtonHandler = (e) => {
        if(header.classList.contains('opened')) {
            header.classList.remove('opened');
        } else {
            header.classList.add('opened');
        }
    };
    document.querySelector('.nav-list-btn').onclick = navListButtonHandler;
    document.querySelector('.nav-list-btn-2').onclick = navListButtonHandler;



    // navigation links/buttons functions:
    const linksArr = [
        // [[linkElements], contentElementToShow, contentElementToHide]
        [['.pagenav__link--about'], '#about', undefined],
        [['.pagenav__link--work', '#view-work'], '.slideshow-container', undefined],
        [['.pagenav__link--contacts'], '.contacts-container--full', '.contacts-container']
    ];

   const elementsToReset = linksArr.reduce((acc, cVal) => {  
        acc.push(document.querySelector(cVal[0].find(element => document.querySelector(element).classList.contains('pagenav__link')))); // navigation link
        acc.push(document.querySelector(cVal[1])); // content element to show
        if(cVal[2]) acc.push(document.querySelector(cVal[2])); // content element to hide
        return acc;
   }, [])    
    
    linksArr.forEach((navitem) => {
        const links = navitem[0].map(val => document.querySelector(val));
        const navlink = links.find(element => element.classList.contains('pagenav__link'));
        const pagesection_show = document.querySelector(navitem[1]);
        const pagesection_hide = document.querySelector(navitem[2]);
        links.forEach((link) => {
            link.onclick = (e) => {
                // reset classes of elements:
                elementsToReset.forEach((pageElement) => {
                    const classesToClear = ['current', 'hide'];
                    classesToClear.forEach((val) => {
                        if(pageElement.classList.contains(val)) pageElement.classList.remove(val);
                    });
                });

                // assign classes to elements:
                navlink.classList.add('current');
                pagesection_show.classList.add('current');
                if(pagesection_hide) {
                    pagesection_hide.classList.add('hide');
                }
            }
        });

    });


    
    // load slideshow script:
    slideshowInit();
};