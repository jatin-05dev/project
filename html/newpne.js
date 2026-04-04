document.getElementById("btn1").addEventListener("click",mytotal);
function mytotal(){
   let num1= Number(document.getElementById("m1").Value);
   let num2= Number(document.getElementById("m2").Value);
   let num3=Number(document.getElementById("m3").value);
   let num4=Number(document.getElementById("m4").value);
   
   let ans=m1+m2+m3+m4;
   alert(ans);
}