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
    public class VoznjaController : ApiController
    {
        [HttpGet]
        public List<Voznja> Get()
        {
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.Uloga == Enums.Uloga.Dispecer)
                return voznje.list;

            return new List<Voznja>();
        }

        [HttpGet]
        [Route("api/Voznja/GetVozacoveVoznje")]
        public List<Voznja> GetVozacoveVoznje()
        {
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.Uloga == Enums.Uloga.Vozac)
            {
                foreach (Vozac vozac in vozaci.list)
                {
                    if (vozac.KorisnickoIme == user.KorisnickoIme)
                    {
                        return user.voznjeKorisnika;
                    }
                }
            }
                

            return new List<Voznja>();
        }

        [HttpGet]
        [Route("api/Voznja/GetKorisnikoveVoznje")]
        public List<Voznja> GetKorisnikoveVoznje()
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            foreach(Korisnik k in users.list)
            {
                if(user.KorisnickoIme != null && user.KorisnickoIme!= "" && user.KorisnickoIme == k.KorisnickoIme)
                {
                    return k.voznjeKorisnika;
                }

            }


            return new List<Voznja>();
        }

        [HttpGet]
        [Route("api/voznja/getstatus/{id:int}")]
        public bool GetStatus(int id)
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
                if (driver.KorisnickoIme == user.KorisnickoIme)
                {
                    foreach (Voznja v in driver.voznjeKorisnika)
                    {
                        if (v.Id == id)
                        {
                            if (v.StatusVoznje == Enums.StatusVoznje.Uspesna || v.StatusVoznje == Enums.StatusVoznje.Neuspesna)
                                return false;
                        }
                    }
                }
            }
            return true;
        }

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

            foreach (Vozac item in vozaci.list)
            {
                if (user.KorisnickoIme == item.KorisnickoIme)
                {
                    voznje.list[id].idVozac = user.KorisnickoIme;
                    item.Zauzet = Enums.Zauzet.NE;

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


                    HttpContext.Current.Application["vozaci"] = vozaci;
                }
            }

            foreach (Voznja ride in voznje.list)
            {
                if (ride.Id == id)
                {
                    if (ride.StatusVoznje == Enums.StatusVoznje.Uspesna)
                    {
                        ride.idVozac = user.KorisnickoIme;
                        ride.StatusVoznje = Enums.StatusVoznje.Obradjena;


                        //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\voznje.txt";
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
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));


                        Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                        HttpContext.Current.Application["voznje"] = voznje2;

                        return true;
                    }
                }
            }

            return false;
        }

        [HttpGet]
        [Route("api/voznja/getdispecerovevoznjesearch")]
        public List<Voznja> GetDispeceroveVoznjeSearch()
        {
            Dispeceri users = HttpContext.Current.Application["dispeceri"] as Dispeceri;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            List<Voznja> retVal = new List<Voznja>();
            retVal = voznje.list;

            return retVal;
        }

        [HttpGet]
        [Route("api/voznja/getslobodne")]
        public List<Voznja> GetSlobodne()
        {
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;

            List<Voznja> retVal = new List<Voznja>();

            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.Uloga == Enums.Uloga.Vozac)
            {
                foreach (Voznja v in voznje.list)
                {
                    if (v.StatusVoznje == Enums.StatusVoznje.Kreirana)
                    {
                        retVal.Add(v);
                    }
                }
                return retVal;
            }

            return new List<Voznja>();
        }

        [HttpGet]
        [Route("api/voznja/getdriversrides")]
        public List<Voznja> GetDriversRides()
        {
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;

            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.Uloga == Enums.Uloga.Vozac)
            {
                foreach (Vozac rider in vozaci.list)
                {
                    if (rider.KorisnickoIme == user.KorisnickoIme)
                    {
                        return user.voznjeKorisnika;
                    }
                }
            }

            return new List<Voznja>();
        }


    }
}
