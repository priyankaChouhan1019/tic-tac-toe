import React, { useState } from 'react'

function Player( {initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] =useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    function handleEditClick(){
      // !isEditing will work as {isEditing ? false : true}
      //setIsEditing(!isEditing); // this is also wrong practice
      // if you have to update the state based on  previous state we should always pass function
      setIsEditing((editing)=> !editing)
      if(isEditing){
        onChangeName(symbol, playerName);
      }
      
    }

    function handleChange(event){
      console.log("event trigger", event);
      setPlayerName(event.target.value)
    }


    let editablePlayerName = <span className="player-name">{playerName}</span>

    if(isEditing){
      // people talk about two-way binding so taking this onchange value and feeding hem again in value 
      // is two way biding (Two-way binding allows creating synchronization between 2 entities, for example, application data and view. )
      editablePlayerName = <input type='text' required value={playerName} onChange={handleChange}/>
    }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
      {editablePlayerName}
      <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}

export default Player