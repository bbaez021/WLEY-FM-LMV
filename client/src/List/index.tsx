import "./index.css"
import React, { useState } from 'react';
import { Box, Icon, Stack, IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

function List(){
    const [playlist, setPlaylist] = useState<Array<{id:number, 
        title:string, 
        artist: string, 
        releaseYear:number,
        albumArt:string,
        lastAppeared:Date,
        timesAppeared:number,
        poster_path:string}>>([]);


    
    return (
        <div id="list-view">
            
        </div>
    )
}

export default List;