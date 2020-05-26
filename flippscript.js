//document.getElementById("demo").innerHTML = "Hello JavaScript!";

const ul = document.getElementById('list');
//const url = "https://backflipp.wishabi.com/flipp/items/search?postal_code=02472&q=StopShop";
//const FLYER_ID = 2516043;
const url = "https://backflipp.wishabi.com/flipp/items/search?postal_code=02472&q=starmarket";
const FLYER_ID = 2519457;

function getData(){ 
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
					itemname = i + "--" + iteminfo[i].name + " <br> ";
				
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
					
					let price = preprice + current_price + postprice + " <br><br> ",
						thumbnail = "<img src=" + iteminfo[i].clipping_image_url + "> <br>";
					
					var li = document.createElement('li'); 
					li.innerHTML = itemname + thumbnail + price;
					document.body.appendChild(li);
				} else {
					console.log("out of date flyer for " + iteminfo[i].name + " at " + preprice + current_price + postprice);
				}
			}
	});
}

function findSubStr(){
	var str = "Hello world, welcome to the universe.";
	var n = str.includes("world");
	if (n == true){
		//document.write(str);
		document.getElementById("demo").innerHTML = str;
	}
	//document.getElementById("demo").innerHTML = n;
}

//getData()