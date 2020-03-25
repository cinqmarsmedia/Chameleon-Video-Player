
var app = require('electron');
const remote = app.remote;
var playlist = remote.getGlobal('playlist');
var steam = remote.getGlobal('steam');
var trials = remote.getGlobal('trials');
var ipcRenderer = require('electron').ipcRenderer;
var isBackground=true;
var savedSlider=25;
function bakc() {
	//document.getElementById('load').style.display="none"

	ipcRenderer.send("goBack");
}

function toggleHIDE(){
	ipcRenderer.send("autotoggle");
}
function toggleIT(bool) {
if (typeof playlist !== 'string') {return}
	if (typeof bool !== 'undefined'){
		savedSlider=95;
	}
var slide=document.getElementById("myRange");
var togglebutt=document.getElementById("toggleTxt");
var togglebutttwo=document.getElementById("secondToggleTxt");
isBackground=!isBackground;


	if (slide){
		if (isBackground){
			savedSlider=slide.value;
slide.value=100;
		}else{
	//if (savedSlider>80){savedSlider=25}
	slide.value=savedSlider;
	//ipcRenderer.send("opac",savedSlider/100);
		}
		
	}

	
if (togglebutt){
	if (!isBackground){
	togglebutt.innerText="Send To Foreground"
togglebutttwo.innerText="(Focus)"
	}else{
togglebutt.innerText="Send To Background"
togglebutttwo.innerText="(UnFocus)"
	}
}


//console.log('fires');
	if (document.getElementById('browserOverlay')) {
		document.getElementById('browserOverlay').style.display = "none";
	}
	ipcRenderer.send("toggle");
}

ipcRenderer.on("toggleView", function (event, trials) {
	toggleIT()
})

ipcRenderer.on("shortcut", function (event, arg) {
	var slide=document.getElementById("myRange");
	//
	if (arg==0){
if (slide){
if (parseFloat(slide.value)==100 && typeof playlist == 'string'){
		return;
	}
	//console.log(slide.value);
	if (parseFloat(slide.value)+5>=100){
if (typeof playlist !== 'string'){
slide.value=100
}else{
	toggleIT();
}





	}else{
	slide.value=parseFloat(slide.value)+5;	
	}
	//console.log(slide.value);
//
}
	}else if(arg==1){

if (slide){

if (parseFloat(slide.value)==100 && typeof playlist == 'string'){
		toggleIT(true);
		return;
	}
	if (parseFloat(slide.value)-5<0){
		slide.value=0;
	}else{
slide.value=parseFloat(slide.value)-5;
}
}

	}else if(arg==2){
		var ele = document.getElementById("playpauser")

		if (ele.src.includes('ic_play_arrow_black_24px')) {
			ele.src = ele.src.replace(/ic_.+/i, 'ic_pause_black_24px.svg');
		} else {
			ele.src = ele.src.replace(/ic_.+/i, 'ic_play_arrow_black_24px.svg');
		}
	

	}

})

ipcRenderer.on("toggleViz", function (event, arg) {


if (document.getElementById('browserOverlay')) {
document.getElementById('browserOverlay').style.display = "none";
	}
})


/*
ipcRenderer.on("test", function(event,trials){
if (document.getElementById("numTrials")){
document.getElementById("numTrials").innerHTML=String(trials);
if (trials==1){
	document.getElementById("ess").innerHTML="";
}}
});
*/
document.addEventListener("DOMContentLoaded", function () {
	/*
	console.log('selfie');
	console.log(playlist);
	console.log(document.getElementById('scrubbing'));
	*/
	/*
	if (document.querySelector('webview')){
	
	webview=document.querySelector('webview');
	  
		  const loadstart = () => {
			console.log('loadstart');
		  }
	  
		  const loadstop = () => {
		  console.log('loadstop');
		  }
	  
		  webview.addEventListener('did-start-loading', loadstart)
		  webview.addEventListener('did-stop-loading', loadstop)
	
	}
	*/



var input = document.getElementById("url");

if (input){
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    ipcRenderer.send("openURL", input.value);
    
  }
});
}
	if (steam) {

		//console.log('fireeeeeeeed');
		if (document.getElementById('snInput')) {
			document.getElementById('snInput').style.display = "none";
			document.getElementById('purch').style.display = "none";
			document.getElementById('break').style.display = "none";
			document.getElementById('steamFrame').style.display = "flex";

		}
	}




	if (/^win/.test(process.platform)) {
		if (document.getElementById('imag')) {
			document.getElementById('imag').src = "assets/img/win.jpg"
		}
	}
