 var url;
    (function() {
        $('form input').on('keyup', function() {
            var query = $(this).val();
            url = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';

            console.log(query);
            console.log(url);
        });

    })();


    $('form').on('submit', function(e) {
        e.preventDefault();
        searchGiphy(url);
    });


    function searchGiphy(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function(res) {
                console.log(res);
                $('#results').empty();
                for (i = 0; i < res.data.length; i++) {
                    $('#results').append('<div class="col-md-4"><img class="img-responsive animated bounceIn" src="' + res.data[i].images.original.url + '" /></div>');
                }
                console.log(res.data[0].url);
                console.log(res.data.length);
            }
        });
    }