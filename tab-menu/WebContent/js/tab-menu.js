(function($) {

	$.fn.tabMenu = function(options) {

		var currentTab;

		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({
			tabMenuId : 'tab-menu',
			rootRowId : 'rootRow',
			activeClass : 'active',
			rowElement : 'div',
			rowTargetAttr : 'value',
			activeElement : 'li',
			timeout : 300,
			jsonMenu : {}
		}, options);

		return this.each(function() {

			if (!$.isEmptyObject(settings.jsonMenu)) {
				buildMenu(settings.jsonMenu);
			}

			$("#" + settings.rootRowId).show();
			currentTab = $("#" + settings.tabMenuId + " " + settings.activeElement + "." + settings.activeClass);
			var active = currentTab;

			activeToTop($(active.attr(settings.rowTargetAttr)));

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

					// reset la class active
					resetClass(settings.activeClass);
					active = $(this);

					// on cache les freres
					hideSiblings(active);
					// montrer seulement 1 niveau en dessous du niveau actif
					hideGrandsons(active);
					// on active l'onglet survolé et tous ses tab parents
					activeToTop(active);
				},
				out : function() {
					$.noop();
				},
				timeout : settings.timeout
			});

		});

		// cache les row petit fils de l'onglet actif de sorte à n'avoir que le niveau n+1
		function hideGrandsons(active) {
			$(active.attr(settings.rowTargetAttr)).children(settings.rowElement).hide();
		}

		// active l'onglet survolé et tous ses tab parents
		function activeToTop(active) {
			active.find("a").addClass(settings.activeClass);
			$(active.attr(settings.rowTargetAttr)).fadeIn();

			// N'ayez pas peur :D, c'est simple en fait
			// on sélectionne vers le haut tous les div jusqu'au container du menu (:tabMenu)
			active.parentsUntil($("#" + settings.tabMenuId), settings.rowElement).each(
					function() {
						// pour chaque div on va remonter au parent puis on va choisir le li dont la valeur vaut l'id du div. Sur le a contenu dans ce li on va
						// mettre
						// la classe active
						$(this).parent().find(settings.activeElement + "[" + settings.rowTargetAttr + "=#" + $(this).attr("id") + "]").find("a").addClass(
								settings.activeClass);
					});

		}

		// masquer tous les fils des siblings (:frères) de l'onglet actif
		function hideSiblings(active) {

			active.siblings().each(function() {
				// propre
				$($(this).attr(settings.rowTargetAttr)).hide();
			});
		}

		// permet de restorer le tab initial
		function restoreTab() {

			// reset les tabs actifs.
			resetClass(settings.activeClass);
			// re-set le tab courant.
			currentTab.addClass(settings.activeClass);
		}

		function resetClass(classToRemove) {
			$("#" + settings.tabMenuId + " " + settings.activeElement + " a").each(function() {
				$(this).removeClass(classToRemove);
			});
		}

		function buildMenu(jsonMenu) {
			console.log("buidling jsonMenu");
		}

	};

})(jQuery);