import { motion } from "framer-motion";
import { CheckCircle, Activity, Bath, Brain, Pill, Coffee, Heart } from "lucide-react";
import { useServices } from "@/hooks/use-services";

const ICONS: Record<string, React.ElementType> = {
  "medical": Activity,
  "hygiene": Bath,
  "cognitive": Brain,
  "medication": Pill,
  "companion": Coffee,
  "default": Heart
};

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-primary/5 py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Our Care Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Tailored care plans designed to meet the unique needs of your loved ones, ensuring comfort, safety, and independence.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-card rounded-2xl h-64 border border-border p-8" />
            ))
          ) : (
            services?.map((service, i) => {
              const IconComponent = ICONS[service.icon] || ICONS["default"];
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-8 premium-shadow hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Why Choose Us */}
        <div className="bg-card rounded-3xl p-10 md:p-16 premium-shadow border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Why Choose CareVia?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We go above and beyond standard care. Our approach is holistic, focusing not just on physical needs, but emotional well-being too.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Rigorous 5-step background checking process",
                  "Continuous training and certification for all staff",
                  "Personalized care plans updated regularly",
                  "24/7 support line for family members",
                  "Transparent pricing with no hidden fees"
                ].map((point, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
               {/* caregiver holding hands with patient */}
               <img 
                 src="https://pixabay.com/get/g7cc8af6c56bdbaf42e2cefa907293a68a4852924f1157571c7d48b327a6ea5dee27c33572e1532dac2b755a4a692be74e618ccc6e50231ea17db86a05280aac6_1280.jpg" 
                 alt="Caregiver holding hands"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
