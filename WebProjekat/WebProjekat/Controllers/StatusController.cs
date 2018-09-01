using Projekat.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace WebProjekat.Controllers
{
    public class StatusController : ApiController
    {
        [HttpPut]
        public bool Put(string id, [FromBody] Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Vozac rider in vozaci.list)
            {
                if (rider.KorisnickoIme == user.KorisnickoIme && user.Uloga == Enums.Uloga.Vozac)
                {
                    if (v.StatusVoznje == Enums.StatusVoznje.Uspesna)
                        return true;
                }
            }

            return false;
        }

        [HttpPut]
        [Route("api/status/putvoznjauspesno/{id:int}")]
        public bool PutVoznjaUspesno(int id, [FromBody] Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Vozac item in vozaci.list)
            {
                if (item.KorisnickoIme == user.KorisnickoIme && user.Uloga == Enums.Uloga.Vozac && item.KorisnickoIme == v.idVozac)
                {
                    item.voznjeKorisnika[id].StatusVoznje = Enums.StatusVoznje.Uspesna;
                    item.voznjeKorisnika[id].Id = v.Id;
                    item.voznjeKorisnika[id].Odrediste.X = v.Odrediste.X;
                    item.voznjeKorisnika[id].Odrediste.Y = v.Odrediste.Y;
                    item.voznjeKorisnika[id].Odrediste.Adresa.NaseljenoMesto = v.Odrediste.Adresa.NaseljenoMesto;
                    item.voznjeKorisnika[id].Odrediste.Adresa.PozivniBrojMesta = v.Odrediste.Adresa.PozivniBrojMesta;
                    item.voznjeKorisnika[id].Odrediste.Adresa.UlicaBroj = v.Odrediste.Adresa.UlicaBroj;
                    item.voznjeKorisnika[id].Iznos = v.Iznos;



                    //string pathVozac = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\vozaci.txt";
                    string pathVozac = "~/App_Data/Vozaci.txt";
                    pathVozac = HostingEnvironment.MapPath(pathVozac);

                    string lineVozac = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                    item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                    ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                    ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                     + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban; 

                    string[] arrLine = File.ReadAllLines(pathVozac);
                    arrLine[item.Id] = lineVozac;
                    File.WriteAllLines(pathVozac, arrLine);
                    //File.WriteAllLines(pathVozac, File.ReadAllLines(pathVozac).Where(l => !string.IsNullOrWhiteSpace(l)));


                    //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\voznje.txt";
                    string path = "~/App_Data/Voznje.txt";
                    path = HostingEnvironment.MapPath(path);


                    foreach (Voznja ride in item.voznjeKorisnika)
                    {
                        if (ride.Id == v.Id)
                        {
                            ride.StatusVoznje = Enums.StatusVoznje.Uspesna;
                            ride.Iznos = v.Iznos;
                            ride.Odrediste.X = v.Odrediste.X;
                            ride.Odrediste.Y = v.Odrediste.Y;
                            ride.Odrediste.Adresa.NaseljenoMesto = v.Odrediste.Adresa.NaseljenoMesto;
                            ride.Odrediste.Adresa.PozivniBrojMesta = v.Odrediste.Adresa.PozivniBrojMesta;
                            ride.Odrediste.Adresa.UlicaBroj = v.Odrediste.Adresa.UlicaBroj;

                            string line = String.Empty;
                            line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;


                            string[] arrLine2 = File.ReadAllLines(path);
                            arrLine2[ride.Id] = line;
                            File.WriteAllLines(path, arrLine2);
                            //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));


                            Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                            HttpContext.Current.Application["voznje"] = voznje2;
                            //Vozaci vozaci2 = new Vozaci(@"~/App_Data/vozaci.txt");
                            //HttpContext.Current.Application["vozaci"] = vozaci2;

                            return true;
                        }
                    }
                }
            }

            return false;
        }

        [HttpPut]
        [Route("api/status/putvoznjaneuspesno/{id:int}")]
        public bool PutVoznjaNeuspesno(int id, [FromBody] Komentar k)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Vozac driver in vozaci.list)
            {
                if (user.KorisnickoIme == driver.KorisnickoIme)
                {
                    foreach (Voznja ride in driver.voznjeKorisnika)
                    {
                        if (ride.Id == id)
                        {
                            ride.StatusVoznje = Enums.StatusVoznje.Neuspesna;
                            ride.Komentar.Id = id;
                            ride.Komentar.DatumObjave = DateTime.UtcNow.ToString();
                            ride.Komentar.idKorisnik = user.KorisnickoIme;
                            ride.Komentar.Ocena = k.Ocena;
                            ride.Komentar.Opis = k.Opis;

                            //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\voznje.txt";
                            string path = "~/App_Data/Voznje.txt";
                            path = HostingEnvironment.MapPath(path);

                            string line = String.Empty;
                            line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;


                            string[] arrLine2 = File.ReadAllLines(path);
                            arrLine2[ride.Id] = line;
                            File.WriteAllLines(path, arrLine2);
                            //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                            Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                            HttpContext.Current.Application["voznje"] = voznje2;
                            Vozaci vozaci2 = new Vozaci(@"~/App_Data/Vozaci.txt");
                            HttpContext.Current.Application["vozaci"] = vozaci2;

                            return true;
                        }
                    }
                }
            }

            return false;
        }

    }
}
