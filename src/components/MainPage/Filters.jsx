import React from "react";
import Filter from "./Filter";
const Filters = ({fn})=>{
    return (
        <fieldset style={{marginTop:'-50px', marginLeft:'400px', width:'200px', height:'250px', marginBottom:'110px'}}> 
        <legend style={{marginLeft:'-40px'}}>Custom Filters</legend>
        <section style={{display:'flex', flexDirection:'column'}}>

            <Filter type='Fried Chicken' fn={fn}></Filter>
            <Filter type='Ice Cream' fn={fn}></Filter>
            <Filter type='None' fn={fn}></Filter>
            
        </section>
        </fieldset>
    )
}
export default Filters;