// giphy.js for the giphy API homework

$(document).ready(function() {

    let arrTopics =[ "ping pong", "soccer", "tennis", "bicycle", "squirrel suit" ];
    // let arrGiphs = [];

    let myAPIKey = "HE3TGTW6fWe8xTnFRqYBA4npAcLJtaes";
    
    // Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    
    // Display the gifs
    function displayGiphy() {
        console.log($(this));
        let arrGiphs;
        // set up the Query Key
        queryKey = $(this).text();
        // I use regex to replace spaces with plus signs inside of the phrases
        var regex = / /gi;
        console.log(queryKey.replace(regex, '+'));
        queryKey = queryKey.replace(regex, '+');
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryKey + "&api_key=" + myAPIKey + "&limit=10";

        console.log(queryURL)
        // query the Giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
            console.log(response);
            arrGiphs = response.data;
        
                // Looping through result items
                for (var i = 0; i < arrGiphs.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (arrGiphs[i].rating !== "r" && arrGiphs[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item float-left mr-1'>");

                        // Storing the result item's rating
                        var rating = arrGiphs[i].rating;

                        // Creating an image tag
                        var gifImage = $("<img>");
                        
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Giving the image tag a src attribute of a proprty pulled from the
                        // result item
                        gifImage.attr("src", arrGiphs[i].images.fixed_height_still.url);
                        gifImage.attr("animated-src", arrGiphs[i].images.fixed_height.url);
                        gifImage.attr("still-src", arrGiphs[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still")
                        gifImage.addClass("gif");
                        // Appending the paragraph and gifImage we created to the "gifDiv" div we created
                        gifDiv.append(gifImage);
                        gifDiv.append(p);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#Giphy-Base").prepend(gifDiv);
                    }
                }
            });

    }

    // Function for displaying giphy buttons
    function renderButtons() {
    // Create buttons from the array of topics.
        $("#Topic-Buttons").empty();
        // Loop through the array of topics, then generate buttons for each topic in the array
        for(i=0; i<arrTopics.length; i++) {
            var mybutton = $("<button>").addClass("Giphy-Topic btn btn-info border mt-1 mb-1");
            mybutton.text(arrTopics[i]);
            mybutton.attr("data-name", arrTopics[i]);
            $("#Topic-Buttons").append(mybutton);
            
        }

    }   
    // Toggle the animation on/off
    function toggleAnimation () {
        if ( $(this).attr("data-state") == 'still' ) {
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("animated-src"));
        } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("still-src"));
        }

    }

     // This button added topic to the button set
    $("#add-sport").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var myInput = $("#sport-input").val().trim();
        console.log("my input "+ myInput);
        
        // check for a value in myInput
        if( myInput !== ""){
            arrTopics.push(myInput);
        $("#sport-input").val("");
        }

        // The renderButtons function is called, rendering the list of topic buttons.
        renderButtons();
      });

    // Call the function to create the intial buttons. 
    renderButtons();

    // The on click function that displays the Gifs
    $(document).on("click", ".Giphy-Topic", displayGiphy);
    
    // The on click function to toggle animation and still.
    $(document).on("click", ".gif", toggleAnimation);
   

});
