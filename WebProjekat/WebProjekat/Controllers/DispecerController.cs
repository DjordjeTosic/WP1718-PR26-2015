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
    public class DispecerController : ApiController
    {
        [HttpPost]
        public bool Post([FromBody]Vozac v)
        {
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Korisnik user = HttpContext.Current.Session["user"] as Korisnik;
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            foreach (Vozac vozac in vozaci.list)
            {
                if (v.KorisnickoIme == vozac.KorisnickoIme)
                    return false;
            }

            v.Id = vozaci.list.Count;
            v.Uloga = Enums.Uloga.Vozac;
            //v.KorisnickoIme = v.KorisnickoIme;
            v.Zauzet = Enums.Zauzet.NE;
            v.Automobil.Broj = vozaci.list.Count.ToString();
            v.Ban = Enums.Banovan.NE;

            vozaci.list.Add(v);

            //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\vozaci.txt";
            string path = "~/App_Data/Vozaci.txt";
            path = HostingEnvironment.MapPath(path);

            string line = String.Empty;
            line = v.Id.ToString() + ':' + v.KorisnickoIme + ':' + v.Lozinka + ':' + v.Ime + ':' +
            v.Prezime + ':' + v.Pol + ':' + v.JMBG + ':' + v.KontaktTelefon + ':' + v.Email + ':' + v.Uloga +
            ':' + v.Lokacija.X.ToString() + ':' + v.Lokacija.Y.ToString() + ':' + v.Lokacija.Adresa.UlicaBroj + ':' + v.Lokacija.Adresa.NaseljenoMesto +
            ':' + v.Lokacija.Adresa.PozivniBrojMesta + ':' + v.Automobil.Broj + ':' + v.Automobil.Godiste + ':' + v.Automobil.Registracija
             + ':' + v.Automobil.Tip + ':' + v.Zauzet + ':' + v.Ban + Environment.NewLine;

            if (!File.Exists(path))
            {
                File.WriteAllText(path, line);
            }
            else
            {
                File.AppendAllText(path, line);
            }

            Vozaci vozaci2 = new Vozaci(@"~/App_Data/Vozaci.txt");
            HttpContext.Current.Application["vozaci"] = vozaci2;

            return true;

        }

        [HttpPost]
        [Route("api/Dispecer/PostIzmena")]
        public bool PostIzmena([FromBody]Dispecer dispecer)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Dispeceri users = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            foreach (var item in users.list)
            {
                if (dispecer.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Email = dispecer.Email;
                    item.Ime = dispecer.Ime;
                    item.JMBG = dispecer.JMBG;
                    item.KontaktTelefon = dispecer.KontaktTelefon;
                    item.Lozinka = dispecer.Lozinka;
                    item.Pol = dispecer.Pol;
                    item.Prezime = dispecer.Prezime;
                    item.Uloga = Enums.Uloga.Dispecer;


                    string path = "~/App_Data/Dispeceri.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':'
                    + item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':'
                    + item.Email + ':' + item.Uloga;


                    
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;
                   
                    File.WriteAllLines(path, arrLine);

                    



                    Dispeceri dispeceri2 = new Dispeceri("~/App_Data/Dispeceri.txt");
                    HttpContext.Current.Application["dispeceri"] = dispeceri2;
                    return true;
                }


            }
            return false;

        }


        [HttpPost]
        [Route("api/Dispecer/PostVoznja")]
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
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;

            if (user.Uloga == Enums.Uloga.Dispecer && user.KorisnickoIme == v.idDispecer)
            {
                foreach (Vozac item in vozaci.list)
                {
                    if (item.Zauzet == Enums.Zauzet.NE)
                    {
                        item.Zauzet = Enums.Zauzet.DA;
                        v.DatumVreme = DateTime.UtcNow;

                        v.idDispecer = user.KorisnickoIme;
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
                        v.Iznos = 0;

                        v.idVozac = item.KorisnickoIme;
                        v.idKorisnik = "";
                        v.StatusVoznje = Enums.StatusVoznje.Prihvacena;

                        v.Id = user.voznjeKorisnika.Count;
                        user.voznjeKorisnika.Add(v);

                        
                        v.Id = 0;
                        if(item.voznjeKorisnika == null)
                        {
                            item.voznjeKorisnika = new List<Voznja>();
                        }
                        item.voznjeKorisnika.Add(v);

                        vozaci.list[item.Id].voznjeKorisnika.Add(v);
                        v.Id = voznje.list.Count;
                        voznje.list.Add(v);

                        string path = "~/App_Data/Vozaci.txt";
                        path = HostingEnvironment.MapPath(path);


                        string line = String.Empty;
                        line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                        item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                        ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                        ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                         + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;


                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[item.Id] = line;
                        File.WriteAllLines(path, arrLine);





                        string path2 = "~/App_Data/Voznje.txt";
                        path2 = HostingEnvironment.MapPath(path2);


                        string line2 = String.Empty;
                        line2 = v.Id.ToString() + '|' + v.DatumVreme.ToString() + '|' + v.Lokacija.X + '|' + v.Lokacija.Y + '|' +
                        v.Lokacija.Adresa.UlicaBroj + '|' + v.Lokacija.Adresa.NaseljenoMesto + '|' + v.Lokacija.Adresa.PozivniBrojMesta + '|' + v.Automobil + '|' +
                        v.idKorisnik + '|' + v.Odrediste.X + '|' + v.Odrediste.Y + '|' + v.Odrediste.Adresa.UlicaBroj + '|' + v.Odrediste.Adresa.NaseljenoMesto + '|' + v.Odrediste.Adresa.PozivniBrojMesta + '|' +
                        v.idDispecer + '|' + v.idVozac + '|' + v.Iznos.ToString() + '|' + v.Komentar.Opis + '|' + v.Komentar.DatumObjave + '|' + v.Komentar.idKorisnik + '|' + v.Komentar.idVoznja + '|' +
                        v.Komentar.Ocena + '|' + v.StatusVoznje + Environment.NewLine;

                        if (!File.Exists(path2))
                        {
                            File.WriteAllText(path2, line2);
                        }
                        else
                        {
                            File.AppendAllText(path2, line2);
                        }

                        HttpContext.Current.Application["vozaci"] = vozaci;
                        Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                        HttpContext.Current.Application["voznje"] = voznje2;

                        return true;
                    }
                }

            }

            return false;
        }

        [HttpPut]
        public bool Put(string id, [FromBody]Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;

            if(user.Uloga == Enums.Uloga.Dispecer)
            {
                foreach(Vozac item in vozaci.list)
                {
                    if(item.Zauzet == Enums.Zauzet.NE && item.KorisnickoIme == v.idVozac && v.StatusVoznje == Enums.StatusVoznje.Kreirana)
                    {
                        item.Zauzet = Enums.Zauzet.DA;

                        voznje.list[Int32.Parse(id)].idDispecer = user.KorisnickoIme;
                        voznje.list[Int32.Parse(id)].idVozac = item.KorisnickoIme;
                        voznje.list[Int32.Parse(id)].StatusVoznje = Enums.StatusVoznje.Prihvacena;


                        if(item.voznjeKorisnika == null)
                        {
                            item.voznjeKorisnika = new List<Voznja>();
                        }
                        item.voznjeKorisnika.Add(voznje.list[Int32.Parse(id)]);

                        string path = "~/App_Data/Vozaci.txt";
                        path = HostingEnvironment.MapPath(path);


                        string line = String.Empty;
                        line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':' +
                        item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':' + item.Email + ':' + item.Uloga +
                        ':' + item.Lokacija.X.ToString() + ':' + item.Lokacija.Y.ToString() + ':' + item.Lokacija.Adresa.UlicaBroj + ':' + item.Lokacija.Adresa.NaseljenoMesto +
                        ':' + item.Lokacija.Adresa.PozivniBrojMesta + ':' + item.Automobil.Broj + ':' + item.Automobil.Godiste + ':' + item.Automobil.Registracija
                         + ':' + item.Automobil.Tip + ':' + item.Zauzet + ':' + item.Ban;

                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[item.Id] = line;
                        File.WriteAllLines(path, arrLine);

                        string path2 = "~/App_Data/Voznje.txt";
                        path2 = HostingEnvironment.MapPath(path2);


                        string line2 = String.Empty;
                        line2 = voznje.list[Int32.Parse(id)].Id.ToString() + '|' + voznje.list[Int32.Parse(id)].DatumVreme.ToString() + '|' + voznje.list[Int32.Parse(id)].Lokacija.X + '|' + voznje.list[Int32.Parse(id)].Lokacija.Y + '|' +
                        voznje.list[Int32.Parse(id)].Lokacija.Adresa.UlicaBroj + '|' + voznje.list[Int32.Parse(id)].Lokacija.Adresa.NaseljenoMesto + '|' + voznje.list[Int32.Parse(id)].Lokacija.Adresa.PozivniBrojMesta + '|' + voznje.list[Int32.Parse(id)].Automobil + '|' +
                        voznje.list[Int32.Parse(id)].idKorisnik + '|' + voznje.list[Int32.Parse(id)].Odrediste.X + '|' + voznje.list[Int32.Parse(id)].Odrediste.Y + '|' + voznje.list[Int32.Parse(id)].Odrediste.Adresa.UlicaBroj + '|' + voznje.list[Int32.Parse(id)].Odrediste.Adresa.NaseljenoMesto + '|' + voznje.list[Int32.Parse(id)].Odrediste.Adresa.PozivniBrojMesta + '|' +
                        voznje.list[Int32.Parse(id)].idDispecer + '|' + voznje.list[Int32.Parse(id)].idVozac + '|' + voznje.list[Int32.Parse(id)].Iznos.ToString() + '|' + voznje.list[Int32.Parse(id)].Komentar.Opis + '|' + voznje.list[Int32.Parse(id)].Komentar.DatumObjave + '|' + voznje.list[Int32.Parse(id)].Komentar.idKorisnik + '|' + voznje.list[Int32.Parse(id)].Komentar.idVoznja + '|' +
                        voznje.list[Int32.Parse(id)].Komentar.Ocena + '|' + voznje.list[Int32.Parse(id)].StatusVoznje;

                        string[] arrLine2 = File.ReadAllLines(path2);
                        arrLine2[Int32.Parse(id)] = line2;
                        File.WriteAllLines(path2, arrLine2);

                        HttpContext.Current.Application["vozaci"] = vozaci;
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
