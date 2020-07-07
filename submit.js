//8 for backspace and 46 for delete button

var num_of_line = 0;
var maed = document.getElementById("maed");
var lnnum = document.getElementById("lnnum");

class customInput {
	constructor(data, inputType, ranges) {
		this.data = data;
		this.inputType = inputType;
		this.ranges = ranges;
	}
	getTargetRanges() {
		return this.ranges;
	}
	stopPropagation() {}
	preventDefault() {}
}

var defword_1 = "<div class='words' contenteditable='true' style='color: rgb(241, 28, 28);outline: none;display: inline;' id='";
var defword_2 = "'>";
var defword_3 = "</div>";
var words = [];

function create_node(id, str) {
	let tem = document.createElement("div");
	tem.id = id;
	tem.style.color = "rgb(241, 28, 28)";
	tem.style.display = "inline";
	tem.style.outline = "none";
	tem.contentEditable = "true";
	tem.innerHTML = str;
	return tem;
}

var temp_word = "";

let sel_obj = document.getSelection();
maed.addEventListener('beforeinput', beforeinput_listener);
maed.addEventListener('keydown', keydown_listener);
maed.innerHTML = defword_1 + "wrd1" + defword_2 + "" + defword_3;
let wrd1 = document.getElementById("wrd1");
wrd1.addEventListener('beforeinput', beforeinput_listener);
wrd1.addEventListener('keydown', keydown_listener);
words.push(wrd1);

function keydown_listener(event) {
	if (event.code == 9 || event.which == 9) { //do selection here
		event.preventDefault();
		event.stopPropagation();
		let st_nd = sel_obj.getRangeAt(0);
		console.log(st_nd);
		var evnt = new customInput("\t", "insertTab", [st_nd]);
		beforeinput_listener(evnt);
	}
}

function beforeinput_listener(event) {
	event.stopPropagation();
	event.preventDefault();
	let data = event.data;
	let ranges = event.getTargetRanges()[0];
	let current_element = document.getElementById(ranges.startContainer.id);
	if (ranges.startContainer.id == "maed")
		current_element = wrd1;
	if (current_element == null)
		current_element = ranges.startContainer.parentElement;
	let curr_wrd = search_words(current_element.id);
	let t_st = sel_obj.getRangeAt(0).startContainer.nodeValue;
	let t_no = sel_obj.getRangeAt(0).startOffset;
	if (data == " " || data == "\t") {
		let lent = "wrd" + (words.length + 1).toString();
		let place_text = "&nbsp;";
		if (data == "\t")
			place_text = "&nbsp;&nbsp;&nbsp;&nbsp";
		if (t_st != null) {
			
		} else {
			let temp_word = create_node(lent, place_text);
			maed.appendChild(temp_word);
			words.push(temp_word);
			sel_obj.collapse(temp_word, 1);
			temp_word.addEventListener('beforeinput', beforeinput_listener);
			temp_word.addEventListener('keydown', keydown_listener);
		}
	} else {
		if (t_st != null) {
			t_st = t_st.substring(0, t_no) + data + t_st.substring(t_no);
			current_element.innerHTML = t_st;
			let st_nd = current_element.childNodes[0];
			let t_range = document.createRange();
			t_range.setStart(st_nd, t_no + 1);
			t_range.setEnd(st_nd, t_no + 1);
			sel_obj.removeAllRanges();
			sel_obj.addRange(t_range);
		} else {
			current_element.textContent += data;
			sel_obj.collapse(current_element, 1);
		}
	}
	// } else {
	// 	console.log("Where I don't want it!");
	// 	if (data == " ") {} else {
	// 		wrd1.textContent += data;
	// 		sel_obj.collapse(wrd1, 1);
	// 	}
	// }
}


function search_words(str) {
	for (let i = 0; i < words.length; i++)
		if (words[i].id == str)
			return i;
	return -1;
}

// Scroll the numbering and editor at the same time
function select_scroll_1(e) {
	lnnum.scrollTop = maed.scrollTop;
}

maed.addEventListener('scroll', select_scroll_1, false);