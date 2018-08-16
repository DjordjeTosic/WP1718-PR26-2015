using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Enums
    {
        public enum Uloga { Musterija, Dispecer, Vozac };
        public enum Pol { Zenski, Muski };

        public enum TipAuta { Svejedno, Putnicki, Kombi };

        public enum StatusVoznje
        {
            Kreirana, // Na cekanju -- INICIRANO
            Formirana,
            Obradjena,
            Prihvacena,
            Otkazana,
            Neuspesna,
            Uspesna,
            Utoku,
        }

        public enum Zauzet
        {
            NE,
            DA,
            IGNORE
        }

        public enum Banovan
        {
            NE,
            DA,
            IGNORE
        }
    }
}