import { render, screen } from '@testing-library/react';
import Faq from 'dh-marvel/pages/faq.page';


describe('faqa', () => {
    it('should render the faqs',() => {
        render(<Faq faqsData={[]} />)
        const heading = screen.getByRole('heading', {
            name: /Preguntas Frecuentes/i,
        })
    expect(heading).toBeInTheDocument()
    })
})