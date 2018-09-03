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
    public class NeprihvaceneVoznjeController : ApiController
    {
        [HttpPut]
        public bool Put(int id, [FromBody] Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }


            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;

            if (user.Uloga == Enums.Uloga.Vozac)
            {
                foreach (Vozac item in vozaci.list)
                {
                    if (user.Id == item.Id)
                    {
                        voznje.list[id].StatusVoznje = Enums.StatusVoznje.Prihvacena;
                        voznje.list[id].idVozac = user.KorisnickoIme;
                        vozaci.list[item.Id].voznjeKorisnika.Add(voznje.list[id]);
                        vozaci.list[item.Id].Zauzet = Enums.Zauzet.DA;



                        item.voznjeKorisnika.Add(voznje.list[id]);


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

                        HttpContext.Current.Application["vozaci"] = vozaci;
                    }
                }
            }

            if (user.Uloga == Enums.Uloga.Vozac)
            {
                foreach (Voznja ride in voznje.list)
                {
                    if (ride.Id == id)
                    {
                        voznje.list[id].StatusVoznje = Enums.StatusVoznje.Prihvacena;


                        string path = "~/App_Data/Voznje.txt";
                        path = HostingEnvironment.MapPath(path);

                        string line = String.Empty;

                        line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;

                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[ride.Id] = line;
                        File.WriteAllLines(path, arrLine);


                        Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                        HttpContext.Current.Application["voznje"] = voznje2;

                        return true;
                    }
                }
            }
            return false;
        }
    }
}
