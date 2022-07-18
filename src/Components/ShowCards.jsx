import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

import './style.css'
import logo from '../poke-logo.jpeg';

const ShowCards = () => {
    const [pokemonData , setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [disable, setDisable] = React.useState(true);


    const pokemonControls = async() => {
        const res = await axios.get(url);

        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        fetchPokemonData(res.data.results);
        setIsLoading(false)

        console.log("PREV", res.data.previous);
        console.log("NEXT", res.data.next);

        if (res.data.previous != null) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const fetchPokemonData = async(res) => {
        res.map(async(item)=>{
            const result =  await axios.get(item.url);
            console.log("MAP DATA", result.data);
            setPokemonData(state => {
                state = [...state,result.data]
                //console.log("state" , state)
                state.sort((a,b) => a.id>b.id?1:-1)
                return state;
            })
        })
    }


    useEffect(() => {
        pokemonControls()
    }, [url])

    return(
        <>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    &nbsp;<img src={logo} width="40" height="40" className="d-inline-block align-top" alt=""/>&nbsp;
                    &nbsp;Pokedex
                </a>
            </nav>
            <div className="container">
                <Card pokemon={pokemonData} loading={isLoading}></Card>
                <div className="btn-div">
                    <button type="button" disabled={disable} className="btn btn-func" onClick={()=> {
                        setPokemonData([])
                        setUrl(prevUrl)
                    }}>Previous</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-func" onClick={()=>{
                        setPokemonData([])
                        setUrl(nextUrl)
                    }}>Next</button>
                </div>
                
            </div>
        </>
    )
};

export default ShowCards;