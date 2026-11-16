const $ = id => document.getElementById(id);
const messages = $("messages");
function addMessage(text, who) {
  const article = document.createElement("article");
  article.className = `bubble ${who}`;
  const label = document.createElement("small");
  label.textContent = who === "user" ? "YOU" : "JARVIS";
  const p = document.createElement("p");
  p.textContent = text;
  article.append(label,p); messages.append(article);
  messages.scrollTop = messages.scrollHeight;
}
function demoReply(q) {
  const s = q.toLowerCase();
  if (/(hello|hii|hi\b|hey)/.test(s)) return "Hello Sunny! Kaise ho? Main JARVIS hoon. Batao, kya karna hai?";
  if (/(civil|engineering|assignment|survey|rcc)/.test(s)) return "Civil Engineering help ke liye apna question ya notes bhejo. Main simple Hindi-English mein samjha sakta hoon. (Demo mode)";
  if (/(who are you|tum kaun|your name)/.test(s)) return "I am JARVIS, your personal assistant prototype.";
  return "I received your message. Abhi main demo mode mein hoon. Real AI answers ke liye secure AI backend connect karna hoga.";
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const isHindi = /[\u0900-\u097F]/.test(text);
  utter.lang = isHindi ? "hi-IN" : "en-IN";
  const desired = $("voice").value.toLowerCase();
  const voices = speechSynthesis.getVoices();
  const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(isHindi ? "hi" : "en"));
  const match = candidates.find(v => v.name.toLowerCase().includes(desired));
  if (match) utter.voice = match;
  speechSynthesis.speak(utter);
}
function send() {
  const q = $("prompt").value.trim(); if (!q) return;
  $("prompt").value = ""; addMessage(q,"user");
  const answer = demoReply(q); addMessage(answer,"bot"); speak(answer);
}
$("send").addEventListener("click",send);
$("prompt").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
$("mic").addEventListener("click",()=>{
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { addMessage("Voice recognition is not available in this browser. Try Chrome on Android.", "bot"); return; }
  const rec = new SR(); rec.lang = "hi-IN"; rec.interimResults = false; rec.maxAlternatives = 1;
  $("mic").textContent = "⏺️";
  rec.onresult = e => { $("prompt").value = e.results[0][0].transcript; };
  rec.onerror = () => addMessage("I couldn't hear that. Please try again.", "bot");
  rec.onend = () => $("mic").textContent = "🎙️";
  rec.start();
});
if ("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
