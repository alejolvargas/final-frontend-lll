import { faqsData, FaqsType } from 'dh-marvel/components/faqs/faqsData'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'


type faqsProps = {
    faqsData: FaqsType[],
}


const Fag: NextPage<faqsProps> = ({faqsData}:faqsProps) => {
    console.log(faqsData);
    
  return (
    <div> Fag.page</div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {faqsData},
    }
}

export default Fag;





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
