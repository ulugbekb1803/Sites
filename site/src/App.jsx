import { useState } from "react";
import styles from "./App.module.css";

const movies = [
  {title:"Wonder Woman", genre:"DC", poster:"https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", trailer:"https://www.youtube.com/embed/VSB4wGIdDwo"},
  {title:"Dune 2",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",trailer:"https://www.youtube.com/embed/Way9Dexny3w"},
  {title:"Avatar 2",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",trailer:"https://www.youtube.com/embed/4z6s_O-7x8E"},
  {title:"Oppenheimer",genre:"Drama",poster:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",trailer:"https://www.youtube.com/embed/JA9XoPTirv0"},
  {title:"John Wick 4",genre:"Action",poster:"https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",trailer:"https://www.youtube.com/embed/6EevuQ8n4Wg"},
  {title:"Batman",genre:"DC",poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",trailer:"https://www.youtube.com/embed/EXeTwQWrcwY"},
  {title:"Spider-Man",genre:"Marvel",poster:"https://image.tmdb.org/t/p/w500/5weKu49pzJCt06OPpjvT80efnQj.jpg",trailer:"https://www.youtube.com/embed/rk-dF1lIbIg"},
  {title:"Doctor Strange",genre:"Marvel",poster:"https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",trailer:"https://www.youtube.com/embed/HSzx-zryEgM"},
  {title:"Black Panther",genre:"Marvel",poster:"https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",trailer:"https://www.youtube.com/embed/xjDjIWPwcPU"},
  {title:"Thor: Love and Thunder",genre:"Marvel",poster:"https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",trailer:"https://www.youtube.com/embed/Go8nTmfrQd8"},
  {title:"Guardians of the Galaxy",genre:"Marvel",poster:"https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",trailer:"https://www.youtube.com/embed/d96cjJhvlMA"},
  {title:"Fast X",genre:"Action",poster:"https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",trailer:"https://www.youtube.com/embed/9X7afk1g1SU"},
  {title:"Mission Impossible",genre:"Action",poster:"https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",trailer:"https://www.youtube.com/embed/LXb3EKWsInQ"},
  {title:"Aquaman",genre:"DC",poster:"https://image.tmdb.org/t/p/w500/xLPffWMhMj1l50ND3KchMjYoKmE.jpg",trailer:"https://www.youtube.com/embed/WDkg3h8PCVU"},
  {title:"The Flash",genre:"DC",poster:"https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",trailer:"https://www.youtube.com/embed/wb49-oV0F78"},
  {title:"Interstellar",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",trailer:"https://www.youtube.com/embed/zSWdZVtXT7E"},
  {title:"Tenet",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",trailer:"https://www.youtube.com/embed/L3pk_TBkihU"},
  {title:"Inception",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",trailer:"https://www.youtube.com/embed/YoHD9XEInc0"},
  {title:"Matrix",genre:"Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",trailer:"https://www.youtube.com/embed/vKQi3bBA1y8"},
  {title:"Harry Potter",genre:"Adventure",poster:"https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",trailer:"https://www.youtube.com/embed/VyHV0BRtdxo"},
  {title:"Frozen",genre:"Adventure",poster:"https://image.tmdb.org/t/p/w500/yp8vEZflGynlEylxEesbYasc06i.jpg",trailer:"https://www.youtube.com/embed/TbQm5doF_Uc"}
];

const genres=["All","Action","Sci-Fi","Marvel","DC","Adventure","Drama"];

export default function App(){
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("All");
  const [activeMovie,setActiveMovie]=useState(movies[0]);
  const [ratings,setRatings]=useState({});

  function rate(title,value){
    setRatings({...ratings,[title]:value});
  }

  const filtered=movies.filter(movie =>
    (filter==="All" || movie.genre===filter) &&
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>🍿 Uzbekistan Cinema</h1>
        <input placeholder="Search movies..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </header>

      <section className={styles.hero}>
        <iframe src={activeMovie.trailer} title="trailer" allowFullScreen/>
        <h2>{activeMovie.title}</h2>
      </section>

      <div className={styles.filters}>
        {genres.map(g=>(
          <button key={g} onClick={()=>setFilter(g)} className={filter===g?styles.active:""}>{g}</button>
        ))}
      </div>

      <section className={styles.grid}>
        {filtered.map(movie=>(
          <div key={movie.title} className={styles.card} onClick={()=>setActiveMovie(movie)}>
            <img src={movie.poster} alt={movie.title} onError={(e)=>{e.target.src="https://via.placeholder.com/400x600"}}/>
            <h3>{movie.title}</h3>
            <div className={styles.stars}>
              {[1,2,3,4,5].map(s=>(
                <span key={s} onClick={(e)=>{e.stopPropagation(); rate(movie.title,s);}} className={ratings[movie.title]>=s?styles.starActive:""}>★</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}