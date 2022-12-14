import { faqsData, FaqsType } from 'dh-marvel/components/faqs/faqsData'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type faqsProps = {
    faqsData: FaqsType[],
}

const Fag: NextPage<faqsProps> = ({faqsData}:faqsProps) => {
    console.log(faqsData);
    
  return (
   <>
    <Head>
                <title>Question Frenquents </title>
                <meta name="description" content="Generated by Question Frenquents"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"Preguntas Frecuentes"}>
                {faqsData.map((faq:FaqsType)=>
                      <Accordion key={faq.id}>
                          <AccordionSummary
                             expandIcon={<ExpandMoreIcon />}
                             aria-controls="panel1a-content"
                             id="panel1a-header"
                            >
                            <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                {faq.answer}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                )}
            </BodySingle>
   </>
  )
}
    export const getStaticProps: GetStaticProps = () => {
        return {
            props: {faqsData}
        }
    }


export default Fag


/* export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    
    </div>
  );
} */
