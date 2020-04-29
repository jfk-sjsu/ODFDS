function tableify(text, target) { 
	var json = JSON.parse(text); 
	json.foreach(mkrow); 
	function mkrow(item,index) { 
		target.innerHTML = item; 
	}
} 

