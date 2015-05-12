// phone app main.js file
var THEME = require('themes/sample/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var deviceURL = "";
var mode="main";
var view="center";
var saved = [false, false]; // when true, we are finding someone.
var filled= [false, false];
var auto=false;
var pfound=false;
var high=false;
var desc="";
var desc1 = "";
var desc2="";
var person = 0;

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'black', fill: 'white'});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: 'black', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var typeStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var smallTypeStyle = new Style({ color: 'white', font: '18px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var blackS = new Skin({fill:"black"});
var redS = new Skin({fill:"#ea9999"});
var yellowS = new Skin({fill: "#fbdd8d"});
var greenS = new Skin({fill:"#85f298"});
var blueS = new Skin({fill:"#99B6BC"});
var blueS1 = new Skin({fill:"#88acb5"});
var blueS2 = new Skin({fill:"#7aa4b1"});
var blueS3 = new Skin({fill:"#6c9cad"});
var blueS4 = new Skin({fill:"#5e95a8"});
var blueS5 = new Skin({fill:"#508da3"});

var purpleS = new Skin({fill:"#ae5dae"});
var borderS = new Skin({ borders: {left: 2, right: 2, top: 2, bottom: 2}, stroke: "white"})
var smLabelStyle = new Style( { font: "30px", color:"black" } );
var smsmLabelStyle = new Style( { font: "25px", color:"black" } );
var rlySmLabelStyle = new Style( { font: "bold 15px", color:"black", fill:"white" } );
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var whiteLabelStyle = new Style( { font: "bold 40px", color:"white" } );
var whiteLabelStyle2 = new Style( { font: "bold 35px", color:"white" } );
var plusStyle = new Style( { font: "bold 50px", color:"black" } );

var bs = 3;
var whiteBorderSkin = new Skin({
  fill:"white", 
  borders:{left:bs, right:bs, top:bs, bottom:bs}, 
  stroke:"black"
});

var bw = 2;

var greenBorderSkin = new Skin({
  fill:"#b6d7a7", 
  borders:{left:bw, right:bw, top:bw, bottom:bw}, 
  stroke:"black"
});

var redBorderSkin = new Skin({
  fill:"#ea9999", 
  borders:{left:bw, right:bw, top:bw, bottom:bw}, 
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
			left:0, right:0, top:0, bottom:0, height:90, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 105, right: 0, string: "BIRDSi", style: whiteLabelStyle})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: redS, name: "lineF",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url:"locicon.png"}),
				new aButton({title: "FLY DRONE", action: "flyDrone"})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: yellowS, name: "lineC",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url:"globe.png"}),
				new aButton({title: "SET PATH", action: "setPath"})
			]
		}),
		Line($, {
			left:0, right:0, top:0, bottom:0, skin: blueS, name: "lineK",
			contents: [
				new Picture({left: leftValue, width: iconWidth, height: iconHeight, url: "people.png"}),
				new aButton({title: "FIND PEOPLE", action: "findPeople"}),
			]
		}),
	]
}});

var autoLabel = new Label({top: 470, string: "Drone Under Manual Control", style: smsmLabelStyle});

