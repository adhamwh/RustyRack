// Fetch your JSON file
fetch("tops.json")
.then(res => res.json())
.then(data => {
    const container = document.querySelector(".costumizetops");

    // Inject images
    data.forEach(top => {
        const img = document.createElement("img");
        img.src = top.image[0];
        img.alt = top.name;
        container.appendChild(img);
    });

    // Slideshow functionality
    let index = 0;
    const slides = document.querySelectorAll(".costumizetops img");

    const updateSlide = () => {
        container.style.transform = `translateX(-${index * 100}%)`;
    };

    document.querySelector(".right-btn").addEventListener("click", () => {
        index = (index + 1) % slides.length;
        updateSlide();
    });

    document.querySelector(".left-btn").addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlide();
    });
});

  const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
