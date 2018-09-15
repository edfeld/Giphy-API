// giphy.js for the giphy API homework

$(document).ready(function() {

    let arrTopics =[  "ping+pong", "soccer", "tennis", "bicycle", "squirrel+suit" ];
    // let arrGiphs = [];

    let myAPIKey = "HE3TGTW6fWe8xTnFRqYBA4npAcLJtaes";
    let queryKey = "ryan+gosling"
    // Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    
    function getGiphyAPIData (){

    }

    function displayGiphy() {
        console.log($(this));
        let arrGiphs;
        queryKey = $(this).text();
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryKey + "&api_key=" + myAPIKey + "&limit=10";

        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
            console.log(response);
            arrGiphs = response.data;
        
                // getGiphyAPIData();
                // Looping over every result item
                for (var i = 0; i < arrGiphs.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (arrGiphs[i].rating !== "r" && arrGiphs[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item float-left'>");

                        // Storing the result item's rating
                        var rating = arrGiphs[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var personImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr("src", arrGiphs[i].images.fixed_height.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#Giphy-Base").append(gifDiv);
                    }
                }
            });

    }

    // Function for displaying giphy buttons
    function renderButtons() {
    // Create buttons from the array of topics.
        $("#Topic-Buttons").empty();
        // Loop through the array of movies, then generate buttons for each movie in the array
        for(i=0; i<arrTopics.length; i++) {
            var mybutton = $("<button>").addClass("Giphy-Topic rounded ml-1");
            mybutton.text(arrTopics[i]);
            mybutton.attr("data-name", arrTopics[i]);
            $("#Topic-Buttons").append(mybutton);

        }

    }   

    $("#add-sport").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var myInput = $("#sport-input").val().trim();
        console.log("my input "+ myInput);
        
        arrTopics.push(myInput);
        $("#sport-input").val("");

        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
      });


    // arrGiphs.forEach(element => {
        
    // });
    renderButtons();


    $(document).on("click", ".Giphy-Topic", displayGiphy);
   

});



//     var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });