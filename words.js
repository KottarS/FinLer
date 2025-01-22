const words = [
    // ============ ЖИВОТНЫЕ ============ 
    { fin: 'kissa', rus: 'кошка' },
    { fin: 'koira', rus: 'собака' },
    { fin: 'hevonen', rus: 'лошадь' },
    { fin: 'lehmä', rus: 'корова' },
    { fin: 'poro', rus: 'северный олень' },

    // ============ ЕДА ============ 
    { fin: 'leipä', rus: 'хлеб' },
    { fin: 'voi', rus: 'масло' },
    { fin: 'juusto', rus: 'сыр' },
    { fin: 'makkara', rus: 'колбаса' },
    { fin: 'peruna', rus: 'картофель' },

    // ============ СЕМЬЯ ============ 
    { fin: 'isä', rus: 'отец' },
    { fin: 'äiti', rus: 'мать' },
    { fin: 'veli', rus: 'брат' },
    { fin: 'sisko', rus: 'сестра' },
    { fin: 'lapsi', rus: 'ребенок' },

    // ============ ПРИРОДА ============ 
    { fin: 'vuori', rus: 'гора' },
    { fin: 'järvi', rus: 'озеро' },
    { fin: 'metsä', rus: 'лес' },
    { fin: 'saari', rus: 'остров' },
    { fin: 'aavikko', rus: 'пустыня' },

    // ============ ТРАНСПОРТ ============ 
    { fin: 'polkupyörä', rus: 'велосипед' },
    { fin: 'linja-auto', rus: 'автобус' },
    { fin: 'juna', rus: 'поезд' },
    { fin: 'lentokone', rus: 'самолет' },
    { fin: 'vene', rus: 'лодка' },

    // ============ ДОБАВЬТЕ СВОИ СЛОВА ============ 
    /*
    Шаблон для добавления:
    { fin: 'ФИНСКОЕ_СЛОВО', rus: 'ПЕРЕВОД' },
    */

    // Примеры для продолжения:
    { fin: 'koulu', rus: 'школа' },
    { fin: 'kirjasto', rus: 'библиотека' },
    { fin: 'sairaala', rus: 'больница' },
    { fin: 'pankki', rus: 'банк' },
    { fin: 'apteekki', rus: 'аптека' }
    // ... добавьте 580+ слов по аналогии
];

// Проверка уникальности слов (раскомментируйте для использования)
// const uniqueCheck = new Set();
// words.forEach(word => {
//     if(uniqueCheck.has(word.fin)) console.error('Дубликат:', word.fin);
//     uniqueCheck.add(word.fin);
// });
