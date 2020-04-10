//this is for drivers


//this is a simple dataBase
let infoObj=[
    {
        name:'A',

        distance :1,
        getOrder:false
        
    
    },
    {
        name:'B',
        
        distance :20,
        getOrder:false
        
    
    },
    {
        name:'C',
       
        distance:3,
        getOrder:true
        
    
    }

]



//if driver dilivered food, change his state to flase
function diliverd(a)
{
    a.getOrder= false;

}
//if driver not dilivery  change his state to true
function beginDiliver(a)
{
    a.getOrder= true;
}


// sort their distance 
function compare(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;     
    }
}
var sortObj = infoObj.sort(compare("distance"));
console.log(sortObj);

// the ouput should be 

//0: {name: "A", distance: 1, getOrder: false}
//1: {name: "C", distance: 3, getOrder: true}
//2: {name: "B", distance: 20, getOrder: false}
//length: 3
//__proto__: Array(0)












