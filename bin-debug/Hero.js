var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, desc) {
    var method = desc.value;
    desc.value = function () {
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var equipmentType;
(function (equipmentType) {
    equipmentType[equipmentType["SWORD"] = 1] = "SWORD";
    equipmentType[equipmentType["KNIFE"] = 2] = "KNIFE";
    equipmentType[equipmentType["AXE"] = 3] = "AXE";
    equipmentType[equipmentType["GUN"] = 4] = "GUN";
})(equipmentType || (equipmentType = {}));
var User = (function () {
    function User(name) {
        this.name = "";
        this.level = 1;
        this.exp = 0;
        this.totalExp = 0;
        this.gold = 0;
        this.diamondNum = 0;
        this.__heros = [];
        this.__herosInTeam = [];
        this.name = name;
    }
    var d = __define,c=User,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = this.level * 20;
        return this.totalExp;
    };
    p.addHeros = function (hero) {
        this.__heros.push(hero);
    };
    p.addHeroInTeam = function (hero) {
        this.__herosInTeam.push(hero);
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(name, level, quality, attack, defence, agile) {
        this.name = "";
        this.level = 1;
        this.isInTeam = false;
        this.maxHP = 0;
        this.curHP = 0;
        this.totalHP = 0;
        this.quality = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.exp = 0;
        this.totalExp = 0;
        this.equipments = [];
        this.name = name;
        this.level = level;
        this.quality = quality;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }
    var d = __define,c=Hero,p=c.prototype;
    p.addEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    p.getTotalExp = function () {
        this.totalExp = this.level * 20;
        return this.totalExp;
    };
    p.getMaxHP = function () {
        return this.level * this.quality * 10;
    };
    p.getAttack = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.attack; });
        result += this.level * this.quality * 50;
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.defence; });
        result += this.level * this.quality * 30;
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.agile; });
        result += this.level * this.quality * 40;
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.fightPower; });
        result += this.level * 10 + this.quality * 10 + this.getAttack() * 5 + this.getDefence() * 3 + this.getAglie() * 4;
        return result;
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getMaxHP", null);
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(name, lever, equipmenttype, attack, defence, agile) {
        this.name = "";
        this.level = 1;
        this.quality = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.isWeapon = false;
        this.jewels = [];
        this.name = name;
        this.level = lever;
        this.equipmentType = equipmenttype;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewl = function (jewel) {
        this.jewels.push(jewel);
    };
    p.getAttack = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.attack; });
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.defence; });
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.jewels.forEach(function (e) { return result += e.agile; });
        return result;
    };
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.fightPower; });
            return result + this.level * 10 + this.quality * 10 + this.getAttack() * 5 + this.getAglie() * 3 + this.quality * 4;
        }
    );
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(level, attack, defence, agile) {
        this.level = 1;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            return this.level * 10 + this.attack * 5 + this.defence * 3 + this.agile * 4;
        }
    );
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Hero.js.map