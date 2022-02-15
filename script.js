(() => {
  "use strict";

  const previous = document.querySelector(".previous");
  const picture = document.querySelector("picture");
  const next = document.querySelector(".next");
  const body = document.querySelector("body");
  const imgs = document.querySelectorAll("img");

  const images = new Object(null);

  images[Symbol.iterator] = function* () {
    yield "https://www.kolpaper.com/wp-content/uploads/2020/03/doom-wallpaper.jpg",
      yield "https://images3.alphacoders.com/686/686773.jpg";
    yield "https://hdqwalls.com/wallpapers/doom-eternal-artwork-yd.jpg";
  };

  imgs.forEach((element, index) => {
    element.src = [...images][index];
  });

  body.style.cssText = `
    background-image: url(${[...images][1]})
  `;

  const duration = 500;
  const amount = duration;

  const delay = () => new Promise((resolve) => setTimeout(resolve, amount));

  const addSlideAnimation = (element, from, to) => {
    const keyframes = [
      { transform: `translateX(${from})` },
      { transform: `translateX(${to})` },
    ];

    const options = {
      duration,
    };

    element.animate(keyframes, options);
  };

  function previousImage() {
    const imgs = document.querySelectorAll("img");

    previous.removeEventListener("click", previousImage, false);

    body.style.cssText = `
      background-image: url(${imgs[0].src}) 
    `;

    imgs.forEach((element) => addSlideAnimation(element, "-680px", "10px"));

    picture.insertBefore(imgs[imgs.length - 1], imgs[0]);

    delay().then(() => previous.addEventListener("click", previousImage));
  }

  function nextImage() {
    const imgs = document.querySelectorAll("img");

    next.removeEventListener("click", nextImage, false);

    body.style.cssText = `
      background-image: url(${imgs[2].src}) 
    `;

    imgs.forEach((element) => addSlideAnimation(element, "680px", "-10px"));

    insertAfter(imgs[0], imgs[imgs.length - 1]);

    delay().then(() => next.addEventListener("click", nextImage));
  }

  previous.addEventListener("click", previousImage);
  next.addEventListener("click", nextImage);

  const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };
})();
