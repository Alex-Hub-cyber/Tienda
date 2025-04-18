const productos = [
  { nombre: "Pupusa de Queso", precio: 1.5 },
  { nombre: "Pupusa de Frijol", precio: 1.5 },
  { nombre: "Pupusa Revueltas", precio: 1.75 },
  { nombre: "Pupusa de Chicharrón", precio: 1.75 },
  { nombre: "Pupusa de Ayote", precio: 1.5 },
  { nombre: "Pupusa de Mora", precio: 1.5 },
  { nombre: "Arroz", precio: 0.75 },
  { nombre: "Frijoles", precio: 1.0 },
  { nombre: "Aceite", precio: 2.5 },
  { nombre: "Leche", precio: 1.25 },
  { nombre: "Azúcar", precio: 1.0 },
  { nombre: "Huevos", precio: 2.0 }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("catalogo");
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = \`
      <h3>\${producto.nombre}</h3>
      <p>Precio: $ \${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(\${index})">Agregar</button>
    \`;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let suma = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = \`\${item.nombre} - $\${item.precio.toFixed(2)}\`;
    lista.appendChild(li);
    suma += item.precio;
  });
  total.textContent = suma.toFixed(2);

  const paypalLink = document.getElementById("paypal-link");
  paypalLink.href = "https://www.paypal.com/paypalme/tuusuario/" + suma.toFixed(2);
}

function enviarWhatsApp() {
  const numero = "4444";
  let mensaje = "Hola, quiero hacer un pedido:%0A";
  carrito.forEach(item => {
    mensaje += "- " + item.nombre + " ($" + item.precio.toFixed(2) + ")%0A";
  });
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  mensaje += "%0ATotal: $" + total.toFixed(2);
  window.open("https://wa.me/" + numero + "?text=" + mensaje, "_blank");
}

mostrarProductos();