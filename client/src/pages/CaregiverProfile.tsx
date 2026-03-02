import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Briefcase, Calendar, ShieldCheck, Heart, Award } from "lucide-react";
import { useCaregiver } from "@/hooks/use-caregivers";

export default function CaregiverProfile() {
  const [, params] = useRoute("/caregivers/:id");
  const caregiverId = params?.id ? parseInt(params.id, 10) : 0;
  
  const { data: caregiver, isLoading, error } = useCaregiver(caregiverId);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 flex gap-12">
        <div className="w-1/3 animate-pulse bg-card h-96 rounded-3xl" />
        <div className="w-2/3 animate-pulse bg-card h-96 rounded-3xl" />
      </div>
    );
  }

  if (error || !caregiver) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Caregiver Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the profile you're looking for.</p>
        <Link href="/caregivers" className="btn-premium btn-primary">Back to Caregivers</Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-24">
      {/* Top Banner */}
      <div className="h-64 bg-gradient-to-r from-primary/80 to-primary w-full relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-card rounded-3xl premium-shadow p-6 md:p-10 flex flex-col md:flex-row gap-10">
          
          {/* Left Column - Image & Quick Stats */}
          <div className="md:w-1/3 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-48 md:w-full md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-card bg-muted -mt-20 md:-mt-24 mb-6 z-20 relative"
            >
              <img 
                src={caregiver.image} 
                alt={caregiver.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <h1 className="text-3xl font-display font-bold text-foreground text-center mb-2 md:hidden">
              {caregiver.name}
            </h1>

            <div className="w-full bg-muted/50 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground font-medium">Hourly Rate</span>
                <span className="text-xl font-bold text-foreground">${caregiver.hourlyRate}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground font-medium">Rating</span>
                <div className="flex items-center gap-1 font-bold text-foreground">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  {caregiver.rating}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Experience</span>
                <span className="font-bold text-foreground">{caregiver.experience}</span>
              </div>
            </div>

            <Link href={`/book?caregiverId=${caregiver.id}`} className="btn-premium btn-primary w-full mt-6 py-4 text-lg shadow-xl shadow-primary/20">
              Book this Caregiver
            </Link>
          </div>

          {/* Right Column - Details */}
          <div className="md:w-2/3 flex flex-col">
            <div className="hidden md:flex justify-between items-start mb-6">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
                {caregiver.name}
              </h1>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                <ShieldCheck className="w-5 h-5" />
                Verified Pro
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert mb-10 max-w-none text-muted-foreground">
              <h3 className="font-display text-foreground font-bold text-2xl mb-4">About Me</h3>
              <p className="leading-relaxed">{caregiver.bio}</p>
            </div>

            <div className="mb-10">
              <h3 className="font-display text-foreground font-bold text-2xl mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Skills & Specialties
              </h3>
              <div className="flex flex-wrap gap-3">
                {caregiver.skills.map((skill, idx) => (
                  <span key={idx} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl font-medium text-sm border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mt-auto">
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Availability
              </h4>
              <p className="text-muted-foreground text-sm">
                This caregiver is currently accepting new clients. View their schedule in the booking flow to find a time that works for you.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
