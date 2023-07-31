console.log("I am form site.js");
$(document).ready(function () {
    // Setting the publishable key as per Stripe documentation
    Stripe.setPublishableKey($("meta[name='stripe-pk']").attr("content"));

    $("#stripe-token-form").on("submit", function (e) {
        e.preventDefault();
        // Making the request to generate the token
        Stripe.card.createToken({
            number: $("#card-number").val(),
            cvc: $('#cvc').val(),
            exp_month: $('#date_month').val(),
            exp_year: $('#date_year').val()
        }, function (status, response) {
            if (status === 200) {
                // case of success getting the token
                $("#stripe_token").val(response.id);
                $("#submission-form").submit();
            } else {
                // Case of error
                var errorMessage = response.error.message;
                $("#stripe-error-message").addClass("alert alert-danger").html(errorMessage);
            }
        });
    });
});