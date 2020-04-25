let order = new Map([['buger',10],['noodle',9]]);



function popUpYes()
{
    let text='';
    
    for(entry of order)
    {
        text += (entry +'\n');
    }
    
    document.getElementById('demo').innerHTML = text;


}

function popUpNo()
{
    alert('we will find another order for you');

}







//this is html page 

<script src="popUp.js"></script>
<button onclick="popUpYes()">accept </button>
<p id="demo"></p>
<button onclick="popUpNo()">find another</button>
