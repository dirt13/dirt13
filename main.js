//Invert scroll axis
document.documentElement.addEventListener('wheel', (event) => {
    document.querySelector(".content-container").scrollLeft += event.deltaY

    //Infinite scroll by changing scroll position at end and start
    if (event.deltaY > 0 && document.querySelector("section.active").getBoundingClientRect().right < window.innerWidth + 1) {
        document.querySelector(`.content-container`).scrollLeft = 0;
    }

    if (event.deltaY < 0 && document.querySelector(".content-container").scrollLeft <= 0) {
        document.querySelector(`.content-container`).scrollLeft = document.querySelector("section.active").getBoundingClientRect().right - window.innerWidth + 1;
    }
})

function toggleSection(section) {
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector(`${section}-section`)?.classList.add('active')

    if (section == "#homepage") {
        document.querySelector('nav')?.classList.remove('active')
        document.querySelector('.info-sidebar-container')?.classList.remove('active')
        document.querySelector('.accordion-menu')?.classList.remove('active'); // Hide accordion menu on homepage


    } else {
        document.querySelector('nav')?.classList.add('active')
        document.querySelector('.info-sidebar-container')?.classList.add('active')
        document.querySelector('.accordion-menu')?.classList.add('active'); // Show accordion menu on other pages

    }

    if (section == "#welcome") {
        document.querySelector('.info-sidebar-container')?.classList.remove('active')

    }

    if (window.innerWidth > 768) {
        document.querySelector('.accordion-menu')?.classList.remove('active');
    }
}


function toggleNav(section) {
    document.querySelector('nav a.selected')?.classList.remove('selected')
    document.querySelector(`nav a[href="${section}"]`)?.classList.add('selected')
}

document.addEventListener("DOMContentLoaded", function () {
    function setInitialSection() {
        if (!window.location.hash) {
            history.replaceState(null, null, "#homepage"); // Always start at #homepage
        }
        displaySection();
    }


    function displaySection() {
        let section = window.location.hash || "#welcome";
        toggleSection(section);
        toggleNav(section);
        document.querySelector(`.content-container`).scrollLeft = 0;
    }

    window.addEventListener("hashchange", displaySection);
    setInitialSection();

    //Ajouter le premier item de chaque section à la fin pour fluidifier le scrolling
    document.querySelectorAll("section").forEach(section => {
        if (section.querySelector(".item")) {
            let firstItemCopy = section.querySelector(".item").cloneNode(true)
            firstItemCopy.classList.remove("first-item")
            section.appendChild(firstItemCopy)
        }
    })
});



$(document).ready(function () {
    var theLetters = "0123456789#%&^+=-@!?"; // Customize letters
    var ctnt = "13"; // Your text goes here
    var speed = 80; // ms per frame
    var increment = 8; // frames per step. Must be >2

    var clen = ctnt.length;
    var si = 0;
    var stri = 0;
    var block = "";
    var fixed = "";

    // Function to reset the animation variables
    function resetAnimation() {
        si = 0;
        stri = 0;
        block = "";
        fixed = "";
        $("#layernumber").html(""); // Clear the output
    }

    // Function to start the animation
    function startAnimation() {
        resetAnimation(); // Reset variables before starting
        (function rustle(i) {
            setTimeout(function () {
                if (--i) { rustle(i); }
                nextFrame(i);
                si = si + 1;
            }, speed);
        })(clen * increment + 1);
    }

    // Function to handle the next frame of the animation
    function nextFrame(pos) {
        for (var i = 0; i < clen - stri; i++) {
            // Random number
            var num = Math.floor(theLetters.length * Math.random());
            // Get random letter
            var letter = theLetters.charAt(num);
            block = block + letter;
        }
        if (si == (increment - 1)) {
            stri++;
        }
        if (si == increment) {
            // Add a letter
            fixed = fixed + ctnt.charAt(stri - 1);
            si = 0;
        }
        $("#layernumber").html(fixed + block);
        block = "";
    }

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation(); // Start the animation when visible
                // Repeat the animation every 5 seconds
                setInterval(startAnimation, 10000);
            }
        });
    });

    // Target the element you want to observe
    const targetElement = document.querySelector('#layernumber'); // Change to your actual selector

    // Start observing the target element
    if (targetElement) {
        observer.observe(targetElement);
    }
});




$(document).ready(function () {
    // Toggle accordion section
    $(".accordion").click(function (event) {
        event.stopPropagation(); // Prevent click from reaching document

        // Close all sections
        $(".accordion").removeClass("active");
        $(".accordion-content").slideUp();

        // Open the clicked section
        $(this).addClass("active");
        $(this).next(".accordion-content").slideDown();
    });

    // Close the menu when clicking outside of it
    $(document).click(function (event) {
        if (!$(event.target).closest(".accordion-menu").length) {
            $(".accordion").removeClass("active");
            $(".accordion-content").slideUp();
        }
    });

    // Close the entire menu when a link inside it is clicked
    $(".accordion-content a").click(function () {
        $(".accordion").removeClass("active");
        $(".accordion-content").slideUp();
    });
});







document.getElementById("item-img").addEventListener("click", function () {
    // Hide the image
    document.getElementById("item-img").style.display = "none";
    // Show the SoundCloud embed
    document.getElementById("soundcloud-embed").style.display = "block";
});






window.addEventListener('DOMContentLoaded', () => {
    // Select all images on the page
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        // Check if the image doesn't already have a 'loading' attribute
        if (!img.hasAttribute('loading')) {
            // Add the 'loading="lazy"' attribute
            img.setAttribute('loading', 'lazy');
        }
    });
});