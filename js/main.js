/*GLOBALES DISPLAY WEB*/
let on = document.getElementById("on");
let off = document.getElementById("off");
/*GLOBALES BARRA DE BUSQUEDA*/
let search = document.getElementById("wrapper_search");
let search_icon = document.getElementById("search");
let input_search = document.getElementById("search_input");
let box_search = document.getElementById("search_result");
let exit_search = document.getElementById("search_exit");
let li = box_search.getElementsByTagName("li");
let nav = document.getElementById("nav");
let buscadorInterno = document.getElementById("buscadorInterno");
let filtro = "";
/*GLOBALES PROCESO DE COMPRA*/
let contenedorProductos = document.getElementById("products_wrapper");
let agregar = document.getElementsByClassName("buy");
let carrito = [];
/*MODAL*/
let icono_carrito = document.getElementById("cart_shopping");
let vacio = document.getElementById("vacio");
let modal = document.getElementById("modal_mask");
let modal_box = document.getElementById("modal_boxx");
let modal_box_text = document.getElementById("modal_box-1_p");
let modal_box2_price = document.getElementById("modal_box-2");
let exit_modal = document.getElementById("exit_modal");
let agregarmodal = document.getElementById("agregarmodal");
let precio_final = document.getElementById("precio_final");
let checkout = document.getElementById("checkout");
/*FILTRADO DE PRODUCTOS*/
let ovni = document.getElementById("ovni");
let asd = document.getElementById("contenedorProductosOVNI");
/*WSP ICON*/
let wsp = document.getElementById("wsp_icon");

/*RENDER DE PRODUCTOS EN BOX SEARCH*/
for (temporal of productos) {
  impresion = document.createElement("li");
  impresion.innerHTML = `<li><a href="#ancla" class="search__result"><i class="fa-solid fa-book"></i>${temporal.nombre}</a></li>`;
  box_search.appendChild(impresion);
  impresion.addEventListener("click", () => {
    box_search.style.display = "none";
    search.style.top = "-1px";
    input_search.value = "";
    search_icon.style.color = "gray";
    nav.style.boxShadow = "0px 2px 5px 1px rgba(0, 0, 0, 0.49)";
  });
}

/*BARRA DE BUSQUEDA*/
search_icon.addEventListener("click", () => {
  search.style.top = "80px";
  search.style.position = "fixed";
  input_search.focus();
  nav.style.boxShadow = "none";
  search_icon.style.color = "red";
});

exit_search.addEventListener("click", () => {
  box_search.style.display = "none";
  search.style.top = "-1px";
  input_search.value = "";
  search_icon.style.color = "gray";
  nav.style.boxShadow = "0px 2px 5px 1px rgba(0, 0, 0, 0.49)";
});

