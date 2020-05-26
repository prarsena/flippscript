// the stop and shop exception, multiple flyers. 

const url = "https://backflipp.wishabi.com/flipp/items/search?postal_code=02472&q=StopShop";
const FLYER_ID = 2533482;

const conditions = ["Fillet", "Water", "Steak", "Chops", 
	"Beef", "Tofu", "Tuna", "LaCroix", "Kombucha", "Ben & Jerry's",
	"Fruit", "Ham", "Cheese", "Milk"];

function searchString() {
	document.getElementById("area").innerHTML = "fuck.e";
	let S = "Signature Kitchens Salmon or Cod Fillets";
	let check = S.includes("cod");
	if (check = true) {
		console.log("found" + S);
		//document.getElementById("area").innerHTML = S;
	}

	var items = ["Signature Kitchens Salmon or Cod Fillets", "Energizer Batteries",
		"Colgate Oral Care", "Salmon Fillets", "Pork Chops", "Pollock Fillets",
		"Strip Steak or Lamb Loin Chops", "Rib Steak bone-in or Boneless Strip Steak",
		"Pepperidge Farm Milanos"
	];
	var conditions = ["Fillet", "Oral", "Steak", "Chops"];

	for (let i in items) {
		var test = conditions.some(el => items[i].includes(el));
		if (test == true) {
			// two ways of doing it: 
			//var li = document.createElement('li');
			//li.innerHTML = items[i];
			//document.body.appendChild(li);

			var li = document.createElement('li');
			var itemnode = document.createTextNode(items[i])
			li.appendChild(itemnode);
			document.getElementById("area2").appendChild(li);
		} else {
			console.log("not good");
		}
	}

}

function getSuperMarketData() {
	fetch(url)
		.then(res => res.json())
		.then(function (data) {
			let storeinfo = data.merchants;
			var title = document.createElement('h1');
			title.innerHTML = storeinfo[0].name + "<br> <img src=" + storeinfo[0].logo_url + ">";
			document.body.appendChild(title)

			let iteminfo = data.items;
			console.log(iteminfo);
			for (var i = 0; i < iteminfo.length; i++) {
				let
					flyer_id = iteminfo[i].flyer_id,
					preprice = iteminfo[i].pre_price_text,
					postprice = iteminfo[i].post_price_text,
					current_price = iteminfo[i].current_price,
					sale_story = iteminfo[i].sale_story,

					itemname = i + "--" + iteminfo[i].name + " <br> "
					thumbnail = "<img src=" + iteminfo[i].clipping_image_url + "> <br>"
					price = preprice + current_price + postprice + " <br> ",
					sale_dates = "Sale dates: " + iteminfo[i].valid_from.substr(0, 10) + " to " + iteminfo[i].valid_to.substr(0, 10) + "<br><br>";

				if (flyer_id == FLYER_ID) {
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

					/* return all items 
					var li = document.createElement('li');
					li.innerHTML = itemname + thumbnail + price;
					document.body.appendChild(li);
					*/
					
					// Check conditions before returning items
					check = conditions.some(el => iteminfo[i].name.includes(el));
					if (check == true) {
						//console.log(itemname);
						var li = document.createElement('li');
						li.innerHTML = itemname + thumbnail + price + sale_dates;
						document.body.appendChild(li);
					} else {
						console.log("product " + iteminfo[i].name + " is not interesting");
					}
					

				} else {
					console.log("out of date flyer for " + iteminfo[i].name + " at " + preprice + current_price + postprice);
				}
			}
		});
}

getSuperMarketData()
//searchString();