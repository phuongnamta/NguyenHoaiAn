const sliderContainer = document.querySelector(".container");
const interSlider = document.querySelector(".slider");
const images = ["image/1.jpg", "image/2.jpg","image/3.jpg","image/4.jpg","image/5.jpg"];

const events = {
    mouse: {down: "mousedown", move: "mousemove", up: "mouseup"},touch: {
        down: "touchstart", move: "touchmove", up: "touchend"} 
};

let deviceType = '';

function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;    
    }catch (e){
        deviceType = "mouse";
        return faise;
    }
}

function slideGenerator(){
    images.forEach(image =>{
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `<img src='${image}'class='image'>`;
        innerSlider.appendChild(slide);
    });
    innerSlider.style.gridTemplateColumns = 'repear(${images.length}, 1fr)';
}

function handleDown(e){
    active = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const containerRect = sliderContainer.
    getBoundingClientRect();
    const slideRect = innerSlider.getBoundingClientRect();
    startX = clientX - (slideRect.left - containerRect.left);
    sliderContainer.style.cursor = "grabbing";
}

function handleMove(e){
    if(!active) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const currentX = clientX - startX;

    const imageWidth = 800;
    const gapWidth = 16;
    const paddingWidth = 10 * 2;
    const totalWidth = (imageWidth + gapWidth) * images.length - gapWidth + paddingWidth;
    const maxOffset = totalWidth - sliderContainer.offsetWidth;

    const constrainedX = Math.min(0, Math.max(-maxOffset, currentX));
    innnerSlider.style.transform = 'transladeX(${contrainedX}px)';
}

function checkBoundary(){
    const innerWidth = innerSlider.offsetWidth;
    const containerWidth = sliderContainer.offsetWidth;
    const maxOffset = containerWidth - innerWidth;
    const currentOffset = parseInt(innerSlider.style.transform.replace("px)", ""));

    if(currentOffset > 0){
        innerSlider.style.transform = "translateX(0px)";
    }else if(currentOffset < -maxOffset){
        interSlider.style.transform = `translateX(${-maxOffset}px)`;
    }
}

function handleUp(){
    sliderContainer.style.cursor = "grab";
    active = false;
}

function initializeSlider(){
    isTouchDevice();
    slideGenerator();
    slideGenerator.addEventListener(events[deviceType].down, handleDown);
    document.addEventListener(events[deviceType].move, handleMove);
    document.addEventListener(events[deviceType].up,handleUp)
}

window.onload = initializeSlider;