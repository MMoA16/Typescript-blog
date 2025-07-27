// components/FAQs.tsx

'use client';

import React from 'react';
import CollapsibleDropdown from './CollpasibleDropdown';
import Footer from './Footer/Footer';
import { motion } from 'framer-motion';

type FAQItem = {
  id: number;
  attributes: {
    Questions: string;
    Type: string;
    Answer: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type Props = {
  faqs: FAQItem[];
};

const FAQs: React.FC<Props> = ({ faqs }) => {
  const grouped = faqs.reduce<Record<string, FAQItem[]>>((acc, item) => {
    const type = item.attributes.Type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {Object.entries(grouped).map(([type, items], typeIndex) => (
        <motion.div
          key={type}
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: typeIndex * 0.2, duration: 0.5 }}
        >
          <CollapsibleDropdown title={type}>
            <div className="space-y-4">
              {items.map(({ id, attributes }, i) => (
                <motion.div
                  key={id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <p className="text-white font-semibold">
                    {i + 1}) {attributes.Questions}
                  </p>
                  <p className="text-white mt-1 whitespace-pre-line">
                    {attributes.Answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </CollapsibleDropdown>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQs;
