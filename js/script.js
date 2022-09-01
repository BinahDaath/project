function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}







function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}





function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}












function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}




async function  loadnewmessage(id,id_message) {
  var main_content=document.querySelector("#main-content");
  id_message=parseInt(id_message);
  var load = function(request) {
    console.log(request);
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p=document.createElement("p");
                    p.innerHTML=htmlEntities(el.message);
                    if(el.sent_by==getCookie("id")){
                      p.style.backgroundColor="blue";
                    }
                    main_content.appendChild(p);
                  });
    if(reponse.length)
    {
    id_message+=reponse.length;
    var a=document.getElementById("message_a_envoyer").value;
    document.getElementById("remove_me").remove();
    var inp=document.createElement("input");
    inp.type="text";
    inp.id="message_a_envoyer";
    inp.value=a;
    var sub=document.createElement("input");
    sub.type="submit";
    sub.value="envoyer";
    sub.id=""+id;
    sub.onclick=sendmessage;
    var par=document.createElement("p");
    par.appendChild(inp);
    par.appendChild(sub);
    par.id="remove_me";
    main_content.appendChild(par);
    }
    //console.log(reponse);
  };
  while(document.getElementById("message_a_envoyer")){
          $ajaxUtils.sendPostRequest("loadnewmessage.php",load,"id="+id+"&id_message="+id_message);
          await new Promise(r=>setTimeout(r,1000));
  }
}




function  loadcontact() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var par=document.createElement("p");
                    par.onclick=loadmessage;
                    par.id=""+el.id;
                    par.innerText=""+el.username;
                    main_content.appendChild(par);
                  });
  };
  $ajaxUtils.sendPostRequest("contact.php",load);
}
//#################






function  loadfriend() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var par=document.createElement("p");
                    par.onclick=loadmessage;
                    par.id=""+el.id;
                    par.innerText=""+el.username;
                    main_content.appendChild(par);
                  });
  };
  $ajaxUtils.sendPostRequest("friend.php",load);
}
//#################







function  rechercher() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var par=document.createElement("p");
                    par.onclick=loaduser;
                    par.id=""+el.id;
                    par.innerText=""+el.username;
                    main_content.appendChild(par);
                  });
  };
  $ajaxUtils.sendPostRequest("rechercher.php",load,"value="+this.value);
}
//@@peut-etre a modifier ne doit  pa agire sur main_content penser a modifier l'id produit




function  loadmessage() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var id_message=0;
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p=document.createElement("p");
                    p.innerHTML=htmlEntities(el.message);
                    if(el.sent_by==getCookie("id")){
                      p.style.backgroundColor="blue";
                    }
                    main_content.appendChild(p);
                    id_message=el.id_message;
                  });
    var inp=document.createElement("input");
    inp.type="text";
    inp.id="message_a_envoyer"
    var sub=document.createElement("input");
    sub.type="submit";
    sub.value="envoyer";
    sub.id=""+id_to_use;
    sub.onclick=sendmessage;
    var par=document.createElement("p");
    par.appendChild(inp);
    par.appendChild(sub);
    par.id="remove_me";
    par.className="bottom";
    main_content.appendChild(par);
    loadnewmessage(id_to_use,id_message);
  };
  $ajaxUtils.sendPostRequest("loadmessage.php",load,"id="+this.id);
  var id_to_use=this.id;
}
//@@ n'affiche pas encore




