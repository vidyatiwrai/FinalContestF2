window.addEventListener('load', handleRestaurantTasks);

let foodItemContainer = document.getElementsByClassName("foodItems")[0];

async function getMenu() {
  const endpoint = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    showMenu(data);
    return data;
  } catch (error) {
    console.log('Not able to fetch data', error);
  }
}

function showMenu(menu) {
  console.log('Menu:', menu);
  for (let item of menu) {
    foodItemContainer.innerHTML += `
      <div class="items">
          <div class="image">
              <img src=${item.imgSrc} alt=${item.name}>
          </div>
          <h4 class="title">${item.name}</h4>
          <p class="price">${item.price}$</p>
      </div>
    `;
  }
}

function takeOrder(menu) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const selectedItems = getRandomItems(menu, 3);
      resolve(selectedItems);
    }, 2500);
  });
}

function getRandomItems(menu, count) {
  const randomItems = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * menu.length);
    randomItems.push(menu[randomIndex]);
  }
  return randomItems;
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  console.log('Thank you for eating with us today!');
}

async function handleRestaurantTasks() {
  try {
    const menu = await getMenu();
    const order = await takeOrder(menu);
    console.log('Order:', order);
    const orderStatus = await orderPrep();
    console.log('Order Status:', orderStatus);
    const paymentStatus = await payOrder();
    console.log('Payment Status:', paymentStatus);
    thankyouFnc();
  } catch (error) {
    console.log('Error:', error);
  }
}