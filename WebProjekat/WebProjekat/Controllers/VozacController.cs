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
    public class VozacController : ApiController
    {
        [HttpGet]
        public List<Vozac> Get()
        {
            Vozaci users = HttpContext.Current.Application["vozaci"] as Vozaci;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            List<Vozac> slobodni = new List<Vozac>();

            foreach (Vozac v in users.list)
            {
                if (v.Zauzet == Enums.Zauzet.NE)
                    slobodni.Add(v);
            }

            return slobodni;
        }
        [HttpPost]
        //[Route("api/Vozac/PostIzmena")]
        public bool Post([FromBody]Vozac vozac)
        {

            Vozaci users = (Vozaci)HttpContext.Current.Application["vozaci"];
            foreach (var item in users.list)
            {
                if (vozac.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Email = vozac.Email;
                    item.Ime = vozac.Ime;
                    item.JMBG = vozac.JMBG;
                    item.KontaktTelefon = vozac.KontaktTelefon;
                    item.Lozinka = vozac.Lozinka;
                    item.Pol = vozac.Pol;
                    item.Prezime = vozac.Prezime;
                    item.Uloga = Enums.Uloga.Vozac;

                    string path = "~/App_Data/Vozaci.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = String.Empty;
                    line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                    item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                    ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                    ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                     + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;

                    var file = File.Open(path, FileMode.Open);
                    file.Close();
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;

                    File.WriteAllLines(path, arrLine);

                    Vozaci vozaci2 = new Vozaci("~/App_Data/Vozaci.txt");
                    HttpContext.Current.Application["vozaci"] = vozaci2;
                    return true;
                }
            }
            return false;
        }

        [HttpPost]
        [Route("api/Vozac/PostLokacija")]
        public bool PostLokacija([FromBody]Vozac vozac)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            Vozaci users = (Vozaci)HttpContext.Current.Application["vozaci"];
            foreach (var item in users.list)
            {
                if (user.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Lokacija.Adresa.NaseljenoMesto = vozac.Lokacija.Adresa.NaseljenoMesto;
                    item.Lokacija.Adresa.PozivniBrojMesta = vozac.Lokacija.Adresa.PozivniBrojMesta;
                    item.Lokacija.Adresa.UlicaBroj = vozac.Lokacija.Adresa.UlicaBroj;
                    item.Lokacija.X = vozac.Lokacija.X;
                    item.Lokacija.Y = vozac.Lokacija.Y;
                    

                    string path = "~/App_Data/Vozaci.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = String.Empty;
                    line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                    item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                    ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                    ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                     + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;

                    var file = File.Open(path, FileMode.Open);
                    file.Close();
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;

                    File.WriteAllLines(path, arrLine);

                    Vozaci vozaci2 = new Vozaci("~/App_Data/Vozaci.txt");
                    HttpContext.Current.Application["vozaci"] = vozaci2;
                    return true;
                }
            }
            return false;
        }
    }
}
