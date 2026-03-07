import styles from "./App.module.css";
import { useEffect, useState } from "react";

const cities = {
Tashkent:{lat:41.31,lon:69.28},
Samarkand:{lat:39.65,lon:66.97},
Bukhara:{lat:39.77,lon:64.42},
Namangan:{lat:41.00,lon:71.64},
Andijan:{lat:40.78,lon:72.34},
Nukus:{lat:42.46,lon:59.61},
Fergana:{lat:40.39,lon:71.78},
Qarshi:{lat:38.86,lon:65.79},
Urgench:{lat:41.55,lon:60.63},
Jizzakh:{lat:40.11,lon:67.84},
Termez:{lat:37.22,lon:67.27},
Navoi:{lat:40.08,lon:65.37}
};

function App(){

const [city,setCity]=useState("Tashkent");
const [weather,setWeather]=useState(null);
const [search,setSearch]=useState("");
const [time,setTime]=useState(new Date());
const [selectedDay,setSelectedDay]=useState(null);

useEffect(()=>{
setInterval(()=>{
setTime(new Date());
},1000);
},[]);

useEffect(()=>{

const {lat,lon}=cities[city];

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
.then(res=>res.json())
.then(data=>setWeather(data));

},[city]);

const filteredCities = Object.keys(cities).filter(c =>
c.toLowerCase().includes(search.toLowerCase())
);

return(

<div className={styles.container}>

<header className={styles.header}>

<h1 className={styles.logo}>⚡ UZ WEATHER</h1>

<div className={styles.clock}>
{time.toLocaleTimeString()}
</div>

<p className={styles.date}>
{time.toDateString()}
</p>

</header>

<input
className={styles.search}
placeholder="Введите город Узбекистана..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className={styles.cityList}>

{filteredCities.map(c=>(
<button key={c} onClick={()=>setCity(c)} className={styles.cityBtn}>
{c}
</button>
))}

</div>

{weather && (

<div className={styles.currentWeather}>

<h2>{city}</h2>

<p>🌡 {weather.current_weather.temperature}°C</p>

<p>💨 {weather.current_weather.windspeed} km/h</p>

<p>🌧 {weather.hourly.precipitation_probability[0]}%</p>

</div>

)}

{weather && (

<div className={styles.week}>

{weather.daily.time.map((day,index)=>(

<div
key={index}
className={styles.card}
onClick={()=>setSelectedDay(index)}
>

<h4>{day}</h4>

<p>
{weather.daily.temperature_2m_max[index]}°
/
{weather.daily.temperature_2m_min[index]}°
</p>

</div>

))}

</div>

)}

{selectedDay !== null && weather && (

<div className={styles.details}>

<h2>Подробная погода</h2>

<p>Дата: {weather.daily.time[selectedDay]}</p>

<p>Максимальная температура: {weather.daily.temperature_2m_max[selectedDay]}°</p>

<p>Минимальная температура: {weather.daily.temperature_2m_min[selectedDay]}°</p>

<p>Вероятность осадков: {weather.hourly.precipitation_probability[0]}%</p>

<button
className={styles.closeBtn}
onClick={()=>setSelectedDay(null)}
>
Закрыть
</button>

</div>

)}

<footer className={styles.footer}>

<p>Weather service for Uzbekistan</p>

</footer>

</div>

)

}

export default App;