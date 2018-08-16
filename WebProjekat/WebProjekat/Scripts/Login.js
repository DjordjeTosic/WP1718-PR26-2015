

$('#linkClose').click(function () {
    $('#divError').hide('fade');
});

$(document).ready(function () {
    $('#prijavaDugme').click(function () {

        let korisnik = {
            KorisnickoIme: `${$('#korisnickoIme').val()}`,
            Lozinka: `${$('#lozinka').val()}`,
        }

        $.ajax({
            type: 'POST',
            url: '/api/Login',
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',

            success: function (data) {
                $('input[type="text"]').val("");
                $('input[type="password"]').val("");
                if (data) {
                    //$('#uspesno').modal('show');
                    localStorage.setItem("logged", korisnik.KorisnickoIme);
                    //window.location.href = "Index.html";
                }
                else {
                    window.location.href = "Registration.html";
                }
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }


        });
    });
});