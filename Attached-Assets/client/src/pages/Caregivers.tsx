import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, MapPin, Briefcase } from "lucide-react";
import { useCaregivers } from "@/hooks/use-caregivers";

export default function Caregivers() {
  const { data: caregivers, isLoading } = useCaregivers();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Meet Our Professionals
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Every caregiver on our platform is thoroughly vetted, highly trained, and deeply committed to enhancing the quality of life for our clients.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse bg-card rounded-3xl h-[420px] border border-border" />
            ))
          ) : (
            caregivers?.map((caregiver, i) => (
              <motion.div
                key={caregiver.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-3xl overflow-hidden premium-shadow group hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={caregiver.image} 
                    alt={caregiver.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="bg-background/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-bold shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      {caregiver.rating}
                    </div>
                    <div className="text-white font-bold bg-primary px-3 py-1 rounded-full text-sm shadow-md">
                      ${caregiver.hourlyRate}/hr
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{caregiver.name}</h3>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {caregiver.experience} Experience
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {caregiver.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                    {caregiver.skills.length > 3 && (
                      <span className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-1 rounded-md">
                        +{caregiver.skills.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border">
                    <Link href={`/caregivers/${caregiver.id}`} className="btn-premium btn-outline w-full py-2.5">
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
