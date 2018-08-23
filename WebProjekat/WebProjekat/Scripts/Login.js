

$('#linkClose').click(function () {
    $('#divError').hide('fade');
});

$(document).ready(function () {
    $('#successModal').hide();
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
                    //$('#successModal').show();
                    //window.location.href = "Index.html";
                }
                else {
                    alert("Pogresno korisnicko ime ili sifra!");
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