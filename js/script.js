let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
 


menu.onclick = () =>{

    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');

}



window .onscroll = () =>{

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    
}

var slideIndex = 1;
showSlides(slideIndex);
 
function plusSlides(n) {
    showSlides(slideIndex += n);
}
 
function currentSlide(n) {
    showSlides(slideIndex = n);
}
 
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
 


 



$("input[name='expiry-data']").mask("00 / 00");


function paymentdone() {
    alert("Payment done successfully");
    document.submit();
    document.reset();
    }