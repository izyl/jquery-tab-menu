tabMenu : a jQuery plugin
=========================

A tabular multi level menu plugin for jquery. tabMenu allows you to navigate through a multi level tab menu.

<ul>
<li>hoverIntent is used for ergonomic behaviour (ie : delaying hover events)</li>
<li>tab heights equalized with pure css : display:table-cell</li>
<li>css are separated between core css (tab-menu.css) and themes. You shouldn't have to modify tab-menu.css.
  if you need to modify the css, just copy-paste one from the themes folder and modify it.</li>
<li>supports json menus injection</li>
</ul>

<b>How to use it :</b>

Build your html menu either directly in the dom or by injecting a json menu like this :
	
	/** init menu from json structure */
	$("#tab-menu").tabMenu({
	  		jsonMenu : myJsonMenu
	});

You can pass in additionnal options :
	
	/** tab-menu container id */
	tabMenuId : 'tab-menu',
	
	/** root row id : id for tab-menu first row */
	rootRowId : 'rootRow',
	
	/** active tab css class */
	activeClass : 'active',
	
	/** wich dom element from #tab-menu represents a row */
	rowElement : 'div.row',
	
	/** tab attribute that contains the target row */
	rowTargetAttr : 'target',
	
	/** wich dom element from #tab-menu represents a tab */
	tabElement : 'div.tab',
	
	/** timeout for hoverIntent */
	timeout : 500,
	
	/** a jsonMenu */
	jsonMenu : {}
	

