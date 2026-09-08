const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),500));

const cursor=document.getElementById('cursor');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.magnetic,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('big'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('big'));
});

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('visible');
}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Magnetic elements logic
document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.012,y=(e.clientY-r.top-r.height/2)*.012;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(window.gsap && window.ScrollTrigger && !reduceMotion){
  gsap.registerPlugin(ScrollTrigger);

  const splitChars=(el,extraClass='')=>{
    const text=el.textContent;
    el.textContent='';
    for(const ch of text){
      if(ch===' '){ el.appendChild(document.createTextNode('\u00A0')); continue; }
      const s=document.createElement('span');
      s.className='char'+(ch==='.'?' dot':'')+(extraClass?' '+extraClass:'');
      s.textContent=ch;
      s.style.display='inline-block';
      s.style.willChange='transform,opacity';
      s.style.transformOrigin='50% 100%';
      el.appendChild(s);
    }
    return [...el.querySelectorAll('.char')];
  };

  const rnd=gsap.utils.random;
  const assembleIn=(chars,{stagger=0.06,duration=1.3,delay=0,from='random',spread=1}={})=>{
    return gsap.fromTo(chars,
      {
        opacity:0,
        transformPerspective:1000,
        scale:()=>rnd(1.8,3.2),
        z:()=>rnd(-600,-180),
        xPercent:()=>rnd(-160,160)*spread,
        yPercent:()=>rnd(-180,180)*spread,
        rotationX:()=>rnd(-160,160),
        rotationY:()=>rnd(-160,160),
        rotationZ:()=>rnd(-100,100),
        filter:'blur(18px)',
      },
      {
        opacity:1,scale:1,z:0,xPercent:0,yPercent:0,
        rotationX:0,rotationY:0,rotationZ:0,filter:'blur(0px)',
        duration,ease:'expo.out',delay,
        stagger:{each:stagger,from},
      });
  };

  const titleChars=[];
  gsap.utils.toArray('.hero-title .line > span').forEach(w=>{
    w.style.transform='none';
    w.style.overflow='visible';
    w.parentElement.style.overflow='visible';
    titleChars.push(...splitChars(w));
  });

  // Hero Intro
  assembleIn(titleChars,{stagger:0.055,duration:1.5,delay:0.3,from:'random',spread:1});

  // Hero Scroll Exit - animate the lines instead of chars to prevent scrub conflicts!
  gsap.to('.hero-title .line',{
    yPercent:-100,opacity:0,rotateX:45,
    ease:'none',immediateRender:false,
    stagger:{each:0.1,from:'start'},
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:0.6},
  });

  // Horizontal Scroll for all screen sizes
  const section=document.querySelector('.hscroll');
  const track=document.querySelector('.hscroll-track');
  if(section && track) {
    section.classList.add('gsap-pinned');
    // Calculate distance based on track width vs window width
    const getDistance=()=>track.scrollWidth-window.innerWidth;

    const scrub=gsap.to(track,{
      x:()=>-getDistance(),
      ease:'none',
      scrollTrigger:{
        trigger:section,
        start:'top top',
        end:()=>'+='+getDistance(),
        pin:true,
        scrub:1,
        anticipatePin:1,
        invalidateOnRefresh:true,
      },
    });

    const panels=gsap.utils.toArray('.hscroll .panel:not(.panel-intro)');
    panels.forEach(p=>{
      gsap.from(p,{
        opacity:0,y:60,ease:'power2.out',
        scrollTrigger:{
          trigger:p,
          containerAnimation:scrub,
          start:'left 85%',
          end:'left 55%',
          scrub:true,
        },
      });
    });
  }
}

// EmailJS Contact Form Logic
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.5';
    submitBtn.style.pointerEvents = 'none';
    formStatus.style.display = 'none';

    const templateParams = {
      name: document.getElementById('user_name').value,
      email: document.getElementById('user_email').value,
      message: document.getElementById('user_message').value,
      time: new Date().toLocaleString()
    };

    emailjs.send('service_iennfp7', 'template_9wuvbzo', templateParams, 'qRxH0WfmVW7wXW6HD')
      .then(() => {
        submitBtn.textContent = 'SENT SUCCESSFULLY ?';
        submitBtn.style.opacity = '1';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE ?';
          submitBtn.style.pointerEvents = 'auto';
        }, 4000);
      }, (error) => {
        submitBtn.textContent = 'SEND MESSAGE ?';
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
        formStatus.textContent = 'Failed to send message. Please check your connection and try again.';
        formStatus.style.display = 'block';
        formStatus.style.color = '#F15A24';
        console.error('EmailJS Error:', error);
      });
  });
}