/*FILTRADO DE BUSQUEDA*/
document.getElementById("search_input")
.addEventListener("keyup", buscador_interno);
function buscador_interno() {
  filtro = input_search.value.toUpperCase();
  li = box_search.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    textValue = a.textValue || a.innerText;
    if (textValue.toUpperCase().indexOf(filtro) > -1) {
      li[i].style.display = "";
      box_search.style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}

/*SIMPLY COUNTDOWN*/
simplyCountdown("#countdown", {
  year: 2022, // required
  month: 5, // required
  day: 31, // required
  hours: 18, // Default is 0 [0-23] integer
  minutes: 02, // Default is 0 [0-59] integer
  seconds: 0, // Default is 0 [0-59] integer
  words: {
    //words displayed into the countdown
    days: { singular: "DIAS", plural: "DIAS" },
    hours: { singular: "HORAS", plural: "HORAS" },
    minutes: { singular: "MINUTOS", plural: "MINUTOS" },
    seconds: { singular: "SEGUNDOS", plural: "SEGUNDOS" },
  },
  plural: true, //use plurals
  inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
  inlineClass: "simply-countdown-inline", //inline css span class in case of inline = true
  // in case of inline set to false
  enableUtc: false, //Use UTC or not - default : false
  onEnd: function () {
    on.style.display = "none";
    off.style.display = "flex";
  }, //Callback on countdown end, put your own function here
  refresh: 1000, // default refresh every 1s
  sectionClass: "simply-section", //section css class
  amountClass: "simply-amount", // amount css class
  wordClass: "simply-word", // word css class
  zeroPad: false,
  countUp: false,
});

/*TOSTIFY*/
function tosty() {
  Toastify({
    text: "PRODUCTO AGREGADO",
    className: "toast",
    style: {
      background: "red",
    },
  }).showToast();
}

/*RENDERIZAR PRODUCTOS*/
for (const temporal of productos) {
  impresion_all = document.createElement("div");
  impresion_all.innerHTML = `
  <div class="product-card" class"all">
  <div class="product-tumb">
    <img src=${temporal.img} alt="${temporal.alt}">
  </div>
  <div class="product-details">
    <span class="product-catagory">${temporal.editorial}</span>
    <h4><a href="">${temporal.nombre}</a></h4>
    <p>${temporal.descripcion}</p>
    <div class="product-bottom-details">
      <div class="product-price"> $${temporal.precio}</div>
      <div class="product-links">
        <a class="buy" id =${temporal.id}><i class="fa fa-shopping-cart"></i></a>
      </div>
    </div>
  </div>`;
  contenedorProductos.appendChild(impresion_all);
}

/*AGREGA AL CARRITO*/
for (const temp of agregar) {
  temp.addEventListener("click", () => {
    let producto = productos.find((item) => item.id == temp.id);
    vacio.style.display = "none";
    modal_box_text.style.visibility = "visible";
    modal_box2_price.style.visibility = "visible";
    agregarmodal.style.display = "block";
    carrito.push(producto);
    impresionProducto = document.createElement("div");
    impresionProducto.innerHTML = `
  <div class="modal__cards__box">
    <div class="modal__cards__box--1">
      <img src=${producto.img}>
    </div>
    <div class="modal__cards__box--2">
      <div class="modal__cards__wrapper__product__company">
        <p class="modal__cards__product">${producto.nombre}</p>
        <p class="modal__cards__company">${producto.editorial}</p>
      </div>
      <div class="modal__cards__wrapper__description">
        <p class="modal__cards__description">${producto.descripcion}</p>
      </div>
      <div class="modal__cards__wrapper__price">
        <p class="modal__cards__price">$${producto.precio}</p>
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
      
 `;
    agregarmodal.appendChild(impresionProducto);
    tosty();
  });
}

/*UNIFICAR VALOR TOTAL*/
for (const temp of agregar) {
  temp.addEventListener("click", () => {
    for (let i = 0; i < carrito.length; i++) {
      let suma = carrito.reduce((acc, el) => acc + el.precio, 0);
      impresionTotal = precio_final;
      impresionTotal.innerHTML = "$" + suma;
    }
  });
}

/*VISIALIZAR MODAL DEL CARRITO*/
icono_carrito.addEventListener("click", () => {
  wsp_icon.style.visibility = "hidden";
  if (screen.width > 1440) {
    modal.style.visibility = "visible";
    modal_box.style.left = "80%";
    modal_box.style.transition = "400ms";
  }

  if (screen.width <= 1440) {
    modal.style.visibility = "visible";
    modal_box.style.left = "70%";
    modal_box.style.transition = "400ms";
  }

  if (screen.width <= 1024) {
    modal.style.visibility = "visible";
    modal_box.style.left = "60%";
    modal_box.style.transition = "400ms";
  }

  if (screen.width <= 768) {
    modal.style.visibility = "visible";
    modal_box.style.left = "50%";
    modal_box.style.transition = "400ms";
  }

  if (screen.width <= 725) {
    modal.style.visibility = "visible";
    modal_box.style.left = "0%";
    modal_box.style.transition = "400ms";
  }
});

/*CERRAR MODAL DEL CARRITO*/
exit_modal.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  wsp_icon.style.visibility = "visible";
  modal_box.style.left = "100%";
  modal_box.style.transition = "400ms";
});

checkout.addEventListener("click", () => {
  if (carrito != "") {
    Swal.fire("HASTA ACA LLEGO MI CONOCIMIENTO POR AHORA", "", "success");
  } else {
    Swal.fire("AUN NO AGREGASTE NINGUN PRODUCTO AL CARRITO", "", "error");
  }
});
