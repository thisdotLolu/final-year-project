import React from 'react'
import styles from './Traversing.module.css'
import {useState} from 'react'
import {Autodesk} from 'react-forge-viewer'
import { useEffect } from 'react';
import { useRef } from 'react';
import Distance from '../../components/Distance/Distance';
import AdjustedLatitude from './AdjustedLatitude';




const Traversing = ({showDistanceModal, setShowDistanceModal,setDistanceSum, distanceSum,lengths}) => {

  
  //state storage for input fields
  const[fields,setFields]=useState([{line:'', distance:'', bearing:'',lat:'',dep:''}]);
  const[latitudeSum, setLatitudeSum]=useState(0)
  const[departureSum, setDepartureSum]=useState(0)
  const[lengthSum, setLengthSum]=useState(0)
  const[error, setError]=useState(false);
  const [showAdjustedLats, setShowAdjustedLats] = useState(false)
  // const [distanceWithLat,setDistanceWithLat] = useState({})
  const[distanceSummation,setDistanceSummation] = useState(0)  
  const[adjustedLatValues,setAdjustedLatValues] = useState([])
  const[adjustedDepValues,setAdjustedDepValues] = useState([])
  const[correctedLat,setCorrectedLat] = useState([])
  const[correctedDep,setCorrectedDep] = useState([])
  const northingInputRef = useRef(null); 
  const eastingInputRef = useRef(null); 
  const [showNorthingModal,setShowNorthingModal] = useState(false)
  const [showEastingModal,setShowEastingModal] = useState(false)
  let northingsCummulative=[]
  let eastingsCummulative=[]
  const [northingValues,setNorthingValues] = useState()
  const [eastingValues,setEastingValues] = useState()

    const handleNorthingInputChange = () => {
    // Access the current value of the input using the ref
    const inputValue = northingInputRef.current.value;
    console.log('Input Value:', inputValue);

  };

   const handleEastingInputChange = () => {
    // Access the current value of the input using the ref
    const inputValue = eastingInputRef.current.value;
    console.log('Input Value:', inputValue);
  };


  console.log(fields)



  let adjustedLatitudes = []

  let latConstantValue = () =>{
    if(latitudeSum && distanceSum){
      return Number(latitudeSum)/Number(distanceSum)
    }
  }




  let degreeValue;


  const SumOfDistance=()=>{
    let sum = 0;
    fields.forEach((field) => {
      sum += Number(field.distance);
    });
    setDistanceSummation(sum);
  }
  

 



//convert bearing to decimal
function convertBearingToDecimal(bearing) {
  // Extract the components of the bearing
  const direction1 = bearing?.slice(0, 1);
  const degrees1 = bearing?.slice(1, 3);
  const direction2 = bearing?.slice(3, 4);
  const degrees2 = bearing?.slice(4);

  // Convert the degrees to decimal format
  const decimalDegrees1 = parseFloat(degrees1);
  const decimalDegrees2 = parseFloat(degrees2);

    // Calculate the decimal degrees based on the directions
  let result = decimalDegrees1 + decimalDegrees2 / 60;
  
  
  return result;
}

convertBearingToDecimal();

// // Usage
// const bearing = 'S67°38\'E';
// const decimalDegrees = convertBearingToDecimalDegrees(bearing);
// console.log(decimalDegrees); // Output: -67.63333333333334

const degrees_to_radians=(radians)=>{
  var pi = Math.PI;
  return radians * (pi/180);
}


// const bearing = "N05°30'E";
// const decimalDegrees = convertBearingToDecimal(bearing);
// console.log(decimalDegrees); // Output: 5.5


  //handling addition of rows
  function handleAdd(){
    const values = [...fields]
    values.push({value:null})
    setFields([...fields,{line:'',distance:'', bearing:'', lat:'', dep:''}])
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

  




  let dep1=495.8 * Math.sin(5.5);
  console.log(dep1);

  //solving for departure
  const solveDeparture=(bearing,distance)=>{
    let convertedBearing;
    console.log(bearing[bearing.length-1])

    if(bearing[0]==='W' || bearing[bearing.length-1]==='W'){
    convertedBearing = degrees_to_radians(convertBearingToDecimal(bearing));
    console.log(convertedBearing);
    let dep=-(Number(distance) * Math.sin(convertedBearing));
    console.log(dep);
    TotalDep.push(dep)
    console.log('Totaldep:',TotalDep)
    return dep.toFixed(4)
    }
    else{
    convertedBearing = degrees_to_radians(convertBearingToDecimal(bearing));
    console.log(convertedBearing);
    let dep=Number(distance) * Math.sin(convertedBearing);
    console.log(dep);
    TotalDep.push(dep)
    console.log('Totaldep:',TotalDep)
    return dep.toFixed(4)
    }
    
    //d * sine bearing
    
  }
//solving for latiude
  const solveLatitude=(bearing,distance)=>{

    let convertedBearing;

    if(bearing[0] === 'S' || bearing[bearing.length-1] === 'S'){
      convertedBearing = degrees_to_radians(convertBearingToDecimal(bearing));
      console.log(convertedBearing);
      let lat=-(Number(distance) * (Math.cos(convertedBearing)));
      console.log(lat)
      TotalLat.push(lat)
      console.log('TotalLat:',TotalLat)
      return lat.toFixed(4)
     }

    else{
      convertedBearing = degrees_to_radians(convertBearingToDecimal(bearing));
      console.log(convertedBearing);
      let lat=Number(distance) * (Math.cos(convertedBearing));
      console.log(lat)
      TotalLat.push(lat)
      console.log('TotalLat:',TotalLat)
      return lat.toFixed(4)
    }

}


  //Store total
  let TotalDep=[]
  let TotalLat=[]
  let TotalLengthSum=[]
  console.log(typeof(departureSum))
  console.log(latitudeSum)

  //calculate sum
const solveLatSum=()=>{
    let LatSum=0;
    if(TotalLat.length > 1){
    for(let i = 0; i < TotalLat.length;i++ ){
      LatSum += TotalLat[i]
       
    }
    setLatitudeSum(LatSum.toFixed(4))
  }
}

const solveDepSum=()=>{
  let DepSum=0;
  if(TotalDep.length > 1){
  for(let i = 0; i < TotalDep.length;i++ ){
    DepSum += TotalDep[i]
  }
  setDepartureSum(DepSum.toFixed(4))
}} 




const solveLatAdjustment = ()=>{
    fields.map((field)=>{
      const latConst =(Number(latitudeSum) * -1) / Number(distanceSummation)
      const adjusted = Number(latConst) * Number(field.distance)  
      setAdjustedLatValues((prev)=>[...prev,adjusted.toFixed(4)])
    })
  } 


const solveDepAdjustment = ()=>{
  fields.map((field)=>{
    const latConst =(Number(departureSum) * -1) / Number(distanceSummation)
    const adjusted =  Number(latConst) * Number(field.distance)  
    setAdjustedDepValues((prev)=>[...prev,adjusted.toFixed(4)])
  })
} 



console.log(adjustedDepValues)
console.log(adjustedLatValues)




// [{line: '', distance: '495.85', bearing: "N05°30'E", lat: '', dep: ''}
// {line: '', distance: '850.62', bearing: "N46°02'E", lat: '', dep: ''},
// {line: '', distance: '855.45', bearing: "S67°38'E", lat: '', dep: ''},
// {line: '', distance: '1020.87', bearing: "S12°25'E", lat: '', dep: ''},
// {line: '', distance: '1117.26', bearing: "S83°44'W", lat: '', dep: ''},
// {line: '', distance: '660.08', bearing: "N55°09'W", lat: '', dep: ''}]

const solveLengthSum=()=>{
  let lengthsum = 0;
  if(TotalLengthSum.length > 1){
    for(let i = 0; i < TotalLengthSum.length;i++ ){
      lengthsum += TotalLengthSum[i]
    }
    setLengthSum(lengthsum)
  }
}

console.log(TotalLat)
console.log(TotalDep)

console.log(lengths)

const solveAdjLat=(distance,lat)=>{
  let correction;
  correction = Number(latConstantValue) * Number(distance)
  return Number(correction) + Number(lat)
}


const correctedLatitudes =()=>{
  if(TotalLat.length === adjustedLatValues.length){
     TotalLat?.map((value,index)=>{
      setCorrectedLat((prev)=>[...prev,Number(value) + Number(adjustedLatValues[index])])
     }) 
  }  
}

const correctedDepartures = () => {
  if(TotalDep.length === adjustedDepValues.length){
     TotalDep?.map((value,index)=>{
      setCorrectedDep((prev)=>[...prev,Number(value) + Number(adjustedDepValues[index])])
     }) 
  }  
}


const solveNorthings = ()=>{
  let cummulative = 0
  for (let each of correctedLat){
    cummulative += Number(each)
    northingsCummulative.push(Number(cummulative) + Number(northingInputRef.current.value))
  }
  setNorthingValues(northingsCummulative)
  setShowNorthingModal(false)
}

const solveEastings = ()=>{
  let cummulative = 0
  for (let each of correctedDep){
    cummulative += Number(each)
    eastingsCummulative.push(Number(cummulative) + Number(eastingInputRef.current.value))
  }
  setEastingValues(eastingsCummulative)
  setShowEastingModal(false)
}



  return (
    <div className={styles.container}>
      <h1>TRAVERSING</h1>
      <div className={styles.inner}>
       {error && <div className={styles.errorModal}>Invalid Bearing format</div>}
        <div className={styles.header}>
          <div>LINE</div>
          <div>DISTANCE</div>
          <div>BEARING</div>
          <div>LATITUDE</div>
          <div>DEPARTURE</div>
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
          name='bearing'
          className={styles.bearing}
          type='text'
          value={field.bearing}
          onChange={(e)=>onHandle(e,idx)}
          />
          </div>
        <div 
         style={{border:'none'}}
        className={styles.lat}>
        <div
        style={{border:'none'}}
        >
          {field.bearing && field.distance? solveLatitude(field.bearing,Number(field.distance)):''}
        </div>
        </div>

        <div className={styles.dep}
        style={{border:'none'}}
        >
         <div
         style={{border:'none'}}
         >
          {field.bearing && field.distance? solveDeparture(field.bearing,Number(field.distance)):''}
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

        <div className={styles.total_button}>
        <button
        onClick={solveLatSum}
        >Total Latitude</button>: <div>{latitudeSum}</div>
        <button
        onClick={solveDepSum}
        >Total Departure</button>:<div>{departureSum}</div>
        <button
        onClick={SumOfDistance}
        >Total Length</button>:<div>{distanceSummation}</div>
        <button
        onClick={solveLatAdjustment}
        >
          Calculate Adjusted Latitudes
        </button>

        <button
        onClick={solveDepAdjustment}
        >
          Calculate Adjusted Latitudes
        </button>
        </div>
        

        {/* {
          showDistanceModal && <Distance
          showDistanceModal={showDistanceModal}
          setShowDistanceModal={setShowDistanceModal}
          distanceSum={distanceSum}
          setDistanceSum={setDistanceSum}
          lengths={lengths}
          />
        }


        
        <div style={{width:'100%', display:'flex',justifyContent:'center', alignItems:'center'}}>
          <a href="https://web.autocad.com/acad/me/drawings/new/editor" target="_blank" rel="noopener noreferrer">
          <button
          onClick={
            ()=>setShowAdjustedLats(true)
          }
          >
            Calculate Adjusted Values
          </button>
          </a>
        </div> */}

        <div className={styles.correctionContainer}>
          <h1>Correction Values</h1>
          <div className={styles.correctionInner}>
          <div>
            <h3>Latitude Corrections</h3>
          <div>{adjustedLatValues && adjustedLatValues?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>

          <div>
            <h3>Departure Corrections</h3>
          <div>{adjustedDepValues && adjustedDepValues?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>
          </div>
        </div>

        <button onClick={correctedLatitudes}>
          Calculate Latitude Adjustments
        </button>

        <button onClick={correctedDepartures}
        style={{marginLeft:'10px'}}
        >
          Calculate Departure Adjustments
        </button>


        <div className={styles.correctionContainer}>
          <h1>Adjusted Values</h1>
          <div className={styles.correctionInner}>
          <div>
            <h3>Latitude Adjustments</h3>
          <div>{correctedLat && correctedLat?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>

          <div>
            <h3>Departure Adjustments</h3>
          <div>{correctedDep && correctedDep?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>
          </div>
        </div>

        <button onClick={()=>setShowNorthingModal(true)}>
          Calculate Northings
        </button>

        <button onClick={()=>setShowEastingModal(true)}
        style={{marginLeft:'10px'}}
        >
          Calculate Eastings
        </button>

        <div className={styles.correctionContainer}>
          <h1>Northings And Eastings</h1>
          <div className={styles.correctionInner}>
          <div>
            <h3>Northings</h3>
          <div>{northingValues && northingValues?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>

          <div>
            <h3>Eastings</h3>
          <div>{eastingValues && eastingValues?.map((adj,index)=>(
            <p key={index}>{adj}</p>
          ))}</div>
          </div>
          </div>
        </div>

        <div style={{width:'100%', display:'flex',justifyContent:'center', alignItems:'center'}}>
          <a href="https://web.autocad.com/acad/me/drawings/new/editor" target="_blank" rel="noopener noreferrer">
          <button>
            Plot
          </button>
          </a>
        </div>
      </div>
      {
       showNorthingModal && <NorthingModal
      solveNorthings={solveNorthings}
      setShowNorthingModal={setShowNorthingModal}
      handleNorthingInputChange={handleNorthingInputChange}
      northingInputRef={northingInputRef}
      />
      }

      {showEastingModal && 
      <EastingModal
      solveEastings={solveEastings}
      setShowEastingModal={setShowEastingModal}
      handleEastingInputChange={handleEastingInputChange}
      eastingInputRef={eastingInputRef}
      />
      }

    </div>
    
  )
}

export default Traversing





export const NorthingModal=({setShowNorthingModal,solveNorthings, handleNorthingInputChange,northingInputRef})=>{
  return (
    <div className={styles.modalContainer}>
      Input First Coordinate For Northing: <input
      ref={northingInputRef}
      type='text'
      onChange={handleNorthingInputChange}
      />

      <div
      style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}
      >
        <button
      style={{display:'block', marginTop:'5px'}}
      onClick={solveNorthings}
      >
        Solve Northings
      </button>
      <button
      onClick={()=>setShowNorthingModal(false)}
      style={{marginTop:'60px'}}>
      Close
      </button>
      </div>
      
    </div>
  )
}


export const EastingModal=({setShowEastingModal,solveEastings, handleEastingInputChange,eastingInputRef})=>{
  return (
    <div className={styles.modalContainer}>
      Input First Coordinate For Easting
      <input
      type='text'
      ref={eastingInputRef}
      onChange={handleEastingInputChange}
      />

      <div
      style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}
      >
        <button
      style={{display:'block', marginTop:'5px'}}
      onClick={solveEastings}
      >
        Solve Eastings
      </button>
      <button
      onClick={()=>setShowEastingModal(false)}
      style={{marginTop:'60px'}}>
      Close
      </button>
      </div>
    </div>
  )
}