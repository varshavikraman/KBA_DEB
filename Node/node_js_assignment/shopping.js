const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cart = new Map();

function addProduct(id, name, price, quantity) {
  if (cart.has(id)) {
    console.log('Product with this ID already exists.');
  } else {
    cart.set(id, { name, price, quantity });
    console.log('Product added to cart.');
  }
}

function updateProductQuantity(id, quantity) {
  if (cart.has(id)) {
    const product = cart.get(id);
    product.quantity = quantity;
    console.log(`Quantity updated for product: ${product.name}`);
  } else {
    console.log('Product not found in the cart.');
  }
}

function removeProduct(id) {
  if (cart.delete(id)) {
    console.log('Product removed from cart.');
  } else {
    console.log('Invalid product ID.');
  }
}

function viewCart() {
  if (cart.size === 0) {
    console.log('Cart is empty.');
    return;
  }
  let total = 0;
  console.log('Cart Details:');
  cart.forEach((product, id) => {
    const productTotal = product.price * product.quantity;
    total += productTotal;
    console.log(`ID: ${id}, Name: ${product.name}, Price: Rs${product.price}, Quantity: ${product.quantity}, Subtotal: Rs${productTotal}`);
  });
  if (total > 250) {
    const discount = total * 0.02;
    total -= discount;
    console.log(`Discount applied: $${discount.toFixed(2)}`);
  }
  console.log(`Total Price: $${total.toFixed(2)}`);
}

function clearCart() {
  cart.clear();
  console.log('Cart cleared.');
}

function showMenu() {
  console.log('\nShopping Cart Management System');
  console.log('1. Add Product to Cart');
  console.log('2. Update Product Quantity');
  console.log('3. Remove Product by ID');
  console.log('4. View Cart Details');
  console.log('5. Clear the Cart');
  console.log('6. Exit');
  rl.question('Select an option: ', handleUserInput);
}

function handleUserInput(option) {
  switch (option) {
    case '1':
      rl.question('Enter product ID: ', id => {
        rl.question('Enter product name: ', name => {
          rl.question('Enter product price: ', price => {
            rl.question('Enter product quantity: ', quantity => {
              addProduct(id, name, parseFloat(price), parseInt(quantity));
              showMenu();
            });
          });
        });
      });
      break;
    case '2':
      rl.question('Enter product ID to update: ', id => {
        rl.question('Enter new quantity: ', quantity => {
          updateProductQuantity(id, parseInt(quantity));
          showMenu();
        });
      });
      break;
    case '3':
      rl.question('Enter product ID to remove: ', id => {
        removeProduct(id);
        showMenu();
      });
      break;
    case '4':
      viewCart();
      showMenu();
      break;
    case '5':
      clearCart();
      showMenu();
      break;
    case '6':
      console.log('Exiting the program. Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      showMenu();
  }
}

showMenu();
