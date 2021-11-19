var cart = {
  
  hPdt : null, 
  hItems : null, 
  items : {}, 
  iURL : "images/", 

  
  save : () => {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },


  load : () => {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  
  nuke : () => {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  
  init : () => {
  
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in products) {
      
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.hPdt.appendChild(item);

      // PRODUCT IMAGE
      part = document.createElement("img");
      part.src = cart.iURL + p.img;
      part.className = "p-img";
      item.appendChild(part);

      
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);

      // PRODUCT DESCRIPTION
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);

      // PRODUCT PRICE
      part = document.createElement("div");
      part.innerHTML = "Rs." + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // ADD TO CART
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.className = "cart p-add";
      part.onclick = () => { cart.add(id); };
      item.appendChild(part);
    }

    
    cart.load();

    
    cart.list();
  },


  list : () => {
    //  RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if(cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    
    else {
      let p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.className = "c-del cart";
        part.onclick = () => { cart.remove(id); };
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.className = "c-qty";
        part.onchange = function () { cart.change(id, this.value); };
        item.appendChild(part);

        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: Rs." + total;
      cart.hItems.appendChild(item);

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.onclick = cart.nuke;
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Order Now";
      item.onclick = cart.checkout;
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // ADD ITEM INTO CART
  add : (id) => {
    if (cart.items[id] == undefined) { cart.items[id] = 1; }
    else { cart.items[id]++; }
    cart.save(); cart.list();
  },

  
  change : (pid, qty) => {
    
    if (qty <= 0) {
      delete cart.items[pid];
      cart.save(); cart.list();
    }

    
    else {
      cart.items[pid] = qty;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: $" + total;
      }
    }
  },

  
  remove : (id) => {
    delete cart.items[id];
    cart.save();
    cart.list();
  },


  checkout : () => {
    
    location.href = "ordernow.html";

    
  }
};
window.addEventListener("DOMContentLoaded", cart.init);
