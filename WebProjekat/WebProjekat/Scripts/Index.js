
$(document).ready(function () {
    

    let korisnickoIme = localStorage.getItem("logged");
    let Korisnik = {
        KorisnickoIme: `${korisnickoIme}`
    };
    let profil;

   

    

    $.ajax({
        type: 'POST',
        url: '/api/Korisnik',
        data: JSON.stringify(Korisnik),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (data) {
            profil = data;
            if (data.Uloga == 0) {
                $('#pocetna').hide();
                $('#korisnik').show();
                $('#dispecer').hide();
                $('#dodajVozacaDeo').hide();
                $('#vozac').hide();
                $('#profilVozaca').hide();
                $('#profilKorisnika').hide();
                $('#lokacijaVozaca').hide();
            }
            else if (data.Uloga == 1) {
                $('#pocetna').hide();
                $('#dispecer').show();
                $('#korisnik').hide();
                $('#dodajVozacaDeo').hide();
                $('#vozac').hide();
                $('#profilVozaca').hide();
                $('#profilKorisnika').hide();
                $('#lokacijaVozaca').hide();
            } else if (data.Uloga == 2) {
                $('#pocetna').hide();
                $('#dispecer').hide();
                $('#korisnik').hide();
                $('#dodajVozacaDeo').hide();
                $('#vozac').show();
                $('#profilVozaca').hide();
                $('#profilKorisnika').hide();
                $('#lokacijaVozaca').hide();
            }
        }
    });

    $('#pocetna').show();
    $('#korisnik').hide();
    $('#dispecer').hide();
    $('#dodajVozacaDeo').hide();
    $('#vozac').hide();
    $('#profilVozaca').hide();
    $('#profilKorisnika').hide();
    $('#lokacijaVozaca').hide();
    $('#profilDispecera').hide();
    $('#dodavanjeVoznje').hide();
    $('#izmeniVoznjuKorisnik').hide();
    $('#otkazKomentar').hide();
    $('#izmenaVoznjeTabela').hide();

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
    $('#logOutVozac').click(function () {
        $.ajax({
            url: '/api/Login',
            type: 'GET',
            success: function (data) {
                localStorage.setItem("logged", "");
                window.location.href = "Index.html";
            }
        });
    });
    $('#dodajVozaca').click(function () {
        $('#dodajVozacaDeo').show();
        $('#buttonVozac').click(function () {
            var pol;

            var isPol;
            var isAuto;
            isPol = $('#MuskoVozac').is(':checked');
            if (isPol) {
                pol = $('#MuskoVozac').val();
            }
            else {
                pol = $('#ZenskoVozac').val();
                
            }

            var tip;
            if (($('#TipAutaObicni').is(':checked'))) {
                tip = $('#TipAutaObicni').val();
                alert("tacno!");
            }
            else {
                tip = $('#KombiAuto').val();
            }
            let automobil = {
                Godiste: $('#GodinaVozac').val(),
                Registracija: $('#TablicaVozac').val(),
                Tip: tip
            };

            let adresa = {
                UlicaBroj: $('#UlicaVozac').val(),
                NaseljenoMesto: $('#GradVozac').val(),
                PozivniBrojMesta: $('#PostaVozac').val()
            };
            let lokacija = {
                X: $('#KordinataXVozac').val(),
                Y: $('#KordinataYVozac').val(),
                Adresa: adresa
            };

            $.ajax({
                url: '/api/Dispecer',
                type: 'POST',
                data: {
                    KorisnickoIme: $('#KorisnickoImeVozac').val(),
                    Email: $('#EmailVozac').val(),
                    Lozinka: $('#LozinkaVozac').val(),
                    Ime: $('#ImeVozac').val(),
                    Prezime: $('#PrezimeVozac').val(),
                    JMBG: $('#JMBGVozac').val(),
                    KontaktTelefon: $('#TelefonVozac').val(),
                    Pol: pol,
                    Automobil: automobil,
                    Lokacija: lokacija,

                },
                success: function (data) {
                    $('#GodinaVozac').val(""),
                    $('#TablicaVozac').val(""),
                    $('#UlicaVozac').val(""),
                    $('#GradVozac').val(""),
                    $('#PostaVozac').val(""),
                    $('#KordinataXVozac').val(""),
                    $('#KordinataYVozac').val(""),
                    $('#KorisnickoImeVozac').val(""),
                    $('#EmailVozac').val(""),
                    $('#LozinkaVozac').val(""),
                    $('#ImeVozac').val(""),
                    $('#PrezimeVozac').val(""),
                    $('#JMBGVozac').val(""),
                    $('#TelefonVozac').val(""),
                    $('input[type="radio"]').prop('checked', false);
                    alert("Uspeno je dodan vozac");

                    
                }

            });
        });
    });

    $('#profilDispecer').click(function () {
        $('#profilDispecera').show(),
            $('#ProfilKorisnickoImeDispecer').val(profil.KorisnickoIme),
            $('#ProfilEmailDispecer').val(profil.Email),
            $('#ProfilLozinkaDispecer').val(profil.Lozinka),
            $('#ProfilImeDispecer').val(profil.Ime),
            $('#ProfilPrezimeDispecer').val(profil.Prezime),
            $('#ProfilJMBGDispecer').val(profil.JMBG),
            $('#ProfilTelefonDispecer').val(profil.KontaktTelefon);
        if (profil.Pol == 0) {
            $('#ProfilMuskoDispecer').prop('checked', false);
            $('#ProfilZenskoDispecer').prop('checked', true);


        } else {
            $('#ProfilMuskoDispecer').prop('checked', true);
            $('#ProfilZenskoDispecer').prop('checked', false);
        }
        $('#buttonDispecer').click(function () {
            var sexD;
            if (($('#ProfilMuskoDispecer').is(':checked'))) {
                sexD = $('#ProfilMuskoDispecer').val();

            }
            else {
                sexD = $('#ProfilZenskoDispecer').val();
            }
            
            $.ajax({
                url: '/api/Dispecer/PostIzmena',
                type: 'POST',
                data: {
                    KorisnickoIme: $('#ProfilKorisnickoImeDispecer').val(),
                    Email: $('#ProfilEmailDispecer').val(),
                    Lozinka: $('#ProfilLozinkaDispecer').val(),
                    Ime: $('#ProfilImeDispecer').val(),
                    Prezime: $('#ProfilPrezimeDispecer').val(),
                    JMBG: $('#ProfilJMBGDispecer').val(),
                    KontaktTelefon: $('#ProfilTelefonDispecer').val(),
                    Pol: sexD,

                },
            });
        });

    });

    $('#profilVozac').click(function () {
        $('#profilVozaca').show(),
            $('#lokacijaVozaca').hide(),
          
            $('#ProfilKorisnickoImeVozac').val(profil.KorisnickoIme),
            $('#ProfilEmailVozac').val(profil.Email),
            $('#ProfilLozinkaVozac').val(profil.Lozinka),
            $('#ProfilImeVozac').val(profil.Ime),
            $('#ProfilPrezimeVozac').val(profil.Prezime),
            $('#ProfilJMBGVozac').val(profil.JMBG),
            $('#ProfilTelefonVozac').val(profil.KontaktTelefon);
        if (profil.Pol == "Zenski") {
            $('#ProfilMuskoVozac').prop('checked', false);
            $('#ProfilZenskoVozac').prop('checked', true);

        } else {
            $('#ProfilMuskoVozac').prop('checked', true);
            $('#ProfilZenskoVozac').prop('checked', false);
        }
        $('#buttonVozac').click(function () {
            var sexVozac;
            if (($('#ProfilMuskoVozac').is(':checked'))) {
                sexVozac = $('#ProfilMuskoVozac').val();

            }
            else {
                sexVozac = $('#ProfilZenskoVozac').val();
            }
            $.ajax({
                
                type: 'POST',
                url: '/api/Vozac',
                
                data: {
                    KorisnickoIme: $('#ProfilKorisnickoImeVozac').val(),
                    Email: $('#ProfilEmailVozac').val(),
                    Lozinka: $('#ProfilLozinkaVozac').val(),
                    Ime: $('#ProfilImeVozac').val(),
                    Prezime: $('#ProfilPrezimeVozac').val(),
                    JMBG: $('#ProfilJMBGVozac').val(),
                    KontaktTelefon: $('#ProfilTelefonVozac').val(),
                    Pol: sexVozac,

                },
            });
        });

    });
        

    $('#profilKorisnik').click(function () {
        $('#profilKorisnika').show(),
            $('#dodavanjeVoznje').hide(),
            $('#otkazKomentar').hide();
        $('#izmenaVoznjeTabela').hide();
            $('#izmeniVoznjuKorisnik').hide(),
            $('#ProfilKorisnickoImeKorisnik').val(profil.KorisnickoIme),
            $('#ProfilEmailKorisnik').val(profil.Email),
            $('#ProfilLozinkaKorisnik').val(profil.Lozinka),
            $('#ProfilImeKorisnik').val(profil.Ime),
            $('#ProfilPrezimeKorisnik').val(profil.Prezime),
            $('#ProfilJMBGKorisnik').val(profil.JMBG),
            $('#ProfilTelefonKorisnik').val(profil.KontaktTelefon);
        if (profil.Pol == 0) {
            $('#ProfilMuskoKorisnik').prop('checked', false);
            $('#ProfilZenskoKorisnik').prop('checked', true);
            

        } else {
            $('#ProfilMuskoKorisnik').prop('checked', true);
            $('#ProfilZenskoKorisnik').prop('checked', false);
        }
        $('#buttonKorisnik').click(function () {
            var sex;
            if (($('#ProfilMuskoKorisnik').is(':checked'))) {
                sex = $('#ProfilMuskoKorisnik').val();

            }
            else {
                sex = $('#ProfilZenskoKorisnik').val();
            }
            alert("Joksim");
            $.ajax({
                
                url: '/api/Korisnik/PostIzmena',
                type: 'POST',
                data: {
                    KorisnickoIme: $('#ProfilKorisnickoImeKorisnik').val(),
                    Email: $('#ProfilEmailKorisnik').val(),
                    Lozinka: $('#ProfilLozinkaKorisnik').val(),
                    Ime: $('#ProfilImeKorisnik').val(),
                    Prezime: $('#ProfilPrezimeKorisnik').val(),
                    JMBG: $('#ProfilJMBGKorisnik').val(),
                    KontaktTelefon: $('#ProfilTelefonKorisnik').val(),
                    Pol: sex,

                },
            });
        });

    });
    $('#lokacijaVozac').click(function () {
        $('#lokacijaVozaca').show(),
            $('#profilVozaca').hide(),
            $('#LokacijaUlicaVozac').val(profil.Lokacija.Adresa.UlicaBroj),
            $('#LokacijaGradVozac').val(profil.Lokacija.Adresa.NaseljenoMesto),
            $('#LokacijaPostaVozac').val(profil.Lokacija.Adresa.PozivniBrojMesta),
            $('#LokacijaKordinataXVozac').val(profil.Lokacija.X),
            $('#LokacijaKordinataYVozac').val(profil.Lokacija.Y)
        $('#buttonLokacijaVozac').click(function () {

            let adresaV = {
                UlicaBroj: $('#LokacijaUlicaVozac').val(),
                NaseljenoMesto: $('#LokacijaGradVozac').val(),
                PozivniBrojMesta: $('#LokacijaPostaVozac').val()
            };
            let lokacijaV = {
                X: $('#LokacijaKordinataXVozac').val(),
                Y: $('#LokacijaKordinataYVozac').val(),
                Adresa: adresaV
            };
            $.ajax({
                url: '/api/Vozac/PostLokacija',
                type: 'POST',
                data: {
                    KorisnickoIme: $('#LokacijaKorisnickoImeVozac').val(),
                    Lokacija: lokacijaV,

                },
            });
        });
        

    });
    $('#voznjaKorisnik').click(function () {
        $('#dodavanjeVoznje').show();
        $('#profilKorisnika').hide(),
            $('#izmeniVoznjuKorisnik').hide();
        $('#izmenaVoznjeTabela').hide();
        $('#otkazKomentar').hide();
        $('#buttonVoznja').click(function () {
            let adresaVoznja = {
                UlicaBroj: $('#UlicaBrojVoznja').val(),
                NaseljenoMesto: $('#GradVoznja').val(),
                PozivniBrojMesta: $('#PostaVoznja').val()
            };
            let lokacijaVoznja = {
                X: $('#KordinataXVoznja').val(),
                Y: $('#KordinataYVoznja').val(),
                Adresa: adresaVoznja
            };
            var tipVoznja;
            if (($('#TipAutaObicniVoznja').is(':checked'))) {
                tipVoznja = $('#TipAutaObicniVoznja').val();
                alert("tacno!");
            }
            else if (($('#KombiAutoVoznja').is(':checked'))) {
                tipVoznja = $('#KombiAutoVoznja').val();
            }
            let autof = {
                Tip: tipVoznja
            };
            $.ajax({
                url: '/api/Korisnik/PostVoznja',
                type: 'POST',
                data: {
                    //KorisnickoIme: $('#LokacijaKorisnickoImeVozac').val(),
                    Lokacija: lokacijaVoznja,
                    Automobil: autof
                },
            });
        });

    });


    $('#voznjaIzmena').click(function () {
        $('#dodavanjeVoznje').hide();
        $('#profilKorisnika').hide(),
            $('#izmeniVoznjuKorisnik').show();
        $('#izmenaVoznjeTabela').hide();
        $('#otkazKomentar').hide();
        $.ajax({
            url: '/api/Korisnik/GetKorisnik',
            type: 'GET',
            success: function (data) {
                var voznje = data;
                var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Otkazi</th><th>Izmeni</th><th>Komentarisi</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th>`;
                var row;
                $(data).each(function (index) {
                    //var row = $('<tr>').addClass('success').text(data[index].LokacijaDolaskaTaksija.Adresa.UlicaBroj);
                    //table.append(row);

                    var id = data[index].Id;
                    var status;
                    if (data[index].StatusVoznje == 0) {
                        status = "Kreirana na cekanju";
                    } else if (data[index].StatusVoznje == 1) {
                        status = "Formirana";
                    } else if (data[index].StatusVoznje == 2) {
                        status = "Obradjena";
                    } else if (data[index].StatusVoznje == 3) {
                        status = "Prihvacena";
                    } else if (data[index].StatusVoznje == 4) {
                        status = "Otkazana";
                    } else if (data[index].StatusVoznje == 5) {
                        status = "Neuspesna";
                    } else if (data[index].StatusVoznje == 6) {
                        status = "Uspesna";
                    } else if (data[index].StatusVoznje == 7) {
                        status = "U toku";
                    } else {
                        status = "Nepoznato";
                    }

                    table += `<tr><td>${data[index].Id}</td><td> ${data[index].Lokacija.Adresa.UlicaBroj} </td><td> ${status} </td>`;
                    table += `<td><input id="btnOtkaziVoznju${index}" class="btn btn-success" type="button" value="Otkazi" /></td>`;
                    table += `<td><input id="btnIzmeniVoznju${index}" class="btn btn-success" type="button" value="Izmeni" /></td>`;
                    table += `<td><input id="btnKomentarisiVoznju${index}" class="btn btn-success" type="button" value="Komentarisi" /></td>`;
                    table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr>`
                });


                $("#tabelaVoznji").html(table);

                $(data).each(function (index) {
                    var id = data[index].Id;
                    $('#btnKomentarisiVoznju' + index).click(function () {
                        $('#izmeniVoznjuKorisnik').delay(300).fadeOut(300);
                        $('#otkazKomentar').delay(300).fadeIn(300);
                        $('#izmenaVoznjeTabela').hide();

                        $('#buttonKomentar').click(function () {
                            let opis = $('#opisKomentar').val();
                            let ocena = $('#ocenaKomentar').val();
                            let komentar = {
                                Opis: `${opis}`,
                                Ocena: `${ocena}`,
                                IdVoznje: id
                            };

                            $.ajax({
                                url: '/api/Korisnik/PostKomentar',
                                type: 'POST',
                                data: JSON.stringify(komentar),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    $('#opisKomentar').val("");
                                    $('#ocenaKomentar').val("");
                                    window.location.href = "Index.html";
                                }
                            });
                        })
                    });
                })

                $(data).each(function (index) {
                    var id = data[index].Id;
                    $('#btnOtkaziVoznju' + index).click(function () {
                        var broj = index;
                        var idvoznje = `${data[index].Id}`;


                        $.ajax({
                            url: `/api/Korisnik/` + data[index].Id,
                            type: 'DELETE',
                            data: {
                                id: broj
                            },
                            success: function (data) {
                                $('#izmeniVoznjuKorisnik').delay(300).fadeOut(300);
                                $('#otkazKomentar').delay(300).fadeIn(300);
                                $('#izmenaVoznjeTabela').hide();
                                $('#buttonKomentar').click(function () {
                                    let opis = $('#opisKomentar').val();
                                    let ocena = $('#ocenaKomentar').val();
                                    let komentar = {
                                        Opis: `${opis}`,
                                        Ocena: `${ocena}`,
                                        Id: id
                                    };

                                    $.ajax({
                                        url: '/api/Korisnik/PostKomentar',
                                        type: 'POST',
                                        data: JSON.stringify(komentar),
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        success: function (data) {
                                            $('#opisKomentar').val("");
                                            $('#ocenaKomentar').val("");
                                            window.location.href = "Index.html";
                                        }
                                    });
                                })
                            }
                        });
                        
                    });

                    $('#btnIzmeniVoznju' + index).click(function () {
                       
                        $('#izmeniVoznjuKorisnik').hide();
                        $('#modifikujVoznjuKorisnik').addClass("active");
                        $('#izmenaVoznjeTabela').show();

                        var num = index;

                        $('#btnChange').click(function () {

                            var type;
                            if ($('#txtTipAuto').is(':checked')) {
                                type = $('#txtTipAuto').val();
                            }
                            else {
                                type = $('#txtTipKombi').val();
                            }

                            let adresa = {
                                UlicaBroj: $('#txtUlicaBroj').val(),
                                NaseljenoMesto: $('#txtGrad').val(),
                                PozivniBrojMesta: $('#txtPosta').val()
                            };

                            let lokacija = {
                                X: $('#txtKordinataX').val(),
                                Y: $('#txtKordinataY').val(),
                                Adresa: adresa
                            };

                            $.ajax({
                                url: `/api/Korisnik/` + id,
                                type: 'PUT',
                                data: {
                                    Lokacija: lokacija,
                                    Automobil: type,
                                   
                                },
                                success: function (data) {

                                }
                            });
                        })
                    })
                });
            }
        });
    
    });


});