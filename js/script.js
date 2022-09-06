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




async function  loadnewmessage(id,id_message) {//#############a modifier
  var main_content=document.querySelector("#main-content");
  id_message=parseInt(id_message);
  var load = function(request) {
    console.log(request);
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p=document.createElement("p");
                    p.innerHTML=htmlEntities(el.message);
                    if (el.image.length>0) {
                      var image=document.createElement("img");
                      image.src=el.image;
                      image.alt="image";
                      main_content.appendChild(image);
                    }
                    main_content.appendChild(p);
                  });
    if(reponse.length)
    {
    id_message+=reponse.length;
    var a=document.querySelector(".message_a_envoyer");
    document.querySelector(".message_a_envoyer").remove();
    var form=document.createElement("p");
    form.className="message_a_envoyer";
    var inp1=document.createElement("input");
    inp1.type="text";
    inp1.id="message_text";
    inp1.name="message_text";
    var inp2=document.createElement("input");
    inp2.type="file";
    inp2.id="message_image";
    var sub=document.createElement("input");
    sub.type="submit";
    sub.id=""+id;
    sub.onclick=sendmessage;
    sub.value="envoyer";
    form.appendChild(inp1);
    form.appendChild(inp2);
    form.appendChild(sub);
    main_content.appendChild(form);
    }
  };
  while(document.querySelector(".message_a_envoyer")){
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



function voir_desc(){
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p=document.createElement("p");
                    p.innerHTML=htmlEntities(el.message);
                    if (el.image.length>0) {
                      var image=document.createElement("img");
                      image.src=el.image;
                      image.alt="image";
                      main_content.appendChild(image);
                    }
                    main_content.appendChild(p);
                    id_message=el.id_message;
                  });
  };
  $ajaxUtils.sendPostRequest("voir_desc.php",load,"id="+this.id);
  var id_to_use=this.id;

}


function  loadmessage() {//#################################a modifier
  var main_content=document.querySelector("#main-content");
  main_content.innerHTML="";
  var id_message=0;
  var load = function(request) {
    var reponse=JSON.parse(request.responseText);
    reponse.forEach(function(el){
                    var p=document.createElement("p");
                    p.innerHTML=htmlEntities(el.message);
                    if (el.image.length>0) {
                      var image=document.createElement("img");
                      image.src=el.image;
                      image.alt="image";
                      main_content.appendChild(image);
                    }
                    main_content.appendChild(p);
                    id_message=el.id_message;
                  });
    var form=document.createElement("p");
    form.className="message_a_envoyer";
    var inp1=document.createElement("input");
    inp1.type="text";
    inp1.id="message_text";
    inp1.name="message_text";
    var inp2=document.createElement("input");
    inp2.type="file";
    inp2.id="message_image";
    var sub=document.createElement("input");
    sub.type="submit";
    sub.id=""+id_to_use;
    sub.onclick=sendmessage;
    sub.value="envoyer";
    form.appendChild(inp1);
    form.appendChild(inp2);
    form.appendChild(sub);
    main_content.appendChild(form);
    loadnewmessage(id_to_use,id_message);
  };
  $ajaxUtils.sendPostRequest("loadmessage.php",load,"id="+this.id);
  var id_to_use=this.id;
}




function  loaduser() {//#a modifier
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
                    var form=document.createElement("p");
                    form.className="message_a_envoyer";
                    var inp1=document.createElement("input");
                    inp1.type="text";
                    inp1.id="message_text";
                    inp1.name="message_text";
                    var inp2=document.createElement("input");
                    inp2.type="file";
                    inp2.id="message_image";
                    var sub=document.createElement("input");
                    sub.type="submit";
                    sub.id=""+el.id;
                    sub.onclick=sendmessage;
                    sub.value="envoyer";
                    form.appendChild(inp1);
                    form.appendChild(inp2);
                    form.appendChild(sub);
                    main_content.appendChild(form);
                    main_content.appendChild(p1);
                    main_content.appendChild(par1);
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
  d_b_m.onclick=see_demande_amibm;
  main_content.appendChild(d_b_m);
  var d_b_o=document.createElement("p");
  d_b_o.innerHTML="demande_ami_by_other";
  d_b_o.onclick=see_demande_amibo;
  main_content.appendChild(d_b_o);
  var voir_desc=document.createElement("p");
  voir_desc.innerHTML="voir description";
  voir_desc.id=""+getCookie('id');
  voir_desc.onclick=loadmessage;
  main_content.appendChild(voir_desc);
  var form=document.createElement("p");
  var inp1=document.createElement("input");
  inp1.type="text";
  inp1.id="message_text";
  var inp2=document.createElement("input");
  inp2.type="file";
  inp2.id="message_image";
  var sub=document.createElement("input");
  sub.type="submit";
  sub.id=""+getCookie('id');
  sub.onclick=sendmessage;
  sub.value="envoyer";
  var add_desc=document.createElement("p");
  add_desc.innerHTML="ajouter description";
  form.appendChild(add_desc);
  form.appendChild(inp1);
  form.appendChild(inp2);
  form.appendChild(sub);
  main_content.appendChild(form);
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

  function  sendmessage() {//####################amodifier modifier sendmessage.php aussi
  var load = function() {
    console.log(request)
  };
  console.log("aaaaaaa    "+this.id);
  var request=new XMLHttpRequest()
  request.onload=load;
  request.open("POST", "sendmessage.php",true);
    var data=new FormData();
    data.append('message_image',document.getElementById('message_image').files[0]);
    data.append('message_text',document.getElementById('message_text').value);
    data.append('id',this.id);
    request.send(data);
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