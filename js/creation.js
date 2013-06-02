/**
 * http://www.arantius.com/article/dollar+e
 *
 * Available under an MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @param {Object} data The data representing the element to create
 * @return {Element} The element created.
 */
function $E(data) {
	var el;
	if ('string'==typeof data) {
		el=document.createTextNode(data);
	} else {
		//create the element
		el=document.createElement(data.tag);

		//append the children
		if ('undefined'!=typeof data.children) {
			if ('string'==typeof data.children ||
				'undefined'==typeof data.children.length
			) {
				//strings and single elements
				el.appendChild($E(data.children));
			} else {
				//arrays of elements
				for (var i=0, child=null; 'undefined'!=typeof (child=data.children[i]); i++) {
					el.appendChild($E(child));
				}
			}
		}

		//any other data is attributes
		for (var attr in data) {
			if ('tag'==attr || 'children'==attr) continue;
//			el[attr]=data[attr];
			el.setAttribute(attr, data[attr]);
		}
	}

	return el;
}

function mkJsLink(inside, onClick) {
	var link = $E({tag:'a', href:"#", children:[ inside ]});
	link.addEventListener('click', onClick, false);

	return link;
}
