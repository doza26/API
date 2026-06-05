import React from 'react'
import './loader.scss'

const Loader = () => {
    return (
        <>
            <div className="myloader">
                <div class="loader">
                    <div class="loader_cube loader_cube--color"></div>
                    <div class="loader_cube loader_cube--glowing"></div>
                </div>
            </div>
        </>
    )
}

export default Loader