(function($) {

	$.fn.tabMenu = function(options) {

		var currentTab;

		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({
			tabMenuId : 'tab-menu',
			rootRowId : 'rootRow',
			activeClass : 'active',
			rowElement : 'div',
			rowTargetAttr : 'target',
			activeElement : 'a',
			timeout : 500,
			jsonMenu : {}
		}, options);

		return this.each(function() {

			if (!$.isEmptyObject(settings.jsonMenu)) {
				buildMenu(settings.jsonMenu);
			}

			// le a marqué avec la classe active à l'ouverture de la page devient le tab courant
			currentTab = $("#" + settings.tabMenuId + " " + settings.activeElement + "." + settings.activeClass);
			var active = currentTab;
			// on active le tag courant
			activeToTop(active);

			// quand on sort du menu on rétabli l'onglet courant
			$("#" + settings.tabMenuId).hoverIntent({
				over : function() {
					$.noop();// la fonction vide de jquery : http://api.jquery.com/jQuery.noop/#jQuery-noop
				},
				out : function() {
					restoreTab();
				},
				// permet de retarder le out : on permet les sorties du menu pour cette durée sans restorer le tab courant
				timeout : settings.timeout
			});

			$("#" + settings.tabMenuId + " " + settings.activeElement).hoverIntent({
				over : function() {

					active = $(this);
					activeToTop(active);
				},
				out : function() {
					$.noop();
				},
				timeout : settings.timeout
			});

		});

		// cache toutes les lignes
		function hideAll() {

			$("#" + settings.tabMenuId + " " + settings.rowElement).each(function() {
				$(this).hide();
			});
		}

		// active l'onglet survolé ainsi que tous ses tab parents et cache le reste (à optimiser ?)
		function activeToTop(active) {
			// reset le menu.
			reset();
			active.addClass(settings.activeClass);
			$(active.attr(settings.rowTargetAttr)).show();

			// N'ayez pas peur :D, c'est simple en fait
			// on sélectionne vers le haut tous les div jusqu'au container du menu (:tabMenu)
			active.parentsUntil($("#" + settings.tabMenuId), settings.rowElement).each(function() {
				// pour chaque div on va remonter au parent puis on va choisir le li dont la valeur vaut l'id du div. Sur le a contenu dans ce li on va
				// mettre
				// la classe active
				// on raffiche le div
				$(this).show();
				// $(this).children(settings.activeElement).show();
				$(this).parent().find(settings.activeElement + "[" + settings.rowTargetAttr + "=#" + $(this).attr("id") + "]").addClass(settings.activeClass);

			});
		}

		// permet de restorer le tab initial
		function restoreTab() {

			// re-set le tab courant.
			activeToTop(currentTab);
		}

		// cache toutes les lignes et désactive tous les tabs
		function reset() {
			hideAll();
			$("#" + settings.tabMenuId + " " + settings.activeElement).each(function() {
				$(this).removeClass(settings.activeClass);
			});
		}

		// prend un menu json et l'injecte dans le tabMenu
		function buildMenu(jsonMenu) {
			console.log("buidling jsonMenu");
		}

	};

})(jQuery);