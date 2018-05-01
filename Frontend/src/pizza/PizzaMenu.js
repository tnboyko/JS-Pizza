/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var template = Templates.PizzaMenu_OneItem({pizza: pizza});
        var $node = $(template);

        $node.find(".buy-button-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-button-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    $(".pizza-count").text(list.length);

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        var con = pizza.content;
        for(var key in con) {
            if(key == filter)
                pizza_shown.push(pizza);
        }
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

$("#filter-button-all-pizza").click(function() {
    $(".food-name-title").text("Усі піци");
    $(".active").removeClass("active");
    $("#filter-button-all-pizza").addClass("active");
    showPizzaList(Pizza_List);
});

$("#filter-button-meat").click(function() {
    $(".food-name-title").text("М'ясні піци");
    $(".active").removeClass("active");
    $("#filter-button-meat").addClass("active");
    var filter = "meat";
    filterPizza(filter);
});

$("#filter-button-pineapples").click(function() {
    $(".food-name-title").text("Піци з ананасами");
    $(".active").removeClass("active");
    $("#filter-button-pineapples").addClass("active");
    var filter = "pineapples";
    filterPizza(filter);
});

$("#filter-button-mushrooms").click(function() {
    $(".food-name-title").text("Піци з грибами");
    $(".active").removeClass("active");
    $("#filter-button-mushrooms").addClass("active");
    var filter = "mushroom";
    filterPizza(filter);
});

$("#filter-button-ocean").click(function() {
    $(".food-name-title").text("Піци з морепродуктами");
    $(".active").removeClass("active");
    $("#filter-button-ocean").addClass("active");
    var filter = "ocean";
    filterPizza(filter);
});

$("#filter-button-tomato").click(function() {
    $(".food-name-title").text("Вегетаріанські піци");
    $(".active").removeClass("active");
    $("#filter-button-tomato").addClass("active");
    var filter = "tomato";
    filterPizza(filter);
});

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;