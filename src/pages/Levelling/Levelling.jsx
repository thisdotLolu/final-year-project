import React from 'react'
import styles from '../Traversing/Traversing.module.css'
import {useState} from 'react'







const Levelling = () => {

  
  //state storage for input fields
  const[fields,setFields]=useState([{line:'', distance:'',backSight:'', intermediateSight:'', foreSight:'', heightOfInstrument:''}]);
  const[latitudeSum, setLatitudeSum]=useState(0)
  const[departureSum, setDepartureSum]=useState(0)
  const[lengthSum, setLengthSum]=useState(0)
  const[error, setError]=useState(false);

  let degreeValue;
  

  function handleAdd(){
    const values = [...fields]
    values.push({value:null})
    setFields([...fields,{line:'',distance:'', backSight:'', intermediateSight:'', foreSight:'', heightOfInstrument:''}])
  }

  //handling state tracking logic
  const onHandle=(e,i)=>{
    let newForm =[...fields];
    newForm[i][e.target.name]=e.target.value
    setFields(newForm);
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    console.log('submitData', fields);
  }

  const solveReducedLevel=(bs, is, fs, hi)=>{
    if(bs && hi){
      return (hi-bs).toFixed(3) 
    }
    else if(hi && is){
      return  (hi - is).toFixed(3) 
    }
    else if(hi && fs){
      return (hi - fs).toFixed(3)
    }
    else if(fs && bs){

    }
  }
  
  return (
    <div className={styles.container}>
      <h1>LEVELLING</h1>
      <div className={styles.inner}>
       {error && <div className={styles.errorModal}>Invalid Format format</div>}
        <div className={styles.header}>
          <div>STN</div>
          <div>DISTANCE</div>
          <div>BS</div>
          <div>IS</div>
          <div>FS</div>
          <div>HI</div>
          <div>RL</div>
          <div>BM</div>
        </div>
        {
          fields.map((field,idx)=>{
            return(
          <div   
            className={styles.row1}
            key={idx}>
            <div>
          <input
          className={styles.line}
          name='line'
          type='text'
          value={field.line}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>
          <div>
          <input
          name='distance'
          className={styles.distance}
          type='number'
          value={field.distance}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>
          <div>
          <input
          name='backSight'
          className={styles.bearing}
          type='text'
          value={field.backSight}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>

          <div>
          <input
          name='intermediateSight'
          className={styles.bearing}
          type='text'
          value={field.intermediateSight}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>

          <div>
          <input
          name='foreSight'
          className={styles.bearing}
          type='text'
          value={field.foreSight}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>
          <div>
          <input
          name='heightOfInstrument'
          className={styles.bearing}
          type='text'
          value={field.heightOfInstrument}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>
          <div>
          <div className={styles.lat}>
          {field.backSight || field.foreSight || field.heightOfInstrument || field.intermediateSight? solveReducedLevel(field.backSight, field.intermediateSight, field.foreSight, field.heightOfInstrument): ''}  
          </div>    
          </div>
          <div>
          <div className={styles.lat}>
        </div>    
          </div>
       
        </div>
         )
        })
        }
        <button 
        className={styles.addField}
        onClick={()=>handleAdd()}>Add Field</button>
        {/* <button
        onClick={onSubmit}
        >
          submit
        </button> */}

        {/* <div className={styles.total_button}>
        <button
        
        >Total Latitude</button>: <div>{latitudeSum}</div>
        <button
        
        >Total Departure</button>:<div>{departureSum}</div>
        <button
        >Total Length</button>:<div>{}</div>
        </div>        */}
      </div>
      

    
    </div>
  )
}

export default Levelling