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

/*2.2*/ ACCOUNT_LIST:		 "android.R$drawable.ic_menu_account_list",
		ADD:				 "android.R$drawable.ic_menu_add",
		AGENDA:				 "android.R$drawable.ic_menu_agenda",
		ALWAYS_LANDSCAPE_PORTRAIT:"android.R$drawable.ic_menu_always_landscape_portrait",
/*2.2*/ ARCHIVE:			 "android.R$drawable.ic_menu_archive",
/*2.2*/ ATTACHMENT:			 "android.R$drawable.ic_menu_attachment",
/*2.2*/ BACK:				 "android.R$drawable.ic_menu_back",
/*2.2*/ BLOCK:				 "android.R$drawable.ic_menu_block",
/*2.2*/ BLOCKED_USER:		 "android.R$drawable.ic_menu_blocked_user",
		CALL:				 "android.R$drawable.ic_menu_call",
		CAMERA:				 "android.R$drawable.ic_menu_camera",
/*2.2*/ CC:					 "android.R$drawable.ic_menu_cc",
/*2.2*/ CHAT_DASHBOARD:		 "android.R$drawable.ic_menu_chat_dashboard",
/*2.2*/ CLEAR_PLAYLIST:		 "android.R$drawable.ic_menu_clear_playlist",
		CLOSE_CLEAR_CANCEL:	 "android.R$drawable.ic_menu_close_clear_cancel",
		COMPASS:			 "android.R$drawable.ic_menu_compass",
/*2.2*/ COMPOSE:			 "android.R$drawable.ic_menu_compose",
		CROP:				 "android.R$drawable.ic_menu_crop",
		DAY:				 "android.R$drawable.ic_menu_day",
		DELETE:				 "android.R$drawable.ic_menu_delete",
		DIRECTIONS:			 "android.R$drawable.ic_menu_directions",
		EDIT:				 "android.R$drawable.ic_menu_edit",
/*2.2*/ EMOTICONS:			 "android.R$drawable.ic_menu_emoticons",
/*2.2*/ END_CONVERSATION:	 "android.R$drawable.ic_menu_end_conversation",
/*2.2*/ FORWARD:			 "android.R$drawable.ic_menu_forward",
/*2.2*/ FIENDSLIST:			 "android.R$drawable.ic_menu_friendslist",
		GALLERY:			 "android.R$drawable.ic_menu_gallery",
/*2.2*/ GOTO:				 "android.R$drawable.ic_menu_goto",
		HELP:				 "android.R$drawable.ic_menu_help",
/*2.2*/ HOME:				 "android.R$drawable.ic_menu_home",
		INFO_DETAILS:		 "android.R$drawable.ic_menu_info_details",
/*2.2*/ INVITE:				 "android.R$drawable.ic_menu_invite",
/*2.2*/ LOGIN:				 "android.R$drawable.ic_menu_login",
		MANAGE:				 "android.R$drawable.ic_menu_manage",
		MAPMODE:			 "android.R$drawable.ic_menu_mapmode",
/*2.2*/ MARK:				 "android.R$drawable.ic_menu_mark",
		MONTH:				 "android.R$drawable.ic_menu_month",
		MORE:				 "android.R$drawable.ic_menu_more",
		MY_CALENDAR:		 "android.R$drawable.ic_menu_my_calendar",
		MYLOCATION:			 "android.R$drawable.ic_menu_mylocation",
		MYPLACES:			 "android.R$drawable.ic_menu_myplaces",
/*2.2*/ NOTIFICATIONS:		 "android.R$drawable.ic_menu_notifications",
/*2.2*/ PLAY_CLIP:			 "android.R$drawable.ic_menu_play_clip",
		PREFERENCES:		 "android.R$drawable.ic_menu_preferences",
		RECENT_HISTORY: 	 "android.R$drawable.ic_menu_recent_history",
/*2.2*/ REFRESH:			 "android.R$drawable.ic_menu_refresh",
		REPORT_IMAGE:		 "android.R$drawable.ic_menu_report_image",
		REVERT:				 "android.R$drawable.ic_menu_revert",
		ROTATE:				 "android.R$drawable.ic_menu_rotate",
		SAVE:				 "android.R$drawable.ic_menu_save",
		SEARCH:				 "android.R$drawable.ic_menu_search",
		SEND:				 "android.R$drawable.ic_menu_send",
		SET_AS:				 "android.R$drawable.ic_menu_set_as",
		SHARE:				 "android.R$drawable.ic_menu_share",
		SLIDESHOW:			 "android.R$drawable.ic_menu_slideshow",
		SLIDESHOW:			 "android.R$drawable.ic_menu_slideshow",
		SORT_ALPHABETICALLY: "android.R$drawable.ic_menu_sort_alphabetically",
		SORT_BY_SIZE:		 "android.R$drawable.ic_menu_sort_by_size",
/*2.2*/ STAR:				 "android.R$drawable.ic_menu_star",
/*2.2*/ STAR_CONVERSATION:	 "android.R$drawable.ic_menu_start_conversation",
/*2.2*/ STOP:				 "android.R$drawable.ic_menu_stop",
		TODAY:				 "android.R$drawable.ic_menu_today",
		UPLOAD:				 "android.R$drawable.ic_menu_upload",
		UPLOAD_YOU_TUBE:	 "android.R$drawable.ic_menu_upload_you_tube",
		VIEW:				 "android.R$drawable.ic_menu_view",
		WEEK:				 "android.R$drawable.ic_menu_week",
 		ZOOM:				 "android.R$drawable.ic_menu_zoom"
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
		win: callback,
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
	this.menuItems = {};
	PhoneGap.exec(null, null, "Menu", "clearMenuItems", []);
}

Menu.prototype.setMenusEnabled = function(enabled) {
	PhoneGap.exec(null, null, "Menu", "setMenusEnabled", [enabled]);
}

Menu.prototype.setMenuItemEnabled = function(title, enabled) {
	PhoneGap.exec(null, null, "Menu", "setMenuItemEnabled", [this.menuItems[title].itemId, enabled]);
}

Menu.prototype.callbackSuccess = function(title) {
	console.log('callbackSuccess: ' + title);
	var ctx = window.plugins.menu;
	if(typeof ctx.menuItems[title] != 'undefined' && ctx.menuItems[title].win) {
		ctx.menuItems[title].win(title);
	}
}

Menu.prototype.callbackFail = function(message) {
	console.log('menu error: ' + message);
}

PhoneGap.addConstructor(function() {
	var menu = new Menu();
	PhoneGap.addPlugin('menu', menu);
	PluginManager.addService("Menu","com.phonegap.MenuHandler");
	PhoneGap.exec(menu.callbackSuccess, menu.callbackFail, "Menu", "watch", []);
});



