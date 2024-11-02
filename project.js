import { FINAL_DATA } from "./data.js";
let index = 0;
let slideIndex = [0,0,0];
let slideId = ["mySlides1", "mySlides2", "mySlides3"]

window.onload = () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("id")) {
        index = parseInt(params.get("id").split("-")[1]);
    }

    loadContent(index);
    showSlides(1, 0);
    showSlides(1, 1);
    showSlides(1, 2);

}


const loadContent = (index) => {
    const mainImageDiv = document.querySelector(".project-main-image");
    const mainImage = document.createElement('img');
    mainImage.src = FINAL_DATA[index]["projectImg"];
    mainImageDiv.append(mainImage)

    const name = document.querySelector(".project-name")
    name.innerHTML = `${FINAL_DATA[index]["projectTitle"]}`;

    const description = document.querySelector(".project-description-text").querySelector("p")
    description.innerHTML = FINAL_DATA[index]["projectDescription"];

    const supervisor = document.querySelector(".supervisor-description-text")
    const supervisorName = document.createElement("span")
    supervisorName.classList.add("description-text");
    supervisorName.innerHTML = FINAL_DATA[index]["supervisor"];
    supervisor.append(supervisorName)

    const teamMember = document.querySelector(".member-description-text");
    for (let i=0; i < FINAL_DATA[index]["teamMembers"].length; i++) {
        const memberDiv = document.createElement("span")
        memberDiv.classList.add("description-text");
        memberDiv.innerHTML = FINAL_DATA[index]["teamMembers"][i];
        teamMember.append(memberDiv)
    }
    

    const videoDiv = document.querySelector(".project-section.video")
    if (FINAL_DATA[index]["video"]) {
        const videoElement = document.querySelector(".project-video")
        videoElement.src = FINAL_DATA[index]["video"];
    } else {
        videoDiv.style.display = "none";
    }

    const projectPage = document.querySelector("#project-page")


    if (FINAL_DATA[index]["project-section"]) {
        FINAL_DATA[index]["project-section"].forEach((d,i) => {
            const projectCaptionPhotos = document.createElement("div")
            projectCaptionPhotos.classList.add("project-caption-photos");
            const captionDiv = document.createElement("div")
            captionDiv.classList.add("project-caption", "text-block")
            const captionP = document.createElement("p");
            captionP.innerHTML = `${d["heading"]}`
            captionDiv.append(captionP);

            const photoSlides = document.createElement("div")
            photoSlides.classList.add("project-photo-slides");
            d["pictures"].forEach((el) => {
                const slide = document.createElement("div");
                slide.classList.add(slideId[i]);
                slide.classList.add("slide")

                const slideImg = document.createElement("img");
                slideImg.style.width = "100%"
                slideImg.src = el["img_link"];
                slide.append(slideImg)

                const slideCapt = document.createElement("div");
                slideCapt.classList.add("caption-text", "text-block")
                

                if (el["caption"]) {
                    const slideP = document.createElement("p");
                    slideP.innerHTML = `${el["caption"]}`
                    slideCapt.append(slideP)
                } else {
                    slide.style.background = "none";
                }

                slide.append(slideCapt)
                photoSlides.append(slide)
            })

            const prev = document.createElement("a")
                prev.classList.add("prev", "clickable")
                const prevImg = document.createElement("img")
                prevImg.src = "./assets/project-arrow-prev.svg"
                prev.append(prevImg)

                const next = document.createElement("a")
                next.classList.add("next", "clickable")
                const nextImg = document.createElement("img")
                nextImg.src = "./assets/project-arrow-next.svg"
                next.append(nextImg)
                
                photoSlides.append(prev, next)

            if (d["pictures"].length <= 1) {
                prev.style.display = "none";
                next.style.display = "none";
            }

            projectCaptionPhotos.append(photoSlides)

            const textDescription = document.createElement("div")
            textDescription.append(captionDiv)
            textDescription.classList.add("project-text-description", "text-block")
            if (d["paragraphs"]) {
                d["paragraphs"].forEach((p) => {
                    if (p) {
                        const para = document.createElement("p");
                        para.innerHTML = `${p}`
                        textDescription.append(para)
                    }
                })
            }

            const projectSection = document.createElement("div");
            // const footer = document.querySelector(".footer");
            projectSection.classList.add("project-section", "content-block", "list")
            projectSection.append(textDescription, projectCaptionPhotos)
            projectPage.insertBefore(projectSection, videoDiv)
        })
    }

    document.querySelectorAll(".prev").forEach((d, i) => {
        d.addEventListener("click", (e) => {plusSlides(-1, i)})
    })
    
    document.querySelectorAll(".next").forEach((d, i) => {
        d.addEventListener("click", (e) => {plusSlides(1, i)})
    })
}


function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no, n < 0 ? true : false);
}

function showSlides(n, no, left) {
    let i;
    if (document.getElementsByClassName(slideId[no]).length > 0) {
        let x = document.getElementsByClassName(slideId[no]);
        if (n >= x.length) {slideIndex[no] = 0}
        if (n < 0) {slideIndex[no] = x.length - 1}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        console.log(document.getElementsByClassName(slideId[no]).length)
        x[slideIndex[no]].classList.remove("w3-animate-left")
        x[slideIndex[no]].classList.remove("w3-animate-right")
        if (left) {
            x[slideIndex[no]].classList.add("w3-animate-left")
        } else {
            x[slideIndex[no]].classList.add("w3-animate-right")
        }
        x[slideIndex[no]].style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
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