function  loaduser() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var par1=document.createElement("p");
                    par1.innerText=""+el.username;
                    var p1=document.createElement("p");
                    p1.innerText="make_demande_ami";
                    p1.id=""+el.id;
                    p1.onclick=make_demande_ami;
                    var inp=document.createElement("input");
                    inp.type="text";
                    inp.id="message_a_envoyer"
                    var sub=document.createElement("input");
                    sub.type="submit";
                    sub.value="envoyer";
                    sub.id=""+el.id;
                    sub.onclick=sendmessage;
                    var par2=document.createElement("p");
                    par2.appendChild(inp);
                    par2.appendChild(sub);
                    main_content.appendChild(p1);
                    main_content.appendChild(par1);
                    main_content.appendChild(par2);
                  });
  };
  $ajaxUtils.sendPostRequest("loaduser.php",load,"id="+this.id);
  };





  function showuser()
  {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var d_b_m=document.createElement("p");
  d_b_m.innerHTML="demande_ami_by_me";
  d_b_m.className="col-md-6 col-sm-6 col-xs-6";
  d_b_m.onclick=see_demande_amibm;
  main_content.appendChild(d_b_m);
  var d_b_o=document.createElement("p");
  d_b_o.innerHTML="demande_ami_by_other";
  d_b_o.className="col-md-6 col-sm-6 col-xs-6";
  d_b_o.onclick=see_demande_amibo;
  main_content.appendChild(d_b_o);
  var sub=document.createElement("input");
  sub.type="submit";
  sub.value="deconnexion";
  sub.onclick=deconnexion;
  main_content.appendChild(sub);
  var load = function(request) {
  };
  //$ajaxUtils.sendPostRequest("showuser.php",load);
  }



  function deconnexion()
  {

  }

  function  sendmessage() {
  message_a_envoyer=document.querySelector("#message_a_envoyer");
  var load = function(request) {
  };
  $ajaxUtils.sendPostRequest("sendmessage.php",load,"message="+encodeURIComponent(message_a_envoyer.value)+"&id="+this.id);
  message_a_envoyer.value="";
}
function  make_demande_ami() {
  var load = function(request) {
    console.log(request);
  };
  $ajaxUtils.sendPostRequest("make_demande_ami.php",load,"id="+this.id);
}


function  anuler_demande_ami() {
  var load = function(request) {
    console.log(request);
  };
  $ajaxUtils.sendPostRequest("anuler_demande_ami.php",load,"id="+this.id);
  document.querySelector(".c"+this.id).remove();
}



function  accepter_demande_ami() {
  var load = function(request) {
    console.log(request);
  };
  $ajaxUtils.sendPostRequest("accepter_demande_ami.php",load,"id="+this.id);
  document.querySelector(".c"+this.id).remove();
}


function  refuser_demande_ami() {
  var load = function(request) {
    console.log(request);
  };
  $ajaxUtils.sendPostRequest("refuser_demande_ami.php",load,"id="+this.id);
  document.querySelector(".c"+this.id).remove();
}




function  see_demande_amibm() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    console.log(request);
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p1=document.createElement("p");
                    p1.innerHTML=htmlEntities(el.username);
                    p1.id=""+el.id;
                    p1.className="col-md-6 col-sm-6 col-xs-6";
                    p1.onclick=loaduser;
                    var p2=document.createElement("p");
                    p2.innerHTML="anuler_demande_ami";
                    p2.id=""+el.id;
                    p2.className="col-md-6 col-sm-6 col-xs-6";
                    p2.onclick=anuler_demande_ami;
                    var par=document.createElement("p");
                    par.className="row"+" c"+el.id;
                    par.appendChild(p1);
                    par.appendChild(p2);
                    main_content.appendChild(par);
                  });
  };
  
  $ajaxUtils.sendPostRequest("see_demande_ami.php",load,"by_who=1");
}
function  see_demande_amibo() {
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    console.log(request);
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p1=document.createElement("p");
                    p1.innerHTML=htmlEntities(el.username);
                    p1.className="col-md-6 col-sm-6 col-xs-6";
                    var p2=document.createElement("p");
                    p2.innerHTML="accepter_demande_ami";
                    p2.id=""+el.id;
                    p2.className="col-md-3 col-sm-3 col-xs-3";
                    p2.onclick=accepter_demande_ami;
                    var p3=document.createElement("p");
                    p3.innerHTML="refuser_demande_ami";
                    p3.id=""+el.id;
                    p3.className="col-md-3 col-sm-3 col-xs-3";
                    p3.onclick=refuser_demande_ami;
                    var par=document.createElement("p");
                    par.className="row"+" c"+el.id;
                    par.appendChild(p1);
                    par.appendChild(p2);
                    par.appendChild(p3);
                    main_content.appendChild(par);
                  });
  };
  $ajaxUtils.sendPostRequest("see_demande_ami.php",load,"by_who=0");
}

  //
  
  
  document.querySelector("#message").onclick=loadcontact;
  document.querySelector("#friend").onclick=loadfriend;
  document.querySelector("#rechercher").oninput=rechercher;
  document.querySelector("#username").onclick=showuser;