var leftValue = 25;
var setPathCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: yellowS, active: true, name: "setPathContainer",
	contents: [
	 	Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 80, top: 15, string: "SET PATH", style: whiteLabelStyle})
			]
		}),
		new bButton(),
		new Picture({top: 0,left: 20, right: 20, width: pictureWidth, height: pictureHeight, url: "map2.png", name: "mainMap"}),
		new Label({top: 277, left: 20, string: "FROM:", style: fieldStyle}),
		new Label({top: 326, left: 20, string: "TO:", style: fieldStyle}),
		fromField, toField,
		autoLabel,
		new sButton({title: "START", left: 30, top: 395, width: 120, skin: greenBorderSkin}),
		new sButton({title: "STOP", right: 30, top: 395, width: 120, skin: redBorderSkin}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var camH = 200;
var camW = 400;
var centerL = 70;
var centerB = 100;
var flyDroneCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: redS, active: true, name: "flyDroneContainer",
	contents: [
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 70, top: 15, string: "FLY DRONE", style: whiteLabelStyle})
			]
		}),
		new bButton(),
		new Picture({top: 90, width: camW, height: camH,
		url: "china/ccenter.png", name:"chinapic"}),
		new moveButton({title:"forward", url: "up.png", left: centerL, bottom: centerB + 50, func: false}),
		new moveButton({title:"back", url: "down.png", left: centerL, bottom: centerB - 50, func: false}),
		new moveButton({title:"left", url: "left.png", left: centerL - 40, bottom: centerB, func: false}),
		new moveButton({title:"right", url: "right.png", left: centerL + 40, bottom: centerB, func: false}),
		new moveButton({title:"right", url: "turnR.png", left: centerL + 50, bottom: centerB + 50, func: false}),
		new moveButton({title:"left", url: "turnL.png", left: centerL - 50, bottom: centerB + 50, func: false}),
		
		new Label({left: centerL + 1, bottom: centerB + 110, string: "MOTION", style: rlySmLabelStyle}),
		new Label({right: 41, bottom: centerB + 110, string: "ELEVATION", style: rlySmLabelStyle}),
		
		new medIconButton({title: "ascend", url:"ascendwhite.png", right: 35, bottom: centerB - 25 + 45, skin: greenS, func: false}),
		new medIconButton({title: "descend", url:"descendwhite.png", right: 35, bottom: centerB - 25 - 25, skin: greenS, func: false}),

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
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 60, top: 18, string: "FIND PEOPLE", style: whiteLabelStyle2})
			]
		}),
		new bButton(),
		new plusButton(),
		new Line({left:0, right:0, top:70, bottom:0, skin: blueS1}),
		new Line({left:0, right:0, top:170, bottom:0, skin: blueS2}),
		new Line({left:0, right:0, top:270, bottom:0, skin: blueS3}),
		new Line({left:0, right:0, top:370, bottom:0, skin: blueS4}),
		new Line({left:0, right:0, top:470, bottom:0, skin: blueS5}),
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
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 60, top: 18, string: "FIND PEOPLE", style: whiteLabelStyle2})
			]
		}),
		new bButton(),
		new plusButton(),
		new Picture({left: 0, top: 70, url:"person.png"}),
		new Line({left:0, right:0, top:170, bottom:0, skin: blueS2}),
		new Line({left:0, right:0, top:270, bottom:0, skin: blueS3}),
		new Line({left:0, right:0, top:370, bottom:0, skin: blueS4}),
		new Line({left:0, right:0, top:470, bottom:0, skin: blueS5}),
		new smallIconButton({title: "redX", top: 75, right: 4, name: "deleteX",
	        				url: "edit.png",
	        				func: function(content) {
	        					addedit.string = "EDIT PERSON";
								application.remove(listFilledCon);
								application.add(addCon);
								mode = "add";
								person = 1;
	        				}}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var listPeopleConFilled2 = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				new Label({left: 60, top: 18, string: "FIND PEOPLE", style: whiteLabelStyle2})
			]
		}),
		new bButton(),
		new plusButton(),
		new Picture({left: 0, top: 70, url:"person.png"}),
		new Picture({left: 0, top: 170, url:"person2.jpg"}),
		new Line({left:0, right:0, top:270, bottom:0, skin: blueS3}),
		new Line({left:0, right:0, top:370, bottom:0, skin: blueS4}),
		new Line({left:0, right:0, top:470, bottom:0, skin: blueS5}),
		new smallIconButton({title: "redX", top: 75, right:4, name: "deleteX",
	        				url: "edit.png",
	        				func: function(content) {
								application.remove(listFilledCon2);
								application.add(addCon);
								mode = "add";
								person = 1;
								addedit.string = "EDIT PERSON";
	        				}}),
	    new smallIconButton({title: "redX", top: 175, right:4, name: "deleteX",
	        				url: "edit.png",
	        				func: function(content) {
								application.remove(listFilledCon2);
								application.add(addCon2);
								mode = "add";
								person = 2;
								addedit2.string = "EDIT PERSON";
	        				}}),
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var addedit = new Label({left: 60, top: 18, string: "ADD PERSON", style: whiteLabelStyle2});
var addedit2 = new Label({left: 60, top: 18, string: "ADD PERSON", style: whiteLabelStyle2});

var rsw = 130;

var addPeopleCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				addedit
			]
		}),
		new bButton(),
		descriptionField,
		new sButton({title: "REMOVE", left: 20, top: 420, width: rsw, skin: redBorderSkin, whichDelete: 1}),
		new sButton({title: "SAVE", left: 175, top: 420, width: rsw, skin: greenBorderSkin}),
		new Line({top:150, height:230, width: 250, skin: whiteBorderSkin, name: "photo",
	      contents:[
	        new bigIconButton({title: "person photo", top: 0, left:0, right: 0, bottom:0, name: "missingPhoto",
	        				url: "tapload.jpg",
	        				func: function(content) {
	        					filled[0] = true;
	        					content.picture.width = 325;
	        					content.picture.height = 205;
	        					content.picture.load("kid.jpg");
	        				}})
	      ]
	    })
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content) {
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var addPeopleCon2 = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: blueS, active: true, name: "flyDroneContainer",
	contents: [
		Line($, {
			left:0, right:0, top:0, height:70, skin: blackS, name: "lineF",
			contents: [
				addedit2
			]
		}),
		new bButton(),
		descriptionField2,
		new sButton({title: "REMOVE", left: 20, top: 420, width: rsw, skin: redBorderSkin, whichDelete: 2}),
		new sButton({title: "SAVE", left: 175, top: 420, width: rsw, skin: greenBorderSkin}),
		new Line({top:150, height:230, width: 250, skin: whiteBorderSkin, name: "photo",
	      contents:[
	        new bigIconButton({title: "person photo 2", top: 0, left:0, right: 0, bottom:0, name: "missingPhoto",
	        				url: "tapload.jpg",
	        				func: function(content) {
	        					filled[1] = true;
	        					content.picture.width = 325;
	        					content.picture.height = 205;
	        					content.picture.load("kid2.jpg");
	        				}})
	      ]
	    })
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
				addPeopleCon.photo;
				mode = "path";
			}
			else if($.action == "flyDrone") {
				application.remove(main);
				application.add(flyCon);
				mode = "fly";
			}
			else if($.action == "findPeople") {
				application.remove(main);
				if (saved[1]) {
					application.add(listFilledCon2);
				} else if (saved[0]) {
					application.add(listFilledCon);
				} else {
					application.add(listCon);
				}
				descBox2.string = desc2;
				descBox1.string = desc;
				descBox.string = desc;
				mode = "find";
			}
		}},
	})
}});

var bButton = BUTTONS.Button.template(function($){ return{
	left: 15, top: 18,
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
				if (saved[1]) {
					application.remove(listFilledCon2);
				} else if (saved[0]) {
					application.remove(listFilledCon);
				} else {
					application.remove(listCon);
				}
			}
			if (mode == "add") {
				addedit.string = "ADD PERSON";
				addedit2.string = "ADD PERSON";
				if (person == 2) {
					application.remove(addCon2);
				} else {
					application.remove(addCon);
				}
				if (!(saved[0])) {
					application.add(listCon);
				} else if (!(saved[1])) {
					application.add(listFilledCon);
				} else {
					application.add(listFilledCon2);
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
	right: 10, top: 18,
	contents: [
		new Picture({width: 35, height: 35, url: "plus.png", name: "plus"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		    if (mode == "find") {
		        if (saved[1]) {
		        	application.remove(listFilledCon2);
		        } else if (saved[0]) {
		        	application.remove(listFilledCon);
				} else {
					application.remove(listCon);
				}
				mode = "add";
				if (saved[0]) {
					person = 2;
					application.add(addCon2);
				} else {
					person = 1;
					application.add(addCon);
				}
			}
		}}
	})
}});

/*start and stop button*/
var sButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top : $.top, bottom: $.bottom, height: 50, width: $.width, skin:$.skin,
	contents: [
		new Label({height:30, string: $.title, style: smLabelStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			var pressed = $.title;
			if(pressed == "START"){
				pathCon.mainMap.url = "map2path.png";
				content.invoke(new Message(deviceURL + "startPath", Message.TEXT));
				auto = true;
				autoLabel.string = "Autopilot Engaged"
			} else if(pressed == "STOP"){
				pathCon.mainMap.url = "map2.png";
				content.invoke(new Message(deviceURL + "stopPath", Message.TEXT));
				auto = false;
				autoLabel.string = "Drone Under Manual Control"
			} else if (pressed == "SAVE") {
				if (person == 2) {
					application.remove(addCon2);
				} else {
					descBox.string = desc;
					descBox1.string = desc;
					application.remove(addCon);
				}
				if (!saved[0]) {
					if (filled[0]) {
						application.add(listFilledCon);
						saved[0] = true;
						descBox.string = desc;
						descBox1.string = desc;
					} else {
						application.add(listCon);
					}
				} else {
					if (filled[1]) {
						saved[1] = true;
						descBox2.string = desc2;
						application.add(listFilledCon2);
					} else {
						descBox.string = desc;
						descBox1.string = desc;
						application.add(listFilledCon);
					}
				saved[0] = true;
				}
				mode = "find";
			} else if (pressed == "REMOVE") {
				addedit.string = "ADD PERSON";
				addedit2.string = "ADD PERSON";
				if ($.whichDelete == 2) {
					saved[1] = false;
					application.remove(addCon2);
					application.add(listFilledCon);
					desc2 = "";
					descBox2.string = ""
				} else {
					for (var i = 0; i < saved.length; i++) {
						saved[i] = false;
						//filled[i] = false;
					}
					application.remove(addCon);
					application.add(listCon);
					desc2 = "";
					descBox2.string = ""
					desc = "";
					descBox.string = ""
					descBox1.string = "";
				}
				mode = "find";
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
		}},
	})
}});

var smallIconButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	contents: [
		new Picture({width: iconWidth * 1.05, height: iconHeight * 1.05, url: $.url, name: "picture"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if ($.func) {
				$.func(content);
			}
			content.invoke(new Message(deviceURL + $.title), Message.JSON);
		}},
	})
}});


var medIconButton = BUTTONS.Button.template(function($){ return{
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	contents: [
		new Picture({width: iconWidth*1.5, height: iconHeight*1.5, url: $.url, name: "picture"}),
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
			content.invoke(new Message(deviceURL + $.title), Message.JSON);
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
							if ($.type == "Description") {
								desc = label.string;
								desc1 = label.string;
							} else if ($.type == "Description2") { 
								desc2 = label.string;
							}
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
				if (!pfound || !(saved[0])) {
					updateFound("");
				}	
			}
			if (!high && (saved[0] || saved[1])) {
				if (json.x > 70 && json.x < 75 && json.y > 70 && json.y < 75) {
					var pstring = "Missing person located at " + Math.round(json.x * 10)/10 + ", " + Math.round(json.y * 10)/10;
					updateFound(pstring);
					pfound = true;
				}
			}
		}
	}
}));

function updateFound(text) {
	personFoundFly.string = text;
	personFoundAdd.string = text;
	personFoundAdd2.string = text;
	personFoundSet.string = text;
	personFoundList.string = text;
	personFoundListFilled.string = text;
	personFoundListFilled2.string = text;
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
var currT = 220;

var fromField = new myField({ name: "", top: 270, width: 250, left: 100, right: 10, height: 44, hint: "ADDRESS", type: "" });
var toField = new myField({ name: "", top: 320, width: 250, left: 100, right: 10, height: 44, hint: "ADDRESS", type: "" });
var descriptionField = new myField({name: "", top: 80, width: 300, left: 10, right: 10, height: 44, hint: "NAME", type: "Description"});
var descriptionField2 = new myField({name: "", top: 80, width: 300, left: 10, right: 10, height: 44, hint: "NAME", type: "Description2"});

var currX = new Picture({left: currL, top: currT, width: 20, height: 20, url:"curr.png"}); 


var ptop = 521;
var pstr = " ";
var psty = rlySmLabelStyle; 
var personFoundMain = new Label({string: pstr , style: psty});
var personFoundFly = new Label({top: ptop, string: pstr, style: psty});
var personFoundSet = new Label({top: ptop, string: pstr, style: psty});
var personFoundList = new Label({top: ptop, string: pstr, style: psty});
var personFoundAdd = new Label({top: ptop, string: pstr, style: psty});
var personFoundAdd2 = new Label({top: ptop, string: pstr, style: psty});
var personFoundListFilled = new Label({top: ptop, string: " ", style: psty});
var personFoundListFilled2 = new Label({top: ptop, string: " ", style: psty});
var descBox = new Label({top: 120, left: 110, string: "", style: smLabelStyle});
var descBox1 = new Label({top: 120, left: 110, string: "", style: smLabelStyle});
var descBox2 = new Label({top: 220, left: 110, string: "", style: smLabelStyle});


var main = new MainCon()
var pathCon = new setPathCon();
pathCon.add(currX);

var flyCon = new flyDroneCon();
var listCon = new listPeopleCon();
var listFilledCon = new listPeopleConFilled();
var listFilledCon2 = new listPeopleConFilled2();
var addCon = new addPeopleCon();
var addCon2 = new addPeopleCon2();

flyCon.add(personFoundFly);
listCon.add(personFoundList);
listFilledCon.add(personFoundListFilled);
listFilledCon2.add(personFoundListFilled2);
listFilledCon.add(descBox);
listFilledCon2.add(descBox1);
listFilledCon2.add(descBox2);

pathCon.add(personFoundSet);
addCon.add(personFoundAdd);
addCon2.add(personFoundAdd2);
main.add(personFoundMain);
application.add(main);
