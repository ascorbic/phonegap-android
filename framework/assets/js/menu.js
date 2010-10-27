/**
 * Provides access to the native menus in Android
 */
 
var Menu = function () {
	this.menuItems = {};
	
}

/**
 * These are the built-in Android menu icons. There's a number of sites where you can 
 * preview what they look like, such as http://androiddrawableexplorer.appspot.com/
 */

Menu.Icon = {
	ADD:						"android.R$drawable.ic_menu_add",
	AGENDA:						"android.R$drawable.ic_menu_agenda",
	ALWAYS_LANDSCAPE_PORTRAIT: 	"android.R$drawable.ic_menu_always_landscape_portrait",
	CALL:						"android.R$drawable.ic_menu_call",
	CAMERA:						"android.R$drawable.ic_menu_camera",
	CLOSE_CLEAR_CANCEL:  	 	"android.R$drawable.ic_menu_close_clear_cancel",
	COMPASS:					"android.R$drawable.ic_menu_compass",
	CROP:						"android.R$drawable.ic_menu_crop",
	DAY:						"android.R$drawable.ic_menu_day",
	DELETE:						"android.R$drawable.ic_menu_delete",
	DIRECTIONS:					"android.R$drawable.ic_menu_directions",
	EDIT:						"android.R$drawable.ic_menu_edit",
	GALLERY:					"android.R$drawable.ic_menu_gallery",
	HELP:						"android.R$drawable.ic_menu_help",
	INFO_DETAILS:				"android.R$drawable.ic_menu_info_details",
	MANAGE:						"android.R$drawable.ic_menu_manage",
	MAPMODE:					"android.R$drawable.ic_menu_mapmode",
	MONTH:						"android.R$drawable.ic_menu_month",
	MORE:						"android.R$drawable.ic_menu_more",
	MY_CALENDAR:				"android.R$drawable.ic_menu_my_calendar",
	MYLOCATION:					"android.R$drawable.ic_menu_mylocation",
	MYPLACES:					"android.R$drawable.ic_menu_myplaces",
	PREFERENCES:				"android.R$drawable.ic_menu_preferences",
	RECENT_HISTORY:            	"android.R$drawable.ic_menu_recent_history",
	REPORT_IMAGE:				"android.R$drawable.ic_menu_report_image",
	REVERT:						"android.R$drawable.ic_menu_revert",
	ROTATE:						"android.R$drawable.ic_menu_rotate",
	SAVE:						"android.R$drawable.ic_menu_save",
	SEARCH:						"android.R$drawable.ic_menu_search",
	SEND:						"android.R$drawable.ic_menu_send",
	SET_AS:						"android.R$drawable.ic_menu_set_as",
	SHARE:						"android.R$drawable.ic_menu_share",
	SLIDESHOW:					"android.R$drawable.ic_menu_slideshow",
	SORT_ALPHABETICALLY:       	"android.R$drawable.ic_menu_sort_alphabetically",
	SORT_BY_SIZE:				"android.R$drawable.ic_menu_sort_by_size",
	TODAY:						"android.R$drawable.ic_menu_today",
	UPLOAD:						"android.R$drawable.ic_menu_upload",
	UPLOAD_YOU_TUBE:           	"android.R$drawable.ic_menu_upload_you_tube",
	VIEW:						"android.R$drawable.ic_menu_view",
	WEEK:						"android.R$drawable.ic_menu_week",
	MENU_ZOOM:					"android.R$drawable.ic_menu_zoom"
}

Menu.itemId = 0;

/**
 * Adds an item to the native menu that will be displayed next time it is opened.
 *
 * @param {Function} callback Called when the menu item is selected. Passed the menu item text.
 * @param {String} title The (unique) text of the menu item. Keep it short.
 * @param {String} icon The fully qualified icon resource id. If you're using the built-in icons,
 * you should use the Menu.Icon constants. You can use your own icons if you put them into your 
 * project's drawables folder. You then refer to them as com.example.R$drawable.your_icon_name.
 * e.g. if your icon file is my_icon.png and your project's package is com.mycompany.myproject,
 * your icon resource will be com.mycompany.myproject.R$drawable.your_icon_name. Icons are only 
 * displayed for the first six menu items.
 */
Menu.prototype.addMenuItem = function(callback, title, icon) {
	this.menuItems[title] = {
		win: success,
		icon: icon,
		enabled: true,
		itemId: Menu.itemId++
	}
	PhoneGap.exec(null, null, "Menu", "addMenuItem", [this.menuItems[title].itemId, title, icon]);
}

Menu.prototype.removeMenuItem = function(title) {
	PhoneGap.exec(null, null, "Menu", "removeMenuItem", [this.menuItems[title].itemId]);
}

Menu.prototype.clearMenuItems = function() {
	PhoneGap.exec(null, null, "Menu", "clearMenuItems", []);
}

Menu.prototype.setMenusEnabled = function(enabled) {
	PhoneGap.exec(null, null, "Menu", "setMenusEnabled", [enabled]);
}

Menu.prototype.setMenuItemEnabled = function(title, enabled) {
	PhoneGap.exec(null, null, "Menu", "setMenuItemEnabled", [this.menuItems[title].itemId, enabled]);
}

Menu.prototype.callbackSuccess = function(title) {
	console.log('menu item: ' + title);
}

Menu.prototype.callbackFail = function(message) {
	console.log('menu error: ' + message);
}

PhoneGap.addConstructor(function() {
	var menu = new Menu();
	PhoneGap.addPlugin('menu', menu);
	PluginManager.addService("Menu","com.phonegap.MenuHandler");
	PhoneGap.exec(menu.callbackSuccess, menu.callbackFail, "Menu", "watch", [], true);
});



