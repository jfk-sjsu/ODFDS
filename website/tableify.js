function tableify(text, target) {
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
