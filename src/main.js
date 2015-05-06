// phone app main.js file
var THEME = require('themes/sample/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var deviceURL = "";
var mode="main";
var view="center";
var saved=false;
var filled=false;
var auto=false;
var pfound=false;
var high=false;

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray', fill: 'white'});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'black', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var typeStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var smallTypeStyle = new Style({ color: 'white', font: '18px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var blackS = new Skin({fill:"black"});
var redS = new Skin({fill:"#ea9999"});
var yellowS = new Skin({fill: "#fbdd8d"});
var greenS = new Skin({fill:"#b6d7a7"});
var blueS = new Skin({fill:"#99B6BC"});
var purpleS = new Skin({fill:"#ae5dae"});
var borderS = new Skin({ borders: {left: 2, right: 2, top: 2, bottom: 2}, stroke: "white"})
var smLabelStyle = new Style( { font: "30px", color:"black" } );
var rlySmLabelStyle = new Style( { font: "bold 15px", color:"black", fill:"white" } );
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var whiteLabelStyle = new Style( { font: "bold 40px", color:"white" } );
var plusStyle = new Style( { font: "bold 50px", color:"black" } );
var whiteBorderSkin = new Skin({
  fill:"white", 
  borders:{left:5, right:5, top:5, bottom:5}, 
  stroke:"black"
});

var iconWidth = 50;
var iconHeight = 50;
var pictureWidth = 325;
var pictureHeight = 325;

var MainCon = Column.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteS, active: true, name: "column", 
	contents: [
		Line($, {
			left:0, right:0, top:0, bottom:0, height:75, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 105, right: 0, string: "BIRDSi", style: whiteLabelStyle})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: redS, name: "lineF",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url:"locicon.png"}),
				new aButton({title: "Fly Drone", action: "flyDrone"})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: yellowS, name: "lineC",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url:"globe.png"}),
				new aButton({title: "Set Path", action: "setPath"})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: blueS, name: "lineK",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url: "people.png"}),
				new aButton({title: "Find People", action: "findPeople"}),
			]
		}),
	]
}});

var leftValue = 25;
var setPathCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: yellowS, active: true, name: "setPathContainer",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Set Path", style: labelStyle}),
		new Line({left:0, right:0, top:80, bottom:450, skin: blackS}),
		new Picture({top: 30,left: 20, right: 20, width: pictureWidth, height: pictureHeight, url: "map.jpg", name: "mainMap"}),
		new Label({top: 277, left: 20, string: "From:", style: fieldStyle}),
		new Label({top: 326, left: 20, string: "To:", style: fieldStyle}),
		fromField, toField,
		new sButton({title: "start", left: 40, top: 420, width: 100, skin: greenS}),
		new sButton({title: "stop", right: 40, top: 420, width: 100, skin: redS}),
		//new Picture({left: currL, top: currT, width: 20, height: 20, url:"curr.png", name: "currxx"})
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var camH = 250;
var camW = 250;
var centerL = 85;
var centerB = 100;
var flyDroneCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: redS, active: true, name: "flyDroneContainer",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Fly Drone", style: labelStyle}),
		//new Label({top: 290, string: "Warning: You are still in autopilot mode.", style: rlySmLabelStyle}),
		//new Label({top: 310, string: "Switch back to manual?", style: rlySmLabelStyle}),
		new Line({left:0, right:0, top:80, bottom:450, skin: blackS}),
		// to be replaced with diff pic. perhaps change width and height
		new Picture({top: 70, width: camW, height: camH,
		url: "china/ccenter.png", name:"chinapic"}),
		// to replace sButtons with urlbuttons
		// possibly need an elevation control as well
		new moveButton({title:"forward", url: "up.png", left: centerL, bottom: centerB + 50, func: false}),
		new moveButton({title:"back", url: "down.png", left: centerL, bottom: centerB - 50, func: false}),
		new moveButton({title:"left", url: "left.png", left: centerL - 40, bottom: centerB, func: false}),
		new moveButton({title:"right", url: "right.png", left: centerL + 40, bottom: centerB, func: false}),
		
		//new iconButton({title: "Zin", url: "zoomin.png", right: 50, bottom: 180}),
		//new iconButton({title: "Zout", url: "zoomout.png", right: 100, bottom: 180}),
		
		new bigIconButton({title: "ascend", url:"ascendwhite.png", right: 25, bottom: centerB - 25 + 35, skin: greenS, func: false}),
		new bigIconButton({title: "descend", url:"descendwhite.png", right: 25, bottom: centerB - 25 - 35, skin: greenS, func: false}),
		
		
		//new sButton({title: "Fwd", left: 40, bottom: 80, width: 100, skin: greenS})
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var topLine = new Line({
			left:0, right:0, top:90, bottom:0, skin: redS, name: "top",
			contents: [
			new Picture({left:0, right:0, top:90, bottom:0, url: "person.png"}),
			],
}),

var listPeopleCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Find People", style: labelStyle}),
		new plusButton(),
		new Line({left:0, right:0, top:90, bottom:0, skin: redS}),
		new Line({left:0, right:0, top:190, bottom:0, skin: yellowS}),
		new Line({left:0, right:0, top:290, bottom:0, skin: redS}),
		new Line({left:0, right:0, top:390, bottom:0, skin: yellowS}),
		new Line({left:0, right:0, top:490, bottom:0, skin: redS}),
		new Line({left:0, right:0, top:590, bottom:0, skin: yellowS}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var listPeopleConFilled = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Find People", style: labelStyle}),
		new plusButton(),
		new Picture({left: 0, top: 90, url:"person.png"}),
		new Line({left:0, right:0, top:190, bottom:0, skin: yellowS}),
		new Line({left:0, right:0, top:290, bottom:0, skin: redS}),
		new Line({left:0, right:0, top:390, bottom:0, skin: yellowS}),
		new Line({left:0, right:0, top:490, bottom:0, skin: redS}),
		new Line({left:0, right:0, top:590, bottom:0, skin: yellowS}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});


var addPeopleCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Add Person", style: labelStyle}),
		new Line({left:0, right:0, top:80, skin: blackS}),
		descriptionField,
		new Line({top:130, height:230, width: 250, skin: whiteBorderSkin, name: "photo",
	      contents:[
	        new bigIconButton({title: "person photo", top: 0, left:0, right: 0, bottom:0, name: "missingPhoto",
	        				url: "tapload.jpg",
	        				func: function(content) {
	        					filled = true;
	        					content.picture.width = 325;
	        					content.picture.height = 205;
	        					content.picture.load("kid.jpg");
	        				}})
	      ]
	    }),
		new sButton({title: "Save", left: 40, top: 420, width: 250, skin: greenS}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content) {
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});


var aButton = BUTTONS.Button.template(function($) { return {
	left: 0, right: 0, height: 170,
	contents: [
		new Label({left:0, right:0, string: $.title, style: typeStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if($.action == "setPath"){
				application.remove(main);
				application.add(pathCon);
				mode = "path";
			}
			else if($.action == "flyDrone") {
				application.remove(main);
				application.add(flyCon);
				if (auto) {
					//flyCon.add();
				}
				mode = "fly";
			}
			else if($.action == "findPeople") {
				application.remove(main);
				if (saved) {
					application.add(listFilledCon);
				} else {
					application.add(listCon);
				}
				mode = "find";
			}
			else{
				trace($.title + " button pressed\n");
			}
		}},
	})
}});

var bButton = BUTTONS.Button.template(function($){ return{
	left: 15, top: 23,
	contents: [
		new Picture({width: 35, height: 35, url: "backarrow.png", name: "back"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			KEYBOARD.hide()
		    if (mode == "path") {
				application.remove(pathCon);
			}
			if (mode == "fly") {
				application.remove(flyCon);
			}
			if (mode == "find") {
				if (saved) {
					application.remove(listFilledCon);
				} else {
					application.remove(listCon);
				}
			}
			if (mode == "add") {
				application.remove(addCon);
				if (!saved) {
					filled = false;
					application.add(listCon);
				} else {
					application.add(listFilledCon);
				}
				mode = "find";
				return;
			}
			mode = "main";
			application.add(main);
		}}
	})
}});

var plusButton = BUTTONS.Button.template(function($){ return{
	right: 15, top: 23,
	contents: [
		new Picture({width: 35, height: 35, url: "plus.png", name: "plus"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		    if (mode == "find") {
		        if (saved) {
		        	application.remove(listFilledCon);
				} else {
					application.remove(listCon);
				}
				mode = "add";
				application.add(addCon);
			}
		}}
	})
}});

/*start / stop button*/
var sButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top : $.top, bottom: $.bottom, height: 50, width: $.width, skin:$.skin,
	contents: [
		new Label({height:30, string: $.title, style: smLabelStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			var pressed = $.title;
			if(pressed == "start"){
				pathCon.mainMap.url = "maparrows.jpg";
				content.invoke(new Message(deviceURL + "startPath", Message.TEXT));
				auto = true;
			} else if(pressed == "stop"){
				pathCon.mainMap.url = "map.jpg";
				content.invoke(new Message(deviceURL + "stopPath", Message.TEXT));
				auto = false;
			} else if (pressed == "Save") {
				application.remove(addCon);
				mode = "find";
				flyCon.chinapic.url = "china/ccenter.png";
				if (filled) {
					saved = true;
					application.add(listFilledCon);
				} else {
					application.add(listCon);
				}
				content.invoke(new Message(deviceURL + "search"), Message.JSON);
			}
		}}
	})
}});

