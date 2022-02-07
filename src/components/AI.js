// Import Firestore database
import {db} from "../firebase";
import React, { useState } from 'react';
import './read.css';


const Read = () => {

    setTimeout(function() {
        window.location.reload(false);
    }, 7000)
    

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
    <h7 style={{marginTop:"30px",marginBottom:"30px",fontSize:"16px",marginleft:"30px",color:"#3F89F3"}}>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h7>
    
    <h4 style={{marginTop:"30px"}}>มีความเสี่ยงที่จะเป็นข่าวปลอม : {"\n"} <h8 style={{fontSize:"22px",color:"#e82a4d"}}>{FAI}%{"\n"}</h8></h4>
    <h4>มีความคล้ายที่จะเป็นข่าวจริง {"\n"}  <h9 style={{fontSize:"22px",color:"#18d93e"}}>{TAI}%{"\n"}</h9></h4>

    <p>
    <h4>หัวข้อข่าว </h4> {title}
    <h4>เนื้อหาข่าว </h4> {text}
    </p>        
    
                </div>
            </center>
        );
        
    }
    else{

        return(
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู่ ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

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
