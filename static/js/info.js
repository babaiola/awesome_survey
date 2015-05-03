$(document).ready(function() {
    swal({   
        title: "Ciao!",
        text: "Questo è un sondaggio dove vi chiederemo di valutare le città secondo tre valori: " +
        "Romanticismo, Cultura e Vita notturna. I dati saranno utilizzati solo a fini statistici e non verranno divulgati a terzi.",
        imageUrl: "/img/celebration.png",
        html: true,
        closeOnConfirm: false,
    }, function(isConfirm){
        if (isConfirm) 
            swal({   
                title: "Come si compila?",
                text: "Rispondi solo alle domande che sai! <br> Per esempio puoi votare la città " + 
                "per la vita notturna e non per il romanticismo. " + 
                "Ricorda puoi anche saltare la città se non ci sei mai stato/a!",
                imageUrl: "/img/info.png",
                html: true,
                closeOnConfirm: false,
            });
    });

});