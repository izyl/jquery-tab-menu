tabMenu : a jQuery plugin
=========================

This is a tabular multi level menu plugin for jquery. tabMenu allows you to navigate through a multi level tab menu.

-hoverIntent is used for ergonomic behaviour (ie : delaying hover events)
-equalsHeights is used to equalize row tabs but im trying to replace it with pure css
-css are separated between core css (tab-menu.css) and themes. You shouldn't have to modify tab-menu.css.
  if you need to modify the css, just copy-paste one from the themes folder and modify it.
-supports json menus injection


How to use it :

Build your html menu either directly in the dom or by injecting a json menu like this :
$("#tab-menu").tabMenu({
  		jsonMenu : myJsonMenu
});

You can pass in additionnal options :

      /** tab-menu container id */
  		tabMenuId : 'tab-menu',

			/** root row id : id for tab-menu first row  */
			rootRowId : 'rootRow',

			/** active tab css class */
			activeClass : 'active',

			/** wich dom element from #tab-menu represents a row */
			rowElement : 'div.row',

			/** tab attribute that contains the target row  */
			rowTargetAttr : 'target',

			/**
			 * wich dom element from #tab-menu represents a tab
			 */
			tabElement : 'div.tab',

			/** timeout for hoverIntent */
			timeout : 500,

			/**
			 * a jsonMenu
			 */
			jsonMenu : {}