function tableify(text, target) {
	var scrpt = '<script>
  function reverse(elem) { 
  //	 alert("alert");
  	 elem.innerHTML = elem.innerHTML.split("").reverse().join("");//elem.innerHTML.reverse();
  }
  var ths = getElementByClassName('header');
//  Array.from(elements).forEach(function(element) {
 //     alert("blah");
//      element.addEventListener('click', reverse(this));
//    });
  
</script>'

	var ret = "<table id='tablify'><tr id='tablify'><th id='tablify'>";
	var json = JSON.parse(text);
	var header = json[0];
	var fields = [];
	for(var x in header) {
		fields.push(x);
		ret += x + "</th><th>"
	}
	ret = ret.substring(0, ret.length - 4);
	ret += "</tr></table>"

	json.forEach(mkrow);
	function mkrow(item,index) {
		ret = ret.replace("</table>", "<tr>");

		for(x in item) {
			ret += "<td>" + item[x] + "</td>";
		}
		ret += "</tr></table>";
		target.innerHTML = ret;
	}
}
