//Interactive
function interactive(){
  let cards = document.querySelectorAll(".card");
  let wrapper = document.getElementById("wrapper");
  //_________________Set Perspective
  if(wrapper.clientWidth > 1000){
    wrapper.style.perspective = wrapper.clientWidth + "px";
  }
  //-----------------Set Perspective
  cards.forEach((card, i) => {
    card.addEventListener("click", function(event){
      card.classList.toggle("flip");
    })
  });
  
}
//Scroll
function scrollSide(element, container){
  let scrollElement = document.querySelector(element);
  let scrollContainer = document.querySelector(container);
  scrollElement.style.left = scrollContainer.scrollTop + "px";
}