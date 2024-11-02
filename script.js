import { FINAL_DATA } from "./data.js";


//fade-in animation
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is in the viewport
  };

  const fadeInElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  fadeInElements.forEach(element => {
    // Check if the element is already in the viewport
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add('visible');
    } else {
      observer.observe(element);
    }
  });
});

window.onload = () => {
  generateProjectCollection();
}

const generateProjectCollection = () => {
  const designProjects = document.querySelector("#projects-content");
  const webdevProjects = document.querySelector("#web-dev-content");
  const othersProjects = document.querySelector("#others-content");
  

  FINAL_DATA.forEach((d, i) => {
    
    const container = document.createElement('div');
    container.classList.add("project-element", "clickable");
    container.id = d["title"].split(" ")[0] + "-" + i;

    const image_div = document.createElement("div");
    image_div.classList.add("project-image");
    image_div.style.backgroundImage = `url(${d["thumbnailImg"]})`;
    image_div.style.backgroundSize = "cover";

    // const filter_div = document.createElement("div");
    // filter_div.classList.add("image-filter");
    // image_div.append(filter_div);

    const text_div = document.createElement("div");
    text_div.classList.add("project-title");
    text_div.innerHTML = `${d["title"]}`;

    const label_div = document.createElement("div");
    label_div.classList.add("project-label")

    for (let j=0; j < d["filter"].length; j++) {
      const label = document.createElement("div");
      label.innerHTML = d["filter"][j];
      label_div.append(label);
    }

    container.addEventListener("click", (e) => {
      window.location.href = `./project.html?id=${container.id}`;
    });

    container.append(image_div, label_div, text_div);

    switch (d["type"]) {
      case "Design Project":
        console.log("?")
        designProjects.append(container)
        break;
      case "Webdev Project":
        webdevProjects.append(container)
        break;
      case "Others":
        othersProjects.append(container)
        break;
    }
  });
};