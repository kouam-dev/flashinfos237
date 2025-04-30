// components/contact/ContactInfo.tsx
import Image from 'next/image';
// import { FiFacebook, FiInstagram } from 'react-icons/fi';

export default function ContactInfo() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white/50 flex items-center">
          <span className="w-8 h-1 bg-green-700 mr-2"></span>
          Nos coordonnées
        </h2>

        <div className="space-y-5 md:space-y-6">
          <ContactInfoItem 
            icon={<LocationIcon />} 
            title="Adresse" 
            bgColor="bg-green-100" 
            iconColor="text-green-700"
          >
            <p className="text-gray-600">Yaoundé, Cameroun</p>
          </ContactInfoItem>

          <ContactInfoItem 
            icon={<PhoneIcon />} 
            title="Téléphone" 
            bgColor="bg-red-100" 
            iconColor="text-red-600"
          >
            <a href="tel:+237697965420" className="text-gray-600 hover:text-gray-800 transition-colors">
              +237 697 965 420
            </a>
          </ContactInfoItem>

          <ContactInfoItem 
            icon={<EmailIcon />} 
            title="Email" 
            bgColor="bg-amber-100" 
            iconColor="text-amber-500"
          >
            <p className="text-gray-600">contact@flashinfos237.com</p>
          </ContactInfoItem>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-4 md:mb-6 text-gray-800 flex items-center">
          <span className="w-8 h-1 bg-amber-500 mr-2"></span>
          Suivez-nous
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {/* <SocialLink href="#" bgColor="bg-blue-600" hoverColor="hover:bg-blue-700">
            <FiFacebook className="h-5 w-5 md:h-6 md:w-6" />
          </SocialLink>
          
          <SocialLink 
            href="#" 
            bgColor="bg-gradient-to-r from-purple-500 to-pink-500" 
            hoverColor="hover:from-purple-600 hover:to-pink-600"
          >
            <FiInstagram className="h-5 w-5 md:h-6 md:w-6" />
          </SocialLink> */}
        </div>
      </div>
      
      {/* Carte (placeholder) */}
      <div className="h-48 md:h-64 bg-gray-200 relative">
        <Image 
          src="/image.svg" 
          alt="Carte de localisation FlashInfos237" 
          fill 
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-3 md:p-4 rounded-lg">
            <p className="font-semibold text-sm md:text-base text-gray-900">
              Carte interactive en cours de chargement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sous-composants pour ContactInfo
function ContactInfoItem({ 
  icon, 
  title, 
  children, 
  bgColor, 
  iconColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode; 
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`${bgColor} p-2 md:p-3 rounded-full flex-shrink-0`}>
        <div className={`h-5 w-5 md:h-6 md:w-6 ${iconColor}`}>{icon}</div>
      </div>
      <div>
        <h3 className="font-semibold text-base md:text-lg text-gray-800">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// function SocialLink({ 
//   href, 
//   children, 
//   bgColor, 
//   hoverColor 
// }: { 
//   href: string; 
//   children: React.ReactNode; 
//   bgColor: string;
//   hoverColor: string;
// }) {
//   return (
//     <Link 
//       href={href} 
//       className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor} ${hoverColor} text-white transition duration-200`}
//     >
//       {children}
//     </Link>
//   );
// }

// Icons
function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}