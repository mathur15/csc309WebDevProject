var tabs = [$("#home-tab"), $("#about-tab"), $("#search-tab")];
var content = [$(".cont-home"), $(".cont-about"), $(".cont-search")];

function clickHome(){
	clicktTab(tabs[0], content[0]);
}

function clickAbout(){
	clicktTab(tabs[1], content[1]);
}

function clickSearch(){
	clicktTab(tabs[2], content[2]);
}

function clicktTab(toggleObj, showObj) {
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].removeClass("active");
		tabs[i].css("pointer-events", "all");
	}
	for (var i = 0; i < content.length; i++) {
		content[i].hide();
	}
	// Show and activate respecitve objects
	toggleObj.toggleClass("active");
	toggleObj.css("pointer-events", "none");
	showObj.show();

}
