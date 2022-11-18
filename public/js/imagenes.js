const contenedor = document.querySelector('#archivos')
const seleccionArchivos = document.querySelector("#seleccionArchivos")
seleccionArchivos.addEventListener("change", () => {
  const archivos = seleccionArchivos.files;
  if (!archivos || !archivos.length) {
    return;
  }
  archivos.forEach(imagen => {
    const newImg = document.createElement('img')
    newImg.setAttribute('src', URL.createObjectURL(imagen))
    newImg.setAttribute('width', '100')
    newImg.setAttribute('height', '100')
    contenedor.appendChild(newImg)
  });
});