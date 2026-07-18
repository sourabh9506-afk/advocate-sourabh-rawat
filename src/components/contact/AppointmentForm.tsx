"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  caseType: z.string().min(1, 'Please select a matter type'),
  description: z.string().min(10, 'Please provide a brief description (min 10 characters)')
});

type FormData = z.infer<typeof schema>;

export default function AppointmentForm() {
  const t = useTranslations('common');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '919026349246';
    const waLink = generateWhatsAppLink(waNumber, data);
    window.open(waLink, '_blank');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-[0_4px_24px_rgba(27,42,74,0.06)] border border-dark/10">
      <h3 className="font-serif text-2xl font-bold text-navy mb-6">Book an Appointment</h3>
      
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
        <input 
          {...register('name')} 
          className="w-full px-4 py-3 rounded border border-dark/15 focus:border-gold focus:outline-none transition-colors"
          placeholder="e.g. Rahul Sharma"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Phone Number *</label>
          <input 
            {...register('phone')} 
            className="w-full px-4 py-3 rounded border border-dark/15 focus:border-gold focus:outline-none transition-colors"
            placeholder="10-digit mobile number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Email Address (Optional)</label>
          <input 
            {...register('email')} 
            className="w-full px-4 py-3 rounded border border-dark/15 focus:border-gold focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Type of Matter *</label>
        <select 
          {...register('caseType')}
          className="w-full px-4 py-3 rounded border border-dark/15 focus:border-gold focus:outline-none transition-colors bg-white"
        >
          <option value="">Select an option...</option>
          <option value="Criminal Defense / Bail">Criminal Defense / Bail</option>
          <option value="Civil & Property Dispute">Civil & Property Dispute</option>
          <option value="Family Law / Divorce">Family Law / Divorce</option>
          <option value="Police Station / Urgent Help">Police Station / Urgent Help</option>
          <option value="Other">Other</option>
        </select>
        {errors.caseType && <p className="text-red-500 text-xs mt-1">{errors.caseType.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Brief Description *</label>
        <textarea 
          {...register('description')} 
          rows={4}
          className="w-full px-4 py-3 rounded border border-dark/15 focus:border-gold focus:outline-none transition-colors resize-y"
          placeholder="Please briefly describe your legal issue..."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold py-4 px-6 rounded transition-colors"
      >
        <Send size={18} />
        Submit & Continue to WhatsApp
      </button>
      <p className="text-center text-xs text-dark/45 mt-4">
        Your details are strictly confidential and protected under attorney-client privilege.
      </p>
    </form>
  );
}
