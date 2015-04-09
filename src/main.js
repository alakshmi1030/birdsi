// KPR Script file
var THEME = require('themes/sample/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var deviceURL = "";

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var typeStyle = new Style({ color: 'white', font: 'bold 24px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var smallTypeStyle = new Style({ color: 'white', font: '18px', horizontal: 'center', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var blackS = new Skin({fill:"black"});
var redS = new Skin({fill:"#ea9999"});
var yellowS = new Skin({fill: "#fbdd8d"});
var greenS = new Skin({fill:"#‎b6d7a7"});
var blueS = new Skin({fill:"#99B6BC"});
var purpleS = new Skin({fill:"#ae5dae"});
var borderS = new Skin({ borders: {left: 2, right: 2, top: 2, bottom: 2}, stroke: "white"})
var labelStyle = new Style( { font: "bold 40px", color:"black" } );

var iconWidth = 50;
var iconHeight = 50;
var pictureWidth = 325;
var pictureHeight = 325;


var MainCon = Column.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteS, active: true, name: "column", 
	contents: [
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
				new aButton({title: "Find People", action: "findPeople"})
			]
		}),
	]
}});

var leftValue = 25;
var setPathCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteS, active: true, name: "setPathColumn",
	contents: [
		new bButton(),
		new Label({top: 20, string: "Set Path", style: labelStyle}),
		new Picture({top: 30,left: 20, right: 20, width: pictureWidth, height: pictureHeight, url: "map.jpg"}),
		fromField, toField
	],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
		}}
	})
}});

var aButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 0,
	contents: [
		new Label({left:0, right:0,height:85, string: $.title, style: typeStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			if($.action == "setPath"){
				application.remove(main);
				application.add(pathCon);
			}
			else{
				trace($.title + " button pressed\n");
			}
		}},
	})
}});

var bButton = BUTTONS.Button.template(function($){ return{
	left: 20, top: 20,
	contents: [
		new Label({height:30, string: "<", style: labelStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			application.remove(pathCon);
			application.add(main);
		}}
	})
}});

var myField = Container.template(function($) { return { 
	top: $.top, width: 250, height: 40, skin: nameInputSkin, name: "myField", contents: [
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
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add name...", name:"hint"
				 })
			]
		})
	]
}});

var fromField = new myField({ name: "From:", top: 300 });
var toField = new myField({ name: "To: ", top: 350 });

var main = new MainCon()
var pathCon = new setPathCon();
application.add(main);
