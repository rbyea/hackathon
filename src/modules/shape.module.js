import {Module} from '../core/module'
//Импортирую функции случайного числа и цвета
import {random, getRandomColor} from '../utils'
//Импортирую константы для настроек количества и размеров фигур
import {SettingsShape} from '../core/constants/settingsShape'

export class ShapeModule extends Module {
    trigger() {

        let canvas = null;
        let ctx = null;
        let w = 0;
        let h = 0;

        let callbackAnimate;

        //Массив с фигурами. Изначально пустой
        let shapes = [];

        //Количество групп. Группа - это круг, треугольник и квадрат
        let shapesNum = SettingsShape.shapesNum;

        //Функция очищения canvas
        function clearCanvas() {
            ctx.clearRect(0, 0, w, h);
        }

        //Функция создания фигур
        function CreateShapes(shape) {
            //Задаю исходные случайные параметры для фигур
            //x,y Координаты исходной точки
            this.x = random(0, w);
            this.y = random(0, h);
            //Координаты для сдвига фигуры. Скорость двихения по x,y Пришлось вспомнить геомертию.
            this.vx = SettingsShape.vx;
            this.vy = SettingsShape.vy;
            //Радиус для круга и x радиус элипса
            this.rx = SettingsShape.rx; //Если увеличить - круги будут больше
            this.ry = SettingsShape.ry;
            //Сторона квардрата и треугольника
            this.ww = SettingsShape.ww; //Если увеличить - фигуры будут больше
            //Параметры поворота фигуры. Нужно для анимации
            this.rotate = Math.random() * Math.PI;

            this.gradient = ctx.createLinearGradient(0, 0, w, h);
            this.gradient.addColorStop(0, getRandomColor());
            this.gradient.addColorStop(1, getRandomColor());

            this.draw = () => {
                if (shape === 'circle') {
                    //Сохраняю все состояние холста, помещая текущее состояние в стек
                    ctx.save();
                    //Создаю новый путь. Нужно для начала процесса рисования.
                    ctx.beginPath();
                    //Рисую круг
                    ctx.arc(this.x, this.y, this.rx, 0, 2 * Math.PI, false);
                    //Закрываю путь. Заканчиваю процесс рисования
                    ctx.closePath();
                    this.circleGradient = ctx.createLinearGradient(this.x, this.y, this.x + SettingsShape.rx, this.y);
                    this.circleGradient.addColorStop(0, getRandomColor());
                    this.circleGradient.addColorStop(1, getRandomColor());
                    //Задаю цвет
                    ctx.fillStyle = this.circleGradient;
                    //Делаю заливку этим цветом
                    ctx.fill();
                    //Восстанавливаею последнее сохраненное состояние холста
                    ctx.restore();
                }
                if (shape === 'ellipse') {
                    ctx.save();
                    ctx.translate(this.x + this.ww / 2, this.y + this.ww / 3);
                    ctx.rotate(this.rotate);
                    ctx.translate(-this.x - this.ww / 2, -this.y - this.ww / 3);
                    ctx.beginPath();
                    ctx.ellipse(this.x, this.y, this.rx, this.ry, Math.PI / 4, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fillStyle = this.gradient;
                    ctx.fill();
                    ctx.restore();
                }
                if (shape === 'square') {
                    ctx.save();
                    //Задаю параметры сдвига квадрата. Нужно для анимации.
                    ctx.translate(this.x + this.ww / 2, this.y + this.ww / 2);
                    ctx.rotate(this.rotate);
                    ctx.translate(-this.x - this.ww / 2, -this.y - this.ww / 2);
                    //Рисую квадрат
                    ctx.fillStyle = this.gradient;
                    ctx.fillRect(this.x, this.y, this.ww, this.ww);
                    ctx.restore();
                }
                if (shape === 'triangle') {
                    ctx.save();
                    ctx.translate(this.x + this.ww / 3, this.y + this.ww / 3);
                    ctx.rotate(this.rotate);
                    ctx.translate(-this.x - this.ww / 3, -this.y - this.ww / 3);
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x, this.y + this.ww);
                    ctx.lineTo(this.x + this.ww, this.y);
                    ctx.closePath();
                    ctx.fillStyle = this.gradient;
                    ctx.fill();
                    ctx.restore();
                }
            };
        }

        //Анимация
        function animate() {
            clearCanvas();
            for (let i = 0; i < shapes.length; i++) {
                shapes[i].x += shapes[i].vx;
                shapes[i].y += shapes[i].vy;
                if (shapes[i].x >= w || shapes[i].x <= 0) {
                    shapes[i].vx = -shapes[i].vx;
                }
                if (shapes[i].y >= h || shapes[i].y <= 0) {
                    shapes[i].vy = -shapes[i].vy;
                }
                shapes[i].x > w ? shapes[i].x = w : shapes[i].x;
                shapes[i].y > h ? shapes[i].y = h : shapes[i].y;
                shapes[i].x < 0 ? shapes[i].x = 0 : shapes[i].x;
                shapes[i].y < 0 ? shapes[i].y = 0 : shapes[i].y;

                //Скорость вращения вокруг своей оси
                shapes[i].rotate += SettingsShape.rotation;
                shapes[i].draw();
            }
            //Запускаю анимацию и сохраняю возвращаемое значение, чтобы потом остановить анимацию
            //Рекурсивный вызов. Картинка будет обновляться, с частотой, равной частоте экрана
            callbackAnimate = requestAnimationFrame(animate);

        }

        function createElement(element, parameters, parent) {
            const el = document.createElement(element);
            if (parameters.className)
                Array.isArray(parameters.className)
                    ? parameters.className.forEach(i => el.classList.add(i))
                    : el.className = parameters.className;
            if (parameters.style)
                parameters.style.forEach(param => el.style[param.name] = param.value);
            if (parameters.dataset)
                el.dataset[parameters.dataset.name] = parameters.dataset.value;
            if (parameters.type)
                el.type = parameters.type;
            if (parameters.id)
                el.id = parameters.id;
            if (parameters.htmlFor)
                el.htmlFor = parameters.htmlFor;
            if (parameters.text)
                el.textContent = parameters.text;
            if (parameters.position)
                el.position = parameters.position;
            Array.from(document.querySelectorAll(parent)).at(-1).append(el);
        }

        function render() {

            document.body.style.padding = '0';
            createElement('div',
                {
                    className: 'container',
                    style: [{
                        name: 'height',
                        value: '100%'
                    },
                        {
                            name: 'display',
                            value: 'flex'
                        },
                        {
                            name: 'flex-direction',
                            value: 'column'
                        },
                        {
                            name: 'box-sizing',
                            value: 'border-box'
                        },
                        {
                            name: 'backgroundColor',
                            value: '#222'
                        },
                    ]
                },
                'body'
            );
            createElement('canvas',
                {
                    style: [{
                        name: 'flex-grow',
                        value: '1'
                    }]
                },
                '.container')
            createElement('div', {
                    className: 'controlPanel',
                    style: [
                        {
                            name: 'display',
                            value: 'flex'
                        },
                        {
                            name: 'flex-wrap',
                            value: 'wrap-reverse'
                        },
                        {
                            name: 'justify-content',
                            value: 'space-around'
                        },
                    ]
                },
                '.container');
            const label = [{
                clasName: 'quantity',
                text: 'Количество'
            },
                {
                    clasName: 'speed',
                    text: 'Траектория'
                },
                {
                    clasName: 'size',
                    text: 'Размер'
                },
                {
                    clasName: 'rotation',
                    text: 'Вращение'
                }];
            label.forEach(label => {
                createElement('div',
                    {
                        className: `${label.clasName}`,
                        style: [
                            {
                                name: 'color',
                                value: '202030'
                            },
                            {
                                name: 'width',
                                value: '270px'
                            },
                            {
                                name: 'display',
                                value: 'flex'
                            },
                            {
                                name: 'justify-content',
                                value: 'space-between'
                            },
                            {
                                name: 'align-items',
                                value: 'center'
                            },
                            {
                                name: 'margin',
                                value: '10px 0'
                            },
                            {
                                name: 'backgroundColor',
                                value: '#222'
                            },
                            {
                                name: 'color',
                                value: '#E0FFFF'
                            }
                        ]
                    },
                    '.controlPanel');

                createElement('button',
                    {
                        className: `decrement_${label.clasName}`,
                        text: '-',
                        style: [
                            {
                                name: 'font-size',
                                value: '40px'
                            },
                            {
                                name: 'border-radius',
                                value: '50%'
                            },
                            {
                                name: 'width',
                                value: '40px'
                            },
                            {
                                name: 'cursor',
                                value: 'pointer'
                            }
                        ]
                    },
                    `.${label.clasName}`
                );

                createElement('label',
                    {
                        text: `${label.text}`,
                        style: [
                            {
                                name: 'font-size',
                                value: '30px'
                            },
                            {
                                name: 'display',
                                value: 'inline-block'
                            },
                        ]
                    },
                    `.${label.clasName}`);
                createElement('button',
                    {
                        className: `increment_${label.clasName}`,
                        text: '+',
                        style: [
                            {
                                name: 'font-size',
                                value: '40px'
                            },
                            {
                                name: 'border-radius',
                                value: '50%'
                            },
                            {
                                name: 'width',
                                value: '40px'
                            },
                            {
                                name: 'cursor',
                                value: 'pointer'
                            }
                        ]
                    },
                    `.${label.clasName}`
                )
            });
            createElement('button',
                {
                    className: 'exit',
                    text: 'Выйти',
                    style: [
                        {
                            name: 'font-size',
                            value: '30px'
                        },
                        {
                            name: 'backgroundColor',
                            value: '#222'
                        },
                        {
                            name: 'color',
                            value: '#E0FFFF'
                        },
                        {
                            name: 'border',
                            value: 'none'
                        },
                        {
                            name: 'cursor',
                            value: 'pointer'
                        }
                    ]
                },
                '.controlPanel'
            )
        }

        function clearWindow() {
            cancelAnimationFrame(callbackAnimate);
            clearCanvas();
            const container = document.querySelector('.container');
            container.replaceChildren();
            container.remove();
        }

        function controlPanel() {

            document.querySelector('.controlPanel').addEventListener('click', event => {
                const isButton = event.target.closest(".controlPanel");
                if (isButton && event.target.classList.contains("exit"))
                    clearWindow()


                if (isButton && event.target.classList.contains("decrement_quantity")) {
                    shapesNum--;
                    shapes = [];
                    if (!shapesNum) {
                        document.querySelector('.decrement_quantity').disabled = true;
                        clearCanvas();
                        return;
                    }
                    clearWindow();
                    init();
                }

                if (isButton && event.target.classList.contains("increment_quantity")) {
                    if (shapesNum)
                        document.querySelector('.decrement_quantity').disabled = false;
                    shapesNum++;
                    shapes = [];
                    clearWindow();
                    init();
                }

                if (isButton && event.target.classList.contains("decrement_speed")) {
                    SettingsShape.vx -= 0.05;
                    SettingsShape.vy -= 0.05;
                    shapes = [];
                    clearWindow();
                    init();
                    if (SettingsShape.vx < -1 || SettingsShape.vy < -1) {
                        document.querySelector('.decrement_speed').disabled = true;

                    }
                    if (SettingsShape.vx < 1 || SettingsShape.vy < 1) {
                        document.querySelector('.increment_speed').disabled = false;
                    }

                }

                if (isButton && event.target.classList.contains("increment_speed")) {
                    SettingsShape.vx += 0.05;
                    SettingsShape.vy += 0.05;
                    shapes = [];
                    clearWindow();
                    init();
                    if (SettingsShape.vx > -1 || SettingsShape.vy > -1) {
                        document.querySelector('.decrement_speed').disabled = false;

                    }
                    if (SettingsShape.vx > 1 || SettingsShape.vy > 1) {
                        document.querySelector('.increment_speed').disabled = true;

                    }

                }
                if (isButton && event.target.classList.contains("decrement_size")) {
                    SettingsShape.rx -= 5;
                    //Радиус y элипса
                    SettingsShape.ry -= 5;
                    //Сторона квардрата и треугольника. По умолчанию ww : random(25, 50)
                    SettingsShape.ww -= 5
                    shapes = [];
                    clearWindow();
                    init();
                    if (!SettingsShape.rx || !SettingsShape.ry || !SettingsShape.ww) {
                        document.querySelector('.decrement_size').disabled = true;
                    }
                }
                if (isButton && event.target.classList.contains("increment_size")) {
                    SettingsShape.rx += 5;
                    //Радиус y элипса
                    SettingsShape.ry += 5;
                    //Сторона квардрата и треугольника. По умолчанию ww : random(25, 50)
                    SettingsShape.ww += 5
                    shapes = [];
                    clearWindow();
                    init();
                    if (SettingsShape.rx && !SettingsShape.ry && !SettingsShape.ww) {
                        document.querySelector('.decrement_size').disabled = false;
                    }
                }
                if (isButton && event.target.classList.contains("decrement_rotation")) {
                    SettingsShape.rotation -= 0.05;
                    shapes = [];
                    clearWindow();
                    init();
                }
                if (isButton && event.target.classList.contains("increment_rotation")) {
                    SettingsShape.rotation += 0.05;
                    shapes = [];
                    clearWindow();
                    init();
                }

            })
        }

        function init() {

            render();
            controlPanel();
            canvas = document.querySelector('canvas');
            ctx = canvas.getContext('2d');
            w = canvas.width = canvas.clientWidth;
            h = canvas.height = canvas.clientHeight;
            //Создаю элементы и пушу в массив
            for (let i = 0; i < shapesNum; i++) {
                let shape = new CreateShapes('circle');
                shapes.push(shape);
                shape = new CreateShapes('ellipse');
                shapes.push(shape);
                shape = new CreateShapes('triangle');
                shapes.push(shape);
                shape = new CreateShapes('square');
                shapes.push(shape);
            }

            requestAnimationFrame(animate);
        }

        //Запуск модуля
        init();
    }
}