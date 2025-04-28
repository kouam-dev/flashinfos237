// components/contact/ContactForm.tsx
import { useState, FormEvent } from 'react';
// import { FiSend } from 'react-icons/fi';
import { ContactFormData } from '@/types/contact';
import { contactService } from '@/lib/contactService';

interface ContactFormProps {
  setSubmitStatus: React.Dispatch<React.SetStateAction<{
    success?: boolean;
    message?: string;
  }>>;
  submitStatus: {
    success?: boolean;
    message?: string;
  };
}

export default function ContactForm({ setSubmitStatus, submitStatus }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.createContactMessage(formData);
      
      // Reset form and show success message
      setFormData({
        nom: '',
        email: '',
        sujet: '',
        message: ''
      });
      
      setSubmitStatus({
        success: true,
        message: 'Votre message a été envoyé avec succès. Notre équipe vous contactera prochainement.'
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setSubmitStatus({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 flex items-center">
        <span className="w-8 h-1 bg-red-600 mr-2"></span>
        Envoyez-nous un message
      </h2>
      
      {submitStatus.message && (
        <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form id='form' onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="nom"
            name="nom"
            type="text"
            label="Nom complet"
            value={formData.nom}
            placeholder="Votre nom"
            required
            onChange={handleChange}
          />
          
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            placeholder="Votre adresse email"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
          <select
            id="sujet"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="information">Demande d&apos;information</option>
            <option value="temoignage">Témoignage / Alerte info</option>
            <option value="publicite">Publicité & Partenariats</option>
            <option value="correction">Correction d&apos;article</option>
            <option value="recrutement">Candidature / Stage</option>
            <option value="autre">Autre sujet</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Votre message ici..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-5 md:px-6 py-2 md:py-3 ${
            isSubmitting ? 'bg-gray-400' : 'bg-red-700 hover:bg-red-800'
          } text-white font-medium rounded-lg transition-colors flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>Envoi en cours...</>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              Envoyer le message
              {/* <FiSend /> */}
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

// Sous-composant pour le formulaire
interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({ 
  id, 
  name, 
  type, 
  label, 
  value, 
  placeholder, 
  required = false, 
  onChange 
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder={placeholder}
      />
    </div>
  );
}