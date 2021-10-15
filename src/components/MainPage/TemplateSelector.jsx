import React, {useState} from 'react';
import { useParams } from 'react-router';
import RestaurantIcon from './RestaurantIcon';
const TemplateSelector =({arr, type})=>{
    const {id} = useParams()

    const [indexArr, setIndexArr] = useState([0,1,2,3]);
    // useEffect(()=>{
    //     setDataArr(arr);
    // },[arr])
    const moveRight = ()=>{
        let temp = [...indexArr];
        temp = temp.map(e=>{
            if(e === arr.length -1) return (0)
            else return (e+1);
        })
        console.log(temp)
        setIndexArr(temp)
    }
    const  moveLeft= ()=>{
        let temp = [...indexArr];
        temp = temp.map(e=>{
            if(e === 0) return arr.length-1
            else return e-1;
        })
        console.log(temp)
        setIndexArr(temp)
    }
    return arr.length > 3 ? (
        <> 
                <h4 style={{marginBottom:'10px',marginTop: '40px'}}>{type}</h4>
            <section className='main-selector'style={{
                display:'flex', flexDirection:'row', alignItems:'center', width:'100%', borderColor:'yellow',borderWidth:'3px',
                marginTop:'0px',
            }}>
                    <div className='triangle left' onClick={moveLeft}/>
                   
                    {indexArr.map(e=>{return <RestaurantIcon res_id={arr[e].id} title={arr[e].name} image={arr[e].url}/>})
}

                    <div className='triangle right' onClick={moveRight}/>

            </section>
        </>
    ) : (
        
        <div className="loading"></div>
    )
}
export default TemplateSelector;