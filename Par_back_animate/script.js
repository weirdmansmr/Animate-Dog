const canvas = document.getElementById('canvas2')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700
let gameSpeed = 5

const backgroundLayer1 = new Image()
backgroundLayer1.src = 'Images/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = 'Images/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = 'Images/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = 'Images/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = 'Images/layer-5.png'

const slider = document.getElementById('slider')
slider.value = gameSpeed
const showGameSpeed = document.getElementById('showGameSpeed')
showGameSpeed.innerHTML = gameSpeed
slider.addEventListener('change', function(e) {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = e.target.value
})

class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 2400 // ширина объектов
        this.height = 700 // высота
        this.image = image // изображения
        this.speedModifier = speedModifier // множители скорости
        this.speed = gameSpeed * this.speedModifier // конечная скорость
    }
    // цикличное повторение
    update() {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width) {
            this.x = 0
        }
        this.x = this.x - this.speed
    }
    // вырисовка изображения (2 раза друг за другом, чтобы не было пустых зон)
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2) // ввод изображения и множителей скорости
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate() {
    // очистка поля после каждого кадра (чтоб не было размазок)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    /* в строке выше ввели переменные layerN в массив
       чтобы через цикл forEach можно было 1 раз задать
       update() и draw(), а не по 5 раз*/
    gameObjects.forEach(object => {
        object.update()
        object.draw()
    })
    requestAnimationFrame(animate)
}
animate()