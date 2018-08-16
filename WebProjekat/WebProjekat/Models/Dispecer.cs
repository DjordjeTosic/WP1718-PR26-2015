using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Dispecer : Korisnik
    {
        public Dispecer() { }

        public Dispecer(int id, string korisnickoIme, string lozinka, string ime, string prezime, string pol, string jmbg, string kontakt,  string email,string uloga) : this()
        {
            Id = id;
            Ime = ime;
            Prezime = prezime;
            KorisnickoIme = korisnickoIme;
            Lozinka = lozinka;
            JMBG = jmbg;
            KontaktTelefon = kontakt;

            if (pol.Equals("Muski")) { Pol = Enums.Pol.Muski; } else { Pol = Enums.Pol.Zenski; }
            Email = email;

            if(uloga.Equals("Musterija"))
            {
                Uloga = Enums.Uloga.Musterija;
            }
            else if(uloga.Equals("Dispecer"))
            {
                Uloga = Enums.Uloga.Dispecer;

            }
            else
            {
                Uloga = Enums.Uloga.Vozac;
            }
        }
    }
}