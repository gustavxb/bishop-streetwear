// ------------------ MODAIS ------------------
function setupModal(btnId, modalId) {
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(btnId);
  const span = modal.querySelector(".close");
  btn.onclick = () => modal.style.display = "flex";
  span.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if(e.target==modal) modal.style.display="none"; }
}
setupModal("btn-carrinho","modal-carrinho");
setupModal("btn-cadastro","modal-cadastro");
setupModal("btn-login","modal-login");

// ------------------ CARRINHO ------------------
let cart = [];
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

document.querySelectorAll(".add-cart").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const card = btn.parentElement;
    const nome = card.dataset.nome;
    const preco = parseFloat(card.dataset.preco);
    const tamanho = card.querySelector("select").value;
    const quantidade = parseInt(card.querySelector("input[type=number]").value);

    const existing = cart.find(item => item.nome===nome && item.tamanho===tamanho);
    if(existing){ existing.quantidade += quantidade; }
    else{ cart.push({nome, preco, tamanho, quantidade}); }
    
    updateCart();
  });
});

function updateCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total += item.preco*item.quantidade;
    const li = document.createElement("li");
    li.textContent=`${item.nome} - ${item.tamanho} - ${item.quantidade}x - R$ ${(item.preco*item.quantidade).toFixed(2)}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent="Remover";
    removeBtn.style.marginLeft="10px";
    removeBtn.onclick = ()=>{ cart.splice(index,1); updateCart(); }
    
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Checkout simulado
document.getElementById("checkout").onclick = ()=>{
  if(cart.length===0){ alert("Carrinho vazio!"); return; }
  alert("Compra finalizada com sucesso!");
  cart=[]; updateCart();
}

// ------------------ CADASTRO ------------------
document.getElementById("form-cadastro").onsubmit = e=>{
  e.preventDefault();
  alert("Cadastro realizado com sucesso!");
  document.getElementById("modal-cadastro").style.display="none";
}

// ------------------ LOGIN ------------------
document.getElementById("form-login").onsubmit = e=>{
  e.preventDefault();
  alert("Login realizado com sucesso!");
  document.getElementById("modal-login").style.display="none";
}
// --- CÓDIGO PARA O MENU HAMBÚRGUER ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Verifica se os elementos existem antes de adicionar o listener
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Adiciona ou remove a classe 'active' no menu de navegação
            mainNav.classList.toggle('active');
        });
    }

    // Opcional: Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
});


// --- SEU CÓDIGO EXISTENTE DO CARRINHO, MODAIS, ETC, DEVE FICAR AQUI EMBAIXO ---

// Exemplo:
// const addCartButtons = document.querySelectorAll('.add-cart');
// ... resto do seu código ...