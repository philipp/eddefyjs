;(function() {

  isMouseDown = false
  $('body').mousedown(function() {
    isMouseDown = true;
  }).mouseup(function() {
    isMouseDown = false;
  });

	dragSourceLeft = null;
	dragSourceTop = null;

	var initialItemsFAKE = [
		{ id:"1", url:"http://www.google.com/", type:"text", title:"Google", description:"Google it yourself!", orderA:1, orderB:1 },
		{ id:"3", url:"http://www.yahoo.com/", type:"text", title:"Yahoo", description:"Yahoo! is vintage these days", orderA:3, orderB:1 },
		{ id:"31", url:"http://www.yahoo.com/", type:"text", title:"Yahoo", description:"Yahoo! is vintage these days", orderA:13, orderB:1 },
		{ id:"33", url:"http://www.yahoo.com/", type:"text", title:"Boogaloo", description:"Yahoo! is vintage these days", orderA:23, orderB:1 },
		{ id:"34", url:"http://www.yahoo.com/", type:"course", title:"Yahoo", description:"Yahoo! is vintage these days", orderA:5, orderB:1 },
		{ id:"44", url:"http://www.cnn.com/", type:"text", title:"CNN", description:"CNN... just because I wanted another link", orderA:5, orderB:1 },
		{ id:"98", url:"http://www.espn2.com/", type:"text", title:"ESPN2", description:"ESPN2... Because it IS a sibling", orderA:2, orderB:2 },
		{ id:"14", url:"http://www.espn.com/", type:"text", title:"ESPN", description:"ESPN... Because it has a sibling", orderA:2, orderB:1 },
		{ id:"21", url:"#", type:"text", title:"READ ME!", description:"Just read this, and move on", orderA:4, orderB:1 }
	];

	var initialItemsGUITAR = [
{ id:"guitar-select", orderA:1, orderB:1, url:"http://www.youtube.com/watch?v=BjfLZGT8bmI", tags:"guitar selection", title:"Absolute beginners how to choose a guitar", type:"video", description:"Different types of guitars, how they sound, what kind of music are they good for." },
{ id:"guitar-intro", orderA:1, orderB:2, url:"https://www.coursera.org/course/guitar?from_restricted_preview=1&course_id=970244&r=https%3A%2F%2Fclass.coursera.org%2Fguitar-001%2Fauth%2Fauth_redirector%3Ftype%3Dlogin%26subtype%3Dnormal%26visiting%3Dhttps%253A%252F%252Fclass.coursera.org%252Fguitar-001%252Flecture%252F5", tags:"MOOC, guitar", title:"Introduction to Guitar", type:"course", description:"A course that covers all the differen introductory guitar information. Only runs at certain times. If you take this course, only do steps 7 and 9 for practice." },
{ id:"guitar-parts", orderA:2, orderB:1, url:"http://www.magnoliaguitar.com/wp-content/uploads/2010/07/Guitar-Diagram.png", tags:"guitar", title:"Acoustic and Electric Guitar Parts", type:"image", description:"image showing the different parts of electric and acoustic guitars" },
{ id:"guitar-tune", orderA:3, orderB:1, url:"http://www.howtotuneaguitar.org/", tags:"tuning widget, key selection, guitars", title:"How to tune a guitar", type:"game", description:"A tuning app with a varitey of keys to tune in, and explanations of uses for that key." },
{ id:"guitar-strum", orderA:4, orderB:1, url:"http://www.youtube.com/watch?v=JAnIV0tMtrU", tags:"picks, strumming", title:"Basic Strumming for Guitar", type:"video", description:"An exellent tutorial on how to hold your pick, and strumming with different beats. Pause after each section and practice that strumming technique before you move on. " },
{ id:"guitar-frets", orderA:5, orderB:1, url:"http://fingerstofrets.com/img/righty-charts/A7v4.png", tags:"guitar", title:"Fingers to Frets", type:"image", description:"image showing how the finger numbering is used for chords" },
{ id:"guitar-chords", orderA:6, orderB:1, url:"http://www.freeguitarvideos.com/Images/guitar-chords-chart.jpg", tags:"guitar, guitar chords", title:"Basic Guitar Chords", type:"image", description:"Standard chords and hand positions" },
{ id:"guitar-tabs", orderA:7, orderB:1, url:"http://www.heartwoodguitar.com/chords/", tags:"Guitar chords, strumming", title:"Free Guitar Chords, Tabs, Lyrics, etc.", type:"text", description:"Selections of songs to do simple strumming practices to. Select a couple favorites, go for the ones with S so you can watch a video if you get stuck. " },
{ id:"guitar-fingerstyle", orderA:8, orderB:1, url:"http://www.youtube.com/watch?v=8UU4yMkDdBw", tags:"guitar, fingerstyle", title:"Ultimate Beginner Fingerstyle Lesson", type:"video", description:"Simple exercises to learn basic fingerstyle techniques and tips. Follow along on your guitar, repeat till you have it!" },
{ id:"guitar-rocksmith", orderA:9, orderB:1, url:"http://rocksmith.ubi.com/rocksmith/en-us/home/index.aspx", tags:"game, guitar", title:"Rocksmith Authentic Guitar Game", type:"game", description:"If you want to consolidate your learning, and have some fun, give this a try." }
	];
	var initialItemsBIZ = [
{ id:"bizlegal-structure", orderA:1, orderB:1, url:"http://www.sba.gov/category/navigation-structure/starting-managing-business/starting-business/choose-your-business-stru", tags:"business, startup", title:"Choose Your Business Structure", type:"text", description:"deeper explanations and pros/cons of different business types" },
{ id:"bizlegal-type", orderA:2, orderB:1, url:"http://integratedbusinessguard.com/images/business-type-comparison-table.png", tags:"business, startup", title:"Business Type Comparison Chart", type:"image", description:"Chart for comparing the different aspects of types of businesses" },
{ id:"bizlegal-execsummary", orderA:3, orderB:1, url:"http://www.sba.gov/content/business-plan-executive-summary", tags:"business, executive summary", title:"Business Plan Executive Summary", type:"text", description:"What to include and how to frame your executive summary. Do this writing stuff BEFORE you legally start your business." },
{ id:"bizlegal-summary", orderA:4, orderB:1, url:"http://www.inc.com/guides/2010/08/how-to-write-a-summary-business-plan.html", tags:"business, buisness plan", title:"How to Write a Summary Business Plan", type:"text", description:"A succinct report on different points to cover in your business plan" },
{ id:"bizlegal-register", orderA:5, orderB:1, url:"http://www.sba.gov/content/register-with-state-agencies", tags:"business, startup", title:"Register With State Agencies", type:"text", description:"Has the full selections of state links for the forms to legally create your business, with notes on procedure, and state and franchise tax amounts and forms. " },
{ id:"bizlegal-ein", orderA:6, orderB:1, url:"http://www.ein-gov.us/index.php", tags:"business, IRS resource", title:"Govservices EIN application", type:"text", description:"IRS official EIN number application" },
{ id:"bizlegal-taxes", orderA:7, orderB:1, url:"http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/Business-Taxes", tags:"Business, IRS resources", title:"Business Taxes", type:"text", description:"IRS list and form links for the different federal businesses taxes (remember there are state taxes too)" },
{ id:"bizlegal-fileelec", orderA:7, orderB:2, url:"http://www.irsvideos.gov/SmallBusinessTaxpayer/virtualworkshop/Lesson3", tags:"Business, IRS resources", title:"How to file and pay your taxes electronically", type:"course", description:"A video based workshop on what and how to file your business taxes" },
{ id:"bizlegal-taxcalendar", orderA:8, orderB:1, url:"http://www.tax.gov/calendar/", tags:"Business taxes, IRS resources", title:"Business Tax Calender", type:"text", description:"A monthly calender of dates for various tax submissions" },
{ id:"bizlegal-statetax", orderA:9, orderB:1, url:"http://www.sba.gov/content/learn-about-your-state-and-local-tax-obligations", tags:"Business, taxes", title:"Determine Your State Tax Obligations", type:"text", description:"Find your state tax requirements, forms, worker's comp, and unemployment" },
{ id:"bizlegal-sba", orderA:10, orderB:1, url:"http://www.sba.gov/local-assistance", tags:"Business, startup", title:"Local Small Business Assistance", type:"text", description:"Find free consulting resources in you area for different business aspects" },
{ id:"bizlegal-taxworkshop", orderA:10, orderB:2, url:"http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/Small-Business-Tax-Workshops-and--Webinars", tags:"Business, startup", title:"Small Business Tax Workshops and Webinars", type:"event", description:"Find workshops in your state, many free, to work out problems and get live help." }
	];

//	var initialItems = initialItemsGUITAR;

	function SortByOrders(a, b){
		return ((a.orderA < b.orderA) ? -1 : ((a.orderA > b.orderA) ? 1 : ((a.orderB < b.orderB) ? -1 : ((a.orderB > b.orderB) ? 1 : 0))));
	}

	window.jsPlumbDemo = {

		pathAs2D : null,
		flatArrayTo2D : function(flatArray) {
			initialItems.sort(SortByOrders);
			var items2d = [];
			var prevOrderA = -1;
			var rowNum = -1;
			$.each(initialItems, function(i, ii) {
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

					$("#main window").remove();
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
