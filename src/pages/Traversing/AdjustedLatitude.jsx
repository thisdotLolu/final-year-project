import React, { useState } from 'react'

const AdjustedLatitude = ({showAdjustedLats,setShowAdjustedLats,TotalDep,TotalLat,lengths,latSum,depSum,distanceSum,fields}) => {
    const [latCorrections,setLatCorrections] = useState([])

    console.log(TotalDep)
    const correctionOverPerimeterForLat = (distance) =>{
        // if(TotalDep.toString())
        let latSumSign;
        if(latSum<0){
            latSumSign = latSum * -1
            let corr = latSumSign / Number(distanceSum)
            return distance * corr
        }
        else if(latSum>0){
            latSumSign = latSum * -1
            let corr = latSumSign / Number(distanceSum)

            return distance * corr
        }
    }

    const latitudeCorrections = fields.map((field)=>(
        correctionOverPerimeterForLat(field.distance)
    ))
    console.log(lengths)
    console.log(latitudeCorrections)
    console.log(latCorrections)

  return (
    <div className='adjusted_container'>
        <div>
         <h1>Adjusted Values</h1>
         <div>
            <div>
            <h3>Latitude corrections:</h3> 
            <p>{latCorrections?.map((lc)=>(
                lc
            ))}</p>
            <button
            onClick={()=>setLatCorrections(latitudeCorrections)}
            >Calculate Latitude corrections</button>
            </div>

            <div>
            <h3>Departure Corrections</h3>
            </div>
         </div>
         
        </div>
    </div>
  )
}

export default AdjustedLatitude