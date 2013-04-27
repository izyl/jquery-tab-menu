(function($) {

	$.fn.tabMenu = function(options) {

		/** le tab courant, calculé à l'initialisation du plugin (on pourrait exposer un setter) */
		var currentTab;

		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({
			/** l'id du container de menu */
			tabMenuId : 'tab-menu',
			/** l'id de la ligne principale d'onglets */
			rootRowId : 'rootRow',
			/** le nom de la classe css pour l'état actif des tabs */
			activeClass : 'active',
			/** le type d'élément pour représenter une ligne d'onglets */
			rowElement : 'div',
			/** l'attribut dans lequel on stock le lien entre l'anchor et le div d'onglet fils associé */
			rowTargetAttr : 'target',
			/**
			 * le type d'élément associé à un onglet (on pourrait mettre des images par exemples, mais mieux, on pourrait rendre générique afin de pouvoir
			 * utiliser différents éléments dans un meme menu ?)
			 */
			tabElement : 'a',
			/** c'est ce timeout qui rend le menu ergonomique en autorisant des "sorties de routes" */
			timeout : 500,
			/**
			 * la structure du menu récupéré en json, s'il n'est pas vide, il sera injecté dans le rootMenuId (qui devra donc être vide avant l'injection). Pour
			 * vpm, il devra contenir le nom, le href et ses fils ainsi qu'un champs additionel de class css optionelle.
			 */
			jsonMenu : {}
		}, options);

		return this.each(function() {

			if (!$.isEmptyObject(settings.jsonMenu)) {
				buildMenu(settings.jsonMenu);
			}

			equalizeRows();

			// le a marqué avec la classe active à l'ouverture de la page devient le tab courant
			currentTab = $("#" + settings.tabMenuId + " " + settings.tabElement + "." + settings.activeClass);
			var active = currentTab;
			// on active le tag courant
			activate(active);

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

			$("#" + settings.tabMenuId + " " + settings.tabElement).hoverIntent({
				over : function() {

					active = $(this);
					activate(active);
				},
				out : function() {
					$.noop();
				},
				timeout : settings.timeout
			});

		});

		function equalizeRows() {
			$("#" + settings.tabMenuId + " " + settings.rowElement).each(function() {
				$(this).children(settings.tabElement).equalHeights();
			});
		}

		// cache toutes les lignes
		function hideAll() {

			$("#" + settings.tabMenuId + " " + settings.rowElement).each(function() {
				$(this).hide();
			});
		}

		// active l'onglet survolé ainsi que tous ses tab parents et cache le reste (à optimiser ?)
		function activate(active) {
			// reset le menu.
			reset();
			// on habille l'onglet actif
			active.addClass(settings.activeClass);
			// et on montre le div associé
			$(active.attr(settings.rowTargetAttr)).show();

			// N'ayez pas peur :D, c'est simple en fait
			// on sélectionne vers le haut toutes les lignes jusqu'au container du menu (:tabMenu)
			active.parentsUntil($("#" + settings.tabMenuId), settings.rowElement).each(function() {
				// on affiche chaque ligne
				$(this).show();
				// et on habille le lien qui pointe dessus
				$(this).parent().find(settings.tabElement + "[" + settings.rowTargetAttr + "=#" + $(this).attr("id") + "]").addClass(settings.activeClass);

			});
		}

		// permet de restorer le tab initial
		function restoreTab() {

			activate(currentTab);
		}

		// cache toutes les lignes et désactive tous les tabs
		function reset() {
			hideAll();
			$("#" + settings.tabMenuId + " " + settings.tabElement).each(function() {
				$(this).removeClass(settings.activeClass);
			});
		}

		// prend un menu json et l'injecte dans le tabMenu
		function buildMenu(jsonMenu) {
			console.log("buidling jsonMenu");
		}

	};

})(jQuery);