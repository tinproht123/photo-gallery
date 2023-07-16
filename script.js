const track = document.getElementById("image-track");

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = (e) => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;
  track.style.transform = `translate(${nextPercentage}%, -50%)`;
  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );
  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.addEventListener("scroll", () => {
  let images = document.querySelectorAll(".image");
  let footer = document.getElementById("footer");

  for (let i = 0; i < images.length; i++) {
    var revealtop = images[i].getBoundingClientRect().top - 400;
    var revealpoint = 0;

    if (revealtop < window.innerHeight - revealpoint) {
      images[i].classList.add("active");
    }
  }

  var revealFooter = footer.getBoundingClientRect().top - 400;
  if (revealFooter < window.innerHeight - revealpoint) {
    footer.classList.add("active");
  }
});
