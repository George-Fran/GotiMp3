import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const youtubeID = youtube_parser(inputUrlRef.current.value);


    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }

    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))
    
    inputUrlRef.current.value = '';
  }
  return (
    <div className="app">
      <section className="container">
        <h1>
          Convertidor de
          <span className="container_titulo">YouTube</span> a MP3
        </h1>
        <h2>
          "Cansado de ver anuncio tras anuncio para descargar una cancion<br
            className="show-for-large"
          />¡No te preocupes llego <strong>GotiMp3</strong> tu convertidor de Musica Sin Anuncios!"

        </h2>
        <br />
        <br />

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} type="text"
            placeholder="Pega tu link de YouTube aqui..."
            className="form-nose"
          />
          <button type="submit" className="btn btn--pe btn--insano uppercase">Buscar</button>
        </form>

        <br>
        </br>
        <br />
        <br />
        <br />
        {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult} className="descargar_btn">Descargar MP3</a> : ''}
      </section>

    </div>

  )
}

export default App
