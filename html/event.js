let mode=document.querySelector("#btn");
let curr="light";
let body=document.querySelector("body");
mode.addEventListener("click",()=>{
 if(curr==="light"){
    curr="dark";
    // document.querySelector("body").style.backgroundColor="black";
        body.classList.add("dark");
         body.classList.remove("light");
 }
 else{
    curr="light";
        body.classList.add("light");
             body.classList.remove("dark");
 }
 console.log(curr)
})
 
// btn.onClick = () =>{
//     console.log("hello");
// };
//  let div =document.querySelector("btn");
//  btn.onmouseover=()=>{
//     console.log("you are my pooja");
//  }
 
// btn.onClick = (evt) =>{
//     console.log(evt);
//     console.log(evt.type);
    
// };
//  const hanls=()=>btn.addEventListener("click",(evt)=>{
// console.log("buuton was clicked");
// // console.log(evt);
// }
// btn.removeEventListener("click",hanls);



