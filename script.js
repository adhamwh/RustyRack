// HELPER FUNCTION TO INIT SLIDER
function initSlider(containerSelector, leftBtn, rightBtn, jsonFile) {
    fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector(containerSelector);

        // Inject images
        data.forEach(item => {
            const img = document.createElement("img");
            img.src = item.image[0];
            img.alt = item.name;
            container.appendChild(img);
        });

        // Slideshow functionality
        let index = 0;
        const slides = container.querySelectorAll("img");

        const updateSlide = () => {
            container.style.transform = `translateX(-${index * 100}%)`;
        };

        leftBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        });

        rightBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateSlide();
        });
    });
}

// INIT ALL SLIDERS
const sliderBlocks = document.querySelectorAll(".slider-block");
sliderBlocks.forEach((block, i) => {
    const leftBtn = block.querySelector(".left-btn");
    const rightBtn = block.querySelector(".right-btn");
    const container = block.querySelector(".slideshow-wrapper > div");

    let jsonFile = "";
    if (container.classList.contains("costumizetops")) jsonFile = "tops.json";
    else if (container.classList.contains("costumizebottoms")) jsonFile = "bottoms.json";
    else if (container.classList.contains("costumizeshoes")) jsonFile = "shoes.json";

    initSlider(`.${container.className}`, leftBtn, rightBtn, jsonFile);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
