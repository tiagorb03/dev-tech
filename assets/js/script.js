const dataEvento = new Date("2026-07-23 09:00:00").getTime();

setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const texto = `Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para o evento`;

    const topo = document.getElementById("contador");
    const footer = document.getElementById("contador-footer");

    if(topo) topo.innerHTML = texto;
    if(footer) footer.innerHTML = texto;

}, 1000);