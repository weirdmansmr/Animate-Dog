let playerState = 'idle' // базовое положение и переключение с помощью селектора html
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1') // работа с canvas
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImage = new Image() // изображение
playerImage.src = 'shadow_dog.png'
const spriteWidth = 575 // ширина / максимальное количество фреймов (12)
const spriteHeight = 523 // высота / количество положений (10)

let gameFrame = 0 // позволяет анимации... анимироваться :)
const staggerFrames = 6 // фрейм - чем ниже, тем быстрее анимация
const spriteAnimations = []
const animationStates = [ //количество фреймов каждой анимаций
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'gethit',
        frames: 4
    }
]

animationStates.forEach((state, index) => {
    /* нужно для того, чтобы в position в 80 строке 
       можно было динамически менять значение под
       количество спрайтов и не было нехватки анимации или бликов */
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let PositionX = j * spriteWidth // выбор спрайта по оси X
        let PositionY = index * spriteHeight // выбор спрайта по оси Y
        frames.loc.push({
            x: PositionX,
            y: PositionY
        })
        
    }
    spriteAnimations[state.name] = frames // передаём координаты для нужного спрайта
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // заготовка места для спрайта
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length
    // сама переменная, где и анимируется изображение посредством быстрой смены позиции
    let frameX = spriteWidth * position // начало обрезки изображения по оси Х
    let frameY = spriteAnimations[playerState].loc[position].y // и оси Y
    
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    // вырисовка нужного спрайта
    gameFrame++
    requestAnimationFrame(animate) // улучшенная версия setTime для анимаций и меньшей нагрузки
}
animate()