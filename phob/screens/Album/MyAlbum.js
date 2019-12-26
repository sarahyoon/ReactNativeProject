import React from 'react';
import Header from './AlbumComponent/Header';
import AlbumViewList from './AlbumComponent/AlbumViewList';

const MyAlbum = props => {
    return(
        <>
        <Header {...props}/>
        <AlbumViewList {...props}/>
        </>
    );
}


export default MyAlbum;