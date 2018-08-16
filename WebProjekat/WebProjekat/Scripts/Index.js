
$(document).ready(function () {
    

    let korisnickoIme = localStorage.getItem("logged")
    let Korisnik = {
        KorisnickoIme: `${korisnickoIme}`
    };
    $('#pocetna').show();
    $('#dispecer').hide();
    $.ajax({
        type: 'POST',
        url: '/api/Korisnik',
        data: JSON.stringify(Korisnik),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (data) {
            if (data.Uloga == 0) {
                $('#pocetna').show();
                $('#dispecer').hide();
            }
            else if (data.Uloga == 1) {
                $('#pocetna').hide();
                $('#dispecer').show();
            }
        }
    });

    $('#logOutKorisnik').click(function () {
        $.ajax({
            url: '/api/Login',
            type: 'GET',
            success: function (data) {
                localStorage.setItem("logged", "");
                window.location.href = "Index.html";
            }
        });
    });

    $('#logOutDispecer').click(function () {
        $.ajax({
            url: '/api/Login',
            type: 'GET',
            success: function (data) {
                localStorage.setItem("logged", "");
                window.location.href = "Index.html";
            }
        });
    });
});