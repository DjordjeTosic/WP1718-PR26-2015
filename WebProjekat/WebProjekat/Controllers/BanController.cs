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
    public class BanController : ApiController
    {
        [HttpPut]
        [Route("api/ban/putban")]
        public bool PutBan([FromBody] Korisnik k)
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == k.KorisnickoIme)
                {
                    if (korisnik.Ban == Enums.Banovan.NE)
                    {
                        korisnik.Ban = Enums.Banovan.DA;
                        string path = "~/App_Data/Korisnici.txt";
                        path = HostingEnvironment.MapPath(path);

                        string line = String.Empty;
                        line = korisnik.Id.ToString() + ':' + korisnik.KorisnickoIme + ':' + korisnik.Lozinka + ':' + korisnik.Ime + ':'
                                + korisnik.Prezime + ':' + korisnik.Pol + ':' + korisnik.JMBG + ':' + korisnik.KontaktTelefon + ':'
                                + korisnik.Email + ':' + korisnik.Uloga + ':' + korisnik.Ban;


                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[korisnik.Id] = line;
                        File.WriteAllLines(path, arrLine);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        users = new Korisnici(@"~/App_Data/Korisnici.txt");
                        HttpContext.Current.Application["korisnici"] = users;

                        return true;
                    }
                }
            }

            foreach (Vozac item in vozaci.list)
            {
                if (item.KorisnickoIme == k.KorisnickoIme)
                {
                    if (item.Ban == Enums.Banovan.NE)
                    {
                        item.Ban = Enums.Banovan.DA;
                        string path2 = "~/App_Data/Vozaci.txt";
                        path2 = HostingEnvironment.MapPath(path2);

                        string line2 = String.Empty;
                        line2 = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                    item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                    ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                    ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                     + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;


                        string[] arrLine2 = File.ReadAllLines(path2);
                        arrLine2[item.Id] = line2;
                        File.WriteAllLines(path2, arrLine2);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        Vozaci vozaci2 = new Vozaci(@"~/App_Data/Vozaci.txt");
                        HttpContext.Current.Application["vozaci"] = vozaci2;

                        return true;
                    }
                }
            }

            return false;
        }


        [HttpPut]
        [Route("api/ban/putunban")]
        public bool PutUnban([FromBody] Korisnik k)
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == k.KorisnickoIme)
                {
                    if (korisnik.Ban == Enums.Banovan.DA)
                    {
                        korisnik.Ban = Enums.Banovan.NE;
                        string path = "~/App_Data/Korisnici.txt";
                        path = HostingEnvironment.MapPath(path);

                        string line = String.Empty;
                        line = korisnik.Id.ToString() + ':' + korisnik.KorisnickoIme + ':' + korisnik.Lozinka + ':' + korisnik.Ime + ':'
                                + korisnik.Prezime + ':' + korisnik.Pol + ':' + korisnik.JMBG + ':' + korisnik.KontaktTelefon + ':'
                                + korisnik.Email + ':' + korisnik.Uloga + ':' + korisnik.Ban;


                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[korisnik.Id] = line;
                        File.WriteAllLines(path, arrLine);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        users = new Korisnici(@"~/App_Data/Korisnici.txt");
                        HttpContext.Current.Application["korisnici"] = users;

                        return true;
                    }
                }
            }

            foreach (Vozac item in vozaci.list)
            {
                if (item.KorisnickoIme == k.KorisnickoIme)
                {
                    if (item.Ban == Enums.Banovan.DA)
                    {
                        item.Ban = Enums.Banovan.NE;
                        string path2 = "~/App_Data/Vozaci.txt";
                        path2 = HostingEnvironment.MapPath(path2);

                        string line2 = String.Empty;
                        line2 = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                    item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                    ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                    ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                     + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;


                        string[] arrLine2 = File.ReadAllLines(path2);
                        arrLine2[item.Id] = line2;
                        File.WriteAllLines(path2, arrLine2);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        Vozaci vozaci2 = new Vozaci(@"~/App_Data/Vozaci.txt");
                        HttpContext.Current.Application["vozaci"] = vozaci2;

                        return true;
                    }
                }
            }

            return false;
        }
    }
}
