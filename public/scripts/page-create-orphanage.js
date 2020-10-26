// create map
const map = L.map("mapid").setView([-27.2201895, -49.647701], 15);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  //remove icon
  // O "&&" testa se o eu tenho algum marker
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add photo camp
function addPhotoField() {
  // Pegar o container de fotos #images
  const container = document.querySelector("#images");

  // pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");

  // realizar o clone da ultima imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    // Esse return sem nada faz a função parar de rodar o resto do código
    return;
  }

  // limpar o campo antes de adicionar ao container de imagens
  input.value = "";

  // adicionar o clone ao container de imagens
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length <= 1) {
    // limpar o valor do campo
    span.parentNode.children[0].value = "";
    return;
  }

  // deletar o campo
  span.parentNode.remove();
}

// selecionar sim ou não
function toggleSelect(event) {
  // retirar a classe .active dos botões
  document
    .querySelectorAll(".button-select button")
    .forEach((button) => button.classList.remove("active"));

  //colocar a classe .active nos botões clicados
  const button = event.currentTarget;
  button.classList.add("active");

  // atualizar o meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open-on-weekends"]');

  // verificar se é sim ou não
  input.value = button.dataset.value;
}

function validate(event) {
  // validar se lat e lng estao preenchidos
  event.preventDefault();
  alert("Selecione um ponto no mapa!")
}
