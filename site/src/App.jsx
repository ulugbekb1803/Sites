import { useState, useEffect, useCallback } from "react";
import styles from "./App.module.css";

/* ═══════════════════════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════════════════════ */
const T = {
  ru: {
    site:"LinguaFlow",tagline:"Открой мир языков",loginTitle:"Добро пожаловать",loginSub:"Войдите в аккаунт",
    name:"Имя",email:"Email",password:"Пароль",loginBtn:"Войти",regBtn:"Регистрация",
    noAcc:"Нет аккаунта?",hasAcc:"Уже есть аккаунт?",namePh:"Ваше имя",emailPh:"example@mail.com",passPh:"Минимум 6 символов",
    chooseLang:"Выберите язык для изучения",settings:"Настройки",home:"Главная",
    dark:"Тёмная тема",light:"Светлая тема",ifLang:"Язык интерфейса",
    online:"онлайн",total:"учеников всего",correct:"Правильно! 🎉",wrong:"Неверно 😔",
    next:"Далее",finish:"Завершить",retry:"Попробовать снова",back:"К уровням",
    done:"Уровень пройден!",score:"Ваш результат",start:"Начать",locked:"Заблокировано",
    hint:"Пройдите предыдущий уровень",welcome:"С возвращением",cont:"Продолжить обучение",
    check:"Проверить",typeAns:"Введите ответ...",why:"Почему LinguaFlow?",
    f1:"Адаптивные задания",f1d:"Система подстраивается под уровень",
    f2:"Живые примеры",f2d:"Реальные диалоги и ситуации",
    f3:"Геймификация",f3d:"Зарабатывай очки и открывай уровни",
    logout:"Выйти",confirmOut:"Выйти из аккаунта?",yes:"Да",no:"Нет",
    fillAll:"Заполните все поля",shortPass:"Пароль слишком короткий",
    badEmail:"Неверный формат email",badLogin:"Неверный email или пароль",
    streak:"Дней подряд",xp:"Очки XP",filter:"Поиск языков...",
    videoTitle:"Видео уроки",videoSub:"Учись с носителями языка",watchVideo:"Смотреть урок",
  },
  en: {
    site:"LinguaFlow",tagline:"Discover the World of Languages",loginTitle:"Welcome Back",loginSub:"Sign in to your account",
    name:"Name",email:"Email",password:"Password",loginBtn:"Sign In",regBtn:"Register",
    noAcc:"No account?",hasAcc:"Already have an account?",namePh:"Your name",emailPh:"example@mail.com",passPh:"At least 6 characters",
    chooseLang:"Choose a language to learn",settings:"Settings",home:"Home",
    dark:"Dark Mode",light:"Light Mode",ifLang:"Interface Language",
    online:"online",total:"total students",correct:"Correct! 🎉",wrong:"Wrong 😔",
    next:"Next",finish:"Finish",retry:"Try Again",back:"Back to Levels",
    done:"Level Complete!",score:"Your Score",start:"Start",locked:"Locked",
    hint:"Complete previous level",welcome:"Welcome back",cont:"Continue Learning",
    check:"Check",typeAns:"Type your answer...",why:"Why LinguaFlow?",
    f1:"Adaptive Tasks",f1d:"System adapts to your level",
    f2:"Real Examples",f2d:"Actual dialogues and situations",
    f3:"Gamification",f3d:"Earn points and unlock levels",
    logout:"Log Out",confirmOut:"Log out of account?",yes:"Yes",no:"No",
    fillAll:"Fill in all fields",shortPass:"Password too short",
    badEmail:"Invalid email format",badLogin:"Invalid email or password",
    streak:"Day Streak",xp:"XP Points",filter:"Search languages...",
    videoTitle:"Video Lessons",videoSub:"Learn with native speakers",watchVideo:"Watch Lesson",
  },
  uz: {
    site:"LinguaFlow",tagline:"Tillar Olamini Kashf Et",loginTitle:"Xush Kelibsiz",loginSub:"Hisobingizga kiring",
    name:"Ism",email:"Email",password:"Parol",loginBtn:"Kirish",regBtn:"Ro'yxatdan o'tish",
    noAcc:"Hisob yo'qmi?",hasAcc:"Hisob bormi?",namePh:"Ismingiz",emailPh:"example@mail.com",passPh:"Kamida 6 belgi",
    chooseLang:"O'rganish uchun til tanlang",settings:"Sozlamalar",home:"Bosh sahifa",
    dark:"Tungi rejim",light:"Kunduzgi rejim",ifLang:"Interfeys tili",
    online:"onlayn",total:"jami o'quvchilar",correct:"To'g'ri! 🎉",wrong:"Noto'g'ri 😔",
    next:"Keyingisi",finish:"Tugatish",retry:"Qayta urinish",back:"Darajalarga qaytish",
    done:"Daraja tugallandi!",score:"Natijangiz",start:"Boshlash",locked:"Qulfli",
    hint:"Oldingi darajani bajaring",welcome:"Xush kelibsiz",cont:"O'rganishni davom ettirish",
    check:"Tekshirish",typeAns:"Javobingizni kiriting...",why:"Nima uchun LinguaFlow?",
    f1:"Moslashuvchan vazifalar",f1d:"Tizim darajangizga moslashadi",
    f2:"Real misollar",f2d:"Haqiqiy muloqotlar",
    f3:"Geymifikatsiya",f3d:"Ball yig'ing va darajalarni oching",
    logout:"Chiqish",confirmOut:"Hisobdan chiqish?",yes:"Ha",no:"Yo'q",
    fillAll:"Barcha maydonlarni to'ldiring",shortPass:"Parol juda qisqa",
    badEmail:"Noto'g'ri email formati",badLogin:"Noto'g'ri email yoki parol",
    streak:"Kunlik seriya",xp:"XP ballari",filter:"Tillarni qidirish...",
    videoTitle:"Video darslar",videoSub:"Ona tili sohiblari bilan o'rganing",watchVideo:"Darsni ko'rish",
  },
};

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const LANGUAGES = [
  { id:"en",name:"English",ru:"Английский",uz:"Inglizcha",flag:"🇬🇧",color:"#2563eb",grad:"linear-gradient(135deg,#1e3a8a,#3b82f6)",learners:24830,img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",desc:"Язык международного общения" },
  { id:"ru",name:"Русский",ru:"Русский",uz:"Ruscha",flag:"🇷🇺",color:"#dc2626",grad:"linear-gradient(135deg,#7f1d1d,#ef4444)",learners:18450,img:"https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80",desc:"Один из богатейших языков мира" },
  { id:"uz",name:"O'zbek",ru:"Узбекский",uz:"O'zbek",flag:"🇺🇿",color:"#16a34a",grad:"linear-gradient(135deg,#14532d,#22c55e)",learners:12670,img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",desc:"Язык Центральной Азии" },
  { id:"de",name:"Deutsch",ru:"Немецкий",uz:"Nemischa",flag:"🇩🇪",color:"#d97706",grad:"linear-gradient(135deg,#78350f,#f59e0b)",learners:9340,img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",desc:"Язык науки и философии" },
  { id:"fr",name:"Français",ru:"Французский",uz:"Fransuzcha",flag:"🇫🇷",color:"#7c3aed",grad:"linear-gradient(135deg,#4c1d95,#8b5cf6)",learners:11200,img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",desc:"Язык любви и искусства" },
  { id:"es",name:"Español",ru:"Испанский",uz:"Ispancha",flag:"🇪🇸",color:"#ea580c",grad:"linear-gradient(135deg,#7c2d12,#f97316)",learners:15600,img:"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80",desc:"Язык страсти и культуры" },
];

const LEVELS = [
  { id:"beginner",         label:"Beginner",          ru:"Начинающий",     xp:0,    color:"#22c55e",icon:"🌱" },
  { id:"elementary",       label:"Elementary",        ru:"Элементарный",   xp:80,   color:"#84cc16",icon:"🌿" },
  { id:"pre-intermediate", label:"Pre-Intermediate",  ru:"Ниже среднего",  xp:200,  color:"#eab308",icon:"⭐" },
  { id:"intermediate",     label:"Intermediate",      ru:"Средний",        xp:400,  color:"#f97316",icon:"🔥" },
  { id:"upper-intermediate",label:"Upper-Intermediate",ru:"Выше среднего", xp:700,  color:"#ef4444",icon:"💎" },
  { id:"advanced",         label:"Advanced",          ru:"Продвинутый",    xp:1100, color:"#8b5cf6",icon:"👑" },
];

const VIDEOS = {
  en:[{id:"rJZ6sJSJmDQ",title:"English for Beginners"},{id:"4N9bFMX7YJI",title:"Basic English Phrases"}],
  ru:[{id:"tYpqjXjfpaI",title:"Русский язык — основы"},{id:"JZaBM5HW9Ws",title:"Алфавит и произношение"}],
  uz:[{id:"hzFEPRKBDXo",title:"O'zbek tili asoslari"},{id:"9jMbzDWbT1E",title:"O'zbek alifbosi"}],
  de:[{id:"RkPnB-hNmNA",title:"Deutsch für Anfänger"},{id:"wbHE-6bnEKg",title:"German Basic Phrases"}],
  fr:[{id:"o_XVt5rdpFY",title:"Français débutants"},{id:"oJOYwqgSQDI",title:"French pronunciation"}],
  es:[{id:"G8qISOFN1J0",title:"Español para principiantes"},{id:"B7SVvWVKeMo",title:"Spanish basics"}],
};

/* ═══════════════════════════════════════════════════════════════════
   QUESTION BANK — answers: array, all lowercase
   checkAnswer accepts synonyms / alternate spellings
═══════════════════════════════════════════════════════════════════ */
const QB = {
  en:{
    beginner:[
      {type:"choice",q:"Как переводится 'cat'?",opts:["Собака","Кошка","Птица","Рыба"],answers:["кошка"]},
      {type:"choice",q:"Как переводится 'dog'?",opts:["Кошка","Рыба","Лошадь","Собака"],answers:["собака"]},
      {type:"choice",q:"'Hello' означает:",opts:["Пока","Спасибо","Извини","Привет"],answers:["привет"]},
      {type:"choice",q:"Что такое 'apple'?",opts:["Апельсин","Банан","Груша","Яблоко"],answers:["яблоко"]},
      {type:"choice",q:"'Thank you' = ?",opts:["Пожалуйста","Извини","Привет","Спасибо"],answers:["спасибо"]},
      {type:"choice",q:"Как будет 'вода' по-английски?",opts:["Fire","Air","Earth","Water"],answers:["water"]},
      {type:"choice",q:"'Big' означает:",opts:["Маленький","Быстрый","Старый","Большой"],answers:["большой"]},
      {type:"choice",q:"Что значит 'red'?",opts:["Синий","Зелёный","Жёлтый","Красный"],answers:["красный"]},
      {type:"choice",q:"'House' — это:",opts:["Машина","Дерево","Стол","Дом"],answers:["дом"]},
      {type:"choice",q:"'I love you' = ?",opts:["Я тебя ненавижу","Я скучаю","Спасибо","Я тебя люблю"],answers:["я тебя люблю"]},
      {type:"type",q:"Переведите на англ.: 'солнце'",answers:["sun"]},
      {type:"type",q:"Переведите на англ.: 'мама'",answers:["mom","mum","mother"]},
      {type:"type",q:"Как по-английски 'кот' или 'кошка'?",answers:["cat"]},
      {type:"choice",q:"'Book' — это:",opts:["Ручка","Тетрадь","Линейка","Книга"],answers:["книга"]},
      {type:"choice",q:"Что значит 'friend'?",opts:["Враг","Незнакомец","Учитель","Друг"],answers:["друг"]},
      {type:"choice",q:"'Cold' означает:",opts:["Горячий","Тёплый","Сухой","Холодный"],answers:["холодный"]},
      {type:"choice",q:"'Good morning' = ?",opts:["Добрый вечер","Добрый день","Спокойной ночи","Доброе утро"],answers:["доброе утро"]},
      {type:"choice",q:"Как будет 'птица' по-английски?",opts:["Fish","Dog","Cat","Bird"],answers:["bird"]},
      {type:"type",q:"Напишите по-английски цифру 1",answers:["one"]},
      {type:"choice",q:"'Happy' означает:",opts:["Грустный","Злой","Усталый","Счастливый"],answers:["счастливый"]},
    ],
    elementary:[
      {type:"choice",q:"Правильный артикль: ___ orange",opts:["a","an","the","—"],answers:["an"]},
      {type:"choice",q:"'She ___ a teacher.'",opts:["am","are","be","is"],answers:["is"]},
      {type:"type",q:"Напишите мн. число от 'child'",answers:["children"]},
      {type:"choice",q:"'Always' означает:",opts:["Иногда","Редко","Никогда","Всегда"],answers:["всегда"]},
      {type:"type",q:"Past simple от 'go'",answers:["went"]},
      {type:"choice",q:"'I ___ to school every day.'",opts:["goes","going","went","go"],answers:["go"]},
      {type:"choice",q:"'Beautiful' значит:",opts:["Умный","Быстрый","Большой","Красивый"],answers:["красивый"]},
      {type:"choice",q:"'Kitchen' — это:",opts:["Спальня","Гостиная","Ванная","Кухня"],answers:["кухня"]},
      {type:"type",q:"2 слова: 'У меня есть' по-английски",answers:["i have"]},
      {type:"choice",q:"'Dangerous' значит:",opts:["Красивый","Полезный","Скучный","Опасный"],answers:["опасный"]},
      {type:"type",q:"Past simple от 'eat'",answers:["ate"]},
      {type:"choice",q:"Правильная форма: 'She ___ TV now.'",opts:["watch","watches","watched","is watching"],answers:["is watching"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'I ___ TV when she called.'",opts:["watch","watched","have watched","was watching"],answers:["was watching"]},
      {type:"type",q:"3-я форма глагола 'write'",answers:["written"]},
      {type:"choice",q:"'Although' означает:",opts:["Потому что","Если","Пока","Хотя"],answers:["хотя"]},
      {type:"choice",q:"'___ you ever been to Paris?'",opts:["Did","Do","Are","Have"],answers:["have"]},
      {type:"choice",q:"'Environment' означает:",opts:["Правительство","Развитие","Общество","Окружающая среда"],answers:["окружающая среда"]},
      {type:"type",q:"Сравнительная степень от 'good'",answers:["better"]},
      {type:"choice",q:"'Deadline' — это:",opts:["Начало","Цель","Зона","Крайний срок"],answers:["крайний срок"]},
      {type:"type",q:"Past simple от 'begin'",answers:["began"]},
    ],
    intermediate:[
      {type:"choice",q:"'The report ___ by manager.' (passive)",opts:["wrote","has written","is writing","was written"],answers:["was written"]},
      {type:"choice",q:"'Ambiguous' означает:",opts:["Ясный","Длинный","Сложный","Двусмысленный"],answers:["двусмысленный"]},
      {type:"choice",q:"'If I ___ rich, I would travel.'",opts:["am","was","be","were"],answers:["were"]},
      {type:"type",q:"3-я форма 'break'",answers:["broken"]},
      {type:"choice",q:"'Eloquent' означает:",opts:["Тихий","Грубый","Умный","Красноречивый"],answers:["красноречивый"]},
      {type:"choice",q:"Синоним к 'enormous':",opts:["tiny","quick","average","huge"],answers:["huge"]},
    ],
    "upper-intermediate":[
      {type:"choice",q:"Фразовый глагол 'put off' = ?",opts:["Надеть","Включить","Убрать","Отложить"],answers:["отложить"]},
      {type:"type",q:"Существительное от 'achieve'",answers:["achievement"]},
      {type:"choice",q:"'Repercussion' — это:",opts:["Причина","Повторение","Решение","Последствие"],answers:["последствие"]},
      {type:"choice",q:"'Meticulous' значит:",opts:["Небрежный","Быстрый","Ленивый","Скрупулёзный"],answers:["скрупулёзный"]},
      {type:"type",q:"Антоним к 'ascend'",answers:["descend"]},
      {type:"choice",q:"Идиома 'bite the bullet' = ?",opts:["Сбежать","Солгать","Съесть","Стерпеть и сделать"],answers:["стерпеть и сделать"]},
    ],
    advanced:[
      {type:"choice",q:"'Perspicacious' означает:",opts:["Неуклюжий","Молчаливый","Жадный","Проницательный"],answers:["проницательный"]},
      {type:"type",q:"Существительное от 'procrastinate'",answers:["procrastination"]},
      {type:"choice",q:"'Sycophant' — это:",opts:["Герой","Критик","Художник","Льстец"],answers:["льстец"]},
      {type:"choice",q:"'Ephemeral' означает:",opts:["Постоянный","Огромный","Древний","Кратковременный"],answers:["кратковременный"]},
      {type:"type",q:"Прилагательное от 'contempt'",answers:["contemptuous"]},
    ],
  },
  ru:{
    beginner:[
      {type:"choice",q:"'Кот' по-английски:",opts:["Dog","Bird","Fish","Cat"],answers:["cat"]},
      {type:"choice",q:"'Кошка' по-английски:",opts:["Dog","Bird","Fish","Cat"],answers:["cat"]},
      {type:"choice",q:"'Кошка' и 'кот' по-английски — одно слово:",opts:["Dog","Fish","Bird","Cat"],answers:["cat"]},
      {type:"choice",q:"Буква 'А' звучит как:",opts:["[b]","[v]","[ya]","[a]"],answers:["[a]"]},
      {type:"choice",q:"'Привет' по-английски:",opts:["Goodbye","Sorry","Thanks","Hello"],answers:["hello"]},
      {type:"choice",q:"'Большой' по-английски:",opts:["Small","Old","Fast","Big"],answers:["big"]},
      {type:"type",q:"Напишите по-русски число 5",answers:["пять"]},
      {type:"choice",q:"'Good morning' по-русски:",opts:["Добрый вечер","Добрый день","Спокойной ночи","Доброе утро"],answers:["доброе утро"]},
      {type:"choice",q:"'Вода' по-английски:",opts:["Fire","Earth","Air","Water"],answers:["water"]},
      {type:"choice",q:"'Спасибо' по-английски:",opts:["Please","Sorry","Excuse me","Thank you"],answers:["thank you"]},
      {type:"choice",q:"'Я люблю тебя' по-английски:",opts:["I hate you","I miss you","I need you","I love you"],answers:["i love you"]},
      {type:"type",q:"Число 7 прописью по-русски:",answers:["семь"]},
    ],
    elementary:[
      {type:"choice",q:"Род слова 'книга':",opts:["Мужской","Средний","Общий","Женский"],answers:["женский"]},
      {type:"choice",q:"'Я вижу ___ (кот)' — правильная форма:",opts:["кот","коту","котом","кота"],answers:["кота"]},
      {type:"type",q:"Мн. число от 'стол'",answers:["столы"]},
      {type:"choice",q:"'Читать' по-английски:",opts:["To write","To speak","To listen","To read"],answers:["to read"]},
      {type:"type",q:"Мн. число от 'окно'",answers:["окна"]},
      {type:"choice",q:"Правильный предлог: 'Я живу ___ Москве'",opts:["на","у","к","в"],answers:["в"]},
      {type:"choice",q:"'Kitchen' по-русски:",opts:["Спальня","Гостиная","Ванная","Кухня"],answers:["кухня"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'Вчера я ___ в кино' — правильная форма:",opts:["иду","пойду","хожу","ходил"],answers:["ходил"]},
      {type:"type",q:"Антоним к 'холодный'",answers:["горячий","тёплый"]},
      {type:"choice",q:"'Despite' по-русски:",opts:["Потому что","Если","Хотя","Несмотря на"],answers:["несмотря на"]},
      {type:"type",q:"Прошедшее время от 'идти' (он):",answers:["шёл"]},
    ],
    intermediate:[
      {type:"choice",q:"'Если бы я знал, я ___ сказал'",opts:["скажу","говорю","скажу бы","сказал бы"],answers:["сказал бы"]},
      {type:"type",q:"Деепричастие от 'читать':",answers:["читая"]},
      {type:"choice",q:"Синоним к 'огромный':",opts:["маленький","средний","узкий","колоссальный"],answers:["колоссальный"]},
      {type:"choice",q:"Правильное ударение в 'звонит':",opts:["зво́нит","з́вонит","звóнит","звони́т"],answers:["звони́т"]},
    ],
    "upper-intermediate":[
      {type:"type",q:"Краткая форма прилаг. 'красивый' (м.р.)",answers:["красив"]},
      {type:"choice",q:"'Бить баклуши' = ?",opts:["Усердно работать","Веселиться","Спорить","Бездельничать"],answers:["бездельничать"]},
    ],
    advanced:[
      {type:"choice",q:"'Эфемерный' означает:",opts:["Постоянный","Огромный","Древний","Кратковременный"],answers:["кратковременный"]},
      {type:"type",q:"Синоним к 'лаконичный'",answers:["краткий","сжатый"]},
    ],
  },
  uz:{
    beginner:[
      {type:"choice",q:"'Hello' по-узбекски:",opts:["Xayr","Rahmat","Kechirasiz","Salom"],answers:["salom"]},
      {type:"choice",q:"'Kitob' означает:",opts:["Ручка","Тетрадь","Стол","Книга"],answers:["книга"]},
      {type:"type",q:"По-узбекски 'спасибо':",answers:["rahmat"]},
      {type:"choice",q:"'Uy' означает:",opts:["Машина","Дерево","Человек","Дом"],answers:["дом"]},
      {type:"choice",q:"'Вода' по-узбекски:",opts:["non","ot","qo'l","suv"],answers:["suv"]},
      {type:"choice",q:"'Katta' значит:",opts:["Маленький","Быстрый","Холодный","Большой"],answers:["большой"]},
      {type:"type",q:"По-узбекски 'привет':",answers:["salom"]},
      {type:"choice",q:"'Men' означает:",opts:["Ты","Он","Мы","Я"],answers:["я"]},
      {type:"type",q:"По-узбекски 'нет':",answers:["yo'q"]},
      {type:"choice",q:"'Non' означает:",opts:["Вода","Мясо","Молоко","Хлеб"],answers:["хлеб"]},
    ],
    elementary:[
      {type:"choice",q:"'___ ismingiz?' — правильное слово:",opts:["Kim","Qanday","Qayer","Nima"],answers:["nima"]},
      {type:"type",q:"Мн. число от 'bola'",answers:["bolalar"]},
      {type:"choice",q:"'O'qimoq' означает:",opts:["Писать","Говорить","Слушать","Читать"],answers:["читать"]},
      {type:"choice",q:"'Chiroyli' значит:",opts:["Умный","Быстрый","Большой","Красивый"],answers:["красивый"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'Kecha men ___ (идти)' — форма:",opts:["boraman","boradi","borasiz","bordim"],answers:["bordim"]},
      {type:"type",q:"Антоним к 'issiq' (горячий):",answers:["sovuq"]},
      {type:"choice",q:"'Lekin' означает:",opts:["И","Потому что","Если","Но/Однако"],answers:["но/однако"]},
    ],
    intermediate:[
      {type:"choice",q:"'Muammo' означает:",opts:["Решение","Вопрос","Ответ","Проблема"],answers:["проблема"]},
      {type:"type",q:"Прошедшее время от 'bor-' (я):",answers:["bordim"]},
    ],
    "upper-intermediate":[
      {type:"choice",q:"'Ko'zi to'q' = ?",opts:["Слепой","Голодный","Уставший","Богатый/Удовлетворённый"],answers:["богатый/удовлетворённый"]},
      {type:"type",q:"Существительное от 'o'qimoq':",answers:["o'qish"]},
    ],
    advanced:[
      {type:"choice",q:"'Taxminiy' означает:",opts:["Точный","Полный","Пустой","Приблизительный"],answers:["приблизительный"]},
      {type:"type",q:"Антоним к 'qo'rqoq':",answers:["jasur"]},
    ],
  },
  de:{
    beginner:[
      {type:"choice",q:"'Hund' по-русски:",opts:["Кошка","Птица","Рыба","Собака"],answers:["собака"]},
      {type:"choice",q:"'Danke' означает:",opts:["Привет","Пожалуйста","Пока","Спасибо"],answers:["спасибо"]},
      {type:"type",q:"По-немецки 'привет' (неформально):",answers:["hallo","hi"]},
      {type:"choice",q:"'Wasser' — это:",opts:["Огонь","Воздух","Земля","Вода"],answers:["вода"]},
      {type:"choice",q:"'Haus' означает:",opts:["Машина","Дерево","Стол","Дом"],answers:["дом"]},
      {type:"type",q:"По-немецки 'да':",answers:["ja"]},
      {type:"choice",q:"'Groß' означает:",opts:["Маленький","Быстрый","Старый","Большой"],answers:["большой"]},
      {type:"choice",q:"'Guten Morgen' = ?",opts:["Добрый вечер","Добрый день","Спокойной ночи","Доброе утро"],answers:["доброе утро"]},
    ],
    elementary:[
      {type:"choice",q:"Артикль для 'Buch' (книга):",opts:["der","die","ein","das"],answers:["das"]},
      {type:"type",q:"Мн. число от 'Kind' (ребёнок):",answers:["kinder"]},
      {type:"choice",q:"'Schön' значит:",opts:["Умный","Быстрый","Старый","Красивый"],answers:["красивый"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'Ich ___ gestern ins Kino gegangen.'",opts:["habe","hatte","war","bin"],answers:["bin"]},
      {type:"type",q:"Перфект от 'essen':",answers:["gegessen"]},
    ],
    intermediate:[
      {type:"choice",q:"'Obwohl' означает:",opts:["Потому что","Если","Пока","Хотя"],answers:["хотя"]},
    ],
    "upper-intermediate":[
      {type:"choice",q:"'Konjunktiv II' для:",opts:["Прошлого","Реальных событий","Повелений","Нереальных условий"],answers:["нереальных условий"]},
    ],
    advanced:[
      {type:"choice",q:"'Weltanschauung' означает:",opts:["Путешествие","Политика","Образование","Мировоззрение"],answers:["мировоззрение"]},
    ],
  },
  fr:{
    beginner:[
      {type:"choice",q:"'Chat' по-русски:",opts:["Собака","Птица","Рыба","Кошка/Кот"],answers:["кошка/кот"]},
      {type:"choice",q:"'Merci' означает:",opts:["Привет","Пожалуйста","Пока","Спасибо"],answers:["спасибо"]},
      {type:"type",q:"По-французски 'привет':",answers:["bonjour","salut"]},
      {type:"choice",q:"'Eau' — это:",opts:["Огонь","Воздух","Земля","Вода"],answers:["вода"]},
      {type:"choice",q:"'Grand' означает:",opts:["Маленький","Старый","Быстрый","Большой"],answers:["большой"]},
      {type:"type",q:"По-французски 'да':",answers:["oui"]},
    ],
    elementary:[
      {type:"choice",q:"'Je ___ étudiant.'",opts:["es","est","sommes","suis"],answers:["suis"]},
      {type:"choice",q:"'Beau' означает:",opts:["Умный","Быстрый","Старый","Красивый"],answers:["красивый"]},
      {type:"type",q:"Мн. число от 'animal':",answers:["animaux"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'Bien que' означает:",opts:["Потому что","Если","Пока","Хотя"],answers:["хотя"]},
    ],
    intermediate:[
      {type:"choice",q:"'Imparfait' используется для:",opts:["Однократных действий","Будущего","Приказов","Повторяющихся действий в прошлом"],answers:["повторяющихся действий в прошлом"]},
    ],
    "upper-intermediate":[
      {type:"choice",q:"'Subjonctif' — это:",opts:["Повелительное","Условное","Изъявительное","Сослагательное наклонение"],answers:["сослагательное наклонение"]},
    ],
    advanced:[
      {type:"choice",q:"'Épiphanie' в переносном смысле:",opts:["Праздник","Катастрофа","Путешествие","Внезапное озарение"],answers:["внезапное озарение"]},
    ],
  },
  es:{
    beginner:[
      {type:"choice",q:"'Gato' по-русски:",opts:["Собака","Птица","Рыба","Кошка/Кот"],answers:["кошка/кот"]},
      {type:"choice",q:"'Gracias' означает:",opts:["Привет","Пожалуйста","Пока","Спасибо"],answers:["спасибо"]},
      {type:"type",q:"По-испански 'привет':",answers:["hola"]},
      {type:"choice",q:"'Agua' — это:",opts:["Огонь","Воздух","Земля","Вода"],answers:["вода"]},
      {type:"choice",q:"'Grande' означает:",opts:["Маленький","Старый","Быстрый","Большой"],answers:["большой"]},
      {type:"type",q:"По-испански 'да':",answers:["sí","si"]},
      {type:"choice",q:"'Buenos días' = ?",opts:["Добрый вечер","Добрый день","Спокойной ночи","Доброе утро"],answers:["доброе утро"]},
    ],
    elementary:[
      {type:"choice",q:"'Yo ___ estudiante.'",opts:["eres","es","somos","soy"],answers:["soy"]},
      {type:"choice",q:"'Bonito' означает:",opts:["Умный","Быстрый","Старый","Красивый"],answers:["красивый"]},
      {type:"type",q:"Мн. число от 'ciudad':",answers:["ciudades"]},
    ],
    "pre-intermediate":[
      {type:"choice",q:"'Aunque' означает:",opts:["Потому что","Если","Пока","Хотя"],answers:["хотя"]},
    ],
    intermediate:[
      {type:"choice",q:"'Subjuntivo' используется после:",opts:["Утверждений","Вопросов","Числительных","Глаголов желания/сомнения"],answers:["глаголов желания/сомнения"]},
    ],
    "upper-intermediate":[
      {type:"choice",q:"'Si yo ___ rico, viajaría.'",opts:["soy","fue","era","fuera"],answers:["fuera"]},
    ],
    advanced:[
      {type:"choice",q:"'Efímero' означает:",opts:["Постоянный","Огромный","Древний","Кратковременный"],answers:["кратковременный"]},
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
};
const capFirst = s => s ? s.charAt(0).toUpperCase()+s.slice(1) : s;
const initials = n => n.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

const checkAnswer = (raw, correctArr) => {
  const user = raw.trim().toLowerCase();
  return correctArr.some(a => {
    const ans = a.trim().toLowerCase();
    if (user === ans) return true;
    if (user === ans.replace(/[\[\]']/g,"")) return true;
    if (user === ans.replace(/[íéàâ]/g, c=>({í:"i",é:"e",à:"a",â:"a"})[c]||c)) return true;
    return false;
  });
};

/* ═══════════════════════════════════════════════════════════════════
   PARTICLES BG
═══════════════════════════════════════════════════════════════════ */
const PTS = Array.from({length:20},(_,i)=>({
  id:i, sz:Math.random()*10+3, x:Math.random()*100, y:Math.random()*100,
  del:Math.random()*10, dur:Math.random()*12+10, op:Math.random()*0.35+0.1
}));
function Particles() {
  return (
    <div className={styles.particles} aria-hidden>
      {PTS.map(p=>(
        <div key={p.id} className={styles.particle} style={{
          width:p.sz,height:p.sz,left:`${p.x}%`,top:`${p.y}%`,
          animationDelay:`${p.del}s`,animationDuration:`${p.dur}s`,opacity:p.op
        }}/>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AUTH SCREEN
═══════════════════════════════════════════════════════════════════ */
function Auth({onAuth,t}) {
  const [isLogin,setIsLogin]=useState(true);
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const [showPass,setShowPass]=useState(false);

  const submit = async () => {
    setErr("");
    if((!isLogin&&!form.name)||!form.email||!form.password){setErr(t.fillAll);return;}
    if(!/\S+@\S+\.\S+/.test(form.email)){setErr(t.badEmail);return;}
    if(form.password.length<6){setErr(t.shortPass);return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,700));
    const users=JSON.parse(localStorage.getItem("lf_users")||"{}");
    if(isLogin){
      const u=users[form.email];
      if(!u||u.password!==form.password){setErr(t.badLogin);setLoading(false);return;}
      onAuth(u);
    } else {
      const u={name:capFirst(form.name.trim()),email:form.email,password:form.password,xp:0,streak:1,completedLevels:{},joinDate:Date.now()};
      users[form.email]=u; localStorage.setItem("lf_users",JSON.stringify(users)); onAuth(u);
    }
    setLoading(false);
  };

  return (
    <div className={styles.authBg}>
      <Particles/>
      <div className={styles.authHeroImg}>
        <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1400&q=80" alt="bg"/>
        <div className={styles.authImgOverlay}/>
      </div>

      <div className={styles.authSideText}>
        <div className={styles.authSideLogo}>🌍 <span>LinguaFlow</span></div>
        <h1 className={styles.authSideTitle}>{t.tagline}</h1>
        <div className={styles.authSideStats}>
          <div><b>92K+</b><small>Учеников</small></div>
          <div><b>6</b><small>Языков</small></div>
          <div><b>500+</b><small>Заданий</small></div>
        </div>
        <div className={styles.authSideImgs}>
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=220&q=80" alt="study"/>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=220&q=80" alt="team"/>
        </div>
      </div>

      <div className={styles.authCard}>
        <div className={styles.authCardLogo}>
          <span>🌍</span><span className={styles.authLogoTxt}>LinguaFlow</span>
        </div>
        <h2 className={styles.authTitle}>{t.loginTitle}</h2>
        <p className={styles.authSub}>{t.loginSub}</p>

        <div className={styles.authForm}>
          {!isLogin&&(
            <div className={styles.iGroup}>
              <label>{t.name}</label>
              <input placeholder={t.namePh} value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})}
                onKeyDown={e=>e.key==="Enter"&&submit()}/>
            </div>
          )}
          <div className={styles.iGroup}>
            <label>{t.email}</label>
            <input type="email" placeholder={t.emailPh} value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
              onKeyDown={e=>e.key==="Enter"&&submit()}/>
          </div>
          <div className={styles.iGroup}>
            <label>{t.password}</label>
            <div className={styles.passRow}>
              <input type={showPass?"text":"password"} placeholder={t.passPh} value={form.password}
                onChange={e=>setForm({...form,password:e.target.value})}
                onKeyDown={e=>e.key==="Enter"&&submit()}/>
              <button type="button" className={styles.eyeBtn} onClick={()=>setShowPass(!showPass)}>
                {showPass?"🙈":"👁️"}
              </button>
            </div>
          </div>
          {err&&<div className={styles.authErr}>{err}</div>}
          <button className={styles.authSubmit} onClick={submit} disabled={loading}>
            {loading?<span className={styles.spin}/>:(isLogin?t.loginBtn:t.regBtn)}
          </button>
          <div className={styles.authSwitch}>
            <span>{isLogin?t.noAcc:t.hasAcc}</span>
            <button onClick={()=>{setIsLogin(!isLogin);setErr("");}}>
              {isLogin?t.regBtn:t.loginBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════════════════════════════ */
function Quiz({langId,levelId,onFinish,t}) {
  const raw = QB[langId]?.[levelId]||[];
  const fallback = [{type:"choice",q:"Вопросы скоро будут добавлены!",opts:["OK","Понятно","Хорошо","Ясно"],answers:["ok","понятно","хорошо","ясно"]}];
  const [qs]=useState(()=>shuffle(raw.length?raw:fallback));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [typed,setTyped]=useState("");
  const [status,setStatus]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [shake,setShake]=useState(false);
  const [opts,setOpts]=useState([]);
  const q=qs[idx];

  useEffect(()=>{
    if(q?.type==="choice") setOpts(shuffle(q.opts));
    setSel(null);setTyped("");setStatus(null);
  },[idx]);

  const check=useCallback(()=>{
    const ans=q.type==="choice"?sel:typed;
    if(!ans){setShake(true);setTimeout(()=>setShake(false),500);return;}
    const ok=checkAnswer(ans,q.answers);
    setStatus(ok?"correct":"wrong");
    if(ok) setScore(s=>s+1);
  },[q,sel,typed]);

  const next=()=>{ if(idx+1>=qs.length) setDone(true); else setIdx(i=>i+1); };

  if(done){
    const pct=Math.round(score/qs.length*100);
    return(
      <div className={styles.doneBg}>
        <div className={styles.doneCard}>
          <div className={styles.doneEmojiWrap}>
            <div className={styles.doneEmoji}>{pct>=80?"🏆":pct>=60?"🌟":"💪"}</div>
          </div>
          <h2 className={styles.doneTitle}>{t.done}</h2>
          <div className={styles.donePct}>{pct}<span>%</span></div>
          <div className={styles.doneSub}>{score} / {qs.length} правильных ответов</div>
          <div className={styles.doneXp}>+{score*15} XP заработано!</div>
          <div className={styles.doneBtns}>
            <button className={styles.retryBtn} onClick={()=>{setIdx(0);setScore(0);setDone(false);}}>🔄 {t.retry}</button>
            <button className={styles.backBtn} onClick={()=>onFinish(score,qs.length)}>← {t.back}</button>
          </div>
        </div>
      </div>
    );
  }

  const lang=LANGUAGES.find(l=>l.id===langId);
  const level=LEVELS.find(l=>l.id===levelId);

  return(
    <div className={styles.quizWrap}>
      <div className={styles.qzTop}>
        <div className={styles.qzBar}><div className={styles.qzFill} style={{width:`${idx/qs.length*100}%`}}/></div>
        <span className={styles.qzCounter}>{idx+1} / {qs.length}</span>
        <span className={styles.qzScore}>⭐ {score*15} XP</span>
      </div>

      <div className={`${styles.qCard} ${status==="correct"?styles.qOk:status==="wrong"?styles.qBad:""}`}>
        <div className={styles.qMeta}>
          <span className={styles.qFlag}>{lang?.flag}</span>
          <span className={styles.qLvl} style={{color:level?.color}}>{level?.icon} {level?.label}</span>
          <span className={styles.qType}>{q.type==="choice"?"Выбор":"Письмо"}</span>
        </div>

        <p className={styles.qText}>{q.q}</p>

        {q.type==="choice"&&(
          <div className={`${styles.optsGrid} ${shake?styles.shake:""}`}>
            {opts.map((opt,oi)=>{
              let cls=styles.opt;
              if(status){
                if(checkAnswer(opt,q.answers)) cls=`${styles.opt} ${styles.optOk}`;
                else if(opt===sel) cls=`${styles.opt} ${styles.optBad}`;
              } else if(opt===sel) cls=`${styles.opt} ${styles.optSel}`;
              return(
                <button key={opt} className={cls} onClick={()=>!status&&setSel(opt)} disabled={!!status}>
                  <span className={styles.optBadge}>{["A","B","C","D"][oi]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {q.type==="type"&&(
          <div className={`${styles.typeArea} ${shake?styles.shake:""}`}>
            <input className={`${styles.typeIn} ${status==="correct"?styles.typeOk:status==="wrong"?styles.typeBad:""}`}
              placeholder={t.typeAns} value={typed}
              onChange={e=>!status&&setTyped(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!status&&check()}
              disabled={!!status}/>
            {status==="wrong"&&<div className={styles.correctHint}>✅ Правильно: <b>{q.answers[0]}</b></div>}
          </div>
        )}

        {status&&(
          <div className={`${styles.statusBanner} ${status==="correct"?styles.sOk:styles.sBad}`}>
            {status==="correct"?t.correct:t.wrong}
          </div>
        )}

        <div className={styles.qActions}>
          {!status
            ?<button className={styles.checkBtn} onClick={check}>{t.check} ✓</button>
            :<button className={styles.nextBtn} onClick={next}>
               {idx+1>=qs.length?`🏁 ${t.finish}`:`${t.next} →`}
             </button>
          }
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VIDEO SECTION
═══════════════════════════════════════════════════════════════════ */
function VideoSection({langId,t}) {
  const vids=VIDEOS[langId]||[];
  const [active,setActive]=useState(0);
  const lang=LANGUAGES.find(l=>l.id===langId);
  return(
    <div className={styles.videoSec}>
      <div className={styles.videoTopBar}>
        <span>🎬</span>
        <div><h3>{t.videoTitle}</h3><p>{t.videoSub}</p></div>
      </div>
      <div className={styles.videoLayout}>
        <div className={styles.videoMain}>
          <div className={styles.videoFrame}>
            <iframe src={`https://www.youtube.com/embed/${vids[active]?.id}?rel=0&modestbranding=1`}
              title={vids[active]?.title} frameBorder="0"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              allowFullScreen/>
          </div>
          <div className={styles.videoCaption}>{lang?.flag} {vids[active]?.title}</div>
        </div>
        <div className={styles.videoList}>
          {vids.map((v,i)=>(
            <button key={v.id} className={`${styles.vItem} ${i===active?styles.vItemOn:""}`} onClick={()=>setActive(i)}>
              <div className={styles.vThumb}>
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}/>
                <span className={styles.vPlay}>▶</span>
              </div>
              <span className={styles.vTitle}>{v.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEVEL CARD
═══════════════════════════════════════════════════════════════════ */
function LevelCard({lv,idx,userXp,comp,onStart,t}) {
  const unlocked=userXp>=lv.xp;
  const pct=comp?.pct||0;
  return(
    <div className={`${styles.lvCard} ${unlocked?styles.lvOn:styles.lvOff}`}
      style={{"--lc":lv.color,animationDelay:`${idx*0.08}s`}}>
      <div className={styles.lvTop}>
        <div className={styles.lvIcon} style={{background:lv.color}}>{lv.icon}</div>
        <div className={styles.lvInfo}>
          <div className={styles.lvLabel}>{lv.label}</div>
          <div className={styles.lvSub}>{lv.ru}</div>
        </div>
        {!unlocked&&<span className={styles.lvLock}>🔒</span>}
        {comp?.done&&<span className={styles.lvDone}>✅</span>}
      </div>
      <div className={styles.lvBarBg}><div className={styles.lvBarFill} style={{width:`${pct}%`,background:lv.color}}/></div>
      <div className={styles.lvMeta}><span>≥{lv.xp} XP</span>{pct>0&&<span style={{color:lv.color}}>{pct}%</span>}</div>
      {unlocked
        ?<button className={styles.lvStart} style={{"--lc":lv.color}} onClick={onStart}>{lv.icon} {t.start}</button>
        :<div className={styles.lvHint}>{t.hint}</div>
      }
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LANG SCREEN
═══════════════════════════════════════════════════════════════════ */
function LangScreen({langId,user,onBack,onUpdate,t,uiLang}) {
  const lang=LANGUAGES.find(l=>l.id===langId);
  const [activeLevel,setActiveLevel]=useState(null);
  const [tab,setTab]=useState("levels");
  const comp=user.completedLevels?.[langId]||{};
  const xp=user.xp||0;

  const finish=(score,total)=>{
    const lvId=LEVELS[activeLevel].id;
    const pct=Math.round(score/total*100);
    const updated={...user,xp:xp+score*15,completedLevels:{...user.completedLevels,[langId]:{...comp,[lvId]:{done:pct>=50,pct,score,total}}}};
    onUpdate(updated); setActiveLevel(null);
  };

  if(activeLevel!==null) return(
    <div className={styles.screenWrap}>
      <button className={styles.flatBack} onClick={()=>setActiveLevel(null)}>← Назад к уровням</button>
      <Quiz langId={langId} levelId={LEVELS[activeLevel].id} onFinish={finish} t={t}/>
    </div>
  );

  return(
    <div className={styles.langScreen}>
      <div className={styles.langHero} style={{background:lang.grad}}>
        <button className={styles.heroBack} onClick={onBack}>← {t.back}</button>
        <div className={styles.langHeroInner}>
          <div className={styles.langHeroText}>
            <span className={styles.langFlag}>{lang.flag}</span>
            <h1 className={styles.langHeroTitle}>{lang.name}</h1>
            <p className={styles.langHeroDesc}>{lang.desc}</p>
            <div className={styles.langHeroMeta}>
              <span>👥 {lang.learners.toLocaleString()}</span>
              <span>📚 {LEVELS.length} уровней</span>
            </div>
          </div>
          <div className={styles.langHeroImgWrap}>
            <img src={lang.img} alt={lang.name} className={styles.langHeroImg}/>
          </div>
        </div>
      </div>

      <div className={styles.tabBar}>
        <button className={`${styles.tabBtn} ${tab==="levels"?styles.tabOn:""}`} onClick={()=>setTab("levels")}>📚 Уровни</button>
        <button className={`${styles.tabBtn} ${tab==="video"?styles.tabOn:""}`} onClick={()=>setTab("video")}>🎬 Видео</button>
      </div>

      {tab==="levels"&&(
        <div className={styles.levelsGrid}>
          {LEVELS.map((lv,i)=>(
            <LevelCard key={lv.id} lv={lv} idx={i} userXp={xp} comp={comp[lv.id]} onStart={()=>setActiveLevel(i)} t={t}/>
          ))}
        </div>
      )}
      {tab==="video"&&<VideoSection langId={langId} t={t}/>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════════════ */
function Home({user,onSelectLang,t,uiLang}) {
  const [filter,setFilter]=useState("");
  const [online]=useState(()=>Math.floor(Math.random()*600)+1800);
  const getName=l=>uiLang==="en"?l.name:uiLang==="uz"?l.uz:l.ru;
  const filtered=LANGUAGES.filter(l=>getName(l).toLowerCase().includes(filter.toLowerCase()));
  const xp=user.xp||0;
  const lvIdx=LEVELS.reduce((a,lv,i)=>xp>=lv.xp?i:a,0);

  return(
    <div className={styles.home}>
      {/* HERO */}
      <div className={styles.heroBanner}>
        <div className={styles.heroImgWrap}>
          <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&q=80" alt="hero"/>
          <div className={styles.heroOverlay}/>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              {t.welcome},<br/>
              <span className={styles.heroName}>{user.name}</span> 👋
            </h1>
            <p className={styles.heroSub}>{t.cont}</p>
          </div>
          <div className={styles.heroStats}>
            {[{e:"🔥",v:user.streak||1,l:t.streak},{e:"⭐",v:xp,l:t.xp},{e:LEVELS[lvIdx].icon,v:LEVELS[lvIdx].label,l:"Уровень"}].map((s,i)=>(
              <div key={i} className={styles.hStat}><span>{s.e}</span><b>{s.v}</b><small>{s.l}</small></div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className={styles.statsRow}>
        {[{i:"🌐",v:online.toLocaleString(),l:t.online},{i:"🎓",v:"92,450",l:t.total},{i:"🌍",v:"6",l:"языков"},{i:"📝",v:"500+",l:"заданий"}].map((s,i)=>(
          <div key={i} className={styles.statCard} style={{animationDelay:`${i*0.07}s`}}>
            <span className={styles.statIco}>{s.i}</span>
            <div><b>{s.v}</b><small>{s.l}</small></div>
          </div>
        ))}
      </div>

      {/* FEATURE IMAGE CARDS */}
      <div className={styles.featGrid}>
        {[
          {img:"https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=500&q=80",icon:"🎯",title:t.f1,desc:t.f1d},
          {img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",icon:"💬",title:t.f2,desc:t.f2d},
          {img:"https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80",icon:"🏆",title:t.f3,desc:t.f3d},
        ].map((f,i)=>(
          <div key={i} className={styles.featCard} style={{animationDelay:`${i*0.1}s`}}>
            <div className={styles.featImgWrap}><img src={f.img} alt={f.title}/><div className={styles.featOverlay}/></div>
            <div className={styles.featBody}>
              <span className={styles.featIcon}>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LANGUAGES */}
      <div className={styles.secRow}>
        <h2 className={styles.secTitle}>{t.chooseLang}</h2>
        <div className={styles.filterBox}>
          <span>🔍</span>
          <input placeholder={t.filter} value={filter} onChange={e=>setFilter(e.target.value)}/>
        </div>
      </div>

      <div className={styles.langsGrid}>
        {filtered.map((lang,i)=>{
          const done=Object.keys(user.completedLevels?.[lang.id]||{}).length;
          return(
            <button key={lang.id} className={styles.langCard} style={{animationDelay:`${i*0.07}s`}} onClick={()=>onSelectLang(lang.id)}>
              <div className={styles.lcImgWrap}>
                <img src={lang.img} alt={lang.name}/>
                <div className={styles.lcGrad} style={{background:lang.grad+"cc"}}/>
              </div>
              <div className={styles.lcBody}>
                <div className={styles.lcTop}>
                  <span className={styles.lcFlag}>{lang.flag}</span>
                  <span className={styles.lcName}>{getName(lang)}</span>
                </div>
                <p className={styles.lcDesc}>{lang.desc}</p>
                <div className={styles.lcFoot}>
                  <span>👥 {lang.learners.toLocaleString()}</span>
                  {done>0&&<span className={styles.lcProg}>{done}/{LEVELS.length} ур.</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SETTINGS
═══════════════════════════════════════════════════════════════════ */
function Settings({user,uiLang,setUiLang,dark,setDark,onLogout,t}) {
  const [confirm,setConfirm]=useState(false);
  return(
    <div className={styles.settPage}>
      <h2 className={styles.settTitle}>{t.settings}</h2>

      <div className={styles.profileCard}>
        <div className={styles.pcBgImg}>
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" alt="bg"/>
          <div className={styles.pcBgOverlay}/>
        </div>
        <div className={styles.pcInfo}>
          <div className={styles.pcAv}>{initials(user.name)}</div>
          <div>
            <b className={styles.pcName}>{user.name}</b>
            <p className={styles.pcEmail}>{user.email}</p>
          </div>
        </div>
        <div className={styles.pcStats}>
          <div><b>{user.xp||0}</b><small>XP</small></div>
          <div><b>{user.streak||1}</b><small>🔥</small></div>
          <div><b>{Object.keys(user.completedLevels||{}).length}</b><small>lang</small></div>
        </div>
      </div>

      <div className={styles.settCard}>
        <div className={styles.settRow}>
          <span className={styles.settLabel}>🌐 {t.ifLang}</span>
          <div className={styles.langBtns}>
            {["ru","en","uz"].map(l=>(
              <button key={l} className={`${styles.langBtn} ${uiLang===l?styles.langBtnOn:""}`} onClick={()=>setUiLang(l)}>
                {l==="ru"?"🇷🇺 RU":l==="en"?"🇬🇧 EN":"🇺🇿 UZ"}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.settRow}>
          <span className={styles.settLabel}>{dark?"🌙":"☀️"} {dark?t.dark:t.light}</span>
          <button className={`${styles.toggle} ${dark?styles.togOn:""}`} onClick={()=>setDark(!dark)}>
            <span className={styles.togThumb}/>
          </button>
        </div>
      </div>

      {!confirm
        ?<button className={styles.logoutBtn} onClick={()=>setConfirm(true)}>🚪 {t.logout}</button>
        :<div className={styles.confirmBox}>
           <p>{t.confirmOut}</p>
           <div className={styles.confirmRow}>
             <button className={styles.cYes} onClick={onLogout}>{t.yes}</button>
             <button className={styles.cNo} onClick={()=>setConfirm(false)}>{t.no}</button>
           </div>
         </div>
      }
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
function Nav({page,setPage,user,t}) {
  return(
    <nav className={styles.nav}>
      <div className={styles.navLogo}><span>🌍</span><span className={styles.navLogoTxt}>LinguaFlow</span></div>
      <div className={styles.navLinks}>
        {[{id:"home",ico:"🏠",lbl:t.home},{id:"settings",ico:"⚙️",lbl:t.settings}].map(item=>(
          <button key={item.id} className={`${styles.navLink} ${page===item.id?styles.navOn:""}`} onClick={()=>setPage(item.id)}>
            <span className={styles.navIco}>{item.ico}</span>
            <span className={styles.navLbl}>{item.lbl}</span>
          </button>
        ))}
      </div>
      <div className={styles.navUser}>
        <div className={styles.navAv}>{initials(user.name)}</div>
        <span className={styles.navName}>{user.name}</span>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("lf_session")||"null");}catch{return null;}});
  const [dark,setDark]=useState(()=>localStorage.getItem("lf_dark")==="1");
  const [uiLang,setUiLang]=useState(()=>localStorage.getItem("lf_lang")||"ru");
  const [page,setPage]=useState("home");
  const [activeLang,setActiveLang]=useState(null);
  const t=T[uiLang]||T.ru;

  useEffect(()=>{document.documentElement.setAttribute("data-theme",dark?"dark":"light");localStorage.setItem("lf_dark",dark?"1":"0");},[dark]);
  useEffect(()=>{localStorage.setItem("lf_lang",uiLang);},[uiLang]);

  const auth=u=>{setUser(u);localStorage.setItem("lf_session",JSON.stringify(u));};
  const update=u=>{setUser(u);localStorage.setItem("lf_session",JSON.stringify(u));const us=JSON.parse(localStorage.getItem("lf_users")||"{}");us[u.email]=u;localStorage.setItem("lf_users",JSON.stringify(us));};
  const logout=()=>{setUser(null);localStorage.removeItem("lf_session");setPage("home");setActiveLang(null);};

  if(!user) return <Auth onAuth={auth} t={t}/>;

  return(
    <div className={`${styles.app} ${dark?styles.appDark:""}`}>
      <Nav page={page} setPage={p=>{setPage(p);setActiveLang(null);}} user={user} t={t}/>
      <main className={styles.main}>
        {page==="home"&&!activeLang&&<Home user={user} onSelectLang={setActiveLang} t={t} uiLang={uiLang}/>}
        {page==="home"&&activeLang&&<LangScreen langId={activeLang} user={user} onBack={()=>setActiveLang(null)} onUpdate={update} t={t} uiLang={uiLang}/>}
        {page==="settings"&&<Settings user={user} uiLang={uiLang} setUiLang={setUiLang} dark={dark} setDark={setDark} onLogout={logout} t={t}/>}
      </main>
    </div>
  );
}