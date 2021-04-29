const levels = require("./levelsystem.json");

module.exports.questVerify = async (user, member) => {
	var loopLevels = levels.allLevels;
	var quests = [
		"Quest", //Quest para o cargo Campones das Batatas
		"Quest", //Quest para o cargo Taberneiro de Sucos
		"Quest", //Quest para o cargo Bardo do K-pop
		"Quest", //Quest para o cargo Barbaro Pistola
		"Quest", //Quest para o cargo Lanceiro sem Lança
		"Quest", //Quest para o cargo Arqueiro sem Flechas
		"Quest", //Quest para o cargo Guerreiro da Paz
		"Quest", //Quest para o cargo Assassino de Insetos
		"Quest", //Quest para o cargo Ilusionista Iludido
		"Quest", //Quest para o cargo Feiticeiro da Umbanda
		"Quest", //Quest para o cargo Alquimista da Federal
		"Quest", //Quest para o cargo Mago sem Mana
		"Quest", //Quest para o cargo Paladino Judeu
		"Quest", //Quest para o cargo Templário Ateu
		"Quest", //Quest para o cargo Algoz Depressivo
		"Quest", //Quest para o cargo Necromante Cristão
	];
	for (var i = 0; i < adq.length; i++) {
		if (loopLevels[i] > user.level) break;
		if (user.questLevelUp[i].done) {
			if (!member.roles.cache.get(levels.level[loopLevels[i]].role)) {
				member.roles.add((levels.level[loopLevels[i]].role));
			}
			getxp = true;
		}else getxp = false;
	}
	return getxp;
}