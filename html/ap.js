//   console.log("heelo");
//   window.console.log("heelo6");
//   window.alert("heelo6");
// let head=document.getElementsByClassName("head");
//   console.dir(head);
//   console.log( document.body);
//  let para=document.getElementsByTagName("p");
//  console.dir(para);
//  let element=document.querySelector(".headings");
//  console.dir(element);
//   let element2=document.querySelectorAll("p");
//  console.dir(element2);
//  console.dir(document.body.firstChild);
//  let element3=document.querySelector("div").children;
//  console.dir(element3);
// let h1=document.querySelector("h1");
// h1.innerText;
//  h1.innerText=h1.innerText +"and i learn java";
// let divs=document.querySelectorAll(".box");
// divs[0].innerText="hu";
// let idx=1;
// for(div of divs){
//    div.innerText=`new unique val ${idx}`;
//    idx++;
// }
// let div=document.querySelector("div");
// console.log(div);
// let id=div.setAttribute("id","op");
// console.log(id);

// div.style.backgroundColor="green";
// div.innerText="lo";
let newBtn=document.createElement("button");
newBtn.innerText="click me";
console.log(newBtn);
let div=document.querySelector("div");
div.append(newBtn);
let para=document.querySelector("p");
para.remove();
