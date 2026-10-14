const servicos = document.querySelectorAll(".servico");
const detalhes = document.querySelector("#detalhes-servico");
const header = document.querySelector("header");
const reopenButton = document.querySelector(".header-reopen");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");

/* === Smart Header === */

let lastScrollY = window.scrollY;

function showHeader() {
    header.classList.remove("header-hidden");
    reopenButton.classList.remove("visible");
}

function hideHeader() {
    if (window.scrollY <= 80) {
        showHeader();
        return;
    }

    header.classList.add("header-hidden");
    reopenButton.classList.add("visible");

    nav.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 80) {
        showHeader();
    } else if (currentScrollY > lastScrollY) {
        hideHeader();
    } else if (currentScrollY < lastScrollY) {
        showHeader();
    }

    lastScrollY = currentScrollY;
}, { passive: true });

document.addEventListener("mousemove", (event) => {
    if (event.clientY <= 20) {
        showHeader();
    }
});

reopenButton.addEventListener("click", showHeader);

/* === Hamburger for Mobile === */

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
    showHeader();
});
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        nav.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }
});

const links = document.querySelectorAll(".nav-links a");
const secciones = [];


links.forEach(link =>{
    const id = link.getAttribute("href");
    if (id && id.startsWith("#")){
        const seccion = document.querySelector(id);
        if (seccion){
            secciones.push({
                enlace: link,
                seccion: seccion
            })
        }
    }    
});
function marcarEnlace(enlaceActivo) {
    links.forEach(link => {
        link.classList.toggle("active", link === enlaceActivo);
    });
}
const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            const actual = secciones.find(
                item => item.seccion === entrada.target
            );

            if (actual) {
                marcarEnlace(actual.enlace);
            }
        }
    });
}, {
    rootMargin: "-25% 0px -60% 0px",
    threshold: 0
});
secciones.forEach(item => {
    observer.observe(item.seccion);
});
links.forEach(link => {
    link.addEventListener("click", () => {
        marcarEnlace(link);
    });
});


/* === Smart Serviços === */
const conteudos = {

    corte: `
        <div class="detalhes-imagem">
            <img src="./images/corte.jpg" alt="Serviço de corte e estilo">
        </div>
        <div class="detalhes-texto">
            <h2>O corte certo muda tudo</h2>
            <p>
                Nossas cabeleireiras analisam o formato do seu rosto,
                textura e estilo de vida para criar um corte que
                realce o que há de mais bonito em você.
            </p>
            <button>QUERO AGENDAR</button>
        </div>
    `,

    coloracao: `
        <div class="detalhes-imagem">
            <img src="./images/coloracao.jpg" alt="Serviço de coloração">
        </div>
        <div class="detalhes-texto"class="detalhes-texto">
            <h2>Uma nova cor para você</h2>
            <p>
                Trabalhamos com técnicas de coloração,
                mechas, balayage e outros estilos.
            </p>
            <button>QUERO AGENDAR</button>
        </div>
    `,

    manicure: `
        <div class="detalhes-imagem">
            <img src="./images/manicure.jpg" alt="Serviço de manicure e pedicure">
        </div>
        <div class="detalhes-texto">
            <h2>Unhas perfeitas</h2>
            <p>
                Cuidados para suas unhas com esmaltes,
                acrílico, fibra e nail art.
            </p>
            <button>QUERO AGENDAR</button>
        </div>
    `,

    tratamentos: `
        <div class="detalhes-imagem">
            <img src="./images/tratamentos.jpg" alt="Serviço de tratamentos">
        </div>
        <div class="detalhes-texto">
            <h2>Cuidados para seus cabelos</h2>
            <p>
                Hidratação, cronograma capilar, botox
                e cauterização.
            </p>
            <button>QUERO AGENDAR</button>
        </div>
    `
};

servicos.forEach(servico =>{
    servico.addEventListener("click", () => {
        const tipo = servico.dataset.servico;
        console.log(tipo)
        servicos.forEach(item => {
            item.classList.remove("ativo");
        });

        servico.classList.add("ativo");

        detalhes.innerHTML = conteudos[tipo];

        detalhes.style.display = "grid";
    })
})