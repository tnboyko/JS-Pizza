/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".orders-list");

//Видалити всі піци з кошика
$(".clear-orders-list").click(function() {
    Cart.length = 0;
    updateCart();
});

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    for(var i = 0; i < Cart.length; i++) {
        if(Cart[i] == cart_item) {
            Cart.splice(i,1);
            break;
        }
    }
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var template = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(template);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            if(cart_item.quantity > 1) {
                cart_item.quantity -= 1;
            } else {
                for(var i = 0; i < Cart.length; i++) {
                    if(Cart[i] == cart_item) {
                        Cart.splice(i,1);
                        break;
                    }
                }
            }
            updateCart();
        });

        $node.find(".count-clear").click(function(){
            removeFromCart(cart_item);
            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    $(".orders-counter-span").text(Cart.length);
    $(".sum-total").text(function() {
        var sum = 0;
        Cart.forEach(function(order) {
            (order.size == PizzaSize.Small)? sum = sum + order.pizza.small_size.price * order.quantity: sum = sum + order.pizza.big_size.price * order.quantity;
        })
        return sum;
    });

    Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;