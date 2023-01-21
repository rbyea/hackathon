import {Module} from '@/core/module'
//Подключаю стили для canvas
import '../stylesShape.css'
//Импортирую функции случайного числа и цвета
import {random, getRandomColor} from '@/utils'
//Импортирую константы для настроек количества и размеров фигур
import  {SettingsShape} from '@/core/constants/settingsShape'

export class ShapeModule extends Module {
    trigger() {


        //Создаю canvas и добавляю в body
        const canvas = document.createElement('canvas');
        document.body.append(canvas);

        //Режим работы canvas 2d
        const ctx = canvas.getContext('2d');

        //Массив с фигурами. Изначально пустой
        const shapes = [];

        //Количество групп. Группа - это круг, треугольник и квадрат
        const shapesNum = SettingsShape.shapesNum;

        //Задаю размер canvas равный размеру окна. И сохраняю размеры в переменные
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        //Вешаю обработчик resize на window на случай, если размеры окна изменятся
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

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
            //Радиус для круга
            this.r = SettingsShape.r; //Если увеличить - круги будут больше
            //Сторона квардрата и треугольника
            this.ww = SettingsShape.ww; //Если увеличить - фигуры будут больше
            //Параметры поворота фигуры. Нужно для анимации
            this.rotate = Math.random() * Math.PI;
            //Случайный цвет
            this.color = getRandomColor();

            this.draw = () => {
                if (shape === 'circle') {
                    //Сохраняю все состояние холста, помещая текущее состояние в стек
                    ctx.save();
                    //Создаю новый путь. Нужно для начала процесса рисования.
                    ctx.beginPath();
                    //Рисую круг
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    //Закрываю путь. Заканчиваю процесс рисования
                    ctx.closePath();
                    //Задаю цвет
                    ctx.fillStyle = this.color;
                    //Делаю заливку этим цветом
                    ctx.fill();
                    //Восстанавливаею последнее сохраненное состояние холста
                    ctx.restore();
                }
                if (shape === 'square') {
                    ctx.save();
                    //Задаю параметры сдвига квадрата. Нужно для анимации.
                    ctx.translate(this.x + this.ww / 2, this.y + this.ww / 2);
                    ctx.rotate(this.rotate);
                    ctx.translate(-this.x - this.ww / 2, -this.y - this.ww / 2);
                    //Рисую квадрат
                    ctx.fillStyle = this.color;
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
                    ctx.fillStyle = this.color;
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
            const callbackAnimate = requestAnimationFrame(animate);

            //Удаляю canvas по нажатию любой кнопки мыши
            //Можно обойтись только canvas.remove(), но читал, что могут быть утечки памяти
            canvas.addEventListener('mousedown', () => {
                cancelAnimationFrame(callbackAnimate);
                clearCanvas();
                canvas.remove();
            })
        }

        function init() {
            //Создаю элементы и пушу в массив
            for (let i = 0; i < shapesNum; i++) {
                let shape = new CreateShapes('circle');
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
