//this is for restraunt , in this part , they can change their menu 
// they can see their menu
// they can see their sale amount
//(if they know sale amout, it can help them to perpare their meat and vegetable)



//this is simple menu and simple sale amout database
// first part is name of food, second part is price/ sale amount of food

let menuMap = new Map([['buger',10],['noodle',9]]);
let amountMap = new Map([['buger',12],['noodle',22]]);



//list food name and price

function food(name,price)
{
    name = key;
    price = value;
}


// click button you can see the menu

function viewMenu()
{ 
    let text='';
    
    for(entry of menuMap)
    {
        text += (entry +'\n');
    }
    
    document.getElementById('demo').innerHTML = text;
    
}


//add menu


 function addMenu(){
    let newName= prompt('name');
    let newPrice=prompt('price');
    menuMap.set(newName,newPrice);
    
};

//delete menu


function deleteMenu()
{
    menuMap.delete(prompt('name'));
}

// list name and amout
function Order([name,amount])
{
   key=name;
   value=amount;

}


// sort food by their amount
function sort()
{
    let map = new Map([...amountMap.entries()].sort((a, b) => b[1] - a[1]));
    let text='';
    
    for(entry of amountMap)
    {
        text += (entry +'\n');
    }
    
    document.getElementById('demo').innerHTML = text;
    
}
sort();

let order= new Order([['k',2]['q',1]]);
function saleAmount()
{
    for(let i=0;i<order.length;i++)
    {
        if(amountMap.has(order[i].key))
        {
            order[i].key.value++;
        }

    }

    
}






