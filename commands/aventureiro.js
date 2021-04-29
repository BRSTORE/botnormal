const mongo = require('mongoose');

const rpgDataSchema = mongo.Schema({
    id: String,
    nick: {
    	type: String,
    	default: null
    },
    raça: {
    	type: String,
    	default: null
    },
    classe: {
    	type: String,
    	default: null
    },
    personalidade: {
    	type: String,
    	default: null
    },
    genero: {
    	type: String,
    	default: null
    },
    power: {
    	type: Number,
    	default: null
    },
    def: {
    	type: Number,
    	default: null
    },
    agility: {
    	type: Number,
    	default: null
    },
    inteligence: {
    	type: Number,
    	default: null
    },
    hp: {
    	type: Number,
    	default: null
    },
    mp: {
    	type: Number,
    	default: null
    },
    handR: {
    	type: Object,
    	default: null
    },
    handL: {
    	type: Object,
    	default: null
    },
    armorHelmet: {
    	type: Object,
    	default: null
    },
    armorChest: {
    	type: Object,
    	default: null
    },
    armorPants: {
    	type: Object,
    	default: null
    },
    armorGloves: {
    	type: Object,
    	default: null
    },
    armorBoots: {
    	type: Object,
    	default: null
    },
    bag: {
    	type: Array,
    	default: null
    },
    quests: {
    	type: Array,
    	default: null
    }
})

module.exports = mongo.model("rpgPlayerData", rpgDataSchema);