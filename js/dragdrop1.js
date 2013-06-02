function cancel(e) {
  if (e.preventDefault) e.preventDefault(); // required by FF + Safari
  e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
  return false; // required by IE
}

function entities(s) {
  var e = {
    '"' : '&quot;',
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;'
  };
  return s.replace(/["&<>]/g, function (m) {
    return e[m];
  });
}

if (4>6) {

//var getDataType = document.querySelector('#text');
var drop = document.querySelector('#window3');

// Tells the browser that we *can* drop on this target
addEvent(drop, 'dragover', cancel);
addEvent(drop, 'dragenter', cancel);

addEvent(drop, 'drop', function (e) {
  if (e.preventDefault) e.preventDefault(); // stops the browser from redirecting off to the text.

  // just rendering the text in to the list

  // clear out the original text
  drop.innerHTML = '<ul></ul>';
  
  var li = document.createElement('li');
  
  /** THIS IS THE MAGIC: we read from getData based on the content type - so it grabs the item matching that format **/
//  if (getDataType.checked == false && e.dataTransfer.types) {
//    li.innerHTML = '<ul>';
//    [].forEach.call(e.dataTransfer.types, function (type) {
//      li.innerHTML += '<li>' + entities(e.dataTransfer.getData(type) + ' (content-type: ' + type + ')') + '</li>';
//    });
//    li.innerHTML += '</ul>';
    
//  } else {
    // ... however, if we're IE, we don't have the .types property, so we'll just get the Text value
    li.innerHTML = e.dataTransfer.getData('Text');
//  }
  
  var ul = drop.querySelector('ul');

  if (ul.firstChild) {
    ul.insertBefore(li, ul.firstChild);
  } else {
    ul.appendChild(li);
  }
  
  return false;
});

}

