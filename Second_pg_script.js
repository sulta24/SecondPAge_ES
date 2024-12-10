let fireInterval; // Переменная для хранения интервала (цикла)
let fireCenter; // Переменная для центра огня
let spreadRadius = 50; // Радиус распространения огня
let spreadInterval = 200; // Интервал между добавлением точек (в миллисекундах)
let fireDirection = 90; // Направление огня (градусы)

// Функция для отображения изображения
function showImage(landscape) {
  const imageContainer = document.getElementById("image-container");
  const image = document.getElementById("image");
  const canvas = document.getElementById("fireCanvas");
  const ctx = canvas.getContext("2d");

  // Путь к изображениям
  const imagePath = `images/${landscape}.png`;

  // Изменяем источник изображения
  image.src = imagePath;
  image.alt = landscape;

  // Когда изображение загружено, настроим холст
  image.onload = function () {
    // Устанавливаем размер канваса
    canvas.width = image.width;
    canvas.height = image.height;

    // Отображаем изображение
    image.classList.add("active");
  };
}

// Функция для начала цикла огня
function startFireCycle(landscape) {
  const canvas = document.getElementById("fireCanvas");
  const ctx = canvas.getContext("2d");

  // Показываем изображение
  showImage(landscape);

  // Очищаем предыдущие точки огня
  if (fireInterval) {
    clearInterval(fireInterval);
  }

  // Устанавливаем начальный центр огня (середина изображения)
  fireCenter = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  // Запускаем цикл для постепенного распространения огня
  fireInterval = setInterval(() => {
    fireCenter.x += Math.cos(fireDirection * Math.PI / 180) * 5;
    fireCenter.y += Math.sin(fireDirection * Math.PI / 180) * 5;

    spreadFire(ctx, canvas.width, canvas.height, fireCenter.x, fireCenter.y, spreadRadius);
  }, spreadInterval);
}

// Функция для распространения огня
function spreadFire(ctx, width, height, startX, startY, radius) {
  const firePointsCount = 5;

  for (let i = 0; i < firePointsCount; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const x = startX + distance * Math.cos(angle);
    const y = startY + distance * Math.sin(angle);
    const size = Math.random() * 5 + 2;

    if (x >= 0 && x <= width && y >= 0 && y <= height) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }
}

// Функция для обновления параметров огня
function updateFireCycle() {
  spreadRadius = document.getElementById("radius").value;
  spreadInterval = 1000 - document.getElementById("interval").value;
  fireDirection = 180 + document.getElementById("direction").value;

  if (fireInterval) {
    clearInterval(fireInterval);
  }

  alert(`Параметры обновлены:
- Радиус распространения огня: ${spreadRadius} пикселей
- Интервал между точками: ${spreadInterval} миллисекунд
- Направление огня: ${fireDirection} градусов`);

  const image = document.getElementById("image");
  if (image.src) {
    startFireCycle(image.alt);
  }
}
