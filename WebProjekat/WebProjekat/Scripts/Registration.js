function validateRegister() {
    $("#regForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            email: {
                email: true
            },
            lozinka: {
                required: true,
                minlength: 4
            },
            lozinkaPotvrda: {
                required: true,
                equalTo: '#regLozinka',
            },
            ime: {
                required: true
            },
            prezime: {
                required: true
            },
            jmbg: {
                required: true,
                number: true,
                minlength: 13,
                maxlength: 13
            },
            telefon: {
                number: true
            }
        },
        messages: {
            username: {
                required: "Morate uneti ovo polje",
                minlength: "Korisnicko ime mora biti minimum 4 slova dugacak"
            },
            email: {
                email: "Morate uneti validnu e-mail adresu."
            },
            lozinka: {
                required: "Morate uneti ovo polje",
                minlength: "Lozinka mora biti minimum 5 slova dugacak"
            },
            lozinkaPotvrda: {
                required: "Morate uneti ovo polje",
                equalTo: "Password i Confirm Password polja se ne poklapaju"
            },
            ime: {
                required: "Morate uneti ovo polje"
            },
            prezime: {
                required: "Morate uneti ovo polje"
            },
            jmbg: {
                required: "Morate uneti ovo polje",
                number: "Ovo polje mora biti broj",
                minlength: "JMBG mora imati 13 cifara",
                maxlength: "JMBG mora imati 13 cifara"
            },
            telefon: {
                required: "Morate uneti ovo polje",
                number: "Ovo polje mora biti broj"
            }
        },

        submitHandler: function (form) { doRegistrationSubmit() }

    });
}
$('#linkClose').click(function () {
    $('#divError').hide('fade');
});
function doRegistrationSubmit() {
    
    
        var gndr;
        var isC;
        isC = $('#regMusko').is(':checked');
        if (isC) {
            gndr = $('#regMusko').val();
            alert("Raus")
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
            JMBG: $('#regJMBG').val(),
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

    
}