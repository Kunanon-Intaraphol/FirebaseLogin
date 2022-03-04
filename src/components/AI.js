// Import Firestore database
import {db} from "../firebase";
import React, { useState } from 'react';
import './read.css';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Read = () => {
    
    const [info , setInfo] = useState([]);

    window.addEventListener('load', () => {
        Fetchdata();
        console.log("Fetchdata")
      });
  

    const Fetchdata = ()=>{

        db.collection("contacts").get().then((querySnapshot) => {
            console.log("incollection")
            querySnapshot.forEach(element => {
                var contacts = element.data();
                setInfo(arr => [...arr , contacts]);
                console.log("inSnapshot")
                  
            });
        })
    }
      
    return (
        <div>
            <center>
            <h3>NewsProof</h3> 

            <button style={{    
            width: "220px",
            height: "60px",
            color: "#ebedf1",
            backgroundColor: '#3F89F3',
            fontSize:'20px',
            borderRadius:'10px',
            position:"absolute",
            top:"35%",
            left:"20%",
            }}
            onClick={() => window.location.reload(false)}
            >
            กดเพื่อรับผลคำตอบ
            </button>
            </center>
            {
                info.map((contacts) => (
                <Frame News={contacts.news} 
                    Sentence={contacts.sentence} 
                    FAI={contacts.FAI}
                    INTFAI={contacts.intFAI}
                    TAI={contacts.TAI}
                    Status={contacts.status}
                    onlyST={contacts.onlyST}
                    STonlyP={contacts.STonlyP}/>
                    
                ))
            }
        </div>
        
    );
}

const Frame = ({News , Sentence , FAI ,Status ,TAI ,INTFAI,onlyST,STonlyP}) => {

    const data = []
    let lengthonlyST =  onlyST.length;
    for(var i=0;i<lengthonlyST;i++){
        console.log(i);
        

        data.push(
            { name: onlyST[i], gender: STonlyP[i]  },
        )
    }


    console.log(News + " " + Sentence + " " + FAI + " " + TAI + " " + INTFAI+ " " + onlyST+ " " + STonlyP);
    if(Status == "read"){
        console.log("inif")

        return(
            <center>
                
            
                <div className="div">
    <h7 style={{marginTop:"30px",marginBottom:"30px",fontSize:"16px",marginleft:"30px",color:"#3F89F3"}}>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h7>


    <div style={{ width: 150, height: 150 ,marginTop:20,}}>
        <CircularProgressbar value={INTFAI}  text={`${INTFAI}%`} circleRatio={0.75} circleRatio={0.75} styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              textColor:"#3F89F3",
              width: "150px", 
              height: "150px",
              trailColor: "#909090",
              pathColor:"#3F89F3"
            })}
        />
    </div>

    <h4 style={{marginTop:"30px"}}>มีความเสี่ยงที่จะเป็นข่าวปลอม  {"\n"}</h4> <h4><h8 style={{fontSize:"22px",color:"#e82a4d"}}>{FAI}%{"\n"}</h8></h4>

    <p>
    <h4>เนื้อหาข่าว </h4> {News}
    </p>

            
    <div className="AppTable">
                <table>
                    <tr>
                        <th>ประโยคที่มีความคล้ายที่จะเป็นข่าวปลอม</th>
                        <th>%</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.gender}</td>
                            <td>{val.name}</td>
                        </tr>
                    )
                    })}
                </table>
            </div>
    
                </div>
            </center>
           
        );
        
    }
    

    else{

        setTimeout(function() {
            window.location.reload(false);
        }, 3000)

        return(
           
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู่ ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

    <button style={{    
            width: "250px",
            height: "60px",
            color: "#ebedf1",
            backgroundColor: '#3F89F3',
            fontSize:'20px',
            borderRadius:'10px',
            position:"absolute",
            top:"35%",
            left:"20%",      
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
