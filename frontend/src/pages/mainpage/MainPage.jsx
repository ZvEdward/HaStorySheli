import { useState, useRef, useContext } from "react";
import React from "react";
import logo from '../../images/Logo.png'
import axios from "axios";

function MainPage() {
 
    function fetchMostLiked () {

        axios.get('mostliked')
        .then(response => {
            const LikedArr= response.data;  })
        .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
 
    return (
 <>
<div>
    <img src="../../images/Logo.pn" alt="yyy" />
</div>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptates deserunt porro expedita assumenda delectus aut provident, sequi aliquam iure, incidunt sit tenetur quidem officia error possimus illo illum et.</p>

<div>
<p>הכי אהובים</p>
// List
</div>
<div>
<p>ספרים חדשים</p>
//List
</div>




 </>
 
 );
}

export default MainPage;
