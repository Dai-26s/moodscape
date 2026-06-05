import { motion } from 'framer-motion';

interface StepIndicatorProps {
  current: number;
  total: number;
  labels: string[];
}

export default function StepIndicator({ current, total, labels }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="step-dot-wrapper">
          <motion.div
            className={`step-dot ${i <= current ? 'active' : ''}`}
            animate={{ scale: i === current ? 1.3 : 1 }}
            transition={{ duration: 0.3 }}
          />
          {i <= current && (
            <span className="step-label">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  );
}
