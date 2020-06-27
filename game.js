let road = document.getElementById('road');
let castle = document.getElementById('castle');
let field = document.getElementById('field');
let towerZone = document.getElementsByClassName('tower_zone');
let viking = document.createElement('div');
let vikingsArray = [], j = 0;
let k = 0;
let castlePos = castle.getBoundingClientRect().x; //определяем расположение замка

class spawnViking { // класс для спауна викинга //
  
  constructor(name) {
    this.name = document.createElement('div');
    this.name.classList.add('viking');
    field.prepend(this.name);
    this.vikingX = this.name.getBoundingClientRect().x;
    requestAnimationFrame(this.animateViking.bind(this)); // через конструктор вызываем анимацию викинга
    this.vikingМark = false;
    this.vakingAttack = false;
    this.vikingHealth = 5;
    } 
  
  animateViking() { // анимация движения викинга
    this.name.style.left = this.vikingX + 'px';
    this.vikingX += 1;
    if (castlePos - this.vikingX < 700) {
      this.vakingAttack = true;
    }
    if (this.vikingX > castlePos) {
      this.vikingМark = true;
      this.name.remove();
      return
    }
    requestAnimationFrame(this.animateViking.bind(this));
  }
  deathViking() {
    this.name.remove();
  }

   get coord() {
    let vikingCoord = [];
    vikingCoord[0] = this.name.getBoundingClientRect().x + 50;
    vikingCoord[1] = this.name.getBoundingClientRect().y + 50;
    return vikingCoord;
    }
   get mark() {
    return this.vikingМark;
   }
   get attack() {
    return this.vakingAttack;
  }
 }


 class spawnTower { // класс для спауна башни //
  constructor(name) {
    this.tower = document.createElement('div');
    this.tower.classList.add('tower');
    this.towerLeft = towerZone[0].getBoundingClientRect().x;
    this.towerTop = towerZone[0].getBoundingClientRect().y;
    this.tower.style.top = `${this.towerTop - 10}px`;
    this.tower.style.left = `${this.towerLeft + 20}px`; 
    field.append(this.tower);
    this.distance();
  }
  distance() { // отсчет дистанции до викинга
    if (vikingsArray[k].attack) {
      this.attack();
    }
    requestAnimationFrame(this.distance.bind(this));
  }
  attack() {
    this.attack = setInterval(() => new Core(), 800);
  }
} 


class Core {
  constructor(name) { this.core(); }

    core() {
      this.core = document.createElement('div');
      this.core.classList.add('core');
      this.core.style.top = `${tower.towerTop + 20}px`;
      this.core.style.left = `${tower.towerLeft + 80}px`; 
      field.append(this.core);
      this.animation = {
        wayX : 0,
        wayY : 0, 
        totalWay : 0, 
        speed : 5, 
        speedX : 0, 
        speedY : 0, 
        wayComplete : 0, 
        speedCoefficient : 0,
        corePositionX : this.core.getBoundingClientRect().x,
        corePositionY : this.core.getBoundingClientRect().y
      };
      requestAnimationFrame(this.moveCore.bind(this));
    }

    moveCore() {
    this.core.style.left = this.animation.corePositionX + 'px';
    this.core.style.top = this.animation.corePositionY + 'px';


    this.animation.startСoreX = this.core.getBoundingClientRect().x;
    this.animation.startСoreY = this.core.getBoundingClientRect().y;

    this.animation.wayX = vikingsArray[k].coord[0] - this.animation.corePositionX;
    this.animation.wayY = vikingsArray[k].coord[1] - this.animation.corePositionY;

    this.animation.totalWay = Math.sqrt(Math.pow(this.animation.wayX, 2) + Math.pow(this.animation.wayY, 2));

    this.animation.speedCoefficient = this.animation.totalWay/this.animation.speed;

    this.animation.speedX = this.animation.wayX / this.animation.speedCoefficient;
    this.animation.speedY = this.animation.wayY / this.animation.speedCoefficient; 

    this.animation.corePositionX = this.animation.speedX + this.animation.startСoreX;
    this.animation.corePositionY = this.animation.speedY + this.animation.startСoreY;

    if (this.animation.corePositionY >= vikingsArray[k].coord[1]) {
      this.core.remove();
      vikingsArray[k].vikingHealth --;
      console.log(vikingsArray[k].vikingHealth);

    if (vikingsArray[k].vikingHealth === 0) {
      vikingsArray[k].deathViking();
      k ++;
    }
      return
    }
    requestAnimationFrame(this.moveCore.bind(this));
  }
}


vikingsArray[j] = new spawnViking();

let spawn = setInterval(function() {
  j++;
  vikingsArray[j] = new spawnViking();
  if (j > 3) {
    clearInterval(spawn);
  }
}, 2000);

let tower = new spawnTower();








