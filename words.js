// words.js
const words = [
    // Животные
    { fin: 'kissa', rus: 'кошка' },
    { fin: 'koira', rus: 'собака' },
    { fin: 'hevonen', rus: 'лошадь' },
    { fin: 'lehmä', rus: 'корова' },
    { fin: 'sika', rus: 'свинья' },
    { fin: 'lammas', rus: 'овца' },
    { fin: 'kana', rus: 'курица' },
    { fin: 'kettu', rus: 'лиса' },
    { fin: 'karhu', rus: 'медведь' },
    { fin: 'jänis', rus: 'заяц' },

    // Еда
    { fin: 'leipä', rus: 'хлеб' },
    { fin: 'voi', rus: 'масло' },
    { fin: 'maito', rus: 'молоко' },
    { fin: 'juusto', rus: 'сыр' },
    { fin: 'kananmuna', rus: 'яйцо' },
    { fin: 'liha', rus: 'мясо' },
    { fin: 'kala', rus: 'рыба' },
    { fin: 'peruna', rus: 'картофель' },
    { fin: 'omena', rus: 'яблоко' },
    { fin: 'banaani', rus: 'банан' },

    // Семья
    { fin: 'isä', rus: 'отец' },
    { fin: 'äiti', rus: 'мать' },
    { fin: 'veli', rus: 'брат' },
    { fin: 'sisko', rus: 'сестра' },
    { fin: 'poika', rus: 'сын' },
    { fin: 'tytär', rus: 'дочь' },
    { fin: 'isoisä', rus: 'дедушка' },
    { fin: 'isoäiti', rus: 'бабушка' },
    { fin: 'setä', rus: 'дядя' },
    { fin: 'täti', rus: 'тетя' },

    // Природа
    { fin: 'puu', rus: 'дерево' },
    { fin: 'kukka', rus: 'цветок' },
    { fin: 'vuori', rus: 'гора' },
    { fin: 'joki', rus: 'река' },
    { fin: 'järvi', rus: 'озеро' },
    { fin: 'meri', rus: 'море' },
    { fin: 'taivas', rus: 'небо' },
    { fin: 'aurinko', rus: 'солнце' },
    { fin: 'kuu', rus: 'луна' },
    { fin: 'tähti', rus: 'звезда' },

    // Дом
    { fin: 'talo', rus: 'дом' },
    { fin: 'ovi', rus: 'дверь' },
    { fin: 'ikkuna', rus: 'окно' },
    { fin: 'sänky', rus: 'кровать' },
    { fin: 'pöytä', rus: 'стол' },
    { fin: 'tuoli', rus: 'стул' },
    { fin: 'lamppu', rus: 'лампа' },
    { fin: 'keittiö', rus: 'кухня' },
    { fin: 'kylpyhuone', rus: 'ванная' },
    { fin: 'terassi', rus: 'терраса' },

    // Транспорт
    { fin: 'auto', rus: 'автомобиль' },
    { fin: 'bussi', rus: 'автобус' },
    { fin: 'juna', rus: 'поезд' },
    { fin: 'lentokone', rus: 'самолет' },
    { fin: 'laiva', rus: 'корабль' },
    { fin: 'polkupyörä', rus: 'велосипед' },
    { fin: 'moottoripyörä', rus: 'мотоцикл' },
    { fin: 'taksi', rus: 'такси' },
    { fin: 'metro', rus: 'метро' },
    { fin: 'vene', rus: 'лодка' },

    // Одежда
    { fin: 'paita', rus: 'рубашка' },
    { fin: 'housut', rus: 'брюки' },
    { fin: 'mekko', rus: 'платье' },
    { fin: 'takki', rus: 'куртка' },
    { fin: 'kengät', rus: 'обувь' },
    { fin: 'hattu', rus: 'шляпа' },
    { fin: 'sukat', rus: 'носки' },
    { fin: 'kaulahuivi', rus: 'шарф' },
    { fin: 'hanskat', rus: 'перчатки' },
    { fin: 'vyö', rus: 'ремень' },

    // Цвета
    { fin: 'punainen', rus: 'красный' },
    { fin: 'sininen', rus: 'синий' },
    { fin: 'keltainen', rus: 'желтый' },
    { fin: 'vihreä', rus: 'зеленый' },
    { fin: 'musta', rus: 'черный' },
    { fin: 'valkoinen', rus: 'белый' },
    { fin: 'ruskea', rus: 'коричневый' },
    { fin: 'harmaa', rus: 'серый' },
    { fin: 'oranssi', rus: 'оранжевый' },
    { fin: 'violetti', rus: 'фиолетовый' },

    // Профессии
    { fin: 'opettaja', rus: 'учитель' },
    { fin: 'lääkäri', rus: 'врач' },
    { fin: 'poliisi', rus: 'полицейский' },
    { fin: 'kokki', rus: 'повар' },
    { fin: 'insinööri', rus: 'инженер' },
    { fin: 'myyjä', rus: 'продавец' },
    { fin: 'kutoja', rus: 'ткач' },
    { fin: 'kirjailija', rus: 'писатель' },
    { fin: 'maalari', rus: 'художник' },
    { fin: 'muusikko', rus: 'музыкант' },

    // Время
    { fin: 'tunti', rus: 'час' },
    { fin: 'minuutti', rus: 'минута' },
    { fin: 'sekunti', rus: 'секунда' },
    { fin: 'aamu', rus: 'утро' },
    { fin: 'ilta', rus: 'вечер' },
    { fin: 'yö', rus: 'ночь' },
    { fin: 'vuosi', rus: 'год' },
    { fin: 'kuukausi', rus: 'месяц' },
    { fin: 'viikko', rus: 'неделя' },
    { fin: 'vuosikymmen', rus: 'десятилетие' }
];

// Добавьте остальные 500+ слов по аналогии:
// { fin: 'ФИНСКОЕ_СЛОВО', rus: 'ПЕРЕВОД' },
// ... 
// ... 
// ... 

// Всего 600+ слов
