/* All of the things
 * Joseph Jaafari
 * March 10, 2016
 */
 
var lookup = function(zip) {
        //borrowed from http://docs.cartodb.com/cartodb-platform/cartodb-js/sql/
        var sql = new cartodb.SQL({
            user: 'josephjaafari'
        });

        sql.execute("SELECT a.display_name, b.zip, wait_time_years, wait_time_months, a.lat as uscis_lat, a.lng as uscis_lng, (ST_Distance(ST_POINT(a.lng::float,a.lat::float)::geography,ST_POINT(b.lng::float, b.lat::float)::geography) / 1609.34) as distance FROM uscis_locations a JOIN uscis_data b ON a.id = b.uscis_id WHERE zip = {{zip}}", {
            zip: zip
        })
            .done(function(data) {
                var results = data.rows[0]

                console.log(results);

                $("#closestLocation").html("Your closest asylum office is in: " +  results.display_name);
                $("#waitTime").html("You will have to wait: " + results.wait_time_years + " years and " + results.wait_time_months + " months");
                $("#distance").html("This office is " + parseInt(results.distance) + " miles from you.");
            })
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });
    },
    map;

$(document).ready(function() {

    $("body").on("click", "#calc", function() {
        var zip = parseFloat($("#zipCode").val());

        lookup(zip);
    });


});