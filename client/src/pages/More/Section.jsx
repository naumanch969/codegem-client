import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Section = ({ icon, title, content, expanded, handleChange }) => {
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
        {icon}
        <span className="ml-2">{title}</span>
      </AccordionSummary>
      <AccordionDetails>
        <p>{content}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
