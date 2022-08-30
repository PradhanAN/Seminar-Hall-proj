import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';

export default function Base(props) {
    return (
        <>
            <NavBar />
               {props.children}
            <Footer />
        </>
    )
}
