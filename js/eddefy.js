jsPlumb.bind("ready", function() {

	// chrome fix.
	document.onselectstart = function () { return false; };

    // render mode
	var resetRenderMode = function(desiredMode) {
		var newMode = jsPlumb.setRenderMode(desiredMode);
		$(".rmode").removeClass("selected");
		$(".rmode[mode='" + newMode + "']").addClass("selected");

		$(".rmode[mode='canvas']").attr("disabled", !jsPlumb.isCanvasAvailable());
		$(".rmode[mode='svg']").attr("disabled", !jsPlumb.isSVGAvailable());
		$(".rmode[mode='vml']").attr("disabled", !jsPlumb.isVMLAvailable());

		jsPlumbDemo.init();
	};

	$(".rmode").bind("click", function() {
		var desiredMode = $(this).attr("mode");
		if (jsPlumbDemo.reset) jsPlumbDemo.reset();
		jsPlumb.reset();
		resetRenderMode(desiredMode);
	});

	resetRenderMode(jsPlumb.SVG);

});

$(function() {
  var ps = $("#pathSelector");
  ps.empty();
	$.each(knownPaths, function(pathNum, pathInfo) {
	  ps.append($E({tag:"option", value:"data/" + pathInfo.fname + ".js", children: [ pathInfo.label ]}));
	});

	ps.change(function() {
	  console.log("changed to: " + $(this).val());

	  $.getJSON($(this).val(), function(data) {
		  console.log("zamalama");
		  console.log("zap! " + data[2]);
			pathAs2D = jsPlumbDemo.flatArrayTo2D(data);
			jsPlumbDemo.renderPath(pathAs2D);
		});
	});

	ps.selectedIndex = 1;
	ps.change(knownPaths[0].value);
	ps.change();
});
