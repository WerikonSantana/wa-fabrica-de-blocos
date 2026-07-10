const header=document.getElementById("header");
const nav=document.getElementById("nav");
const menuBtn=document.getElementById("menuBtn");
const topBtn=document.getElementById("topBtn");
const ano=document.getElementById("ano");
const heroBg=document.querySelector(".hero__bg");

ano.textContent=new Date().getFullYear();

function onScroll(){
  const y=window.scrollY;
  header.classList.toggle("scrolled",y>24);
  topBtn.classList.toggle("show",y>520);
  if(heroBg){heroBg.style.transform=`scale(1.04) translateY(${Math.min(y*.08,44)}px)`;}
}
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();

menuBtn.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",open?"true":"false");
});

nav.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded","false");
  });
});

topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));
