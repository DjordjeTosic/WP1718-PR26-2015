
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
    $('#voznjaDispecer').hide();
    $('#obradiVoznjuDispecer').hide();
    $('#vozacStatus').hide();
    $('#neuspesnaVoznjaKomentar').hide();
    $('#vozacOdrediste').hide();
    $('#searchRidesKorisnik').hide();
    $('#searchRidesDispecer').hide();
    $('#neprihvaceneVoznje').hide();
    $('#searchRidesVozac').hide();

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
        $('#voznjaDispecer').hide();
        $('#profilDispecera').hide();
        $('#searchRidesDispecer').hide();
        $('#obradiVoznjuDispecer').hide();
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
            $('#obradiVoznjuDispecer').hide();
        $('#voznjaDispecer').hide();
        $('#searchRidesDispecer').hide();
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
            $('#vozacStatus').hide(),
            $('#neprihvaceneVoznje').hide();
            $('#neuspesnaVoznjaKomentar').hide();
        $('#searchRidesVozac').hide();
        $('#vozacOdrediste').hide();
          
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
        

    $('#searchKorisnik').click(function () {
        $('#profilKorisnika').hide(),
            $('#dodavanjeVoznje').hide(),
            $('#otkazKomentar').hide();
        $('#izmenaVoznjeTabela').hide();
        $('#izmeniVoznjuKorisnik').hide(),
            $('#searchRidesKorisnik').show(),

            $.ajax({
            url: '/api/Voznja/GetKorisnikoveVoznje',
                type: 'GET',
                success: function (data) {
                    var voznje = data;

                    var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                    table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;
                    var row;
                    
                    $(data).each(function (index) {
                        

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
                        table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                    });

                    $("#tabelaSearch").html(table);

                    $('#btnFiltracija').click(function () {
                        var value = `${$('#statusiVoznjiZaFiltraciju').val()}`;
                        $('#tabelaSort').hide();
                        $('#tabelaSearch').hide();
                        $('#tabelaFiltracija').delay(300).fadeIn(300);

                        $.ajax({
                            url: '/api/search/getfiltracija/' + value,
                            type: 'GET',
                            success: function (data) {
                                var voznje = data;

                                var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                                $(data).each(function (index) {

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
                                    table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                                });

                                $("#tabelaFiltracija").html(table);


                            }
                        });
                    });

                    $('#btnSort').click(function () {
                        var value = `${$('#valueZaSort').val()}`;
                        $('#tabelaFiltracija').hide();
                        $('#tabelaSearch').hide();
                        $('#tabelaSort').delay(300).fadeIn(300);

                        $.ajax({
                            url: '/api/sort/getsort/' + value,
                            type: 'GET',
                            success: function (data) {
                                var voznje = data;

                                var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                                $(data).each(function (index) {

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
                                    table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                                });

                                $("#tabelaSort").html(table);


                            }
                        });
                    });

                    $('#btnSearchDate').click(function () {
                        var value1 = `${$('#dateSearchFrom').val()}`;
                        var value2 = `${$('#dateSearchTo').val()}`;

                        if (value1 == "") {
                            value1 = new Date();
                            var dd = value1.getDate();
                            var mm = value1.getMonth() + 1; //January is 0!
                            var yyyy = value1.getFullYear();

                            if (dd < 10) {
                                dd = '0' + dd
                            }

                            if (mm < 10) {
                                mm = '0' + mm
                            }

                            value1 = mm + '-' + dd + '-' + yyyy;
                        }

                        if (value2 == "") {
                            value2 = new Date();
                            var dd = value2.getDate();
                            var mm = value2.getMonth() + 1; //January is 0!
                            var yyyy = value2.getFullYear();

                            if (dd < 10) {
                                dd = '0' + dd
                            }

                            if (mm < 10) {
                                mm = '0' + mm
                            }

                            value2 = mm + '-' + dd + '-' + yyyy;
                        }

                        $('#tabelaFiltracija').hide();
                        $('#tabelaSearch').hide();
                        $('#tabelaSort').delay(300).fadeIn(300);

                        $.ajax({
                            url: '/api/search/getsearch/' + value1 + '/' + value2,
                            type: 'GET',
                            success: function (data) {
                                var voznje = data;

                                var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th>`;


                                $(data).each(function (index) {

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
                                    table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                                });

                                $("#tabelaSort").html(table);


                            }
                        });
                    });

                    $('#btnSearchGrade').click(function () {
                        var value1 = `${$('#gradeSearchFrom').val()}`;
                        var value2 = `${$('#gradeSearchTo').val()}`;
                        $('#tabelaFiltracija').hide();
                        $('#tabelaSearch').hide();
                        $('#tabelaSort').delay(300).fadeIn(300);

                        if (value1 == "") {
                            value1 = -1;
                        }

                        if (value2 == "") {
                            value2 = -1;
                        }

                        $.ajax({
                            url: '/api/search/getsearchgrade/' + value1 + '/' + value2,
                            type: 'GET',
                            success: function (data) {
                                var voznje = data;

                                var table = `<thead><tr class="success"><th colspan="7" style="text-align:center">Voznje</th></tr></thead>`;
                                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                                $(data).each(function (index) {

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
                                    table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr>`
                                });

                                $("#tabelaSort").html(table);


                            }
                        });
                    });

                    $('#btnSearchPrice').click(function () {
                        var value1 = `${$('#priceSearchFrom').val()}`;
                        var value2 = `${$('#priceSearchTo').val()}`;
                        $('#tabelaFiltracija').hide();
                        $('#tabelaSearch').hide();
                        $('#tabelaSort').delay(300).fadeIn(300);

                        if (value1 == "") {
                            value1 = -1;
                        }
                        if (value2 == "") {
                            value2 = -1;
                        }

                        $.ajax({
                            url: '/api/search/getsearchprice/' + value1 + '/' + value2,
                            type: 'GET',
                            success: function (data) {
                                var voznje = data;

                                var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th><th>Cena</th>`;


                                $(data).each(function (index) {

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
                                    table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td><td>${data[index].Iznos}</td></tr></tbody>`
                                });

                                $("#tabelaSort").html(table);


                            }
                        });
                    });

                }
            });

    });
    $('#profilKorisnik').click(function () {
        $('#profilKorisnika').show(),
            $('#dodavanjeVoznje').hide(),
            $('#otkazKomentar').hide();
        $('#izmenaVoznjeTabela').hide();
        $('#searchRidesKorisnik').hide();
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
            $('#vozacStatus').hide(),
            $('#searchRidesVozac').hide();
        $('#neprihvaceneVoznje').hide();
            $('#vozacOdrediste').hide();
            $('#neuspesnaVoznjaKomentar').hide();
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

    $('#statusVoznjiVozac').click(function () {
        $('#lokacijaVozaca').hide(),
            $('#profilVozaca').hide(),
            $('#vozacStatus').show(),
            $('#neprihvaceneVoznje').hide();
            $('#searchRidesVozac').hide();
            $('#neuspesnaVoznjaKomentar').hide();
        $('#vozacOdrediste').hide();

            $.ajax({
                url: '/api/Voznja/GetVozacoveVoznje',
                type: 'GET',
                success: function (data) {
                    alert("Upao");
                    var voznje = data;

                    var table = `<thead><tr class="success"><th colspan="9" style="text-align:center">Voznje</th></tr></thead>`;
                    table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Uspesno/Neuspesno</th><th>Obradi</th><th>Zavrsi</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th>`;
                    var row;

                    $(data).each(function (index) {
                        //var row = $('<tr>').addClass('success').text(data[index].LokacijaDolaskaTaksija.Adresa.UlicaBroj);
                        //table.append(row);

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


                        table += `<td><select id="cmbStatus${index}"><option value="Uspesna">Uspesna</option><option value="Neuspesna">Neuspesna</option></select></td>`;


                        table += `<td><input id="btnObradiVoznjuVozac${index}" class="btn btn-success" type="button" value="Obradi" /></td>`;
                        table += `<td><input id="btnZavrsiVoznjuVozac${index}" class="btn btn-success" type="button" value="Zavrsi" /></td>`;

                        table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr>`
                    });

                    $("#tabelaVoznjiVozac").html(table);
                    $(data).each(function (index) {
                        $('#btnObradiVoznjuVozac' + index).click(function () {
                            var num = index;
                            var id = `${data[index].Id}`;
                            var status = `${$('#cmbStatus' + index).val()}`;
                            var vozac = `${data[index].idVozac}`;
                            var voznja = {
                                Id: id,
                                idVozac: vozac,
                                StatusVoznje: status
                            }
                            $.ajax({
                                url: `/api/Status/` + id,
                                type: 'PUT',
                                data: JSON.stringify(voznja),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data) {
                                        alert("Odradio apdejt voznje");
                                        $('#vozacStatus').hide();
                                        $('#neuspesnaVoznjaKomentar').hide();
                                        $('#vozacOdrediste').show();

                                        $.ajax({
                                            url: '/api/voznja/getstatus/' + id,
                                            type: 'GET',
                                            success: function (data) {
                                                if (!data) {
                                                    alert("Ova voznja je vec obradjena, ne moze se obraditi ponovo!");
                                                    window.location.href = "Index.html";
                                                }
                                            }
                                        });

                                        $('#btnSaveDestination').click(function () {
                                            let adresa = {
                                                UlicaBroj: `${$('#txtStreetNumDestination').val()}`,
                                                NaseljenoMesto: `${$('#txtCityDestination').val()}`,
                                                PozivniBroj: `${$('#txtZipCodeDestination').val()}`
                                            }

                                            let lokacija = {
                                                X: `${$('#txtCoordinateXDestination').val()}`,
                                                Y: `${$('#txtCoordinateYDestination').val()}`,
                                                Adresa: adresa
                                            }

                                            var ride = {
                                                Id: id,
                                                idVozac: vozac,
                                                Odrediste: lokacija,
                                                Iznos: `${$('#txtAmountDestination').val()}`
                                            }

                                            $.ajax({
                                                url: '/api/Status/PutVoznjauspesno/' + index,
                                                type: 'PUT',
                                                data: JSON.stringify(ride),
                                                contentType: 'application/json; charset=utf-8',
                                                dataType: 'json',
                                                success: function (data) {
                                                    window.locat.href = "Index.html";
                                                }
                                            });
                                        });

                                    } else {

                                        $.ajax({
                                            url: '/api/voznja/getstatus/' + id,
                                            type: 'GET',
                                            success: function (data) {
                                                if (!data) {
                                                    alert("Ova voznja je vec obradjena");
                                                    window.location.href = "Index.html";
                                                }
                                            }
                                        });
                                        $('#vozacStatus').hide();
                                        $('#neuspesnaVoznjaKomentar').show();
                                        $('#vozacOdrediste').hide();

                                        $('#btnSaveNeuspesnaVoznjaComment').click(function () {
                                            let opis = $('#txtCommentNeuspesnaVoznjaDescription').val();
                                            let ocena = $('#txtCommentNeuspesnaVoznjaGrade').val();
                                            let komentar = {
                                                Opis: `${opis}`,
                                                Ocena: `${ocena}`,
                                                IdVoznje: `${index}`
                                            };

                                            $.ajax({
                                                url: '/api/status/PutVoznjaNeuspesno/' + id,
                                                type: 'PUT',
                                                data: JSON.stringify(komentar),
                                                contentType: 'application/json; charset=utf-8',
                                                dataType: 'json',
                                                success: function (data) {
                                                    $('#txtCommentNeuspesnaVoznjaDescription').val("");
                                                    $('#txtCommentNeuspesnaVoznjaGrade').val("");
                                                    window.location.href = "Index.html";
                                                }
                                            });
                                        })
                                    }
                                }
                            });
                        });
                    });

                    $(data).each(function (index) {
                        $('#btnZavrsiVoznjuVozac' + index).click(function () {

                            var num = index;
                            var id = `${data[index].Id}`;
                            var status = `${$('#cmbStatus' + index).val()}`;
                            var vozac = `${data[index].IdVozac}`;

                            var voznja = {
                                Id: id,
                                IdVozac: vozac,
                                StatusVoznje: status
                            }

                            $.ajax({
                                url: `/api/Voznja/` + id,
                                type: 'PUT',
                                data: JSON.stringify(voznja),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data) {
                                        alert("Zavrsio");
                                    } else {
                                        alert("Neuspelo zavrsavanje");
                                    }
                                }
                            });
                        });
                    })
                }
            });
    });
    $('#voznjaKorisnik').click(function () {
        $('#dodavanjeVoznje').show();
        $('#searchRidesKorisnik').hide(),
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
            $('#searchRidesKorisnik').hide(),
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

    $('#dodajVoznjuDispecer').click(function () {
        $('#voznjaDispecer').show();
        $('#dodajVozacaDeo').hide();
        $('#profilDispecera').hide();
        $('#obradiVoznjuDispecer').hide();
        $('#searchRidesDispecer').hide();
        $('#buttonVoznjaDispecer').click(function () {
            let adresaVoznjaDispecer = {
                UlicaBroj: $('#UlicaBrojVoznjaDispecer').val(),
                NaseljenoMesto: $('#GradVoznjaDispecer').val(),
                PozivniBrojMesta: $('#PostaVoznjaDispecer').val()
            };
            let lokacijaVoznjaDispecer = {
                X: $('#KordinataXVoznjaDispecer').val(),
                Y: $('#KordinataYVoznjaDispecer').val(),
                Adresa: adresaVoznjaDispecer
            };
            var tipVoznjaDispecer;
            if (($('#TipAutaObicniVoznjaDispecer').is(':checked'))) {
                tipVoznjaDispecer = $('#TipAutaObicniVoznjaDispecer').val();
                alert("tacno!");
            }
            else if (($('#KombiAutoVoznjaDispecer').is(':checked'))) {
                tipVoznjaDispecer = $('#KombiAutoVoznjaDispecer').val();
            }


        
            $.ajax({
                url: '/api/Dispecer/PostVoznja',
                type: 'POST',
                data: {
                    
                    Lokacija: lokacijaVoznjaDispecer,
                    Automobil: tipVoznjaDispecer,
                    idDispecer: localStorage.getItem("logged")
                },
            });
        });

    });

    $('#obradiVoznjeDispecer').click(function () {
        $('#voznjaDispecer').hide();
        $('#dodajVozacaDeo').hide();
        $('#profilDispecera').hide();
        $('#obradiVoznjuDispecer').show();
        $('#searchRidesDispecer').hide();

        $.ajax({
            url: '/api/Vozac',
            type: 'GET',
            success: function (data) {
                var slobodniVozaci;
                slobodniVozaci = data;

                
                var statusi = [];

                $.ajax({
                    url: '/api/Voznja',
                    type: 'GET',
                    success: function (data) {
                        var voznje;
                        voznje = data;

                        var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                        table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Slobodni Vozaci</th><th>Obradi</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;
                        var row;
                        $(data).each(function (index) {


                            statusi[index] = data[index].StatusVoznje;
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

                            table += `<td><select id="slobodniVozaciDispecer${index}">`

                            //alert(slobodniVozaci[0].KorisnickoIme);
                            $(slobodniVozaci).each(function (indeks) {
                                table += `<option value="${slobodniVozaci[indeks].KorisnickoIme}">${slobodniVozaci[indeks].KorisnickoIme}</option>`
                            });

                            table += `</select></td>`

                            
                            table += `<td><input id="btnObradiVoznjuDispecer${index}" class="btn btn-success" type="button" value="Obradi" /></td>`;
                            table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                        });
                        $("#tabelaVoznjiDispecer").html(table);

                        $(data).each(function (index) {
                            $('#btnObradiVoznjuDispecer' + index).click(function () {
                                var num = index;
                                var vozac = `${$('#slobodniVozaciDispecer' + index).val()}`;
                                var status2 = statusi[index];
                                alert("jebi se");
                                $.ajax({
                                    
                                    url: `/api/Dispecer/` + index,
                                    type: 'PUT',
                                    
                                    data: {
                                        idVozac: vozac,
                                        StatusVoznje: status2
                                    },
                                    success: function (data) {
                                        if (data) {
                                            alert("Odradio");
                                            window.location.href = "Index.html";
                                        } else {
                                            alert("Ovu voznju nije moguce obraditi ili nema slobodnih vozaca");
                                        }
                                    }
                                });
                            });
                        });
                    }

                });
            }

        });
        

    });

    $('#searchDispecer').click(function () {
        $('#voznjaDispecer').hide();
        $('#dodajVozacaDeo').hide();
        $('#profilDispecera').hide();
        $('#obradiVoznjuDispecer').hide();
        $('#searchRidesDispecer').show();

        $.ajax({
            url: '/api/voznja/getdispecerovevoznjesearch',
            type: 'GET',
            success: function (data) {
                var voznje = data;

                var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;
                var row;
                
                $(data).each(function (index) {
                    

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
                    table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                });

                $("#tabelaSearchDispecer").html(table);

                $('#btnFiltracijaDispecer').click(function () {
                    var value = `${$('#statusiVoznjiZaFiltracijuDispecer').val()}`;
                    $('#tabelaSortDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaFiltracijaDispecer').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/search/getfiltracijadispecer/' + value,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaFiltracijaDispecer").html(table);


                        }
                    });
                });


                $('#btnSortDispecer').click(function () {
                    var value = `${$('#valueZaSortDispecer').val()}`;
                    $('#tabelaFiltracijaDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaSortDispecer').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/sort/getsortdispecer/' + value,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortDispecer").html(table);


                        }
                    });
                });



                $('#btnSearchDateDispecer').click(function () {
                    var value1 = `${$('#dateSearchFromDispecer').val()}`;
                    var value2 = `${$('#dateSearchToDispecer').val()}`;

                    if (value1 == "") {
                        value1 = new Date();
                        var dd = value1.getDate();
                        var mm = value1.getMonth() + 1; //January is 0!
                        var yyyy = value1.getFullYear();

                        if (dd < 10) {
                            dd = '0' + dd
                        }

                        if (mm < 10) {
                            mm = '0' + mm
                        }

                        value1 = mm + '-' + dd + '-' + yyyy;
                    }

                    if (value2 == "") {
                        value2 = new Date();
                        var dd = value2.getDate();
                        var mm = value2.getMonth() + 1; //January is 0!
                        var yyyy = value2.getFullYear();

                        if (dd < 10) {
                            dd = '0' + dd
                        }

                        if (mm < 10) {
                            mm = '0' + mm
                        }

                        value2 = mm + '-' + dd + '-' + yyyy;
                    }

                    $('#tabelaFiltracijaDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaSortDispecer').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/search/getsearchdispecer/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortDispecer").html(table);


                        }
                    });
                });


                $('#btnSearchGradeDispecer').click(function () {
                    var value1 = `${$('#gradeSearchFromDispecer').val()}`;
                    var value2 = `${$('#gradeSearchToDispecer').val()}`;
                    $('#tabelaFiltracijaDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaSortDispecer').delay(300).fadeIn(300);

                    if (value1 == "") {
                        value1 = -1;
                    }

                    if (value2 == "") {
                        value2 = -1;
                    }

                    $.ajax({
                        url: '/api/search/getsearchgradedispecer/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="7" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortDispecer").html(table);


                        }
                    });
                });







                $('#btnSearchPriceDispecer').click(function () {
                    var value1 = `${$('#priceSearchFromDispecer').val()}`;
                    var value2 = `${$('#priceSearchToDispecer').val()}`;
                    $('#tabelaFiltracijaDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaSortDispecer').delay(300).fadeIn(300);

                    if (value1 == "") {
                        value1 = -1;
                    }
                    if (value2 == "") {
                        value2 = -1;
                    }

                    $.ajax({
                        url: '/api/search/getsearchpricedispecer/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th><th>Cena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td><td>${data[index].Iznos}</td></tr></tbody>`
                            });

                            $("#tabelaSortDispecer").html(table);


                        }
                    });
                });


                $('#btnSearchByNameDispecer').click(function () {
                    var value1 = `${$('#firstNameForSearch').val()}`;
                    var value2 = `${$('#lastNameForSearch').val()}`;
                    $('#tabelaFiltracijaDispecer').hide();
                    $('#tabelaSearchDispecer').hide();
                    $('#tabelaSortDispecer').delay(300).fadeIn(300);

                    if (value1 == "") {
                        value1 = "nevalidan_unos";
                    }
                    if (value2 == "") {
                        value2 = "nevalidan_unos";
                    }

                    $.ajax({
                        url: '/api/search/getsearchbyname/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="7" style="text-align:center">Korisnici</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ime</th><th>Prezime</th><th>Role</th><th>Korisnicko ime</th><th>Ban</th><th>Unban</th></tr>`;


                            $(data).each(function (index) {

                                var id = data[index].Id;
                                var status;
                                if (data[index].Uloga == 0) {
                                    status = "Musterija";
                                } else if (data[index].Uloga == 1) {
                                    status = "Dispecer";
                                } else if (data[index].Uloga == 2) {
                                    status = "Vozac";
                                } else {
                                    status = "Nepoznato";
                                }

                                table += `<tr><td>${data[index].Id}</td><td> ${data[index].Ime} </td><td> ${data[index].Prezime} </td><td> ${status} </td><td> ${data[index].KorisnickoIme} </td><td><input id="btnBanujKorisnika${index}" class="btn btn-success" type="button" value="Ban" /></td><td><input id="btnOdbanujKorisnika${index}" class="btn btn-success" type="button" value="Unban" /></td></tr></tbody>`
                            });

                            $("#tabelaSortDispecer").html(table);
                        }
                    });
                });
            }
        });
    });

    $('#slobodneVoznje').click(function () {
        
        $('#profilVozaca').hide();
        $('#lokacijaVozaca').hide();
        $('#vozacStatus').hide();
        $('#neuspesnaVoznjaKomentar').hide();
        $('#vozacOdrediste').hide();
        $('#searchRidesVozac').hide();
        $('#neprihvaceneVoznje').show();

        $.ajax({
            url: '/api/voznja/getslobodne',
            type: 'GET',
            success: function (data) {
                var voznje = data;

                var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Obradi</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;
                var row;
                $(data).each(function (index) {
                    
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

                    table += `<td><input id="btnObradiNeprihvacenuVoznju${index}" class="btn btn-success" type="button" value="Obradi" /></td>`;

                    table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                });

                $("#tabelaSlobodnihVoznji").html(table);


                $(data).each(function (index) {
                    $('#btnObradiNeprihvacenuVoznju' + index).click(function () {

                        var id = `${data[index].Id}`;
                        var status = `${$('#cmbStatus' + index).val()}`;
                        var vozac = `${data[index].idVozac}`;

                        var voznja = {
                            Id: id,
                            idVozac: vozac,
                            StatusVoznje: status
                        }
                        
                        $.ajax({
                            url: `/api/neprihvacenevoznje/` + id,
                            type: 'PUT',
                            data: JSON.stringify(voznja),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                alert("Upao u neprihvacene");
                            }
                        });
                    });
                });
            }
        });

    });

    $('#searchVozac').click(function () {
        $('#profilVozaca').hide();
        $('#lokacijaVozaca').hide();
        $('#vozacStatus').hide();
        $('#neuspesnaVoznjaKomentar').hide();
        $('#vozacOdrediste').hide();
        $('#searchRidesVozac').show();
        $('#neprihvaceneVoznje').hide();
        
        $.ajax({
            url: '/api/voznja/getdriversrides',
            type: 'GET',
            success: function (data) {
                var voznje = data;

                var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;
                var row;
                $(data).each(function (index) {

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
                    table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                });

                $("#tabelaSearchVozac").html(table);




                $('#btnFiltracijaVozac').click(function () {
                    var value = `${$('#statusiVoznjiZaFiltracijuVozac').val()}`;
                    $('#tabelaSortVozac').hide();
                    $('#tabelaSearchVozac').hide();
                    $('#tabelaFiltracijaVozac').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/search/getfiltracijavozac/' + value,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaFiltracijaVozac").html(table);


                        }
                    });
                });




                $('#btnSortVozac').click(function () {
                    var value = `${$('#valueZaSortVozac').val()}`;
                    $('#tabelaFiltracijaVozac').hide();
                    $('#tabelaSearchVozac').hide();
                    $('#tabelaSortVozac').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/sort/getsortvozac/' + value,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortVozac").html(table);


                        }
                    });
                });




                $('#btnSearchDateVozac').click(function () {
                    var value1 = `${$('#dateSearchFromVozac').val()}`;
                    var value2 = `${$('#dateSearchToVozac').val()}`;

                    if (value1 == "") {
                        value1 = new Date();
                        var dd = value1.getDate();
                        var mm = value1.getMonth() + 1; //January is 0!
                        var yyyy = value1.getFullYear();

                        if (dd < 10) {
                            dd = '0' + dd
                        }

                        if (mm < 10) {
                            mm = '0' + mm
                        }

                        value1 = mm + '-' + dd + '-' + yyyy;
                    }

                    if (value2 == "") {
                        value2 = new Date();
                        var dd = value2.getDate();
                        var mm = value2.getMonth() + 1; //January is 0!
                        var yyyy = value2.getFullYear();

                        if (dd < 10) {
                            dd = '0' + dd
                        }

                        if (mm < 10) {
                            mm = '0' + mm
                        }

                        value2 = mm + '-' + dd + '-' + yyyy;
                    }

                    $('#tabelaFiltracijaVozac').hide();
                    $('#tabelaSearchVozac').hide();
                    $('#tabelaSortVozac').delay(300).fadeIn(300);

                    $.ajax({
                        url: '/api/search/getsearchvozac/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="6" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortVozac").html(table);


                        }
                    });
                });




                $('#btnSearchGradeVozac').click(function () {
                    var value1 = `${$('#gradeSearchFromVozac').val()}`;
                    var value2 = `${$('#gradeSearchToVozac').val()}`;
                    $('#tabelaFiltracijaVozac').hide();
                    $('#tabelaSearchVozac').hide();
                    $('#tabelaSortVozac').delay(300).fadeIn(300);

                    if (value1 == "") {
                        value1 = -1;
                    }

                    if (value2 == "") {
                        value2 = -1;
                    }

                    $.ajax({
                        url: '/api/search/getsearchgradevozac/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="7" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td></tr></tbody>`
                            });

                            $("#tabelaSortVozac").html(table);


                        }
                    });
                });




                $('#btnSearchPriceVozac').click(function () {
                    var value1 = `${$('#priceSearchFromVozac').val()}`;
                    var value2 = `${$('#priceSearchToVozac').val()}`;
                    $('#tabelaFiltracijaVozac').hide();
                    $('#tabelaSearchVozac').hide();
                    $('#tabelaSortVozac').delay(300).fadeIn(300);

                    if (value1 == "") {
                        value1 = -1;
                    }
                    if (value2 == "") {
                        value2 = -1;
                    }

                    $.ajax({
                        url: '/api/search/getsearchpricevozac/' + value1 + '/' + value2,
                        type: 'GET',
                        success: function (data) {
                            var voznje = data;

                            var table = `<thead><tr class="success"><th colspan="8" style="text-align:center">Voznje</th></tr></thead>`;
                            table += `<tbody><tr><th>ID</th><th>Ulica i broj</th><th>Status</th><th>Datum</th><th>Korisnicko ime</th><th>Opis</th><th>Ocena</th><th>Cena</th></tr>`;


                            $(data).each(function (index) {

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
                                table += `<td>${data[index].DatumVreme}</td><td>${data[index].Komentar.idKorisnik}</td><td>${data[index].Komentar.Opis}</td><td>${data[index].Komentar.Ocena}</td><td>${data[index].Iznos}</td></tr></tbody>`
                            });

                            $("#tabelaSortVozac").html(table);


                        }
                    });
                });

            }
        });

    });


});