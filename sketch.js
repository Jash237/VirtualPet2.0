var dog,happyDog;
var database;
var foodS,foodStock;
var lastFed,fedTime,feed,addFood;
var FoodObj;

function preload()
{
  happyDog = loadImage(images/dogImg.png);
  sadDog = loadImage(images/dogImg1.png);
}

function setup() {
	createCanvas(100,400);
  database  =firebase.database();

  foodObj = new Food();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sad/Dog);
  dog.scale = 0.5;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfoodS);
}


function draw() {  
background(46,139,87);

FoodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data)
{
  lastFed = data.val;
})

fill("green");
textSize(15);

if(lastFed >= 12)
{
  text("Last Feed : " + lastFed % 12 + "PM",350,30);
}
else if(lastFed = 0)
{
  text("lastFeed : 12AM",350,30);
}
else
{
  text("Last Feed : " + lastFed + "AM",350,30);
}

 drawSprites();

if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(happyDog)
}

  function readStock(data)
  {
    foodS = data.val();
  }
  function feedDog()
  {
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food : FoodObj.getFoodStock(),
      FeedTime : hour()
    })
  }

  function addFood()
  {
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }

  function writeStock(x)
  {
    if(x <= 0)
    {
      x=0;
    }
    else
    {
      x = x-1
    }

    database.ref('/').update({Food:x})
  }
}



