const zipcode = '02472';
const urlbase = "https://backflipp.wishabi.com/flipp/items/search?postal_code="+zipcode+"&q=";
//const store = ["starmarket", "walmart", "target", "hanniford", "shaws", "aldi", "traderjoes"];
const store = ["stopandshop", "starmarket", "target", "shaws", "traderjoes"];
/*const conditions = ["Fillet", "Water", "Steak", "Chops",
	"Beef", "Tofu", "Tuna", "LaCroix", "Kombucha", "Ice Cream",
	"Fruit", "Salmon", "Cheese", "Beer", "Shrimp", "Cod", "Fish", "Tissue"
]; */

const conditions = ["Shrimp", "Rice", "Cod", "Fish", "Salmon", "Tuna", "Eggplant"];
//let conditions = ["Dessert", "Ice Cream", "Bacon"];
//let conditions = [];

function addProductToList() {
	let product = document.getElementById("product").value;
	console.log(product);
	document.getElementById("food_choices").append(product);
	conditions.push(product);
}

for (i in conditions) {
	let display_items = document.getElementById("food_choices");
	document.getElementById("food_choices").append(conditions[i] + " ");
}

for (i in store){
	getSuperMarketData(urlbase + store[i])
}

function getSuperMarketData(url) {
	fetch(url)
		.then(res => res.json())
		.then(function (data) {
            console.log(url);
            storename = url.split('=')[2];
            console.log(storename);
			let storeinfo = data.merchants;
            var div = document.createElement('div');
            div.setAttribute('class', 'col-sm');
            div.setAttribute('id', 'area'+storename)
			div.innerHTML = "<div class='big'>~~~" + storeinfo[0].name + "~~~</div> <br> <img src=" + storeinfo[0].logo_url + ">";
			document.getElementById('content_goes_here').appendChild(div)

			let iteminfo = data.items;
			console.log(iteminfo);
			for (var i = 0; i < iteminfo.length; i++) {
				let
					preprice = iteminfo[i].pre_price_text,
					postprice = iteminfo[i].post_price_text,
					current_price = iteminfo[i].current_price,
					sale_story = iteminfo[i].sale_story,

					itemname = iteminfo[i].name + " <br> ";
					thumbnail = "<img src=" + iteminfo[i].clipping_image_url + " width='200px' height='200px'> <br>",
					sale_dates = "Sale dates: " + iteminfo[i].valid_from.substr(0, 10) + " to " + iteminfo[i].valid_to.substr(0, 10) + "<br><br>";

				if (preprice == null) {
					preprice = "";
				} else {
					preprice = preprice + " for $ ";
				}
				if (postprice == null) {
					postprice = ""
				} else {
					postprice = " per " + postprice;
				}
				if (current_price == null) {
					current_price = sale_story;
				}

				let price = preprice + current_price + postprice + " <br>";

				check = conditions.some(el => iteminfo[i].name.includes(el));
				if (check == true) {
					var li = document.createElement('li');
					li.innerHTML = itemname + thumbnail + price + sale_dates;
					document.getElementById('area'+storename).appendChild(li);
				} else {
					//console.log(iteminfo[i].name + " is not interesting");
				}
			}
		})
};