const counters = document.querySelectorAll('.counter-number');
const duration = 2000; // Тривалість анімації у мілісекундах
const steps = 200; // Кількість кроків анімації

let animationStarted = false; // Змінна для відстеження, чи вже розпочалася анімація

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function startCountersAnimation() {
    if (animationStarted) {
        return; // Якщо анімація вже розпочалася, виходимо
    }

    counters.forEach(counter => {
        if (isElementInViewport(counter)) {
            const target = +counter.getAttribute('data-target');
            const increment = target / steps;
            let current = 0;

            function updateCounter() {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.round(current);
                    setTimeout(updateCounter, duration / steps);
                } else {
                    counter.innerText = target;
                }
            }

            updateCounter();
            animationStarted = true; // Встановлюємо прапорець, що анімація розпочалася
        }
    });
}


window.addEventListener('load', startCountersAnimation);
window.addEventListener('scroll', startCountersAnimation);

const elementsToAnimate = document.querySelectorAll('.animate-me');

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function startAnimationForElement(element) {
    if (isElementInViewport(element)) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
        element.classList.remove('animate-me');
    }
}

// Викликати анімацію для всіх елементів, які мають бути анімовані
elementsToAnimate.forEach(element => {
    startAnimationForElement(element);
});

// Викликати анімацію, коли сторінка завантажується і при прокручуванні
window.addEventListener('load', () => {
    elementsToAnimate.forEach(element => {
        startAnimationForElement(element);
    });
});

window.addEventListener('scroll', () => {
    elementsToAnimate.forEach(element => {
        startAnimationForElement(element);
    });
});

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  
  for (let elm of elements) {
    observer.observe(elm);
  }
