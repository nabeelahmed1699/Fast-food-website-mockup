const element = (className) => document.querySelector(className);

// ============== Selectors ===========
const hamburger = element('.hamburger'),
    navlist = element('.navlist'),
    navLinks = document.querySelectorAll('.nav-link');


import deals from './deals.js'


// ============== Event Listeners ==========
hamburger.addEventListener('click', toggleNavbar);
window.addEventListener('scroll', navabrFixing);
navLinks.forEach((link) => {
    link.addEventListener('click', closeNavbar);
});



// =========== Functions =============
// to toggle navbar in the mobile version
function toggleNavbar() {
    hamburger.classList.toggle('open-hamburger');
    navlist.classList.toggle('open-navbar');

    if (navlist.classList.contains('open-navbar')) {
        console.log('yess');
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'visible';

    }
}
// function to close navbar whenever any navlink is  clicked
function closeNavbar() {
    hamburger.classList.remove('open-hamburger');
    navlist.classList.remove('open-navbar');
    document.body.style.overflowY = 'visible';
}

// to position fixed of the navbar on the top of the page
function navabrFixing() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    if (scrollHeight >= navbarHeight) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
}

// Functionality to swipe the deals
function getDealsElement() {
    const title = element('.card-text-title'),
        desc = element('.card-text-desc'),
        prize = element('.card-text-prize'),
        img = element('.card-img-container img'),
        leftArrow = element('.left-arrow'),
        rightArrow = element('.right-arrow');
    return { title, desc, prize, img, leftArrow, rightArrow };

}

(function placeDeals() {
    const { leftArrow, rightArrow } = getDealsElement();
    let index = 0;
    fetchDeals(index)
    leftArrow.addEventListener('click', () => {
        if (index == 0) {
            index = deals.length - 1;
            console.log(index);
            fetchDeals(index);
            return;
        }
        index -= 1;
        fetchDeals(index);

    })
    rightArrow.addEventListener('click', () => {
        if (index == deals.length - 1) {
            index = 0
            fetchDeals(index);
            return;
        }
        index += 1;
        fetchDeals(index);

    })
})()

function fetchDeals(index) {
    const { title, desc, prize, img, } = getDealsElement();
    title.innerText = deals[index].title;
    desc.innerText = deals[index].desc;
    prize.innerText = `Rs.${deals[index].prize}`;
    img.src = deals[index].img;
    img.alt = deals[index].alt;
}