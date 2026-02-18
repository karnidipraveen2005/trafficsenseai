import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How does TrafficSense AI detect weather conditions?',
    answer:
      'TrafficSense AI uses advanced supervised learning models trained on thousands of traffic scene images. It analyzes visual patterns, lighting conditions, and atmospheric features to accurately classify weather conditions including rain, fog, and low-light scenarios.',
  },
  {
    question: 'Can I use TrafficSense AI on mobile devices?',
    answer:
      'Yes! TrafficSense AI is fully responsive and optimized for both mobile and web platforms. The 8D feature extraction pipeline ensures fast inference even on mobile devices, making it perfect for real-time traffic analysis on the go.',
  },
  {
    question: 'What makes TrafficSense AI different from other traffic analysis tools?',
    answer:
      'TrafficSense AI combines multi-weather classification with AI-powered decision support. Unlike basic image analysis tools, it provides actionable safety insights, real-time visibility analysis, and integrates seamlessly with traffic management systems.',
  },
  {
    question: 'Is there a warranty or support for the system?',
    answer:
      'Yes, we provide comprehensive support and regular updates. Our system is continuously improved based on user feedback and the latest research in traffic scene perception and supervised learning.',
  },
  {
    question: 'How accurate is the weather detection?',
    answer:
      'Our supervised learning models achieve high accuracy rates through extensive training on diverse traffic scenarios. The system is regularly validated against real-world conditions and continuously refined for optimal performance.',
  },
  {
    question: 'Can I integrate TrafficSense AI with my existing traffic management system?',
    answer:
      'Absolutely! TrafficSense AI is designed with integration in mind. You can download detailed reports, access APIs, and share insights with other systems. Contact our team for custom integration solutions.',
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box id="faq" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            Frequently asked questions
          </Typography>
        </Box>

        {/* Accordion */}
        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                mb: 2,
                borderRadius: 2,
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 3,
                  py: 2,
                  '& .MuiAccordionSummary-content': {
                    my: 1,
                  },
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
