// components/contact/ContactHeader.tsx
export default function ContactHeader() {
    return (
      <div className="bg-gradient-to-r from-green-700 via-red-600 to-amber-500">
        <div className="container bg-transparent mx-auto px-4 py-12 md:py-16 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à vos questions, recueillir vos témoignages ou discuter de partenariats.
          </p>
        </div>
      </div>
    );
  }