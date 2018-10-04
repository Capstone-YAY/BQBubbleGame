 $( function() {
    $( "#division" ).selectmenu();
 
    $( "#start_verse" ).selectmenu()
		.selectmenu("menuWidget")
			.addClass("overflow");
 
    $( "#end_verse" ).selectmenu()
		.selectmenu("menuWidget")
			.addClass("overflow");
      
    $( "#num_of_questions" ).selectmenu()
		.selectmenu("menuWidget")
			.addClass("overflow");

		VersesModule.division = 'Beginner';
		VersesModule.render();
		VersesModule.getRefs();

	$( "#division" ).on( "selectmenuselect", function( event, ui ) {
		//VersesModule.division = 'Beginner';
		VersesModule.render();
		
		if ($('#division').val() == 'Beginner') {
			
			VersesModule.division = 'Beginner';
		}
		if ($('#division').val() == 'Junior') {
			
            VersesModule.division = 'Junior';
		}
		if ($('#division').val() == 'Int Sr') {
			
            VersesModule.division = 'Int Sr';
		}
		if ($('#division').val() == 'Exp Sr') {

            VersesModule.division = 'Exp Sr';
		}

        VersesModule.getRefs();
	});
	
	$( "#start_verse" ).on( "selectmenuselect", function( event, ui ) {
		//$('#emptyOption').remove();
		$('#end_verse option').each(function (index, option) {
			$(option).remove();
		});
		VersesModule.populateEndSelectMenu();
	});

     $( "#end_verse" ).on( "selectmenuselect", function( event, ui ) {
         //$('#emptyOption').remove();
         $('#num_of_questions option').each(function (index, option) {
             $(option).remove();
         });
         VersesModule.populateQuestNumSelectMenu();
     });

	$("#submitButton").on('click', function() {
		
	});
	
	
	
 }  );
function randomizer(array)
{
	var rand = array[Math.floor(Math.random() * array.length)];
	return rand;
}

var VersesModule = {
	division: null,
	userRefs: null,

	//index that ends the beginner array
	beginnerArrayIndex: 135,
    //index that ends the junior array
	juniorArrayIndex: 266,
    //index that ends the int Sr array
	intSrArrayIndex: 377,
	//expSrArrayIndex is all the verses

	render: function() {
		VersesModule.userRefs = [];
	},

	getRefs: function() {
		var allRefs = Refs;
		if (VersesModule.division === 'Beginner') {
			for(var i = 0; i < VersesModule.beginnerArrayIndex; i++)
				VersesModule.userRefs.push(allRefs[i]);
		}

        else if (VersesModule.division === 'Junior') {
            for(var i = 0; i < VersesModule.juniorArrayIndex; i++)
                VersesModule.userRefs.push(allRefs[i]);
        }

        else if (VersesModule.division === 'Int Sr') {
            for(var i = 0; i < VersesModule.intSrArrayIndex; i++)
                VersesModule.userRefs.push(allRefs[i]);
        }

        else if (VersesModule.division === 'Exp Sr') {
        	for(var i = 0; i < Refs.length; i++)
        		VersesModule.userRefs.push(allRefs[i]);
        }

		console.log(VersesModule.userRefs);

        VersesModule.populateStartSelectMenu();
	},

	populateStartSelectMenu: function() {
		for(var i = 0; i < VersesModule.userRefs.length-10; i++) {
            $('#start_verse').append("<option>" + i + " - " + VersesModule.userRefs[i] + "</option>");
		}
		
	},
	
	populateEndSelectMenu: function(){
		var startVerse = null;
		startVerse = parseInt($('#start_verse').val());
		console.log(startVerse);
		startVerse = startVerse + 10;
        for(var i = startVerse; i < VersesModule.userRefs.length; i++) {
          //  console.log(i);
			$('#end_verse').append("<option>" + i + " - " + VersesModule.userRefs[i] + "</option>");
        }
		
		$('#end_verse').selectmenu('refresh', true);
	
	},

	populateQuestNumSelectMenu: function(){
		var startVerse = null;
		var endVerse = null;
		
		startVerse = parseInt($('#start_verse').val());
		endVerse = parseInt($('#end_verse').val());
		var verseDif = (endVerse + 10) - startVerse;
		
		// ((verseDif % 5) * 10)

		//+10 to get to the total number
		for(var i = startVerse; (i % 5) < endVerse + 10; i++) {
            $('#num_of_questions').append("<option>" + i + "</option>");
		}
	
	
	}

};