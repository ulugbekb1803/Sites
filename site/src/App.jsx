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

useEffect(()=>{

const {lat,lon}=cities[city];

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
.then(res=>res.json())
.then(data=>setWeather(data));

},[city]);

return(

<div className={styles.container}>

<header className={styles.header}>
<div className={styles.logo}>UzWeather</div>
</header>

<section className={styles.hero}>
<h1>Погода в Узбекистане</h1>
<p>Актуальная погода и прогноз на неделю</p>
</section>

<div className={styles.cityButtons}>
{Object.keys(cities).map(c=>(
<button key={c} onClick={()=>setCity(c)} className={styles.button}>
{c}
</button>
))}
</div>

{weather && (

<div className={styles.currentWeather}>

<img
className={styles.weatherIcon}
src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
/>

<div>

<h2>{city}</h2>
<p>Температура: {weather.current_weather.temperature}°C</p>
<p>Ветер: {weather.current_weather.windspeed} km/h</p>

</div>

</div>

)}

{weather && (

<section>

<h2 className={styles.title}>Прогноз на неделю</h2>

<div className={styles.week}>

{weather.daily.time.map((day,index)=>(

<div key={index} className={styles.card}>

<img
className={styles.cardIcon}
src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
/>

<p>{day}</p>

<p>
{weather.daily.temperature_2m_max[index]}° /
{weather.daily.temperature_2m_min[index]}°
</p>

</div>

))}

</div>

</section>

)}

{/* WEATHER TYPES FOR UZBEKISTAN */}

<section>

<h2 className={styles.title}>Типичная погода в Узбекистане</h2>

<div className={styles.gallery}>

<img src="https://images.unsplash.com/photo-1501973801540-537f08ccae7b"/>
<img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"/>
<img src="https://images.unsplash.com/photo-1461511669078-d46bf351cd6e"/>
<img src="https://images.unsplash.com/photo-1503437313881-503a91226402"/>
<img src="https://images.unsplash.com/photo-1519681393784-d120267933ba"/>
<img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9"/>

</div>

</section>

<section className={styles.info}>

<h2>Климат Узбекистана</h2>

<p>
Узбекистан имеет резко континентальный климат.
Лето здесь жаркое и сухое, температура часто
достигает 35–40°C.
</p>

<p>
Зимой температура может опускаться ниже нуля,
особенно в северных регионах страны.
Весна и осень считаются самыми комфортными сезонами.
</p>

</section>

<footer className={styles.footer}>

<p>UzWeather • Weather service for Uzbekistan</p>

</footer>

</div>

)

}

export default App