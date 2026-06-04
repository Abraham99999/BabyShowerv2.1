// 1) Primero crea tu Google Apps Script.
// 2) Pega aquí la URL de implementación que termina en /exec.
const GOOGLE_SCRIPT_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMgJJEtxvK4btm285uW6S8J6uFbq2FmZV_TFbMuRpHcXamPJAkfLSxA1fGmHFswqZvKX2nO6ct6K_g/pubhtml";

const openButton=document.getElementById('openInvite');
const cover=document.getElementById('cover');
const invitation=document.getElementById('invitation');

openButton.addEventListener('click',()=>{
 cover.style.transition='opacity .7s ease, transform .7s ease';
 cover.style.opacity='0';
 cover.style.transform='scale(1.03)';
 setTimeout(()=>{cover.style.display='none';invitation.classList.remove('hidden');window.scrollTo(0,0)},700);
});

const targetDate=new Date('2026-06-28T16:00:00-06:00').getTime();

function updateCountdown(){
 const diff=targetDate-Date.now();
 if(diff<=0){document.getElementById('countdown').innerHTML='<div>¡Hoy celebramos a Julieta! 💕</div>';return}
 const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000%24),m=Math.floor(diff/60000%60),s=Math.floor(diff/1000%60);
 document.getElementById('days').textContent=String(d).padStart(2,'0');
 document.getElementById('hours').textContent=String(h).padStart(2,'0');
 document.getElementById('minutes').textContent=String(m).padStart(2,'0');
 document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown,1000);

async function enviarRespuesta(estado){
 const asistente=document.getElementById('asistente').value.trim();
 const personas=document.getElementById('personas').value;
 const msg=document.getElementById('formMessage');

 if(!asistente){
   msg.textContent='Por favor escribe tu nombre 💕';
   return;
 }

 if(GOOGLE_SCRIPT_URL.includes('PEGA_AQUI')){
   msg.textContent='Falta configurar la URL de Google Sheets en js/app.js';
   return;
 }

 const data={
   asistente,
   personas: estado === 'Asiste' ? personas : '0',
   estado,
   evento:'Baby Shower de Julieta',
   fechaRegistro:new Date().toLocaleString('es-MX')
 };

 msg.textContent='Enviando respuesta...';

 try{
   await fetch(GOOGLE_SCRIPT_URL,{
     method:'POST',
     mode:'no-cors',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify(data)
   });

   msg.textContent = estado === 'Asiste'
     ? '¡Gracias! Tu asistencia fue registrada 💖'
     : 'Gracias por avisarnos 💕';

   document.getElementById('rsvpForm').reset();
 }catch(error){
   msg.textContent='No se pudo enviar. Intenta nuevamente.';
 }
}

document.getElementById('confirmarBtn').addEventListener('click',()=>enviarRespuesta('Asiste'));
document.getElementById('noAsistoBtn').addEventListener('click',()=>enviarRespuesta('No asiste'));
