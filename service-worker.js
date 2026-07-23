const CACHE_NAME = 'bia-nails-v1';

const urlsToCache = [
'./',
'./index.html',
'./wallpaperbackspace.png'
];

self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => response || fetch(event.request))
);
});

const portfolio = document.querySelectorAll(".portfolio-slide");

let foto = 0;

setInterval(()=>{

    portfolio[foto].classList.remove("active");

    foto++;

    if(foto >= portfolio.length){

        foto = 0;

    }

    portfolio[foto].classList.add("active");

},4000);

const imagens = document.querySelectorAll(".carrossel img");
const pontos = document.querySelectorAll(".bolinhas span");

let atual = 0;

function trocar(){

    imagens[atual].classList.remove("ativo");
    pontos[atual].classList.remove("ativa");

    atual++;

    if(atual >= imagens.length){

        atual = 0;

    }

    imagens[atual].classList.add("ativo");
    pontos[atual].classList.add("ativa");

}

setInterval(trocar,4000);


navigator.serviceWorker.getRegistrations().then(registrations => {

    registrations.forEach(reg => reg.update());

});

navigator.serviceWorker.addEventListener("controllerchange", () => {

    window.location.reload();

});