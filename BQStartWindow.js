function renderStartWindow() {
    //initialize all the select menus with jquery and make them scrollable
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


    //set the default division so we can initialize everything
    VersesModule.division = 'Beginner';

    //prepare the module and its variables
    VersesModule.render();

    //prepare the verses
    VersesModule.getRefs();

    //if someone changes the division
    $( "#division" ).on( "selectmenuselect", function( event, ui ) {
        //reset the VerseModule variables
        VersesModule.render();

        //clear all the options in the list so it doesn't just keep appending
        clearAllOptions();

        //set the variable division to the selected option
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

        //prepare the appropriate verses
        VersesModule.getRefs();
    });

    //if someone changes the start verse
    $( "#start_verse" ).on( "selectmenuselect", function( event, ui ) {

        //clear all the end verses because the options might change
        $('#end_verse option').each(function (index, option) {
            $(option).remove();
        });

        //prepare the end verses list
        VersesModule.populateEndSelectMenu();
    });

    //if someone changes the end verse
    $( "#end_verse" ).on( "selectmenuselect", function( event, ui ) {

        //clear all the number of questions options because it'll change
        $('#num_of_questions option').each(function (index, option) {
            $(option).remove();
        });

        //prepare the number of questions list
        VersesModule.populateQuestNumSelectMenu();
    });


    $("#submitButton").on('click', function() {
        alert("YAY you're ready to play");
    });

}

function randomizer(array)
{
	var rand = array[Math.floor(Math.random() * array.length)];
	return rand;
}

function clearAllOptions() {

    $('#start_verse option').each(function (index, option) {
        $(option).remove();
    });

    $('#end_verse option').each(function (index, option) {
        $(option).remove();
    });

    $('#num_of_questions option').each(function (index, option) {
        $(option).remove();
    });
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
		//get Refs variable from Verses.js file
		var allRefs = Refs;

		//based on division and the array indexes get the necessary verses
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

		// console.log(VersesModule.userRefs);

		//get the default options for each menu
        VersesModule.populateStartSelectMenu();
        VersesModule.populateEndSelectMenu();
        VersesModule.populateQuestNumSelectMenu();

	},

	populateStartSelectMenu: function() {
        //empty the start verse options
		$('#start_verse option').each(function (index, option) {
            $(option).remove();
        });

		//add all the verses as options except the last 10 because the minimum number of questions is 10
		for(var i = 0; i < VersesModule.userRefs.length-10; i++) {
            $('#start_verse').append("<option>" + i + " - " + VersesModule.userRefs[i] + "</option>");
		}

        //refresh after all the options have been added
        $('#start_verse').selectmenu('refresh', true);
		
	},
	
	populateEndSelectMenu: function(){
        //empty the end verse options
        $('#end_verse option').each(function (index, option) {
            $(option).remove();
        });

		var startVerse = null;
		startVerse = parseInt($('#start_verse').val());

		//excluding the 10 questions after the startVerse add all the verses as options
        for(var i = startVerse + 10; i < VersesModule.userRefs.length; i++) {
			$('#end_verse').append("<option>" + i + " - " + VersesModule.userRefs[i] + "</option>");
        }

        //refresh after all the options have been added
		$('#end_verse').selectmenu('refresh', true);
	
	},

	populateQuestNumSelectMenu: function(){
        //empty the number of questions options
        $('#num_of_questions option').each(function (index, option) {
            $(option).remove();
        });

		var startVerse = null;
		var endVerse = null;
		
		startVerse = parseInt($('#start_verse').val());
		endVerse = parseInt($('#end_verse').val());
		var verseDif = endVerse - startVerse;

		//count from startVerse number to endVerse and if the number is divisible by 10 and is not 0 then add it as an option
        for(var i = startVerse; i <= endVerse; i++) {
            if (i % 10 == 0 && i != 0)
            	$('#num_of_questions').append("<option>" + i + "</option>");
        }

        //if the ending verse is not divisible by 10 then print it out as an option
        if (verseDif % 10 != 0) {
            $('#num_of_questions').append("<option>" + verseDif + "</option>");
		}

		//refresh after all the options have been added
        $('#num_of_questions').selectmenu('refresh', true);
	
	}

};