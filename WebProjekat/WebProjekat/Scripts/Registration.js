
$('#linkClose').click(function () {
    $('#divError').hide('fade');
});
$(document).ready(function () {
    
    $('#buttonReg').click(function () {
        var gndr;
        if ($('#regMusko').is('checked')) {
            gndr = $('#regMusko').val();
        }
        else {
            gndr = $('#regZensko').val();
        }
        let korisnik = {
            KorisnickoIme: $('#regKorisnickoIme').val(),
            Email: $('#regEmail').val(),
            Lozinka: $('#regLozinka').val(),
            PotvrdiLozinku: $('#regPotvrda').val(),
            Ime: $('#regIme').val(),
            Prezime: $('#regPrezime').val(),
            KontaktTelefon: $('#regTelefon').val(),
            Pol: gndr,
        }
        
        $.ajax({
            type: 'POST',
            url: '/api/Registration',
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',

            

            success: function (data) {
                if (data) {
                    alert("Uspesno ste se registrovali!");
                    $('input[type="text"]').val("");
                    $('input[type="password"]').val("");
                    $('input[type="email"]').val("");
                    $('input[name="pol"]').prop('checked', false);
                    window.location.href = "Login.html";
                }
                else {
                    $('input[type="text"]').val("");
                    $('input[type="password"]').val("");
                    $('input[type="email"]').val("");
                    $('input[name="pol"]').prop('checked', false);
                    alert("Korisnicko ime je zauzeto!");
                }

            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });

    });
    });