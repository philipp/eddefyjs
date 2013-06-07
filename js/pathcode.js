;(function() {

  isMouseDown = false
  $('body').mousedown(function() {
    isMouseDown = true;
  }).mouseup(function() {
    isMouseDown = false;
  });

	dragSourceLeft = null;
	dragSourceTop = null;

	var initialItems = [];
	function SortByOrders(a, b){
		return ((a.orderA < b.orderA) ? -1 : ((a.orderA > b.orderA) ? 1 : ((a.orderB < b.orderB) ? -1 : ((a.orderB > b.orderB) ? 1 : 0))));
	}

	window.jsPlumbDemo = {

		pathAs2D : null,
		flatArrayTo2D : function(flatArray) {
			flatArray.sort(SortByOrders);
			var items2d = [];
			var prevOrderA = -1;
			var rowNum = -1;
			$.each(flatArray, function(i, ii) {
				if (prevOrderA != ii.orderA) {
					prevOrderA = ii.orderA;
					rowNum++;
				}
				var r = items2d[rowNum];
				if (r == null) {
					r = [];
				}
				ii.rowNum = rowNum; // keep track of what row each one is in
				r.push(ii);
				items2d[rowNum] = r;
			});
			return items2d;
		},

		moveItemToRow : function(item, rn) {
			if (Math.floor(rn + 0.1) == Math.floor(rn + 0.6)) {
				var newrownum = Math.round(rn);
				// add to an existing row
				if (pathAs2D[item.rowNum].length == 1) {
					pathAs2D[newrownum].push(item);
					pathAs2D.splice(item.rowNum, 1);
					for (var i = item.rowNum; i < pathAs2D.length; i++) {
						$.each(pathAs2D[i], function(colNum, col) {
							col.rowNum -= 1;
						});
					}
					item.rowNum = newrownum;
				}
			} else {
			}
		},

		renderPath : function(items2d) {
			var color = "gray";

			jsPlumb.importDefaults({
				Connector : [ "Bezier", { curviness:1 } ],
				DragOptions : { cursor: "pointer", zIndex:2000 },
				PaintStyle : { strokeStyle:color, lineWidth:2 },
				EndpointStyle : { radius:1, fillStyle:color },
				HoverPaintStyle : {strokeStyle:"#ec9f2e" },
				EndpointHoverStyle : {fillStyle:"#ec9f2e" },
				Anchors :  [ "BottomCenter", "TopCenter" ]
			});

			// declare some common values:
			var arrowCommon = { foldback:0.7, fillStyle:color, width:14 },
				// use three-arg spec to create two different arrows with the common values:
				overlays = [
					[ "Arrow", { location:0.5 }, arrowCommon ],
//					[ "Arrow", { location:0.3, direction:-1 }, arrowCommon ]
				];

			var mainContainer = document.querySelector('#main');
			var detailContainer = document.querySelector('#detail');

			var totalWidth = 80;
			var rowHeight = 8;
			var boxWidth = 24;
			var prevRow = -1;
			var vOffset = 1;
			var hOffset = 1 - boxWidth;
			$.each(items2d, function(rowNum, row) {
				var rowTop = vOffset + rowHeight * rowNum + "em";
				var colWidth = totalWidth / (row.length + 1);

				$.each(row, function(colNum, col) {
console.log(rowNum + ":" + colNum + " -- " + col.rowNum);
console.log(col);
					var newItem = jsPlumbDemo.makeItem(col);

					mainContainer.appendChild(newItem);
					newItem.style.top = rowTop;
					newItem.style.left = hOffset + colWidth * (colNum + 1) + "em";
				});
				if (prevRow != -1) {
					// if we're staying even or spreading out
					if (prevRow.length <= row.length) {
						var i = 0;
						// one-for-one for the initial batch
						for (; i < prevRow.length; i++) {
							jsPlumb.connect({source:"window"+prevRow[i].id, target:"window"+row[i].id, overlays:overlays, detachable:true, reattach:true});
						}
						// and connect the last one to all the rest if there are any
						for (; i < row.length; i++) {
							jsPlumb.connect({source:"window"+prevRow[prevRow.length - 1].id, target:"window"+row[i].id, overlays:overlays, detachable:true, reattach:true});
						}
					} else { // we're narrowing down
						var i = 0;
						// one-for-one for the initial batch
						for (; i < row.length; i++) {
							jsPlumb.connect({source:"window"+prevRow[i].id, target:"window"+row[i].id, overlays:overlays, detachable:true, reattach:true});
						}
						// and connect all the rest to the last one
						for (; i < prevRow.length; i++) {
							jsPlumb.connect({source:"window"+prevRow[i].id, target:"window"+row[row.length - 1].id, overlays:overlays, detachable:true, reattach:true});
						}
					}
				}

				prevRow = row;
			});

			gridXSnap = 160;
			gridYSnap = 50;
			jsPlumb.draggable(jsPlumb.getSelector(".window"), {
				grid: [gridXSnap, gridYSnap], opacity: "0.5",
				start: function(e, ui) {
					dragSourceLeft = ui.offset.left;
					dragSourceTop = ui.offset.top;
				},
				stop: function(e, ui) {
					var changeL = Math.round(dragSourceLeft - ui.offset.left);
					var changeT = Math.round(dragSourceTop - ui.offset.top);
					console.log("Left: " + dragSourceLeft + " -> " + ui.offset.left + " = " + changeL);
					console.log("Top: " + dragSourceTop + " -> " + ui.offset.top + " = " + changeT);

					var draggedItem = $(e.target).data("dataItem");
					var sourceRowNum = draggedItem.rowNum;
					var sourceRow = pathAs2D[sourceRowNum];

					switch(changeT)
					{
					case 1:
						if (sourceRow.length > 1) {
							jsPlumbDemo.moveItemToRow(draggedItem, sourceRowNum - 0.5);
						}
						break;
					case 0:
						break; // nothing at all, it didn't move up or down
					case -1:
						if (sourceRow.length > 1) {
							jsPlumbDemo.moveItemToRow(draggedItem, sourceRowNum + 0.5);
						}
						break;
					default:
						jsPlumbDemo.moveItemToRow(draggedItem, sourceRowNum - changeT / 2.0 + 0.5);
						break;
					}

//					$("#main window").remove();
					$("#main").empty();
					jsPlumbDemo.renderPath(pathAs2D);
				}});

			jsPlumb.getSelector(".window").watch('left,top', function(){
				$( "#sidebar" ).text( "left: " + $(this).css("left") + " top: " + $(this).css("top") );
			});

			jsPlumb.getSelector(".window").mouseenter(function(e){
        if(isMouseDown) return;

				var deets = $($E({tag:"div", id:"detail",
													children:[ {tag:"h1",  children: [ $(e.target).data("dataItem").title ]},
																		 {tag:"div", children: [ $(e.target).data("dataItem").description ]}
																	 ]
												 }));
				$("#detail").replaceWith(deets);
				deets.css("top", $(this).offset().top + $(this).height());
				deets.show();

				deets.mouseleave(function(){
					$(this).hide();
				});

			}).mousedown(function(){
				$("#detail").hide();
			});
		},

		init : function() {
			pathAs2D = jsPlumbDemo.flatArrayTo2D(initialItems);
			jsPlumbDemo.renderPath(pathAs2D);
		},

		makeItem : function(dataItem) {
			var newItem = $E({tag:'div', class:'window', id:'window'+dataItem.id, title:dataItem.description,
												children: [
//													{tag:"h2", class:'handle'},
													{tag:"img", src:'icons/icons-'+dataItem.type+'-sm.png'},
													{tag:'a', target:'_blank', href:dataItem.url, children:[ dataItem.title ]},
//													{tag:"span", class:'edit'},
												]});

			addEvent(newItem, 'dragover', cancel);
			addEvent(newItem, 'dragenter', cancel);

			addEvent(newItem, 'drop', function (e) {
				if (e.preventDefault) e.preventDefault(); // stops the browser from redirecting off to the text.
				newItem.innerHTML = e.dataTransfer.getData('Text');

				return false;
			});

			$(newItem).data("dataItem", dataItem);
			return newItem;
		}

	};

})();