/**/
	if (document.getElementById('plat11')) {
		if (/^win/.test(process.platform)) {
			document.getElementById('plat11').innerText = "control (^)"
		} else {
			document.getElementById('plat11').innerText = "command (⌘) "
		}
	}

	if (document.getElementById('scrubbing')) {

		if (/^win/.test(process.platform)) {
			document.getElementById('plat1').innerText = "^"
			document.getElementById('plat2').innerText = "^"
			document.getElementById('plat3').innerText = "^"
			document.getElementById('plat4').innerText = "^"
			document.getElementById('plat5').innerText = "^"
			document.getElementById('plat6').innerText = "^"
			document.getElementById('plat7').innerText = "^"
			document.getElementById('plat8').innerText="^"
			document.getElementById('plat9').innerText="^"
			document.getElementById('plat10').innerText="^"
		} else {
			document.getElementById('plat1').innerText = "⌘"
			document.getElementById('plat2').innerText = "⌘"
			document.getElementById('plat3').innerText = "⌘"
			document.getElementById('plat4').innerText = "⌘"
			document.getElementById('plat5').innerText = "⌘"
			document.getElementById('plat6').innerText = "⌘"
			document.getElementById('plat7').innerText = "⌘"
			document.getElementById('plat8').innerText = "⌘"
			document.getElementById('plat9').innerText = "⌘"
			document.getElementById('plat10').innerText = "⌘"
		}




		if (typeof playlist == 'string') {
			document.getElementById('scrubbing').style.display = "none";
			document.getElementById('ctrls').style.display = "none";
			document.getElementById('togshort').style.display = "block";

			var slide=document.getElementById("myRange");
	if (slide){
slide.value=100;
		
		
	}


		} else {
			document.getElementById('hide').style.display = "none";



			//document.getElementById('show').style.display="none";
			//document.getElementById('kys').style.display="none";
		}

	}
	if (document.getElementById("numTrials")) {
		document.getElementById("numTrials").innerHTML = trials;

		if (trials == 1) {
			document.getElementById("ess").innerHTML = "";
		} else {
			document.getElementById("ess").innerHTML = "s";
		}


	}


if (document.getElementById("slidecontainer")){
	ipcRenderer.send("showMenu");
}
});

/*
function openApp(){
ipcRenderer.send("startwfile",null);
   
}

function openBrowser(url){
ipcRenderer.send("openbrowser", url);
}
*/

var enterLicense = function () {
	var email = document.getElementById("email").value
	//var sn=document.getElementById("sn2").value+document.getElementById("sn1").value+document.getElementById("sn3").value
	var sn = document.getElementById("sn1").value + document.getElementById("sn2").value + document.getElementById("sn3").value

	sn = sn.toUpperCase()

	ipcRenderer.send("enterlicense", [email, sn]);

}

ipcRenderer.on("invalid", function (event, trials) {
	alert("Invalid License. Please Re-Check Confirmation Email. Ensure you did not enter your Steam Key, which is separate.");
})
ipcRenderer.on("thx", function (event, trials) {
	alert("Thanks for Purchasing!");
})

ipcRenderer.on("triallimit", function (event, trials) {
	alert("Trial Limit Reached, Please Purchase");
})

var controller = function (param, val) {
	// alert(document.getElementById('vidContainer')) // ??
	// document.getElementById('vidContainer').opacity = .9


	ipcRenderer.send(param, val);

	if (param == "playpause") {
		var ele = document.getElementById("playpauser")

		if (ele.src.includes('ic_play_arrow_black_24px')) {
			ele.src = ele.src.replace(/ic_.+/i, 'ic_pause_black_24px.svg');
		} else {
			ele.src = ele.src.replace(/ic_.+/i, 'ic_play_arrow_black_24px.svg');
		}


	}





}


var webFrame = require('electron').webFrame;
webFrame.setVisualZoomLevelLimits(1,1);
webFrame.setLayoutZoomLevelLimits(0, 0);
