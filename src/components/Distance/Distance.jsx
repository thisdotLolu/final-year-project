import React from 'react'
import styles from './Distance.module.css'
import { useState } from 'react'


const Distance = ({showDistanceModal, setShowDistanceModal,setDistanceSum, distanceSum, lengths}) => {

    const[lengthStore,setLengthStore] = useState([])

    console.log(lengths)

    const[num1, setNum1]=useState('')
    const[num2, setNum2]=useState('')
    const[num3, setNum3]=useState('')
    const[num4, setNum4]=useState('')
    const[num5, setNum5]=useState('')
    const[num6, setNum6]=useState('')
    const[num7, setNum7]=useState('')
    const[num8, setNum8]=useState('')
    const[num9, setNum9]=useState('')
    const[num10,setNum10]=useState('')



    
    function CompileLengths(length){
        if(length > 2){
            lengths.push(length)
        }
    }


    CompileLengths(num1)
    CompileLengths(num2)
    CompileLengths(num3)
    CompileLengths(num4)
    CompileLengths(num5)
    CompileLengths(num6)
    CompileLengths(num7)
    CompileLengths(num8)
    CompileLengths(num9)
    CompileLengths(num10)
    // CompileLengths(num1)

    console.log(lengths);
    let sum = 0;

    for (let i = 0; i < lengths.length; i++) {
        sum += Number(lengths[i]);
    }

    setDistanceSum(sum);
    console.log(distanceSum)

    setLengthStore([num1,num2,num3,num4,num5,num6])

  return (
    <div className={styles.container}>
        <h2>Enter Distance Values</h2>
        <div className={styles.inner}>
            <input
            type='number'
            value={num1}
            onChange={(e)=>setNum1(e.target.value)}
            />        
            <input
            type='number'
            value={num2}
            onChange={(e)=>setNum2(e.target.value)}
            />        
            <input
            type='number'
            value={num3}
            onChange={(e)=>setNum3(e.target.value)}
            />        
            <input
            type='number'
            value={num4}
            onChange={(e)=>setNum4(e.target.value)}
            />        
            <input
            type='number'
            value={num5}
            onChange={(e)=>setNum5(e.target.value)}
            />        
            <input
            type='number'
            value={num6}
            onChange={(e)=>setNum6(e.target.value)}
            />        
            <input
            type='number'
            value={num7}
            onChange={(e)=>setNum7(e.target.value)}
            />        
            <input
            type='number'
            value={num8}
            onChange={(e)=>setNum8(e.target.value)}
            />        
            <input
            type='number'
            value={num9}
            onChange={(e)=>setNum9(e.target.value)}
            />        

            <input
            type='number'
            value={num10}
            onChange={(e)=>setNum10(e.target.value)}
            />        
        </div>

        <div className={styles.sum}>
            <p>Calculate sum:</p>
            <span>{sum}</span>
        </div>

        <button
        onClick={()=>setShowDistanceModal(!showDistanceModal)}
        >
            Close
        </button>
    </div>
  )
}

export default Distance