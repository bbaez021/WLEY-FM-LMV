import "./index.css"
import React, { useState } from 'react';
import { Box } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"

function List(){
    const [playlist, filterOlaylist] = useState<Array<{id:number, 
        title:string, 
        artist: string, 
        releaseYear:number,
        albumArt:string,
        lastAppeared:Date,
        timesAppeared:number,
        poster_path:string}>>([]);
    return (
        <div id="main-page">
            <Box bg="tomato" w="100%" p="4" color="white">
                This is the Box
            </Box>
        </div>
    )
}

export default List;