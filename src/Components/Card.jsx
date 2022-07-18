import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";


import './style.css';

const Card = ({pokemon, loading}) => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonImage, setPokemonImage] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [dropdown , setDropdown] = useState('none')
    const [dropdownActive , setDropdownActive] = useState(false)
    const [pokemonAbilities , setPokemonAbilities] = useState([])
    const [moves , setMoves] = useState([])
    const [pokemonList , setPokemonList] = useState([]);
  
//     useEffect(()=>{
//         function filterDuplicates(){
//             let i=0
// pokemon.forEach(function(x) {
//     if (i%2 === 0) {
//         setPokemonList(state => {
//             state = [...state,x]})
//             i++
//     }
// });
//         }
//         filterDuplicates();
//         console.log("pokemons",[...pokemon])
//     },[])
    const openPokeInfo = async(res) => {
        // setPokemonList([...pokemon])
        // console.log("pokemonList" , pokemon)
        setPokemonName(res.name);
        setPokemonHeight(res.height);
        setPokemonWeight(res.weight);
        setPokemonImage(res.sprites.front_default);
        setPokemonAbilities(res.abilities.map((item)=><button className="button">{item.ability.name}</button> ))
        setMoves(res.moves.map((item) => <button className="button">{
        item.move.name}</button> ))
        handleShow();

    }


    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pokemonName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokemonImage} class="img-fluid img-height" alt="Responsive image"></img>
                    <p>
                        Height : {pokemonHeight + " " + "inches"}
                    </p>

                    <p>
                        Weight : {pokemonWeight + " " + "kg"}
                    </p>
                    <p>
                        Abilities : {pokemonAbilities}
                    </p>

                    <p>
                        Moves : {moves.slice(0,10)}
                    </p>
                    
                </Modal.Body>
            </Modal>

            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback">
                    <RiSearch2Line className="search-icon" />
                </span>
                <input type="text" className="form-control"
                onChange={event => {setSearchInput(event.target.value);setDropdownActive(false)}}
                placeholder="Search" />
                <br></br>
               
<div className="dropdown">
<label for="type">Choose a type</label>&nbsp;
<select name="type" id="type" onChange={event =>{setDropdown(event.target.value);setDropdownActive(true)}}>
<option value="none">None</option>  
  <option value="grass">grass</option>
  <option value="fire">fire</option>
  <option value="water">water</option>
  <option value="normal">normal</option>
</select>
</div>

            </div>

            <div className="row card-row">
                

                {
                    loading ? <h1>Loading...</h1> :
                    pokemon.filter((item , index) => {
                        if(index%2!=0){
                            return
                        }
                        if (searchInput == "" && dropdown == 'none' && index%2===0) {
                            //console.log("still inside if")
                            return item
                        } else if ((!dropdownActive && item.name.toLowerCase().includes(searchInput.toLowerCase())) || item.types[0].type.name == dropdown){
                            console.log(dropdown)
                            return item
                        }
                    }).map((item) => {
                        
                        return (
                            // <div className="row">
                                
                                <div className="col-md-2"  >
                                    <div className="card poke-card"  key={item.id} onClick={()=> openPokeInfo(item)}>
                                        {/* <p className="card-id">{item.id}</p> */}
                                        <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h5>
                                            <h5 className="card-title poke-name">{item.types[0].type.name +" "+ "type"}</h5>

                                        </div>
                                    </div>
                                    <br />
                                </div>
                            // </div>
                            
                        )
                        
                    })
                }
            </div>
        </>
        
    )
}

export default Card;