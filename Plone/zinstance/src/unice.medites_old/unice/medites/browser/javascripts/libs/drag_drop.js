 // V1 drag and drop
  // $(function() {
  //   $( ".drag" ).draggable({ revert: "invalid" });
    
  //   $( "#droppable1-OcP1S1" ).droppable({accept:"#draggable1-OcP1S1",drop: function() {
  //     $("#draggable1-OcP1S1").hide(500), $(this).addClass( "ui-state-highlight ouvert" );    
  //     var nb_ouvert = $(".ouvert").length;
  //     var nb_ferme = $(".ferme").length;
  //         if (nb_ouvert == nb_ferme) {
  //         $("#felicitation-OcP1S1").show(500); 
  //       }   
  //   }});
  //   $( "#droppable2-OcP1S1" ).droppable({accept:"#draggable2-OcP1S1",drop: function() {
  //     $("#draggable2-OcP1S1").hide(500), $(this).addClass( "ui-state-highlight ouvert" );
  //       var nb_ouvert = $(".ouvert").length;
  //     var nb_ferme = $(".ferme").length;
  //         if (nb_ouvert == nb_ferme) {
  //         $("#felicitation-OcP1S1").show(500); 
  //     }
  //   }});
  //   $( "#droppable3-OcP1S1" ).droppable({accept:"#draggable3-OcP1S1",drop: function() {
  //     $("#draggable3-OcP1S1").hide(500), $(this).addClass( "ui-state-highlight ouvert" );
  //       var nb_ouvert = $(".ouvert").length;
  //   var nb_ferme = $(".ferme").length;
  //       if (nb_ouvert == nb_ferme) {
  //     $("#felicitation-OcP1S1").show(500); 
  //   }
  //   }});
  //   $( "#droppable4-OcP1S1" ).droppable({accept:"#draggable4-OcP1S1",drop: function() {
  //     $("#draggable4-OcP1S1").hide(500), $(this).addClass( "ui-state-highlight ouvert" );
  //       var nb_ouvert = $(".ouvert").length;
  //   var nb_ferme = $(".ferme").length;
  //       if (nb_ouvert == nb_ferme) {
  //     $("#felicitation-OcP1S1").show(500); 
  //   }
  //   }});
  // });
 
// V2 drag and drop 
// $(function() {
//   var nb_ferme=$(".ferme").length;
//   var idParent = $(".parent").attr('id');
//   for (var i = 0;i < nb_ferme;i++) {
//     $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
//     $( "#"+idParent+"-drop-"+i ).droppable({
//       accept: "#"+idParent+"-drag-"+i,
//       drop: function() {
//       // marche pas  $( "#"+idParent+"-drag-"+i ).hide(500), 
//         $( this ).addClass( "ui-state-highlight ouvert" );
//         var nb_ferme=$(".ferme").length;
//         var nb_ouvert=$(".ouvert").length;
//         if (nb_ferme == nb_ouvert)  {
//           $("#great-"+idParent).show(500);
//           }
//         }
//        });
//     }   
//   });



      $(function() {
        var idParent = $(".jeuDrag1Etape").attr('id');
        var nb_ferme=$("#"+idParent+".jeuDrag1Etape .ferme").length;
        for (var i = 0;i < nb_ferme;i++) {
          $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
          $( "#"+idParent+"-drop-"+i ).droppable({
            accept: "#"+idParent+"-drag-"+i,
            drop: function() {
              $(this).addClass( "ui-state-highlight ouvert" );
              idDrag = $(this).attr('id');
              idDrag = idDrag.slice(-1);
              $("#"+idParent+"-drop-"+idDrag).append($("#"+idParent+"-drag-"+idDrag));
              $("#"+idParent+"-drag-"+idDrag).replaceWith( $("#"+idParent+"-drag-"+idDrag).html());          
              var nb_ferme=$("#"+idParent+".jeuDrag1Etape .ferme").length;
              var nb_ouvert=$("#"+idParent+".jeuDrag1Etape .ouvert").length;
              if (nb_ferme == nb_ouvert)  {
                $("#great-"+idParent).show(500);
              }
            }
          });
        }   
      });

      $(function() {
        var idParent = $(".jeuDrag1Etape-2").attr('id');
        var nb_ferme=$("#"+idParent+".jeuDrag1Etape-2 .ferme").length;
        for (var i = 0;i < nb_ferme;i++) {
          $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
          $( "#"+idParent+"-drop-"+i ).droppable({
            accept: "#"+idParent+"-drag-"+i,
            drop: function() {
              $(this).addClass( "ui-state-highlight ouvert" );
              idDrag = $(this).attr('id');
              idDrag = idDrag.slice(-1);
              $("#"+idParent+"-drop-"+idDrag).append($("#"+idParent+"-drag-"+idDrag));
              $("#"+idParent+"-drag-"+idDrag).replaceWith( $("#"+idParent+"-drag-"+idDrag).html());          
              var nb_ferme=$("#"+idParent+".jeuDrag1Etape-2 .ferme").length;
              var nb_ouvert=$("#"+idParent+".jeuDrag1Etape-2 .ouvert").length;
              if (nb_ferme == nb_ouvert)  {
                $("#great-"+idParent).show(500);
              }
            }
          });
        }   
      });
      
      $(function() {
        var idParent = $(".jeuDrag2Etapes").attr('id');
        var nb_ferme=$("#"+idParent+".jeuDrag2Etapes .ferme").length;
        for (var i = 0;i < nb_ferme;i++) {
          $( "#"+idParent+"-drag-"+i ).draggable({ revert: "invalid" });
          $( "#"+idParent+"-drop-"+i ).droppable({
            accept: "#"+idParent+"-drag-"+i,
            drop: function() {
              $( this ).addClass( "ui-state-highlight ouvert" );
              idDrag = $(this).attr('id');
                idDrag = idDrag.slice(-1);
              $("#"+idParent+"-drop-"+idDrag).append($("#"+idParent+"-drag-"+idDrag));
              $("#"+idParent+"-drag-"+idDrag).replaceWith( "<div>" + $( "#"+idParent+"-drag-"+idDrag ).html() + "</div>" );
              var nb_ferme=$("#"+idParent+".jeuDrag2Etapes .ferme").length;
              var nb_ouvert=$("#"+idParent+".jeuDrag2Etapes .ouvert").length;
              if (nb_ferme == nb_ouvert)  {
                $("#"+idParent+".jeuDrag2Etapes .etape3").show(500);
                var nb_ferme2=$(".ferme2").length;
                for (var i = 0;i < nb_ferme2;i++) {
                  $( "#"+idParent+"-drop-"+i ).draggable({ revert: "invalid" });
                  $( "#"+idParent+"-drop2-"+i ).droppable({
                    accept: "#"+idParent+"-drop-"+i,
                    drop: function() {
                      $( this ).addClass( "ui-state-highlight ouvert2" );
                      idDrag = $(this).attr('id');
                      idDrag = idDrag.slice(-1);
                      $("#"+idParent+"-drop2-"+idDrag).append($("#"+idParent+"-drop-"+idDrag));
                      $("#"+idParent+"-drop-"+idDrag).replaceWith( "<div>" + $( "#"+idParent+"-drop-"+idDrag ).html() + "</div>" );
                      var nb_ferme2=$("#"+idParent+".jeuDrag2Etapes .ferme2").length;
                      var nb_ouvert2=$("#"+idParent+".jeuDrag2Etapes .ouvert2").length;
                      if (nb_ferme == nb_ouvert2)  {
                        $("#great-"+idParent).show(500);
                      }
                    }
                  })
                }
              }
            } 
          })  
        }
      });