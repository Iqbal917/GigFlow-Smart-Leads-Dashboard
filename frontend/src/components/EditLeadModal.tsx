import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { updateLead } from '../services/lead.service';
import type { Lead } from '../types/lead.types';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface Props {
  lead: Lead;
  onClose: () => void;
  onSuccess: () => void;
}

const EditLeadModal = ({ lead, onClose, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status as any,
        source: lead.source as any,
      });
    }
  }, [lead, reset]);

  const onSubmit = async (data: LeadFormValues) => {
    try {
      setIsLoading(true);
      await updateLead(lead._id, data);
      toast.success('Lead updated successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-dark-surface w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-dark-border overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-dark-border/50">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Lead</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Name"
            placeholder="Lead Name"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="lead@example.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Select
            label="Status"
            {...register('status')}
            error={errors.status?.message}
            options={[
              { value: 'New', label: 'New' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Qualified', label: 'Qualified' },
              { value: 'Lost', label: 'Lost' },
            ]}
          />

          <Select
            label="Source"
            {...register('source')}
            error={errors.source?.message}
            options={[
              { value: 'Website', label: 'Website' },
              { value: 'Instagram', label: 'Instagram' },
              { value: 'Referral', label: 'Referral' },
            ]}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditLeadModal;