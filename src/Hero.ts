var Cache: MethodDecorator = (target : any,propertyKey,desc:PropertyDescriptor) => {
    const method = desc.value;
    desc.value = function(){
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
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

    quality = 0;
    attack = 0;
    defence = 0;
    agile = 0;
    
    exp = 0;
    totalExp = 0;
    equipments:Equipment[] = [];


    constructor(name:string,level:number,quality:number,attack:number,defence:number,agile:number){
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
        result += this.level*10+this.quality*10+this.getAttack()*5+this.getDefence()*3+this.getAglie()*4;
        return result;
    }
}

class Equipment{
    name = "";
    level = 1;
    equipmentType : number;
    quality = 0;

    attack = 0;
    defence = 0;
    agile = 0;
    isWeapon = false;
    jewels : Jewel[] = [];

    constructor(name:string,lever:number,equipmenttype:number,attack:number,defence:number,agile:number) {
        this.name = name;
        this.level = lever;
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

     get fightPower(){
        var result = 0;
        this.jewels.forEach(e => result += e.fightPower);
        return result + this.level * 10 + this.quality * 10 + this.getAttack() * 5 + this.getAglie() * 3 + this.quality * 4;

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

    get fightPower(){
        return this.level * 10 + this.attack * 5 + this.defence * 3 + this.agile * 4;
    }
}