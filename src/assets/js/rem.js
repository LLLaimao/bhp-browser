const baseSize = 16; 
function setRem() {
  const scale = document.documentElement.clientWidth / 1920;
  if(document.documentElement.clientWidth>1024){
  document.documentElement.style.fontSize = (baseSize * scale) + 'px'; 
  }else{
    document.documentElement.style.fontSize = 16+'px'
  }
  
}
setRem();
window.addEventListener('resize', () => {
  setRem();
});