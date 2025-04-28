import React from 'react';
import Link from 'next/link';
// import { FiFacebook, FiInstagram } from 'react-icons/fi';

export const metadata = {
  title: 'À propos - FlashInfos237 | Actualités du Cameroun en temps réel',
  description: 'Découvrez qui nous sommes, notre mission et nos valeurs. FlashInfos237 est votre source fiable d\'informations camerounaises.',
};

export default function AboutPage() {
  return (
    <main className="bg-gray-50 mt-14 md:mt-28">
      {/* En-tête de la page avec fond amélioré */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-red-600 to-amber-500 opacity-90"></div>
        <div className="container relative mx-auto px-4 py-16 md:py-24 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            À propos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">Flash<span className="text-amber-300">Infos</span>237</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
            Votre source d&apos;information fiable sur l&apos;actualité camerounaise
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-6"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Section Notre Histoire */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-2 bg-green-700 mr-3 rounded-full"></span>
            Notre Histoire
          </h2>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl">
            <div className="p-8 md:p-10 border-l-4 border-green-600">
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                FlashInfos237 est né d&apos;un simple constat : le besoin d&apos;une source d&apos;information fiable, rapide et objective sur l&apos;actualité camerounaise. Dans un monde où la désinformation se propage à la vitesse de la lumière, notre équipe de journalistes chevronnés s&apos;est donnée pour mission de ramener l&apos;intégrité et la rigueur au cœur du paysage médiatique camerounais.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Lancé en 2025, notre portail d&apos;informations se projette comme une référence pour les Camerounais du pays et de la diaspora, ainsi que pour tous ceux qui s&apos;intéressent à l&apos;actualité de ce pays d&apos;Afrique centrale. Notre croissance rapide témoigne de la confiance que nos lecteurs placent en nous et de la qualité de notre travail journalistique.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Aujourd&apos;hui, FlashInfos237 continue d&apos;évoluer, en investissant dans les nouvelles technologies et en élargissant notre couverture, mais toujours avec le même engagement envers la vérité et l&apos;excellence journalistique qui ont fait notre réputation.
              </p>
            </div>
          </div>
        </section>

        {/* Section Notre Mission et Nos Valeurs */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl">
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-700"></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-8">
                  <div className="bg-green-100 p-3 md:p-4 rounded-full flex-shrink-0 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">Notre Mission</h2>
                </div>
                <p className="mb-6 text-lg text-gray-700">
                  Notre mission est de fournir aux Camerounais et à tous ceux qui s&apos;intéressent au Cameroun une couverture de l&apos;actualité qui soit:
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start bg-green-50 p-4 rounded-lg">
                    <svg className="h-6 w-6 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-green-700">Rapide :</strong> Pour vous tenir informés des derniers développements en temps réel.</span>
                  </li>
                  <li className="flex items-start bg-green-50 p-4 rounded-lg">
                    <svg className="h-6 w-6 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-green-700">Fiable :</strong> Basée sur des faits vérifiés et des sources crédibles.</span>
                  </li>
                  <li className="flex items-start bg-green-50 p-4 rounded-lg">
                    <svg className="h-6 w-6 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-green-700">Complète :</strong> Couvrant tous les sujets qui façonnent le Cameroun d&apos;aujourd&apos;hui et de demain.</span>
                  </li>
                  <li className="flex items-start bg-green-50 p-4 rounded-lg">
                    <svg className="h-6 w-6 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-green-700">Accessible :</strong> Présentée de manière claire et compréhensible pour tous.</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 italic border-l-4 border-green-500 pl-4">
                  Nous croyons fermement que des citoyens bien informés sont la clé d&apos;une société démocratique dynamique.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl">
              <div className="h-2 bg-gradient-to-r from-red-500 to-red-700"></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-8">
                  <div className="bg-red-100 p-3 md:p-4 rounded-full flex-shrink-0 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold ml-4 text-gray-800">Nos Valeurs</h2>
                </div>
                <ul className="space-y-6">
                  <li className="bg-red-50 p-5 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-red-700">Intégrité</h3>
                    <p className="text-gray-700">Nous restons fidèles à la vérité, même lorsqu&apos;elle est difficile à entendre. Notre crédibilité est notre bien le plus précieux.</p>
                  </li>
                  <li className="bg-amber-50 p-5 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-amber-700">Indépendance</h3>
                    <p className="text-gray-700">Nous maintenons une indépendance éditoriale stricte, libre de toute influence politique ou commerciale.</p>
                  </li>
                  <li className="bg-green-50 p-5 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-green-700">Impartialité</h3>
                    <p className="text-gray-700">Nous présentons toutes les facettes d&apos;une histoire, sans parti pris, permettant à nos lecteurs de se forger leur propre opinion.</p>
                  </li>
                  <li className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-blue-700">Innovation</h3>
                    <p className="text-gray-700">Nous adoptons les nouvelles technologies et formats pour mieux servir notre public dans un monde médiatique en constante évolution.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Notre équipe */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-2 bg-amber-500 mr-3 rounded-full"></span>
            Notre Équipe
          </h2>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl">
            <div className="p-8 md:p-10 border-l-4 border-amber-500">
              <div className="flex mb-6">
                <div className="mr-6 hidden md:block">
                  <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    Notre équipe est composée de journalistes professionnels, d&apos;analystes et d&apos;experts dans divers domaines, tous unis par la passion de l&apos;information de qualité. Forts de leur expérience acquise dans les médias nationaux et internationaux, nos rédacteurs apportent une perspective unique et approfondie sur l&apos;actualité camerounaise et internationale.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    De la politique à l&apos;économie, en passant par le sport, la culture et les nouvelles technologies, nos spécialistes travaillent sans relâche pour vous offrir une couverture complète et nuancée de tout ce qui fait l&apos;actualité au Cameroun et à l&apos;internationale.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-700 font-bold">JN</span>
                </div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold">KM</span>
                </div>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-700 font-bold">PL</span>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold">MT</span>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold">AB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-2 bg-green-600 mr-3 rounded-full"></span>
            Contactez-nous
          </h2>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Nous sommes à votre écoute</h3>
                <p className="mb-8 text-lg text-gray-700">
                  Vous avez des questions, des suggestions ou vous souhaitez nous signaler une information ? N&apos;hésitez pas à nous contacter.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <a href="mailto:contact@flashinfos237.com" className="text-gray-700 hover:text-green-600 transition duration-200">contact@flashinfos237.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Téléphone</h4>
                      <a href="tel:+237697965420" className="text-gray-700 hover:text-red-600 transition duration-200">
                        +237 697 965 420
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                      <p className="text-gray-700">Yaoundé, Cameroun</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-red-600 to-amber-500 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-20"></div>
                <div className="relative h-full flex items-center justify-center p-10">
                  <div className="text-center text-white">
                    <div className="mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Restez en contact</h3>
                    <p className="text-lg mb-6">Nous répondons à toutes vos demandes dans les plus brefs délais</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}