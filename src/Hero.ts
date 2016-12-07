var Cache: MethodDecorator = (target : any,propertyKey,descriptor : PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function(){
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
}

enum Quality {
    WHITE = 1,
    GREEN = 1.1,
    BLUE = 1.2,
    PURPLE = 1.4,
    ORAGE = 1.8
}

enum WeaponType {
    HANDSWORD = 1,
    GREATSWORD = 1.8,
    AXE = 2,
    KATANA = 1.5,
    HAMMER = 2.5
}

enum ArmorType{
    LIGHTARMOR = 1,
    LEATHERARMOR = 1.4,
    PLATEARMOR = 2,
    HEAVYARMOR = 2.4,
    NOTHINGTOWEAR = 0.2
}

enum JewelPromotion{
    ATTACKPRMOTE = 1,
    DEFENCEPRMOTE = 2,
    AGILEPRMOTE = 3,
}
enum equipmentType{
    SWORD = 1,
    KNIFE = 2,
    AXE = 3,
    GUN = 4,
}



class User{
    name = "";
    level = 1;
    exp = 0;
    totalExp = 0;
    gold = 0;
    diamondNum = 0;
    
    __heros : Hero [] = [];
    __herosInTeam : Hero[] = [];
    
    constructor(name : string){
       this.name = name;
    }

    @Cache
     getTotalExp(){
         this.totalExp = this.level * 20;
         return this.totalExp;
     }

    public addHeros(hero : Hero){
       this.__heros.push(hero);
    }


    public addHeroInTeam(hero : Hero){
       this.__herosInTeam.push(hero);
    }

    
}

class Hero{
    
    name = "";
    level = 1;
    isInTeam : boolean = false;
    
    maxHP = 0;
    curHP = 0;
    totalHP = 0;

    quality  = 0;
    attack = 0;
    defence = 0;
    agile = 0;
    
    exp = 0;
    totalExp = 0;
    equipments : Equipment[] = [];


    constructor(name:string,level:number,quality:Quality,attack:number,defence:number,agile:number){
       this.name = name;
       this.level = level;
       this.quality = quality;
       this.attack = attack;
       this.defence = defence;
       this.agile = agile;
    }
    public addEquipment(equipment : Equipment){

        this.equipments.push(equipment);
    }

     @Cache
     getTotalExp(){
         this.totalExp = this.level * 20;
         return this.totalExp;
     }

    @Cache
    getMaxHP(){
        return this.level * this.quality * 10;
    }
    
    @Cache
    getAttack(){
        var result = 0;
         this.equipments.forEach(e => result += e.attack);
        result += this.level * this.quality * 50;
        return result;
    }

    @Cache
    getDefence(){
        var result = 0;
        this.equipments.forEach(e => result += e.defence);
       result += this.level * this.quality * 30;
        return result;
    }

    @Cache
    getAglie(){
        var result = 0;
        this.equipments.forEach(e => result += e.agile);
        result += this.level * this.quality * 40;
        return result;
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.equipments.forEach(e => result += e.fightPower);
        result += (10 + this.getAttack() * 10 + this.getDefence() * 8 + this.getAglie() * 6) * this.level * this.quality;
        return result;
    }
}

class Equipment{
    name = "";
    level = 1;
    equipmentType : number;
    quality  = 0;

    attack = 0;
    defence = 0;
    agile = 0;
    isWeapon = false;
    
    jewels : Jewel[] = [];

    constructor(name:string,equipmenttype:number,attack:number,defence:number,agile:number) {
        this.name = name;
        this.equipmentType = equipmenttype;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }

    public addJewl(jewel : Jewel){
        this.jewels.push(jewel);
    }
    
     @Cache
     getAttack(){
         var result = 0;
         this.jewels.forEach(e => result += e.attack);
         return result;
     }

     @Cache
     getDefence(){
         var result = 0;
         this.jewels.forEach(e => result += e.defence);
         return result;
     }

     @Cache
     getAglie(){
         var result = 0;
         this.jewels.forEach(e => result += e.agile);
         return result;
     }

     @Cache
     get fightPower(){
        var result = 0;
        this.jewels.forEach(e => result += e.fightPower);
        return result + this.quality * 10 + this.getAttack() * 50 + this.getAglie() * this.quality * 40;

    }

}

class Jewel{
    level = 1;
    attack = 0;
    defence = 0;
    agile = 0;

    constructor(level:number,attack:number,defence:number,agile:number){
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.agile = agile;
    }

    @Cache
    get fightPower(){
        return this.level * 10 + this.attack * 50 + this.defence * 30 + this.agile * 40;
    }
}