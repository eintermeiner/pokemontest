import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const getData = async (name) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return axios.get('https://pokeapi.co/api/v2/pokemon/' + name).then(({ data }) => {
    let attack = undefined
    data?.stats?.map(x => {
      if (x?.stat?.name === 'attack') {
        attack = x.base_stat
      }
    })
    return  {
      attack,
      imageUrl: data?.sprites?.front_default,
      height: data?.height,
      id: data?.id,
      moves: data.moves?.length
    }
  })
}

const App = () => {

  const [pokeName, setPokeName] = useState('bulbasaur')
  const { data, isLoading } = useQuery(['getPokemon', pokeName], () => getData(pokeName))

  return (
    <div>
      <div className="container">
        <div className="title">
          <h1 className="title_text">
            ПОКЕМОНЫ API
          </h1>
          <p className="title_addition">
            Нажмите на <br/> нужное Покемона
          </p>
        </div>
        <div className="chips_container">
          <div className="chips">
            <a onClick={() => setPokeName('bulbasaur')} className="chip">bulbasaur</a>
            <a onClick={() => setPokeName('ivysaur')} className="chip">ivysaur</a>
            <a onClick={() => setPokeName('venusaur')} className="chip">venusaur</a>
            <a onClick={() => setPokeName('charmander')} className="chip">charmander</a>
            <a onClick={() => setPokeName('charizard')} className="chip">charizard</a>
            <a onClick={() => setPokeName('weedle')} className="chip">weedle</a>
          </div>
          <div className="chips_term">
            <h2 className="chips_term_title">{pokeName[0].toUpperCase() + pokeName.slice(1)}</h2>
            <div className="chips_imagecontainer">
              {isLoading && <img src='/spinner.gif' style={{transform: "translateY(-50%) scale(.5)"}} height="" alt=""/>}
              {!isLoading && <img src={data?.imageUrl ?? ''} height="200px" alt=""/>}
            </div>
            <p className="chips_term_props">
              Снялся в {data?.moves} сериях<br/>
              Id: {data?.id}<br/>
              height: {data?.height}<br/>
              attack: {data?.attack}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
