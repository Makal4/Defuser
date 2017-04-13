$(function () {
    
    var taustamusa = new Audio();
    
    taustamusa.src = "taustamusa.mp3";
    taustamusa.volume = 0.5;
    taustamusa.play();
    taustamusa.loop = true;
    
    var laskuri = 0;
    var aika = 10;
    var ajastin;
    
    var kirjaimet = "abcdefghijkmnopqrstuvwxyzäö023456789"; // l-kirjain ja numero 1 otettu pois sekaannusten vuoksi 
    var teksti = "";
    
    var video = $("#playeri").get(0);
    
    var vaarin = new Audio();  
    vaarin.src = "vaarin.mp3";
    
    var oikein = new Audio(); 
    oikein.src = "oikein.mp3";
    
    var error = new Audio(); 
    error.src = "error.mp3";
    
    
    // monen päivän ongelma koitui allaolevasta koodista. Tämä oli alunperin peli-funktion sisällä, mutta ensimmäisen pelin jälkeen kun valitaan uusi peli, soi oikean vastauksen kohdalla aina
    // myös väärin-ääni. Monen eri ratkaisu-yrityksen jälkeen vasta koodin siirtäminen globaalille tasolle ratkaisi ongelman.
    $("#pelialue").keydown(function (e) {
        if (e.keyCode === 13) {
            if(($("#vastaus").val()) === teksti)
            {
                teksti = "";
                for( var i=0; i < 6; i++ ) {
                    teksti += kirjaimet.charAt(Math.floor(Math.random() * kirjaimet.length));
                }
                
                $("#koodikentta").html(teksti);
                
                $("#vastaus").val("");
                               
                laskuri++;
                aika = 11;
                
                oikein.play();
     
            }
            
            else
            {
                  
                $("#vastaus").val("");     
                vaarin.play();
            }
            
            
        }
        
 
        if(laskuri === 1) 
        {
            $("#oikein1").css("background-color", "greenyellow");            
        }
        
        if(laskuri === 2) 
        {
            $("#oikein2").css("background-color", "greenyellow");
        }
        
        if(laskuri === 3) 
        {
            $("#oikein3").css("background-color", "greenyellow");
        }
        
        if(laskuri === 4) 
        {
            $("#oikein4").css("background-color", "greenyellow");
        }
        
        if(laskuri === 5) 
        {
            $("#oikein5").css("background-color", "greenyellow");
        }
        
        if(laskuri === 6) 
        {
            $("#oikein6").css("background-color", "greenyellow");
            hyvaLoppu();
        }
        
    });
  //**************************************************************  
    
    
    
    alku();
    
    
     
    function alku() {
                    
            
            $("#juoni").show();
            $("#ohjeet").show();
            
            $("#oikein1").css("background-color", "darkred");
            $("#oikein2").css("background-color", "darkred");
            $("#oikein3").css("background-color", "darkred");
            $("#oikein4").css("background-color", "darkred");
            $("#oikein5").css("background-color", "darkred");
            $("#oikein6").css("background-color", "darkred");
            
            video.src = "";
            
            $("#koodikentta").html("");
            $("#aika").html("");
                   
            $("#vastauskentta").html("<br/><br/><button id='uudestaan'>Uusi peli</button> <br/><br/>\n\
                                      <button id='asetukset'>Musa päällä /pois</button>");
            $("#vastauskentta").css('background', "black");
            
            
            $("#uudestaan").click(function () {
            
                peli(); 
            
            });
            
            $("#asetukset").click(function () {
            
                if(taustamusa.paused) {
                    taustamusa.play();
                }
                else {
                    taustamusa.pause();
                }
                
             
            
            });
            
    }
    
    
    
    
    
    function peli() {
        
    video.src = "";
        
    laskuri = 0;
    aika = 11;
    
    teksti = "";
    
    
    $("#juoni").hide();
    $("#ohjeet").hide();
       
    
    // palluroiden nollaus punaisiksi    
    $("#oikein1").css("background-color", "darkred");
    $("#oikein2").css("background-color", "darkred");
    $("#oikein3").css("background-color", "darkred");
    $("#oikein4").css("background-color", "darkred");
    $("#oikein5").css("background-color", "darkred");
    $("#oikein6").css("background-color", "darkred");

    $("#vastauskentta").html("<h2>Syötä purkukoodi</h2> <input type='text' name='vastaus' id='vastaus' size='8' autocomplete='off' autofocus/>");
    
      
    for( var i=0; i < 6; i++ ) {
        teksti += kirjaimet.charAt(Math.floor(Math.random() * kirjaimet.length));
        }
    
    
    $("#koodikentta").html(teksti);
    
    //koodi joka estää copy + paste huijaamisen
    $("#koodikentta").attr("unselectable", "on")	
		.on("mousedown mousemove", function(e) {
			e.preventDefault();           
		});
    
    
    
    
    //aikaraja    
    ajastin = setInterval(function() {
    aika--;
    
    $("#aika").html(aika);
    if (aika === 0) {
            
            
            $("#vastauskentta").css('background-image', 'url("bluescreen.png")');
            $("#vastauskentta").text("");
            $("#vastaus").remove();
            
            
            $("#aika").html("0");
            aika = 0;
            window.clearInterval(ajastin);
            video.src = "paha_loppu.mp4";
            video.play();
            error.play();
            
    }
    }, 1000);
    
            
            
    
    video.onended = function() {
        if (aika <= 0) {
            pahaLoppu();
            window.clearInterval(ajastin);
        }
        if (laskuri === 6) {
            hyvaLoppu();
            window.clearInterval(ajastin);
        }
        }; 
    
    }
    
    
    
    function hyvaLoppu() {
       $("#aika").html("☺");
            aika = 0;
            window.clearInterval(ajastin);
            
                               
            
            $("#vastauskentta").html("Kukaan ei kuollut!!! <br/> Sait kaikki koodit oikein! <br/><br/> <button id='uudestaan'>Pelaa uudestaan</button>\n\
                                    <br/><br/><button id='paavalikko'>Päävalikkoon</button>");
            $("#vastauskentta").css('background', "black");
            $("#koodikentta").html("WINNER");
            
            $("#uudestaan").click(function () {
            
                peli(); 
            
            });
            
            $("#paavalikko").click(function () {
            
                alku();
            
            });
            
            video.src = "hyva_loppu.mp4";
            video.play();
              
    }
    
    
    
    function pahaLoppu() {
               
        
        
        $("#vastauskentta").html("No hitsi... kaikki kuoli. <br/> Sait " + laskuri + " koodia oikein. <br/><br/> <button id='uudestaan'>Pelaa uudestaan</button>\n\
                                <br/><br/><button id='paavalikko'>Päävalikkoon</button> ");
        $("#vastauskentta").css('background', "black");
        
        
        $("#uudestaan").click(function () {
            
            peli();
            
        });
        
        $("#paavalikko").click(function () {
            
            alku();
            
        });
        
        
        
    }
     
    
});

