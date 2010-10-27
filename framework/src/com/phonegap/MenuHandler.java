/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */
package com.phonegap;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.lang.reflect.Field;
import java.lang.Class;
import java.lang.ClassNotFoundException;


import org.json.JSONArray;
import org.json.JSONException;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import android.view.Menu;
import android.view.MenuItem;
import android.util.Log;

/**
 * This class provides access to the options menu.
 */
public class MenuHandler extends Plugin {
	
	protected HashMap<Integer,MenuItemWrapper> menuItems = new HashMap<Integer,MenuItemWrapper>();
	private String callbackId;
	
	
	/**
     * Constructor.
     */
	public MenuHandler() {
    }
    
	
	/**
	 * Executes the request and returns PluginResult.
	 * 
	 * @param action 		The action to execute.
	 * @param args 			JSONArray of arguments for the plugin.
	 * @param callbackId	The callback id used when calling back into JavaScript.
	 * @return 				A PluginResult object with a status and message.
	 */
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		try {
			if (action.equals("addMenuItem")) {
				String icon = null;
				if(args.length() == 3) {
					icon = args.getString(2);
				}
				this.addMenuItem(args.getInt(0), args.getString(1), icon);
			}
			else if (action.equals("removeMenuItem")) {
				this.removeMenuItem(args.getInt(0));
			}
			else if (action.equals("clearMenuItems")) {
				this.clearMenuItems();
			} 
			else if (action.equals("setMenusEnabled")) {
				this.setMenusEnabled(args.getBoolean(0));
			}
			else if (action.equals("setMenuItemEnabled")) {
				this.setMenuItemEnabled(args.getInt(0), args.getBoolean(1));
			}
			else if (action.equals("watch")) {
				this.watch(callbackId);
			}
			
			return new PluginResult(PluginResult.Status.OK, "");
		} catch (JSONException e) {
			return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
		}
	}
	
	/**
	 * Identifies if action to be executed returns a value and should be run synchronously.
	 * 
	 * @param action	The action to execute
	 * @return			T=returns value
	 */
	public boolean isSynch(String action) {
		return true;
	}
	
	/**
	 * Sets the function that is called when a menu item is selected
	 *
	 * @param callbackId The key used by javascript to identify the callback
	 */
	
	public void watch(String callbackId) {
		Log.d("PhoneGapLog", "watching: " + callbackId);
		this.callbackId = callbackId;
	}
	
	/**
	 * Add an item to the menu. This takes effect next time the menu is displayed.
	 *
	 * @param itemId The unique identifer for the menu item
	 * @param title The text of the menu item
	 * @param icon The fully-qualified name of the variable holding the icon resource id
	 */
	
	public void addMenuItem(int itemId, String title, String icon) {
		int iconResId = 0;
		if(icon != null) {
			try {
				int dot = icon.lastIndexOf(".");
				
				if(dot > -1) {
					String className = icon.substring(0, dot);
					String fieldName = icon.substring(dot + 1);
					
					Class<?> cla = Class.forName(className);
					Field field = cla.getField(fieldName);
					iconResId = field.getInt(cla);
					
				}
			} catch (NoSuchFieldException e) {
				Log.d("PhoneGapLog", "NoSuchFieldException");
			} catch (ClassNotFoundException e) {
				Log.d("PhoneGapLog", "ClassNotFoundException");
			} catch (IndexOutOfBoundsException e) {
				Log.d("PhoneGapLog", "IndexOutOfBoundsException");
			} catch (IllegalAccessException e) {
				Log.d("PhoneGapLog", "IllegalAccessException");
			}
		}
		this.menuItems.put(new Integer(itemId), new MenuItemWrapper(itemId, title, iconResId));
		this.setMenusEnabled(true);
	}
	
	/**
	 * Removes an item from the menu.
	 *
	 * @param itemId The unique identifer for the menu item
	 */
	
	public void removeMenuItem(int itemId) {
		this.menuItems.remove(new Integer(itemId));
	}
	
	/**
	 * Removes all items from the menu and disables it
	 *
	 */
	
	public void clearMenuItems() {
		this.menuItems.clear();
		this.setMenusEnabled(false);
	}
	
	/**
	 * Sets whether the menus will be displayed
	 *
	 * @param enabled Should menus be displayed
	 */
	
	public void setMenusEnabled(boolean enabled) {
		this.ctx.setMenuEnabled(enabled);
	}
	
	/**
	 * Enables or disables and hides a menu item 
	 *
	 * @param itemId The unique identifer for the menu item
	 * @param enabled Whether the item should be displayed
	 */
	
	public void setMenuItemEnabled(int itemId, boolean enabled) {
		Integer key = new Integer(itemId);
		if(!this.menuItems.containsKey(key)) {
			return;
		}
		this.menuItems.get(key).enabled = enabled;
	}
	
	/**
     * Called every time the menu is opened. This allows plugins to modify the contents of the menu.
	 *
	 * @param Menu menu The menu that's about to be displayed.
     */
    public void onPrepareOptionsMenu (Menu menu) {
		menu.clear();
		java.util.Set<Entry<Integer,MenuItemWrapper>> s = this.menuItems.entrySet();
    	java.util.Iterator<Entry<Integer,MenuItemWrapper>> it = s.iterator();
    	while(it.hasNext()) {
    		Entry<Integer,MenuItemWrapper> entry = it.next();
    		MenuItemWrapper menuItem = entry.getValue();
			menuItem.addToMenu(menu);
    	}
    	
	}

    /**
     * Called when a menu item is selected.
	 *
	 * @param MenuItem item The selected item.
     */
    public void onOptionsItemSelected (MenuItem item) {
		Log.d("PhoneGapLog", "menuitem callback: " + this.callbackId);
	
		if(this.callbackId != null) {
			PluginResult result = new PluginResult(PluginResult.Status.OK, item.getTitle().toString());
			this.success(result, this.callbackId);
		}
	}
    
	
	protected class MenuItemWrapper {
		public int itemId;
		public String title;
		public int icon;
		public MenuItem menuItem;
		public boolean enabled = true;
		
		public MenuItemWrapper(int itemId, String title, int icon) {
			this.itemId = itemId;
			this.title = title;
			this.icon = icon;
		}
		
		public MenuItem addToMenu(Menu menu) {
			this.menuItem = menu.add(0, this.itemId, 0, this.title);
			if(icon != 0) {
				this.menuItem.setIcon(icon);
			}
			if(!this.enabled) {
				this.menuItem.setEnabled(false).setVisible(false);
			}
			return this.menuItem;
		}
		
		public void removeFromMenu(Menu menu) {
			menu.removeItem(this.itemId);
		}
		
	}
	
	
	
}