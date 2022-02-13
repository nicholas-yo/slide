(async () => {
  "use strict";

  const previous = document.querySelector(".previous");
  const picture = document.querySelector('picture')
  const next = document.querySelector(".next");
  const body = document.querySelector("body");

  const images = new Object(null);

  images[Symbol.iterator] = function* () {
    yield "https://c.wallhere.com/photos/68/47/1920x1080_px_clouds_flowers_Love_Plus_Ponytail_School_Uniform_Takane_Manaka-628997.jpg!d",
      yield "https://www.pixel4k.com/wp-content/uploads/2018/11/anime-girl-flowers-roses-face-4k_1541975650.jpg";
    yield "https://wallpaperforu.com/wp-content/uploads/2020/12/glitch-wallpaper-20120513313832.jpg";
  };

  body.style.cssText = `
    background-image: url(${[...images][1]})
  `;

  const duration = 700;
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