//Template for button that's just an icon you click. Takes in url to icon and
//title for button.
var moveButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	contents: [
		new Picture({width: iconWidth, height: iconHeight, url: $.url, name: "picture"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if ($.func) {
				$.func(content);
			}
			if ($.title == "forward") {
			    if (view == "back") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cforward.png";
				    view = "forward";
				}
			}
			if ($.title == "back") {
			    if (view == "forward") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cback.png";
				    view = "back";
				}
			}
			if ($.title == "left") {
			    if (view == "right") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cleft.png";
				    view = "left";
				}
			}
			if ($.title == "right") {
			    if (view == "left") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cright.png";
				    view = "right";
				}
			}
			if ($.title == "ascend") {
			    if (view == "down") {
			    	
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cup.png";
				    view = "up";
				}
			}
			if ($.title == "descend") {
			    if (view == "up") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cdown.png";
				    view = "down";
				}
			}
			content.invoke(new Message(deviceURL + $.title), Message.JSON);
			trace($.title + " button pressed\n");
		}},
	})
}});

var bigIconButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	contents: [
		new Picture({width: iconWidth*2, height: iconHeight*2, url: $.url, name: "picture"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if ($.func) {
				$.func(content);
			}
			if ($.title == "ascend") {
			    if (view == "down") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cup.png";
				    view = "up";
				}
			}
			if ($.title == "descend") {
			    if (view == "up") {
			        flyCon.chinapic.url = "china/ccenter.png";
			        view = "center";
			    } else {
				    flyCon.chinapic.url = "china/cdown.png";
				    view = "down";
				}
			}
			content.invoke(new Message(deviceURL + $.title), Message.JSON);
			trace($.title + " button pressed\n");
		}},
	})
}});

var myField = Container.template(function($) { return { 
	top: $.top, width: $.width, left: $.left, right: $.right, height: $.height, skin: nameInputSkin, name: "myField", contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: "myScroller",
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
					editable: true, string: $.name, name: "myLabel",
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							data.name = label.string;
							label.container.hint.visible = ( data.name.length == 0 );
				 		}}
				 	}),
				 }),
				 Label($, {
	 			 	left:4, right:4, style:fieldStyle, string:$.hint, name:"hint"
				 })
			]
		})
	]
}});

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		trace("Found the device.\n");
		deviceURL = JSON.parse(message.requestText).url;	
	},
	onComplete: function(handler, message, text){
		trace("Response was: " + text + "\n");
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

Handler.bind("/updateCurr", Behavior({
	onInvoke: function(handler, message){
	    if (deviceURL != "") {
			handler.invoke(new Message(deviceURL + "getData"), Message.JSON);
		}
	},
	onComplete: function(content, message, json){
		if (json !== undefined) {
			pathCon.remove(currX);
			currX = new Picture({left: currL + json.x, top: currT - json.y, width: 20, height: 20, url:"curr.png"});
			pathCon.add(currX);
			if (json.z > 300) {
				updateFound("Warning, drone altitude too high. May disconnect.");
				pfound = false;
				high = true;
			} else {
				high = false;
				if (!pfound) {
					updateFound("");
				}	
			}
			if (!pfound && !high) {
				if(json.x > 70 && json.x < 75 && json.y > 70 && json.y < 75){
				//trace("Kid has been found!!");
				var pstring = "Person found at " + Math.round(json.x * 10)/10 + ", " + Math.round(json.y * 10)/10;
				updateFound(pstring);
				pfound = true;
				}
			}
			//pathCon.currxx.height = currT + json.y;
			//currX.width = currT - json.y;
		}
	}
}));

function updateFound(text) {
	personFoundFly.string = text;
	personFoundAdd.string = text;
	personFoundSet.string = text;
	personFoundList.string = text;
	personFoundListFilled.string = text;
	personFoundList.string = text;
	personFoundMain.string = text;
}

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("prototypedevice");
	},
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.forget("prototypedevice");
		application.shared = false;
	},
})

application.behavior = new ApplicationBehavior();

var currL = 20;
var currT = 245;

var fromField = new myField({ name: "", top: 270, width: 250, left: 100, right: 10, height: 44, hint: "Address" });
var toField = new myField({ name: "", top: 320, width: 250, left: 100, right: 10, height: 44, hint: "Address" });
var descriptionField = new myField({name: "", top: 80, width: 300, left: 10, right: 10, height: 44, hint: "Description"});

var currX = new Picture({left: currL, top: currT, width: 20, height: 20, url:"curr.png"}); 


var ptop = 62;
var pstr = " "
var psty = rlySmLabelStyle;
var personFoundMain = new Label({string: pstr, style: psty});
var personFoundFly = new Label({top: ptop, string: pstr, style: psty});
var personFoundSet = new Label({top: ptop, string: pstr, style: psty});
var personFoundList = new Label({top: ptop, string: pstr, style: psty});
var personFoundAdd = new Label({top: ptop, string: pstr, style: psty});
var personFoundListFilled = new Label({top: ptop, string: pstr, style: psty});

var main = new MainCon()
var pathCon = new setPathCon();
pathCon.add(currX);
//main.add(personFound);

var flyCon = new flyDroneCon();
var listCon = new listPeopleCon();
var listFilledCon = new listPeopleConFilled();
var addCon = new addPeopleCon();

main.add(personFoundMain);
flyCon.add(personFoundFly);
listCon.add(personFoundList);
listFilledCon.add(personFoundListFilled);
pathCon.add(personFoundSet);
addCon.add(personFoundAdd);

application.add(main);
