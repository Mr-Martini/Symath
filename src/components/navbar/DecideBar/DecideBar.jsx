import React, { useState } from 'react'
import NavMOB from '../SmartphoneBar/SmartphoneBar'
import NavPC from  '../pcbar/pcbar'


export default function NavBar(){

    const [, setVerify] = useState(0)

    document.body.onresize = function () {
        if (document.body.clientWidth <= 600){
            setVerify(1)
            return <NavMOB />
        }
        else {
            setVerify(2)
            return <NavPC />
        }
    }

    if (window.innerWidth <= 600){
        return <NavMOB />
    }
    else {
        return <NavPC />
    }

}