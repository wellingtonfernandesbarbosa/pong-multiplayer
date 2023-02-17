// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Movimento da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 6;


// Variáveis da minha raquete
let xRaquete = 50;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 100;

// Variáveis da raquete do oponente
let xRaqueteOponente = 550;
let yRaqueteOponente = 150;
let raqueteComprimentoOponente = 10;
let raqueteAlturaOponente = 100;

// Variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

let trilha;
let raquetada;
let ponto;

var colidiu = false;

function preload() {
    ponto = loadSound("audio/ponto.mp3");
    trilha = loadSound("audio/trilha.mp3");
    raquetada = loadSound("audio/raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(50);
    mostraBolinha();
    movimentaBolinha();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    detectaColisaoBolinha();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    mostraPlacar();
    marcaPonto();
}

function mostraPlacar() {
    stroke(255);
    fill(200);
    textAlign(CENTER);
    textSize(24);
    text('Placar', 300, 30);
    fill(color(155, 090, 180))
    rect(150, 30, 40, 23);
    rect(450, 30, 40, 23);
    fill(000);
    text(meusPontos, 170, 50);
    text(pontosOponente, 470, 50);
    fill(255);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    } else if (xBolinha < 10) {
        pontosOponente += 1;
        ponto.play();
    }
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function detectaColisaoBolinha() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
        raquetada.play();
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }

    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

    if (colidiu) {
        velocidadeXBolinha *= -1;
    }
}

function mostraRaqueteOponente() {
    rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimentoOponente, raqueteAlturaOponente);
} 

function movimentaRaqueteOponente() {
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}