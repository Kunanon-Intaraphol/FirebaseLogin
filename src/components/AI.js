// Import Firestore database
import {db} from "../firebase";
import React, { useState } from 'react';
import './read.css';
// import liff from '@line/liff';

const Read = () => {

    setTimeout(function() {
        window.location.reload(false);
    }, 5000)
    
    // const [userId, setUserId] = useState("");
    // const [displayName, setDisplayName] = useState("");
    // const [idToken, setIdToken] = useState("");
    // const [pictureUrl, setPictureUrl] = useState("");
  
    // const initLine = () => {
    //   liff.init({ liffId: '1656553430-qgAJV55b' }, () => {
    //     if (liff.isLoggedIn()) {
    //       runApp();
    //     } else {
    //       liff.login();
    //     }
    //   }, err => console.error(err));
    //   }
    // const runApp = () => {
    //   const idToken = liff.getIDToken();
    //   setIdToken(idToken);
    //   liff.getProfile().then(profile => {
    //     console.log(profile);
    //     setDisplayName(profile.displayName);
    //     setUserId(profile.userId);
    //     setPictureUrl(profile.pictureUrl);
    //   }).catch(err => console.error(err));
    // }
    // useEffect(() => {
    //   initLine();
    // }, []);
    

    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
        console.log("Fetchdata")
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        // const Uid = userId

        db.collection("contacts").get().then((querySnapshot) => {
            console.log("incollection")
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var contacts = element.data();
                setInfo(arr => [...arr , contacts]);
                console.log("inSnapshot")
                  
            });
        })
    }
      
    // Display the result on the page
    return (
        <div>
            <center>
            <h3>NewsProof</h3> 
            {/* <img src = {pictureUrl} style={{width:200, height:200 ,borderRadius:10,marginTop:20,marginBottom:20}}/>
            <h2>สวัสดีคุณ : {displayName}</h2>/
            <h2>{userId}</h2>
            <h2>{idToken}</h2> */}
            
            </center>
        {
            info.map((contacts) => (
            <Frame title={contacts.title} 
                   text={contacts.text} 
                   FAI={contacts.FAI}
                   TAI={contacts.TAI}
                   Status={contacts.status}/>
            ))
        }
        </div>
  
    );
}

const Frame = ({title , text , FAI ,Status ,TAI}) => {

    console.log(title + " " + text + " " + FAI + " " + TAI);
    if(Status == "read"){
        
        console.log("inif")
        return(
        
            <center>
                <div className="div">

    <p>
    <h3>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h3>
    <h4>มีความเสี่ยงที่จะเป็นข่าวปลอม : {FAI}%{"\n"}</h4>
    <h4>มีความคล้ายที่จะเป็นข่าวจริง : {TAI}%{"\n"}</h4>
    <h4>หัวข้อข่าว </h4>{"\n"}   {title}{"\n"}       
    <h4>เนื้อหาข่าว</h4>{"\n"}  {text}{"\n"}
    </p>       
    
                </div>
            </center>
        );
        
    }
    else{
       
        return(
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

    <button style={{    
        width: "250px",
        height: "60px",
        marginTop:'30px',
        color: "#ebedf1",
        backgroundColor: '#3F89F3',
        fontSize:'20px',
        borderRadius:'5px',
        }}
        onClick={() => window.location.reload(false)}
        >
        กดเพื่อรับผลคำตอบ
    </button>
                </div>
            </center>
        );
    }
    
;
}

  
export default Read;
