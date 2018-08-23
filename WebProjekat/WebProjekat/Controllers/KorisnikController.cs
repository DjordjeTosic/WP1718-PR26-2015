using Projekat.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace WebProjekat.Controllers
{
    public class KorisnikController : ApiController
    {
        public string Get()
        {
            Korisnik user = HttpContext.Current.Session["user"] as Korisnik;
            if(user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            return user.KorisnickoIme;
        }

        [HttpPost]
        public Korisnik Post([FromBody]Korisnik korisnik)
        {
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Korisnici users = (Korisnici)HttpContext.Current.Application["korisnici"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            foreach (var item in users.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    return item;
                }
            }

            foreach (var item in dispeceri.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    return item;
                }
            }

            foreach (var item in vozaci.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                    return item;
            }

            return null;
        }


        [HttpPost]
        [Route("api/Korisnik/PostIzmena")]
        public bool PostIzmena([FromBody]Korisnik korisnik)
        {

            Korisnici users = (Korisnici)HttpContext.Current.Application["korisnici"];
            foreach (var item in users.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Email = korisnik.Email;
                    item.Ime = korisnik.Ime;
                    item.JMBG = korisnik.JMBG;
                    item.KontaktTelefon = korisnik.KontaktTelefon;
                    item.Lozinka = korisnik.Lozinka;
                    item.Pol = korisnik.Pol;
                    item.Prezime = korisnik.Prezime;
                    item.Uloga = Enums.Uloga.Musterija;


                    string path = "~/App_Data/Korisnici.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':'
                    + item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':'
                    + item.Email + ':' + item.Uloga + Environment.NewLine;


                    var file = File.Open(path, FileMode.Open);
                    file.Close();
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;
                    //File.WriteAllLines(path, arrLine);

                    //var file = File.Open(path)
                    //arrLine[item.Id] = Regex.Replace(arrLine[item.Id], @"^\s+$[\r\n]*", string.Empty, RegexOptions.Multiline);
                    File.WriteAllLines(path, arrLine);

                    file.Close();
                    


                    Korisnici korisnici2 = new Korisnici("~/App_Data/Korisnici.txt");
                    HttpContext.Current.Application["korisnici"] = korisnici2;
                    return true;
                }


            }
            return false;

        }

        [HttpPost]
        [Route("api/Korisnik/PostVoznja")]
        public bool PostVoznja([FromBody]Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }


            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            if (user.Uloga == Enums.Uloga.Musterija)
            {
                
                v.DatumVreme = DateTime.UtcNow;
                v.Id = voznje.list.Count;
                v.idDispecer = "";
                Adresa a = new Adresa();
                a.NaseljenoMesto = "";
                a.PozivniBrojMesta = "";
                a.UlicaBroj = "";
                Lokacija l = new Lokacija();
                l.X = 0.0;
                l.Y = 0.0;
                l.Adresa = a;
                v.Odrediste = l;

                Komentar k = new Komentar();
                k.DatumObjave = "";
                k.Id = 0;
                k.idKorisnik = "";
                k.idVoznja = "";
                k.Ocena = "";
                k.Opis = "";
                v.Ocena = 0;
                v.Komentar = k;
                //v.Komentar.Id = 0;
                //v.Komentar.DatumObjave = "";
                //v.Komentar.idKorisnik = "";
                //v.Komentar.idVoznja = "";
                //v.Komentar.Ocena = "";
                //v.Komentar.Opis = "";
                v.Iznos = 0;
                
                v.idVozac = "";
                v.idKorisnik = user.KorisnickoIme;
                v.StatusVoznje = Enums.StatusVoznje.Kreirana;



                //user.voznjeKorisnika.Add(v);
                voznje.list.Add(v);
                users.list[user.Id].voznjeKorisnika.Add(v);


                //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\voznje.txt";
                string path = "~/App_Data/voznje.txt";
                path = HostingEnvironment.MapPath(path);


                string line = String.Empty;
                line = v.Id.ToString() + '|' + v.DatumVreme.ToString() + '|' + v.Lokacija.X + '|' + v.Lokacija.Y + '|' +
                v.Lokacija.Adresa.UlicaBroj + '|' + v.Lokacija.Adresa.NaseljenoMesto + '|' + v.Lokacija.Adresa.PozivniBrojMesta + '|' + v.Automobil + '|' +
                v.idKorisnik + '|' + v.Odrediste.X + '|' + v.Odrediste.Y + '|' + v.Odrediste.Adresa.UlicaBroj + '|' + v.Odrediste.Adresa.NaseljenoMesto + '|' + v.Odrediste.Adresa.PozivniBrojMesta + '|' +
                v.idDispecer + '|' + v.idVozac + '|' + v.Iznos.ToString() + '|' + v.Komentar.Opis + '|' + v.Komentar.DatumObjave + '|' + v.Komentar.idKorisnik + '|' + v.Komentar.idVoznja + '|' +
                v.Komentar.Ocena + '|' + v.StatusVoznje +  Environment.NewLine;


                if (!File.Exists(path))
                {
                    File.WriteAllText(path, line);
                }
                else
                {
                    File.AppendAllText(path, line);
                }

                Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                HttpContext.Current.Application["voznje"] = voznje2;
                //Korisnici korisnici2 = new Korisnici(@"~/App_Data/korisnici.txt");
                HttpContext.Current.Application["korisnici"] = users;

                return true;
            }

            return false;

        }
    }
}
