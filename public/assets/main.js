(function(){
  var header=document.querySelector('.header');
  var btn=document.querySelector('.hamburger');
  var nav=document.getElementById('nav-menu');
  if(btn&&nav){
    var close=function(){nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');document.body.classList.remove('nav-locked');};
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      document.body.classList.toggle('nav-locked',open);
    });
    nav.addEventListener('click',function(e){if(e.target.closest('a'))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    window.addEventListener('resize',function(){if(window.innerWidth>1024)close();});
  }
  if(header){
    var onScroll=function(){header.classList.toggle('is-scrolled',window.scrollY>8);};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  }
  var y=document.getElementById('footerYear');if(y)y.textContent=new Date().getFullYear();
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('is-in');});}
  var q=document.getElementById('dir-q');
  if(q){
    var links=Array.prototype.slice.call(document.querySelectorAll('.dir .pills a'));
    var provs=Array.prototype.slice.call(document.querySelectorAll('.dir__prov'));
    var regions=Array.prototype.slice.call(document.querySelectorAll('.dir__region'));
    var count=document.getElementById('dir-count');
    var empty=document.getElementById('dir-empty');
    var norm=function(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');};
    var run=function(){
      var v=norm(q.value.trim());var shown=0;
      links.forEach(function(a){var hit=!v||norm(a.textContent).indexOf(v)>-1||norm(a.getAttribute('data-prov')||'').indexOf(v)>-1||norm(a.getAttribute('data-region')||'').indexOf(v)>-1;a.classList.toggle('is-hidden',!hit);if(hit)shown++;});
      provs.forEach(function(p){p.classList.toggle('is-hidden',!p.querySelector('a:not(.is-hidden)'));});
      regions.forEach(function(r){r.classList.toggle('is-hidden',!r.querySelector('a:not(.is-hidden)'));});
      if(count)count.textContent=shown+' de '+links.length+' localidades';
      if(empty)empty.classList.toggle('is-visible',shown===0);
    };
    q.addEventListener('input',run);run();
  }
})();
