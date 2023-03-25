let target = window.location.search;
if(target.length === 6){
  op(target.substring(1))
}
async function op(id) {
  const dom = document.getElementById("welcome");
  const dom2 = document.getElementById("welcome-content")
  const response = await fetch(`https://service-1johancb-1317470061.bj.apigw.tencentcs.com/company/${id}`);
  const data = await response.json();
  if(data.company){
    dom2.innerHTML = data.content
    dom.style.display = 'block';
    setTimeout(()=>{
      dom.style.animation = 'rightmove 2s ease-in-out alternate infinite';
      setTimeout(()=>{
        dom.remove();
      },1900)
    },1000)
  }
}
